import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvanceEntity } from 'src/avances/avances.entity';
import { AvancesModule } from 'src/avances/avances.module';
import { AvancesService } from 'src/avances/avances.service';
import { CircunferenciaEntity } from 'src/circunferencias/circunferencia.entity';
import { CircunferenciasModule } from 'src/circunferencias/circunferencias.module';
import { CircunferenciasService } from 'src/circunferencias/circunferencias.service';
import { IndiceEntity } from 'src/indices/indice.entity';
import { IndicesModule } from 'src/indices/indices.module';
import { IndicesService } from 'src/indices/indices.service';
import { MetaEntity } from 'src/metas/meta.entity';
import { MetasModule } from 'src/metas/metas.module';
import { MetasService } from 'src/metas/metas.service';
import { PesoEntity } from 'src/pesos/peso.entity';
import { PesosModule } from 'src/pesos/pesos.module';
import { PesosService } from 'src/pesos/pesos.service';
import { PlieguesEntity } from 'src/pliegues/pliegues.entity';
import { PlieguesModule } from 'src/pliegues/pliegues.module';
import { PlieguesService } from 'src/pliegues/pliegues.service';
import { ExpedienteController } from './expediente.controller';
import { ExpedienteEntity } from './expediente.entity';
import { ExpedienteService } from './expediente.service';

@Module({
  imports:[ TypeOrmModule.forFeature([ExpedienteEntity]),
            AvancesModule, CircunferenciasModule, IndicesModule,
            MetasModule, PesosModule, PlieguesModule ],
  providers: [ExpedienteService],
  controllers: [ExpedienteController]
})
export class ExpedienteModule {}
