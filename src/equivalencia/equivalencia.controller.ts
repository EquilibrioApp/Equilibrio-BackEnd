import { Controller, Get, Delete, Post, Put, Param, Body } from '@nestjs/common';
import { UserEntity } from 'src/users/users.entity';
import { EquivalenciaDto } from './dto/equivalencias.dto';
import { EquivalenciaEntity } from './equivalencia.entity';
import { EquivalenciaService } from './equivalencia.service';

@Controller('/equivalencia')
export class EquivalenciaController {
    constructor(
        private equivalenciaService:EquivalenciaService,
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
    creteMera(@Body() body: any): Promise<EquivalenciaEntity> {
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
