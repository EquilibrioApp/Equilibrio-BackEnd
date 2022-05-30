import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import { Repository } from 'typeorm';
import { RegistroEntity } from './registro.entity';

@Injectable()
export class RegistrosService {
    constructor(
        @InjectRepository(RegistroEntity)private readonly registroRepo:Repository<RegistroEntity>,
        @InjectRepository(ExpedienteEntity)private readonly expoRepo:Repository<ExpedienteEntity>,
    ){}


    async create(exp: Partial<RegistroEntity>): Promise<RegistroEntity> {
        const item = await this.expoRepo.findOne(exp.id);
        if(item === undefined){
        throw new NotFoundException;
        }else {
         const registro = new RegistroEntity();
         registro.expediente = item;
        const expo =  await this.registroRepo.create(exp);
        this.registroRepo.save(expo);
        } 
        return 
        // const item = this.registroRepo.create(exp);
        // return this.registroRepo.save(item);
    }

    async find(){
        return this.registroRepo.find();
    }

    async findOne( id : string){
        const item = await this.registroRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async findDoctor( expediente : string){
        const item = await this.registroRepo.find({where:{expediente}});
        if(!item) throw new NotFoundException();
        return item;
    }

    async update(id: string, exp: Partial<RegistroEntity>): Promise<RegistroEntity> {
        const item = await this.findOne(id);
        return this.registroRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<RegistroEntity> {
        const item = await this.findOne(id);
        return this.registroRepo.remove(item);
    }
}
