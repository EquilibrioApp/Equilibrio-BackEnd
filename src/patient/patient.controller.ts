import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { PatientEntity } from './patient.entity';
import { PatientService } from './patient.service';

@Controller('patient') //'/login'
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post('/create')
  cretePatient(@Body() patient: PatientEntity): Promise<PatientEntity> {
    return this.patientService.create(patient);
  }

  // @Get('/:nutri_codigo')
  // getPatientsByDoctorsId(@Param('nutri_codigo') nutri_codigo: string): Promise<PatientDto[]>{
  //   return this.patientService.getPatientByDoctorsId(nutri_codigo);
  // }
}
