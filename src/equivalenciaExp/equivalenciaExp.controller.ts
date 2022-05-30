import { Controller, Get, Delete, Post, Put, Param, Body } from '@nestjs/common';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import { UserEntity } from 'src/users/users.entity';
import { EquivalenciaDto } from './dto/equivalencias.dto';
import { EquivalenciaExpEntity } from './equivalenciaExp.entity';
import { EquivalenciaExpService } from './equivalenciaExp.service';

@Controller('expediente/equivalencia')
export class EquivalenciaExpController {
    constructor(
        private equivalenciaExpService:EquivalenciaExpService,
    ){}

    @Get()
    findAll(){
        return this.equivalenciaExpService.find();
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.equivalenciaExpService.findOne(id);
    }

    @Get('/expediente/:expediente') 
    findDoctor(@Param('expediente') expediente: string){
        return this.equivalenciaExpService.findDoctor(expediente);
    }

    // @Post()
    // creteMera(@Param('doctor') doctor: UserEntity, @Body() body: Partial<EquivalenciaDto>): Promise<EquivalenciaDto> {
    //     console.log(body);
    //     return this.equivalenciaService.create(doctor, body);
    // }

    @Post()
    creteMera(@Body() body: any): Promise<EquivalenciaExpEntity> {
        return this.equivalenciaExpService.create(body);
    }

    @Put(':id') 
    creteAvance(@Param('id') id: string, @Body() body:any) {
        return this.equivalenciaExpService.update(id, body);
    }

    @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.equivalenciaExpService.remove(id);
    }

}
