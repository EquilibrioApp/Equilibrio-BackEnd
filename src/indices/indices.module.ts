import { Module } from '@nestjs/common';
import { IndicesService } from './indices.service';
import { IndicesController } from './indices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndiceEntity } from './indice.entity';
import { PesoEntity } from 'src/pesos/peso.entity';
import { CircunferenciaEntity } from 'src/circunferencias/circunferencia.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([IndiceEntity,PesoEntity, CircunferenciaEntity]),
  ],
  exports: [IndicesService],
  providers: [IndicesService],
  controllers: [IndicesController]
})
export class IndicesModule {}
