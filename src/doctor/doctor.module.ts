import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorEntity } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity]), PatientModule],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService]
})
export class DoctorModule {}
