import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DoctorEntity } from './doctor.entity';
import { DoctorPCResponseDto, PatientsResponseDto } from './dto/doctor.dto';
import { PatientService } from '../patient/patient.service';
import { PotentialUserResponseDto } from './dto/potential-users.dto';
import { ExpedienteEntity } from '../expediente/expediente.entity';
import { UserEntity } from '../users/users.entity';
import { PatientEntity } from '../patient/patient.entity';

@Injectable()
export class DoctorService {
    constructor(
    //Repositorios
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(ExpedienteEntity)
    private readonly expedienteRepo:Repository<ExpedienteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo:Repository<UserEntity>,
    @InjectRepository(PatientEntity)
    private readonly patientRepo:Repository<PatientEntity>
  ){}

  async findPatients(idEspecialista: string)/* : Promise<PatientsResponseDto> */ {

    
    const expedients = await this.expedienteRepo.find({where: [{doctor: idEspecialista}]});
    console.log(expedients);
    

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

  async findAlldoctorsByPc(postalCode: string): Promise<DoctorPCResponseDto[]> {
    
    //Hacemos el string del CP un número y le sumamos y restamos uno para ampliar el rango de búsqueda
    const upperPC = (Number(postalCode) + 1).toString();
    const lowerPC = (Number(postalCode) - 1).toString();
    
    try {
      let response = await this.doctorRepository.find({
      where: [
        {postalCode: postalCode},
        {postalCode: upperPC},
        {postalCode: lowerPC},
      ],
      order: {postalCode: "ASC"}
      });

      console.log(response.length);

      if (response.length == 0) throw new NotFoundException;

      else return response;

    } catch (error) {
      throw new NotFoundException;
    }
  }
}
