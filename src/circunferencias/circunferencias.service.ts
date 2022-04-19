import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CircunferenciaEntity } from './circunferencia.entity';

@Injectable()
export class CircunferenciasService {
    constructor(
        @InjectRepository(CircunferenciaEntity)private readonly expedienteRepo:Repository<CircunferenciaEntity>,
    ){}
    
     async create(exp: Partial<CircunferenciaEntity>): Promise<CircunferenciaEntity> {
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

    async update(id: string, exp: Partial<CircunferenciaEntity>): Promise<CircunferenciaEntity> {
        const item = await this.findOne(id);
        return this.expedienteRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<CircunferenciaEntity> {
        const item = await this.findOne(id);
        return this.expedienteRepo.remove(item);
    }
   
}
