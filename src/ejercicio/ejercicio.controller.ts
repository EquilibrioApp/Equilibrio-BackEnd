import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EjercicioEntity } from './ejercicio.entity';
import { EjercicioService } from './ejercicio.service';

@Controller('ejercicio')
export class EjercicioController {
    constructor(
        private ejercicioService:EjercicioService,
    ){}

    @Get()
    findAll(){
        return this.ejercicioService.find();
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.ejercicioService.findOne(id);
    }

    @Post()
    create(@Body() body: any): Promise<EjercicioEntity> {
        return this.ejercicioService.create(body);
    }

    @Put(':id') 
    update(@Param('id') id: string, @Body() body:any) {
        return this.ejercicioService.update(id, body);
    }

    @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.ejercicioService.remove(id);
    }
}
