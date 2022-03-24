import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CircunferenciaEntity } from './circunferencia.entity';
import { CircunferenciasService } from './circunferencias.service';

@Controller('circunferencias')
export class CircunferenciasController {
    constructor(
        private circunferenciaService:CircunferenciasService,
    ){}

    @Get()
    findAll(){
        return this.circunferenciaService.find();
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.circunferenciaService.findOne(id);
    }

    @Post()
    creteMera(@Body() body: any): Promise<CircunferenciaEntity> {
        return this.circunferenciaService.create(body);
    }

    @Put(':id') 
    creteAvance(@Param('id') id: string, @Body() body:any) {
        return this.circunferenciaService.update(id, body);
    }

    @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.circunferenciaService.remove(id);
    }
}
