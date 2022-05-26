import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AgendaDto, AgendaResponseDto, CitasDto, GoogleDataDto, GoogleDataResponseDto } from './dto/agenda.dto';
import { AgendaEntity } from './agenda.entity';
import flaskApi from 'src/utils/flask';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class AgendaService {
    constructor(
        @InjectRepository(AgendaEntity) 
        private readonly  agendaRepo: Repository<AgendaEntity>,
        @InjectRepository(UserEntity) 
        private readonly  userRepo: Repository<AgendaEntity>
    ){}

    async findAll(idEspecialista:string): Promise<AgendaDto[]>{
        console.log(idEspecialista);
        
        const cita = await this.agendaRepo.find({where: [{idEspecialista: idEspecialista}]});
        console.log(cita);
        
        return cita;
        
    }

    async findOne(id:string)/* : Promise<CitasDto> */{
      const cita = await this.agendaRepo.findOne(id);
      const datosPaciente = await this.userRepo.findOne(cita.idPaciente);


      return [{...cita,  ...datosPaciente}];
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
      console.log('Id de la cita que se va a elminiar(agenda.service): ' + id);
      try {
        const resp = await flaskApi.delete(
          `/calendar/delete/${id}`
        );
        if(resp.status === 200){
          await this.agendaRepo.delete(id);
          return resp.status;
        }
        else{
          return resp.status
        }
      } catch (error) {
        return false;
      }
    }


}
