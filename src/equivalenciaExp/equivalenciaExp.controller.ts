import { Controller, Get, Delete, Post, Put, Param, Body } from '@nestjs/common';
import { UserEntity } from 'src/users/users.entity';
import { EquivalenciaDto } from './dto/equivalencias.dto';
import { EquivalenciaExpEntity } from './equivalenciaExp.entity';
import { EquivalenciaExpService } from './equivalenciaExp.service';

@Controller('/expediente/equivalencia')
export class EquivalenciaExpController {
    constructor(
        private equivalenciaService:EquivalenciaExpService,
    ){}

    @Get()
    findAll(){
        return this.equivalenciaService.find();
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.equivalenciaService.findOne(id);
    }

    // @Post()
    // creteMera(@Param('doctor') doctor: UserEntity, @Body() body: Partial<EquivalenciaDto>): Promise<EquivalenciaDto> {
    //     console.log(body);
    //     return this.equivalenciaService.create(doctor, body);
    // }

    @Post()
    creteMera(@Body() body: any): Promise<EquivalenciaExpEntity> {
        return this.equivalenciaService.create(body);
    }

    @Put(':id') 
    creteAvance(@Param('id') id: string, @Body() body:any) {
        return this.equivalenciaService.update(id, body);
    }

    @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.equivalenciaService.remove(id);
    }

}
