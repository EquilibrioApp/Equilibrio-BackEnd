import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { kMaxLength } from 'buffer';
import { CircunferenciaEntity } from 'src/circunferencias/circunferencia.entity';
import { PesoEntity } from 'src/pesos/peso.entity';
import  {  Repository  }  from  'typeorm' ;
import { IndiceEntity } from './indice.entity';

@Injectable()
export class IndicesService {
    constructor(
        @InjectRepository(IndiceEntity)private readonly indiceRepo:Repository<IndiceEntity>,
        @InjectRepository(CircunferenciaEntity)private readonly cirRepo:Repository<CircunferenciaEntity>,
        @InjectRepository(PesoEntity)private readonly pesoRepo:Repository<PesoEntity>,
    ){}
    
    // async create(exp: Partial<IndiceEntity>): Promise<IndiceEntity> {
    //     const item = this.indiceEntity.create(exp);
    //     return this.indiceEntity.save(item);
    // }
    async find(){
        return this.indiceRepo.find();
    }

    async findOne( id : string){
        const item = await this.indiceRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async create( body:any): Promise<IndiceEntity> {
        console.log(body);
        const indice = new IndiceEntity();
        indice.masaCorporal = this.createIMC(body.peso, body.altura); // IMC=PESO/(ALTURAxAlTURA)
        indice.masaGrasa = this.createMg(body, body.cintura, body.cuello, body.cadera, body.altura, body.sexo, body.edad, body.peso); // Fórmula Masa Grasa 
        indice.masaMagra = this.createMm(body.peso, body.altura, body.sexo); // Masa corporal magra
        indice.masaOsea = this.createMo(body.altura, body.biestiloideo, body.femoral); // Masa ósea 
        indice.masaResidual = this.createMr(body.peso, body.sexo); // Masa residual
        // Masa muscular (kg)=peso-(masa grasa + masa ósea + masa residual)
        indice.masaMuscular = (body.peso - (indice.masaGrasa + indice.masaOsea + indice.masaResidual));
        indice.avanceId = body.avanceId;

        const item = this.indiceRepo.create(indice);
        console.log(item);
        return this.indiceRepo.save(item);
    }

        createIMC(peso: number, altura: number){
            var IMC = peso/(Math.pow((altura/100), 2));
            return IMC;
        }

        createMg(body:any, cintura: number, cuello: number, cadera:number, altura:number, sexo:string, edad:number, peso:number){
            const IMC = this.createIMC(body.peso, body.altura);
            if (sexo == 'M') {
                // Fórmula Masa Grasa Hombres (%): 495 / {1.0324 - 0.19077 [longitud (cintura- cuello)] + 0.15456 [altura]}-450
                var mg = 495/(1.0324-(0.19077*Math.log(cintura-cuello))+(0.15456*altura));
                // mg =  495/(1.0324-(0.19077*Math.log(cintura-cuello))+(0.15456*(altura)))-450;
            }else{
                //  495 / {1.29579 - 0.35004 [longitud (cintura+caderas-cuello)] + 0.22100 [altura]}. - 450
                var mg = (1.2*IMC)+(0.23*edad)-5.4
                // 495/(1.29579-0.35004*(Math.log(cadera+cintura-cuello))+(0.221*(altura))); 
                // var mg = 495/(1.29579-(0.35004*Math.log(cadera+cintura-cuello))+(0.221*Math.log(altura)));  
                //495 / (1.29579- (0.35004*longitud) + (0.22100 * Math.log(altura))) - 450;
                // https://calcuonline.com/calculadoras/calculadora-grasa-corporal/
            }
            var mgK = peso*(mg/100);
            return mgK;
        }

        createMm(peso:number, altura:number, sexo:string){
            var mm = 0; 
            if (sexo == 'M') {
                // Masa corporal magra kg (hombre) = [1,10 x peso (kg)] - 128 x {peso (Kg)2 (al cuadrado) / Altura (cm)2 (al cuadrado)}.
                mm = (1.10 * peso) - (128 * ((Math.pow(peso, 2))/(Math.pow(altura, 2))));
            } else {
                // Masa corporal magra kg (mujer) = [1,07 x peso (kg)] - 148 x {peso (Kg)2 (al cuadrado) / Altura (cm)]2 (al cuadrado)}.
                mm = (1.07 * peso) - (148 * ((Math.pow(peso, 2))/(Math.pow(altura, 2))));
            }
            return mm;
        }

        createMo(altura:number, biestiloideo:number, femoral:number){ 
            //Formula = 3.02*(estatura2* diámetro biestiloideo * diámetro femoral * 400) 0.712
            var mo = 3.02 * Math.pow(((Math.pow((altura/100),2))*(biestiloideo/100)*(femoral/100)*400),0.712);
            return mo;
        }

        createMr(peso:number, sexo:string){
            var mr = 0;
            if (sexo == 'M') {        
                // Hombres Masa residual (kg)=peso*24.1/100
                mr = (peso*24.1)/100;
            } else {
                // Mujeres Masa residual (kg)=peso*20.9/100
                mr = (peso*20.9)/100;
            }
            return mr;
        }



    async update(id: string, exp: Partial<IndiceEntity>): Promise<IndiceEntity> {
        const item = await this.findOne(id);
        return this.indiceRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<IndiceEntity> {
        const item = await this.findOne(id);
        return this.indiceRepo.remove(item);
    }


    //TODO PESO ACTUAL Y PESO PERDIDO
    //TODO ENTIDAD EJERCICIO
}


//Fuente:
// https://www.calculartodo.com/salud/indice-de-masa-grasa.php