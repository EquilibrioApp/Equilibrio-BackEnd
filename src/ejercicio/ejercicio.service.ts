import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EjercicioEntity } from './ejercicio.entity';

@Injectable()
export class EjercicioService {
    constructor(
        @InjectRepository(EjercicioEntity)private readonly ejercicioRepo:Repository<EjercicioEntity>,
    ){}
    
    async create(exp: Partial<EjercicioEntity>): Promise<EjercicioEntity> {
        const item = this.ejercicioRepo.create(exp);
        return this.ejercicioRepo.save(item);
    }

    async find(){
        return this.ejercicioRepo.find();
    }

    async findOne( id : string){
        const item = await this.ejercicioRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async update(id: string, exp: Partial<EjercicioEntity>): Promise<EjercicioEntity> {
        const item = await this.findOne(id);
        return this.ejercicioRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<EjercicioEntity> {
        const item = await this.findOne(id);
        return this.ejercicioRepo.remove(item);
    }
}
