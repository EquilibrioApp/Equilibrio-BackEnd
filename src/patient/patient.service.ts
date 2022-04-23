import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PatientDto } from './dto/patient.dto';
import { PatientEntity } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>
  ) {}

  //Obtiene todos los pacientes segun el nutriCodigo
  getPatientsByNutriCodigo(nutriCodigo: string): Promise<PatientDto[]>{
    return 
  }
  //Obtiene un unico paciente mediante el id
  getPatients(userId: string): Promise<PatientDto>{
    return this.patientRepository.findOne(userId);
  }
}
