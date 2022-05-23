import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { EquivalenciaExpController } from './equivalenciaExp.controller';
import { EquivalenciaExpEntity } from './equivalenciaExp.entity';
import { EquivalenciaExpService } from './equivalenciaExp.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquivalenciaExpEntity, UserEntity])],
  providers: [EquivalenciaExpService],
  controllers: [EquivalenciaExpController]
})
export class EquivalenciaExpModule {}
