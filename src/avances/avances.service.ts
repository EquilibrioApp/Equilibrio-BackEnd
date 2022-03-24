import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import {  Repository  }  from  'typeorm' ;
import { AvanceEntity } from './avances.entity';
import { AvancesDto } from './dto/avances.dto';

@Injectable()
export class AvancesService {
    constructor(
        @InjectRepository(AvanceEntity)private readonly avanceRepo:Repository<AvanceEntity>,
        @InjectRepository(ExpedienteEntity)private readonly expoRepo:Repository<ExpedienteEntity>,
    ){}
    
    async create(expediente:ExpedienteEntity, exp: Partial<AvancesDto>): Promise<AvancesDto> {
        // const item = this.avanceEntity.create(exp);
        // return this.avanceEntity.save(item);
        const avance = new AvanceEntity();
        avance.expediente = expediente;
        avance.observacion = exp.observacion;
        const item =  await this.avanceRepo.create(avance);
        return this.avanceRepo.save(item);
        
    }

    async find(){
        return this.avanceRepo.find();
    }

    async findOne( id : string){
        const item = await this.avanceRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async update(id: string, exp: Partial<AvanceEntity>): Promise<AvanceEntity> {
        const item = await this.findOne(id);
        return this.avanceRepo.save({...item, ...exp});
    }

    async remove(id: string, expedienteId: string): Promise<AvanceEntity> {
        const item = await this.findOne(id);
        return this.avanceRepo.remove(item);
    }
}
