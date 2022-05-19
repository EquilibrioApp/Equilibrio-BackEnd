import { Post , Body, Get, Param, Delete, Put} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { MetasService } from 'src/metas/metas.service';
import { UserEntity } from 'src/users/users.entity';
import { ExpedienteDto, ExpedientesResponseDto, mealRequest } from './dto/expediente.dto';
import { ExpedienteEntity } from './expediente.entity';
import { ExpedienteService } from './expediente.service';

@Controller('/expediente') ///+:expedientId/avance
export class ExpedienteController {
    constructor(
        private expedienteService:ExpedienteService,
        private metasService:MetasService,
    ){}

    @Get()
    findAll(){
        return this.expedienteService.find();
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.expedienteService.pesos(id);
    }

    @Get('/pacientes/:idEspecialista') 
    findDoctorsExpedients(@Param('idEspecialista') idEspecialista: string){
        return this.expedienteService.doctorsExpedients(idEspecialista);
    }

    @Get() 
    findDoctor(){
        return this.expedienteService.find();
    }

    @Post()
    creteMera(@Body() body: any): Promise<ExpedienteEntity> {
        return this.expedienteService.create(body);
    }
    
    // @Post()
    // creteMera(): Promise<ExpedienteDto> { //TODO conexion con la relacion automatica ?
    //     return this.expedienteService.create(body);
    // }

    @Put(':id') 
    update(@Param('id') id: string,@Body() body: any) {
        return this.expedienteService.update(id, body);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.expedienteService.remove(id);
    }

    // @Get('/meals/recipes/:buscarRecetas') 
    // getMeals(@Param('buscarRecetas') buscarRecetas: mealRequest) {
    //     console.log('Body: ' + buscarRecetas);
    //     return this.expedienteService.getMeals(buscarRecetas);
    // }

    @Get('/meals/recipes/:buscarRecetas') 
    getMeals(@Param('buscarRecetas') buscarRecetas:string) {//@Body() buscarRecetas: mealRequest
        console.log('Body: ' + buscarRecetas);
        return this.expedienteService.getMeals(buscarRecetas);
    }
}
