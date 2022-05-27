import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AgendaDto, AgendaResponseDto, CitasDto, GoogleDataDto, GoogleDataResponseDto } from './dto/notificacion.dto';
import { NotificacionEntity } from './notificacion.entity';
import flaskApi from 'src/utils/flask';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class NotificacionService {
    constructor(
        @InjectRepository(NotificacionEntity) 
        private readonly  notificacionRepo: Repository<NotificacionEntity>,
        @InjectRepository(UserEntity) 
        private readonly  userRepo: Repository<NotificacionEntity>
    ){}

    async findAll(idPaciente:string): Promise<AgendaDto[]>{
        console.log(idPaciente);
        
        const cita = await this.notificacionRepo.find({where: [{idPaciente: idPaciente}]});
        console.log(cita);
        
        return cita;
        
    }

    async findOne(id:string)/* : Promise<CitasDto> */{
      const cita = await this.notificacionRepo.findOne(id);
      const datosPaciente = await this.userRepo.findOne(cita.idPaciente);


      return [{...cita,  ...datosPaciente}];
    }
    
    async createAgenda( agenda:AgendaDto):Promise<AgendaDto>{
        
        const template = {
            "summary": "Tomar Agua" ,
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
            "recurrence": [
              "RRULE:FREQ=WEEKLY;UNTIL=20110701T170000Z",
            ],
            "attendees": [ { "email": agenda.correoPaciente}],
            "reminders": {
              "useDefault": false,
              "overrides": [
                // { "method": "email", "minutes": 30 },
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
                const date = new NotificacionEntity();
                date.idPaciente = agenda.idPaciente;
                // date.idEspecialista= agenda.idEspecialista;
                date.start = agenda.start;
                date.end = agenda.end;
                // date.correoEspecialista = agenda.correoEspecialista;
                date.correoPaciente = agenda.correoPaciente;
                date.id_agenda = resp.data.id;
                date.iCalUID = resp.data.iCalUID;
                const newDate = this.notificacionRepo.create(date);
                this.notificacionRepo.save(newDate);
                return newDate;
              }
        } catch (error) {
            console.log(error)
            return error;
        }
        return ;
    }

    async updateAgenda( id:string, body: any){
        const agenda  = await this.notificacionRepo.findOne(id);
        this.notificacionRepo.merge(agenda, body);
        return this.notificacionRepo.save(agenda);
    }

    async removeAgenda(id:string){
      console.log('Id de la cita que se va a elminiar(agenda.service): ' + id);
      try {
        const resp = await flaskApi.delete(
          `/calendar/delete/${id}`
        );
        if(resp.status === 200){
          await this.notificacionRepo.delete(id);
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
