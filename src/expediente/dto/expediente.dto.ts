import { UserEntity } from "src/users/users.entity";

//Estructura que va a llegar al endpoint del registro del expediente
export class ExpedienteDto {
  //Expediente 
  id?: string;
  doctorId : UserEntity;
  sexo: string;
  createdAt: Date;
  updatedAt: Date;
  alturaPaciente: number;
  //avances: AvancesPostEntity[]
  //Meta
  //Avances
}

//Respuesta al crear expediente
export class ExpedienteResponseDto{
    id: string;
    doctor:UserEntity;
    sexo: string;
    birthDate: Date;
    nombre: string;
    createdAt: Date;
    alturaPaciente: number;
}

/*create table expediente (
  id_expediente serial primary key, 
  id_especialista bigint,  
  id_paciente bigint, 
  id_meta bigint, 
  altura_paciente float);
*/