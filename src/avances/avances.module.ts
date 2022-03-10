import { Module } from '@nestjs/common';
import { AvancesService } from './avances.service';
import { AvancesController } from './avances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvanceEntity } from './avances.entity';
import { PesosModule } from 'src/pesos/pesos.module';
import { IndicesModule } from 'src/indices/indices.module';
import { CircunferenciasModule } from 'src/circunferencias/circunferencias.module';
import { PlieguesModule } from 'src/pliegues/pliegues.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([AvanceEntity]),
    PesosModule, IndicesModule, 
    CircunferenciasModule, PlieguesModule,
  ],
  exports: [AvancesService],
  providers: [AvancesService],
  controllers: [AvancesController]
})
export class AvancesModule {}
