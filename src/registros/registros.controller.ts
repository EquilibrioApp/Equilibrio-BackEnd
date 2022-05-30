import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import { RegistroEntity } from './registro.entity';
import { RegistrosService } from './registros.service';

@Controller('registro')
export class RegistrosController {
    constructor(
        private registrosService:RegistrosService,
    ){}

    @Get()
    findAll(){
        return this.registrosService.find();
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.registrosService.findOne(id);
    }

    @Get('/expediente/:expediente') 
    findDoctor(@Param('expediente') expediente: string){
        return this.registrosService.findDoctor(expediente);
    }

    @Post()
    create(@Body() body: any): Promise<RegistroEntity> {
        return this.registrosService.create(body);
    }

    @Put(':id') 
    update(@Param('id') id: string, @Body() body:any) {
        return this.registrosService.update(id, body);
    }

    @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.registrosService.remove(id);
    }
}
