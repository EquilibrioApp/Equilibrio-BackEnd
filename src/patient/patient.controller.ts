import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { PatientService } from './patient.service';

@Controller('patient') //'/login'
export class PatientController {
  constructor(private patientService: PatientService) {}

  // @Post('/create')
  // cretePatient(@Body() patient: PatientDto): Promise<PatientDto> {
  //   return this.patientService.createPatient(patient);
  // }

  @Get('/:nutriCodigo')
  getPatientsByDoctorsId(@Param('nutriCodigo') nutriCodigo: string): Promise<PatientDto[]>{
    return this.patientService.getPatientsByNutriCodigo(nutriCodigo);
  }
}
