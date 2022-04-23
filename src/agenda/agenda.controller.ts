import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaDto, AgendaResponseDto } from './dto/agenda.dto';

@Controller('agenda')
export class AgendaController {
    constructor(private agendaService:AgendaService){}

    @Get(':idEspecialista')
    findAll(@Param('idEspecialista') idEspecialista: string):Promise<AgendaDto[]> {
        return this.agendaService.findAll(idEspecialista);
    }

    @Get(':id_agenda')
    findOne(@Param('id_agenda') id_agenda: string) {
        return this.agendaService.findOne(id_agenda);
    }

    @Post('/create')
    creteMera(@Body() agenda: AgendaDto): Promise<AgendaResponseDto>{
        return this.agendaService.createAgenda(agenda);
    }

    @Put(':id_agenda')
    update(@Param('id_agenda') id_agenda: string, @Body() body: any) {
        return this.agendaService.updateAgenda(id_agenda, body);
    }

    @Delete(':id_agenda')
    delete(@Param('id_agenda') id_agenda: string) {
        return this.agendaService.removeAgenda(id_agenda);
    }
}
