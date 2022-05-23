import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import  {  Repository  }  from  'typeorm' ;
import { MetaEntity } from './meta.entity';

@Injectable()
export class MetasService {
    constructor(
        @InjectRepository(MetaEntity)private readonly metaRepo:Repository<MetaEntity>,
    ){}
    
    async create(exp: Partial<MetaEntity>): Promise<MetaEntity> {
        const item = this.metaRepo.create(exp);
        return this.metaRepo.save(item);
    }

    async find(){
        return this.metaRepo.find();
    }

    async findOne( id : string){
        const item = await this.metaRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async findOneExpediente( expedienteId : string){
        const item = await this.metaRepo.findOne(expedienteId);
        if(!item) throw new NotFoundException();
        return item;
    }

    async update(id: string, exp: Partial<MetaEntity>): Promise<MetaEntity> {
        const item = await this.findOne(id);
        return this.metaRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<MetaEntity> {
        const item = await this.findOne(id);
        return this.metaRepo.remove(item);
    }
}
