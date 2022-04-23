import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';


import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { DoctorEntity } from '../doctor/doctor.entity';
import { PatientEntity } from '../patient/patient.entity';
import { PatientModule } from 'src/patient/patient.module';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';

@Module({
  imports: [HttpModule, forwardRef(() => AuthModule), TypeOrmModule.forFeature([UserEntity, DoctorEntity, PatientEntity]),],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
