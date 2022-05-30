import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import flaskApi from '../utils/flask';
import { UserEntity } from './users.entity';
import { encodePassword } from '../utils/bcrypt';
import { AuthService } from '../auth/auth.service';
import { DoctorEntity } from '../doctor/doctor.entity';
import { PatientEntity } from '../patient/patient.entity';
import { UsersDto, UserResponseDto, CheckCedula } from './dto/users.dto';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) //Repositorio original del servicio
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DoctorEntity) //Inyectas el repositorio que necesites y al cual le vas a pasar el id
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity) //Inyectas el repositorio que necesites y al cual le vas a pasar el id
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(PatientEntity) //Inyectas el repositorio que necesites y al cual le vas a pasar el id
    private readonly expedienteRepository: Repository<ExpedienteEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private httpService: HttpService,
  ) {}

  //Creación del usuario
  async create(user: UsersDto): Promise<UserResponseDto> {
    const emailExists = await this.findByEmail(user.email);

    console.log('NutriCodigo introducido por el paciente: ' + user.nutriCodigoId)

    // const nutriCodigoExists = await this.findByNutriCodigo(user.nutriCodigoId);
    // console.log('Respuesta del nutriCodigo en la Base de Datos: ' + nutriCodigoExists);

    // console.log(emailExists);

    if (emailExists === undefined) {
      console.log('Email no esta en uso...');
      if (user.userType === '1') {
        console.log('Tipo de usuario es 1');
        const cedulaExists = await this.findByCedula(user.cedula);
        console.log('Resultado del chequeo de la cedula: ' + cedulaExists);
        if (cedulaExists === undefined) {
          console.log('La cedula no esta en uso...');
          try {
            const check = {
              nombre: user.name,
              aPaterno: user.fathersLastName,
              aMaterno: user.mothersLastName,
              cedula: user.cedula,
            };
            console.log(check);
            const resp = await flaskApi.post<CheckCedula>(
              '/api/registro/especialista',
              check,
            );
            console.log(resp.data.name);
            if (resp.status !== 200) {
              throw new NotFoundException('No se encuentra la cedula');
            } else {
              const password = encodePassword(user.password);
              const newUserA = new UserEntity();
              newUserA.name = user.name;
              newUserA.userType = user.userType;
              newUserA.fathersLastName = user.fathersLastName;
              newUserA.mothersLastName = user.mothersLastName;
              newUserA.email = user.email;
              newUserA.password = password;
              newUserA.sex = user.sex;
              newUserA.birthDate = user.birthDate;
              newUserA.phoneNumber = user.phoneNumber;

              const newUser = await this.userRepository.create(newUserA);
              const response = await this.userRepository.save(newUser);
              const doctor = new DoctorEntity();
              doctor.cedula = user.cedula;
              doctor.houseNumber = user.houseNumber;
              doctor.streetName = user.streetName;
              doctor.postalCode = user.postalCode;
              doctor.user = response;
              const newDoctor = await this.doctorRepository.create(doctor);
              this.doctorRepository.save(newDoctor);
              const token = await this.authService.signToken(newUser);
              return { token, response };
            }
          } catch (err) {
            throw new NotFoundException('No se encuentra la cedula');
          }

          // const newDoctor = await this.doctorRepository.create(doctor);
          // this.doctorRepository.save(newDoctor);
        } else {
          throw new BadRequestException('La cedula esta en uso');
        }
      } else {
        // if (nutriCodigoExists !== undefined) {
          const password = encodePassword(user.password);
          const newUserA = new UserEntity();
          newUserA.name = user.name;
          newUserA.userType = user.userType;
          newUserA.fathersLastName = user.fathersLastName;
          newUserA.mothersLastName = user.mothersLastName;
          newUserA.email = user.email;
          newUserA.password = password;
          newUserA.sex = user.sex;
          newUserA.birthDate = user.birthDate;
          newUserA.phoneNumber = user.phoneNumber;

          const newUser = await this.userRepository.create(newUserA);
          const response = await this.userRepository.save(newUser);
          const patient = new PatientEntity();
          patient.nutriCodigo = user.nutriCodigoId;
          patient.user = response;

          const newPatient = await this.patientRepository.create(patient);
          this.patientRepository.save(newPatient);

          const token = await this.authService.signToken(newUser);
          return { token, response };
        // } else {
        //   throw new NotFoundException('El nutriCodigo ya esta en uso');
        // }
      }

      // const token = await this.authService.signToken(newUser);
      // return { token, response };
    }
    //En caso de que el email ya esxista
    throw new BadRequestException('Email en uso');
  }

  async findByEmail(email: string): Promise<UsersDto | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByCedula(cedula: string): Promise<any> {
    console.log(cedula);
    return this.doctorRepository.findOne({ where: { cedula } });
  }

  // async findByNutriCodigo(nutriCodigo: ExpedienteEntity): Promise<any> {
  //   console.log(
  //     'NutriCodigo en la funcion para revisar si existe: ' + nutriCodigo,
  //   );
  //   return this.expedienteRepository.findOne({where: {nutriCodigo}});
  // }

  async findById(id: string): Promise<UsersDto> {
    return this.userRepository.findOne(id);
  }
}
