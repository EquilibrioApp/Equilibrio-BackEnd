import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PatientDto } from './dto/patient.dto';
import { PatientEntity } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)private readonly patientRepo:Repository<PatientEntity>  
  ) {}
    

  getPatientsByUserId(idUsuario: string): Promise<PatientEntity>{
    return this.patientRepo.findOne(idUsuario);
  }

  //Obtiene todos los pacientes segun el nutriCodigo
  getPatientsByNutriCodigo(nutriCodigo: string): Promise<PatientDto[]>{
    return 
  }
  //Obtiene un unico paciente mediante el id
  // getPatients(userId: string): Promise<PatientDto>{
  //   return this.patientRepo.findOne(userId);
  // }

  //Obtiene todos los pacientes segun el nutriCodigo
  // getPatientsByNutriCodigo(nutriCodigo: string): Promise<PatientDto[]>{
  //   return this.patientRepository.find({nutriCodigo});
  // }
  // //Obtiene un unico paciente mediante el id
  // getPatients(userId: string): Promise<PatientDto>{
  //   return this.patientRepository.findOne(userId);
  // }
}
