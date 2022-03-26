import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgendaModule } from 'src/agenda/agenda.module';
import { AuthModule } from 'src/auth/auth.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { EquivalenciaModule } from 'src/equivalencia/equivalencia.module';
import { ExpedienteModule } from 'src/expediente/expediente.module';
import { PatientModule } from 'src/patient/patient.module';
import { RegistroModule } from 'src/registros/registros.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  //Rutas de la application
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT)/* ||5433 */,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 5,
    // dropSchema: true
    }), AgendaModule, ExpedienteModule, EquivalenciaModule, RegistroModule,
        PatientModule, DoctorModule, AuthModule, UsersModule
  
  ],
  controllers: []
})
export class AppModule {}