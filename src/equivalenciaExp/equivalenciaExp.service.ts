import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/dto/auth.dto';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { EquivalenciaDto } from './dto/equivalencias.dto';
import { EquivalenciaExpEntity } from './equivalenciaExp.entity';

@Injectable()
export class EquivalenciaExpService {

    constructor(
        @InjectRepository(EquivalenciaExpEntity)private readonly equivalenciaRepo:Repository<EquivalenciaExpEntity>,
        @InjectRepository(UserEntity)private readonly userRepo:Repository<UserEntity>,
    ){}

    
    async create(exp: Partial<EquivalenciaExpEntity>): Promise<EquivalenciaExpEntity> {
        const item = this.equivalenciaRepo.create(exp);
        return this.equivalenciaRepo.save(item);
    }


    async findDoctor( expediente : string){
        const item = await this.equivalenciaRepo.find({where:{expediente}});
        if(!item) throw new NotFoundException();
        return item;
    }

    // async create(doctor: UserEntity, exp: Partial<EquivalenciaDto>): Promise<EquivalenciaDto> {
    //     const alimento = new EquivalenciaEntity();
    //     alimento.nombre = exp.nombre;
    //     alimento.grupoAlimencio = exp.grupoAlimencio;
    //     alimento.subgrupo = exp.subgrupo;
    //     alimento.racion = exp.racion ; 	
    //     alimento.doctor = doctor;
    //     console.log(alimento);
    //     const item = this.equivalenciaRepo.create(alimento);
    //     return this.equivalenciaRepo.save(item);
    // }

    async find(){
        return this.equivalenciaRepo.find();
    }

    async findOne( id : string){
        const item = await this.equivalenciaRepo.findOne(id);
        if(!item) throw new NotFoundException();
        return item;
    }

    async update(id: string, exp: Partial<EquivalenciaExpEntity>): Promise<EquivalenciaExpEntity> {
        const item = await this.findOne(id);
        return this.equivalenciaRepo.save({...item, ...exp});
    }

    async remove(id: string): Promise<EquivalenciaExpEntity> {
        const item = await this.findOne(id);
        return this.equivalenciaRepo.remove(item);
    }
}
