import { Module } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrosController } from './registros.controller';
import { RegistroEntity } from './registro.entity';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([RegistroEntity, ExpedienteEntity]),
  ],
  providers: [RegistrosService],
  controllers: [RegistrosController]
})
export class RegistroModule {}
