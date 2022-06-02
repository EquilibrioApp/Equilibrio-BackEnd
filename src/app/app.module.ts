import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgendaModule } from 'src/agenda/agenda.module';
import { AuthModule } from 'src/auth/auth.module';
import { AvancesModule } from 'src/avances/avances.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { EquivalenciaModule } from 'src/equivalencia/equivalencia.module';
import { EquivalenciaExpModule } from 'src/equivalenciaExp/equivalenciaExp.module';
import { ExpedienteModule } from 'src/expediente/expediente.module';
import { NotificacionModule } from 'src/notificaciones/notificacion.module';
import { PatientModule } from 'src/patient/patient.module';
import { RegistroModule } from 'src/registros/registros.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  //Rutas de la application
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      autoLoadEntities: true,
    }), AgendaModule, ExpedienteModule, EquivalenciaModule, RegistroModule, EquivalenciaExpModule,
        PatientModule, DoctorModule, AuthModule, UsersModule, AvancesModule, NotificacionModule
  ],
  controllers: []
})
export class AppModule {}

// ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({ 
    //   type: 'postgres',
    //   // host: process.env.DB_HOST ,
    //   // port: parseInt(<string>process.env.BD_PORT),
    //   // username: process.env.DB_USER,
    //   // password: process.env.DB_PASSWORD,
    //   // database: process.env.DB_DATABASE,
    //   // entities: ["dist/**/*.entity{.ts,.js}"],
    //   url: process.env.DB_URL,
    //   synchronize: true,
    //   retryDelay: 3000,
    //   retryAttempts: 5,
    //   // dropSchema: true