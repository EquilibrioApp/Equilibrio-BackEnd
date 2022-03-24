import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AgendaDto, AgendaResponseDto } from './dto/agenda.dto';
import { AgendaEntity } from './agenda.entity';

@Injectable()
export class AgendaService {
    constructor(
        @InjectRepository(AgendaEntity) private readonly  agendaRepo: Repository<AgendaEntity>
    ){}

    findAll(){
        return this.agendaRepo.find();
    }

    findOne(id:string){
        return this.agendaRepo.findOne(id);
    }
    
    createAgenda( agenda:AgendaDto):Promise<AgendaResponseDto>{
        const newAgenda = this.agendaRepo.create(agenda);
        console.log(newAgenda);
        return this.agendaRepo.save(newAgenda);
    }

    async updateAgenda( id:string, body: any){
        const agenda  = await this.agendaRepo.findOne(id);
        this.agendaRepo.merge(agenda, body);
        return this.agendaRepo.save(agenda);
    }

    async removeAgenda(id:string){
        await this.agendaRepo.delete(id);
        return true;
    }
}
