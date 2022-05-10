import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorEntity } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { UserEntity } from '../users/users.entity';
import { DoctorController } from './doctor.controller';
import { PatientEntity } from '../patient/patient.entity';
import { PatientModule } from '../patient/patient.module';
import { ExpedienteEntity } from '../expediente/expediente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, ExpedienteEntity, UserEntity, PatientEntity]), PatientModule],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService]
})
export class DoctorModule {}
