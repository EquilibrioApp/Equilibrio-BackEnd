import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvancesModule } from 'src/avances/avances.module';
import { CircunferenciasModule } from 'src/circunferencias/circunferencias.module';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { EjercicioModule } from 'src/ejercicio/ejercicio.module';
import { IndicesModule } from 'src/indices/indices.module';
import { MetasModule } from 'src/metas/metas.module';
import { PesosModule } from 'src/pesos/pesos.module';
import { PlieguesModule } from 'src/pliegues/pliegues.module';
import { UserEntity } from 'src/users/users.entity';
import { ExpedienteController } from './expediente.controller';
import { ExpedienteEntity } from './expediente.entity';
import { ExpedienteService } from './expediente.service';

@Module({
  imports:[ TypeOrmModule.forFeature([ExpedienteEntity, UserEntity]),
            AvancesModule, CircunferenciasModule, IndicesModule,
            MetasModule, PesosModule, PlieguesModule, EjercicioModule ],
  providers: [ExpedienteService],
  controllers: [ExpedienteController]
})
export class ExpedienteModule {}
