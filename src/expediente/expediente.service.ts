import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvancesService } from 'src/avances/avances.service';
import { Repository } from 'typeorm';
import { ExpedienteDto, ExpedienteResponseDto } from './dto/expediente.dto';
import { ExpedienteEntity } from './expediente.entity';


@Injectable()
export class ExpedienteService {
    constructor(
        @InjectRepository(ExpedienteEntity)private readonly expedienteRepo:Repository<ExpedienteEntity>,
        private avancesService : AvancesService,
    ){}
    
    async create(exp: Partial<ExpedienteEntity>): Promise<ExpedienteEntity> {
        const item = this.expedienteRepo.create(exp);
        return this.expedienteRepo.save(item);
    }

    async find(){
        return this.expedienteRepo.find();
    }

    async findOne( id : string){
        const item = await this.expedienteRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async update(id: string, exp: Partial<ExpedienteEntity>): Promise<ExpedienteEntity> {
        const item = await this.findOne(id);
        return this.expedienteRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<ExpedienteEntity> {
        const item = await this.findOne(id);
        return this.expedienteRepo.remove(item);
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
 