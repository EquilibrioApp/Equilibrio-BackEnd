import { Post , Body, Get, Param, Delete, Put} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { MetasService } from 'src/metas/metas.service';
import { UserEntity } from 'src/users/users.entity';
import { ExpedienteDto } from './dto/expediente.dto';
import { ExpedienteEntity } from './expediente.entity';
import { ExpedienteService } from './expediente.service';

@Controller(':doctor') ///+:expedientId/avance
export class ExpedienteController {
    constructor(
        private expedienteService:ExpedienteService,
        private metasService:MetasService,
    ){}

    // @Get()
    // findAll(){
    //     return this.expedienteService.find();
    // }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.expedienteService.findOne(id);
    }

    @Get() 
    findDoctor(@Param('doctor') doctor: UserEntity){
        return this.expedienteService.findDoctor(doctor);
    }

    @Post()
    creteMera(@Param('doctor') doctor : UserEntity ,@Body() body: Partial<ExpedienteDto>): Promise<ExpedienteDto> { //TODO conexion con la relacion automatica ?
        return this.expedienteService.create(doctor, body);
    }
    
    @Put(':id') 
    update(@Param('id') id: string,@Body() body: any) {
        return this.expedienteService.update(id, body);
    }

    @Delete(':id') //TODO borrar expediente 
    delete(@Param('id_expediente') id: string) {
        return this.expedienteService.remove(id);
    }
}
