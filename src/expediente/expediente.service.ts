import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/dto/auth.dto';
import { AvancesService } from 'src/avances/avances.service';
import { UserEntity } from 'src/users/users.entity';
import flaskApi from 'src/utils/flask';
import { Repository } from 'typeorm';
import { ExpedienteDto, ExpedienteResponseDto, mealRequest, MealsResponseDto } from './dto/expediente.dto';
import { ExpedienteEntity } from './expediente.entity';


@Injectable()
export class ExpedienteService {
    constructor(
        @InjectRepository(ExpedienteEntity)private readonly expedienteRepo:Repository<ExpedienteEntity>,
        @InjectRepository(UserEntity)private readonly doctorRepo:Repository<UserEntity>,
    ){}
    
    // async create(doctor : UserEntity, exp: Partial<ExpedienteDto>): Promise<ExpedienteDto> {
    //     const item = await this.doctorRepo.findOne(doctor);
    //     if(item === undefined){
    //         throw new NotFoundException;
    //     }else {
    //         const expediente = new ExpedienteEntity();
    //         console.log(item);
    //         expediente.doctor = doctor;
    //         expediente.alturaPaciente = exp.alturaPaciente;
    //         expediente.sexo = exp.sexo;
    //         const expo =  await this.expedienteRepo.create(expediente);
    //         this.expedienteRepo.save(expo)
    //     }
    //     return 
    // }

    
    async create(exp: Partial<ExpedienteEntity>): Promise<ExpedienteEntity> {
        console.log(exp);
        const item = this.expedienteRepo.create(exp);
        console.log(item.doctor);
        return this.expedienteRepo.save(item);
    }


    async find(): Promise<ExpedienteResponseDto[]> { 
        return this.expedienteRepo.find();
    }

    async findOne( id : string){
        const item = await this.expedienteRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    // async findDoctor( doctor : UserEntity): Promise<ExpedienteResponseDto[]> { 
    //     const item = await this.expedienteRepo.findOne(doctor);
    //     if(!item) throw new NotFoundException();
    //     return item;
    // }

    async update(id: string, exp: Partial<ExpedienteEntity>): Promise<ExpedienteEntity> {
        const item = await this.findOne(id);
        return this.expedienteRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<ExpedienteEntity> {
        const item = await this.findOne(id);
        return this.expedienteRepo.remove(item);
    }

    async pesos(id : string){ 
        const item = await this.findOne(id);
        return item.avances.createdAt;
    }

    async getMeals(buscarRecetas : mealRequest){ 

        try {
            const resp = await flaskApi.get<MealsResponseDto[]>(
                '/api/recetas/consulta', {params: buscarRecetas}
              );

              return resp.data;
        } catch (error) {
            console.log(error);
        }

        
    }
    
    
    /*async createNewExpe(body:any) {
        //Meta
        const meta = new MetaEntity();
            meta.peso_meta = body.peso_meta;
            meta.fecha_meta = body.fecha_meta;
        const newMeta = await this.metaRepo.save(meta);
        //Expediente 
        const expediente = new ExpedienteEntity();
            expediente.id_especialista = body.id_especialista;
            expediente.id_paciente = body.id_paciente;
            expediente.id_meta = newMeta;
            expediente.altura_paciente = body.altura_paciente;
        const newExpediente = await this.expedienteRepo.save(expediente);
        //Avances
        const avances = new AvanceEntity();
            avances.fecha = body.fecha;
            avances.observacion = body.observacion;
            avances.id_expediente = newExpediente;
        const newAvance = await this.avanceRepo.save(avances);
        //Peso
        const peso = new PesoEntity();
            peso.peso = body.peso;
            peso.id_avance = newAvance;
        //Circunferencia
        const circunferencia = new CircunferenciasEntity();
            circunferencia.cadera = body.cadera;
            circunferencia.cintura = body.cintura;
            circunferencia.brazo = body.brazo;
            circunferencia.pierna = body.pierna;
            circunferencia.id_avance = newAvance;
        //Pliegues
        const pliegues = new PlieguesEntity();
            pliegues.tricipital = body.tricipital; 
            pliegues.pectoral = body.pectoral;
            pliegues.bicipital = body.bicipital;
            pliegues.suprailiaca = body.suprailiaca;
            pliegues.subescupular = body.subescupular;
            pliegues.pantorrilla_media = body.pantorrilla_media;
            pliegues.abdominal = body.abdominal;
            pliegues.muslo_medio = body.muslo_medio;
            pliegues.midaxilar = body.midaxilar; 
            pliegues.id_avance = newAvance;

        return this.plieguesRepo.save(pliegues), this.circunferenciaRepo.save(circunferencia), this.pesoRepo.save(peso);

    }

    async createNewAvance(id_expediente: string, body:any) {
        const expediente = await this.expedienteRepo.findOne(id_expediente);
        const newExpediente = this.expedienteRepo.merge(expediente);
        //Avances
        const avances = new AvanceEntity();
            avances.fecha = body.fecha;
            avances.observacion = body.observacion;
            avances.id_expediente = newExpediente;
        const newAvance = await this.avanceRepo.save(avances);
        //Peso
        const peso = new PesoEntity();
            peso.peso = body.peso;
            peso.id_avance = newAvance;
        //Circunferencia
        const circunferencia = new CircunferenciasEntity();
            circunferencia.cadera = body.cadera;
            circunferencia.cintura = body.cintura;
            circunferencia.brazo = body.brazo;
            circunferencia.pierna = body.pierna;
            circunferencia.id_avance = newAvance;
        //Pliegues
        const pliegues = new PlieguesEntity();
            pliegues.tricipital = body.tricipital; 
            pliegues.pectoral = body.pectoral;
            pliegues.bicipital = body.bicipital;
            pliegues.suprailiaca = body.suprailiaca;
            pliegues.subescupular = body.subescupular;
            pliegues.pantorrilla_media = body.pantorrilla_media;
            pliegues.abdominal = body.abdominal;
            pliegues.muslo_medio = body.muslo_medio;
            pliegues.midaxilar = body.midaxilar; 
            pliegues.id_avance = newAvance;

        return this.plieguesRepo.save(pliegues), this.circunferenciaRepo.save(circunferencia), this.pesoRepo.save(peso);
    }

    async removeExpediente(id_expediente:string, id_avance:string){
        await this.expedienteRepo.delete(id_expediente);
        await this.avanceRepo.delete(id_expediente);
        return true;
    }
    */

    /*createExpediente( expediente : ExpedienteDto):Promise<ExpedienteResponseDto>{
        const newExpediente = this.expedienteRepo.create(expediente);
        console.log(newExpediente);
        return this.expedienteRepo.save(newExpediente);
    }*/
}
 