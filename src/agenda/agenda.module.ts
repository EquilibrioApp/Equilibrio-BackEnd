import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { AgendaController } from './agenda.controller';
import { AgendaEntity } from './agenda.entity';
import { AgendaService } from './agenda.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgendaEntity, UserEntity])],
  controllers: [AgendaController],
  providers: [AgendaService]
})
export class AgendaModule {}
