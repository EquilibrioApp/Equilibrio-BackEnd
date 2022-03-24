import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import { AvanceEntity } from './avances.entity';
import { AvancesService } from './avances.service';
import { AvancesDto } from './dto/avances.dto';

@Controller(':expediente')
export class AvancesController {
    constructor(
        private avancesService:AvancesService,
    ){}

    @Get()
    findAll(){
        return this.avancesService.find();
    }

    @Get(':id') //TODO mostrar datos de otras tablas
    findOne(@Param('id') id: string){
        return this.avancesService.findOne(id);
    }

    @Post()
    creteMera(@Param('expediente') expediente : ExpedienteEntity, @Body() body: AvancesDto): Promise<AvancesDto> {
        return this.avancesService.create(expediente, body);
    }

    @Put(':id') 
    creteAvance(@Param('id') id: string, @Body() body:any) {
        return this.avancesService.update(id, body);
    }

    @Delete(':id') 
    delete(@Param('id') id: string, expedienteId:string) {
        return this.avancesService.remove(id, expedienteId);
    }
} 