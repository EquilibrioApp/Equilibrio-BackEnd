import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AgendaDto, AgendaResponseDto, GoogleDataDto, GoogleDataResponseDto } from './dto/agenda.dto';
import { AgendaEntity } from './agenda.entity';
import flaskApi from 'src/utils/flask';

@Injectable()
export class AgendaService {
    constructor(
        @InjectRepository(AgendaEntity) private readonly  agendaRepo: Repository<AgendaEntity>
    ){}

    async findAll(idEspecialista:string): Promise<AgendaDto[]>{
        console.log(idEspecialista);

        const cita = await this.agendaRepo.find({where: [{idEspecialista: idEspecialista}]});
        return cita
    }

    findOne(id:string){
        return this.agendaRepo.findOne(id);
    }
    
    async createAgenda( agenda:AgendaDto):Promise<AgendaDto>{
        
        const template = {
            "summary": "Cita Equilibrio",
            "location": "",
            "description": "",
            "start": {
              "dateTime": agenda.start,
              "timeZone": "America/Mexico_City"
            },
            "end": {
              "dateTime": agenda.end,
              "timeZone": "America/Mexico_City"
            },
            "attendees": [{ "email": agenda.correoEspecialista}, { "email": agenda.correoPaciente}],
            "reminders": {
              "useDefault": false,
              "overrides": [
                { "method": "email", "minutes": 30 },
                { "method": "popup", "minutes": 1 }
              ]
            }
        }
        

        try {
            const resp = await flaskApi.post<GoogleDataResponseDto>(
                '/calendar/create',
                 template
              );

              if (resp.status === 200) {
                const date = new AgendaEntity();
                date.idPaciente = agenda.idPaciente;
                date.idEspecialista= agenda.idEspecialista;
                date.start = agenda.start;
                date.end = agenda.end;
                date.correoEspecialista = agenda.correoEspecialista;
                date.correoPaciente = agenda.correoPaciente;
                date.id_agenda = resp.data.id;
                date.iCalUID = resp.data.iCalUID;
                const newDate = this.agendaRepo.create(date);
                this.agendaRepo.save(newDate);
                return newDate;
              }
        } catch (error) {
            console.log(error)
            return error;
        }
        return ;
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
