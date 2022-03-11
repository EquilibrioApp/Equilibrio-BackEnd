import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DoctorEntity } from './doctor.entity';
import { PatientsResponseDto } from './dto/doctor.dto';
import { PatientService } from '../patient/patient.service';
import { PotentialUserResponseDto } from './dto/potential-users.dto';

@Injectable()
export class DoctorService {
    constructor(
    //Repositorios
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ){}

  async findPatients(id: string): Promise<PatientsResponseDto> {
    return
  }

  async find(){
    return this.doctorRepository.find();
  }

  async findOne( id : string){
      const item = await this.doctorRepository.findOne(id);
      if(!item) throw new NotFoundException();
      return item;
  }

  async potentialUsers(postalCodeUser: string): Promise<PotentialUserResponseDto> {
    const item = this.findOne(postalCodeUser)
    return
  }
}
