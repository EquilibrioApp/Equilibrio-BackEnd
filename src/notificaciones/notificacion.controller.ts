import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { AgendaDto, AgendaResponseDto, CitasDto } from './dto/notificacion.dto';

@Controller('notificacion')
export class NotificacionController {
    constructor(private agendaService:NotificacionService){}

    @Get(':idPaciente')
    findAll(@Param('idPaciente') idPaciente: string):Promise<AgendaDto[]> {
        return this.agendaService.findAll(idPaciente);
    }

    @Get('/cita/:id')
    findOne(@Param('id') id: string) /* :Promise<CitasDto> */{
        return this.agendaService.findOne(id);
    }

    @Post('/create')
    creteMera(@Body() agenda: AgendaDto): Promise<AgendaDto>{
        return this.agendaService.createAgenda(agenda);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.agendaService.updateAgenda(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        console.log('Id de la cita que se va a elminiar(agenda.controller): ' + id);
        return this.agendaService.removeAgenda(id);
    }
}
