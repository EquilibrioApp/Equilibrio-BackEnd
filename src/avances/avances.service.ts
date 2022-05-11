import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import { PesoEntity } from 'src/pesos/peso.entity';
import {  Repository  }  from  'typeorm' ;
import { AvanceEntity } from './avances.entity';
import { AvancesDto } from './dto/avances.dto';

@Injectable()
export class AvancesService {
    constructor(
        @InjectRepository(AvanceEntity)private readonly avanceRepo:Repository<AvanceEntity>,
        @InjectRepository(ExpedienteEntity)private readonly expoRepo:Repository<ExpedienteEntity>,
        @InjectRepository(PesoEntity) private readonly pesoRepo:Repository<PesoEntity>
    ){}
    
    async find(){
        return this.avanceRepo.find();
    }

    async findOne( id : string){
        const item = await this.avanceRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async avancePeso (expediente: ExpedienteEntity )/* : Promise<ExpedienteEntity> */{
        console.log(expediente);
        const item = await this.findExpediente(expediente);
        console.log(item);
        return 
    }
    async findExpediente( expediente : ExpedienteEntity){
        const item = await this.avanceRepo.findOne(expediente);
        if(!item) throw new NotFoundException();
        return item;
    }
    
    async create(expediente:ExpedienteEntity, exp: Partial<AvancesDto>): Promise<AvancesDto> {
        // const item = this.avanceEntity.create(exp);
        // return this.avanceEntity.save(item);
        const avance = new AvanceEntity();
        avance.expediente = expediente;
        avance.observacion = exp.observacion;
        console.log(avance.observacion);
        const item =  await this.avanceRepo.create(avance);
        return this.avanceRepo.save(item);
        
    }

    async update(id: string, exp: Partial<AvanceEntity>): Promise<AvanceEntity> {
        const item = await this.findOne(id);
        return this.avanceRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<AvanceEntity> {
        const item = await this.findOne(id);
        return this.avanceRepo.remove(item);
    }
    
    // Mostrar avances de un expediente en especifico.
    async findAvancesExpediente( expediente : ExpedienteEntity){
        const item = await this.avanceRepo.find({where: [{expediente: expediente}]});
        console.log(item);
        return item;
    }
    
    
}
