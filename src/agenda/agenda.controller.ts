import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaDto, AgendaResponseDto, CitasDto } from './dto/agenda.dto';

@Controller('agenda')
export class AgendaController {
    constructor(private agendaService:AgendaService){}

    @Get(':idEspecialista')
    findAll(@Param('idEspecialista') idEspecialista: string):Promise<AgendaDto[]> {
        return this.agendaService.findAll(idEspecialista);
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
        return this.agendaService.removeAgenda(id);
    }
}
