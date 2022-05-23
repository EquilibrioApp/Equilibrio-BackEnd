import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MetaEntity } from './meta.entity';
import { MetasService } from './metas.service';

@Controller('meta/:expediente')
export class MetasController {
    constructor(
        private metaService:MetasService,
    ){}

    @Get()
    findAll(){
        return this.metaService.find();
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.metaService.findOne(id);
    }

    @Get(':id') 
    findOneExpediente(@Param('expediente') expediente: string){
        return this.metaService.findOneExpediente(expediente);
    }

    @Post()
    create(@Body() body: any): Promise<MetaEntity> {
        return this.metaService.create(body);
    }

    @Put(':id') 
    update(@Param('id') id: string, @Body() body:any) {
        return this.metaService.update(id, body);
    }

    @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.metaService.remove(id);
    }
}
