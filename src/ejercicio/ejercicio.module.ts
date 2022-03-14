import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjercicioEntity } from './ejercicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EjercicioEntity])],
  providers: [EjercicioService],
  controllers: [EjercicioController]
})
export class EjercicioModule {}
