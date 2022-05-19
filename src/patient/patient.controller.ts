import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { PatientEntity } from './patient.entity';
import { PatientService } from './patient.service';

@Controller('patient') //'/login'
export class PatientController {
  constructor(private patientService: PatientService) {}

  // @Post('/create')
  // cretePatient(@Body() patient: PatientEntity): Promise<PatientEntity> {
  //   return this.patientService.create(patient);
  // }

  @Get('/:idUsuario')
  getPatientsByUserId(@Param('idUsuario') idUsuario: string): Promise<PatientEntity>{
    return this.patientService.getPatientsByUserId(idUsuario);
  }

  @Get('/:nutriCodigo')
  getPatientsByDoctorsId(@Param('nutriCodigo') nutriCodigo: string): Promise<PatientDto[]>{
    return this.patientService.getPatientsByNutriCodigo(nutriCodigo);
  }
}
