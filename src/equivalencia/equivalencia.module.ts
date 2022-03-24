import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { EquivalenciaController } from './equivalencia.controller';
import { EquivalenciaEntity } from './equivalencia.entity';
import { EquivalenciaService } from './equivalencia.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquivalenciaEntity, UserEntity])],
  providers: [EquivalenciaService],
  controllers: [EquivalenciaController]
})
export class EquivalenciaModule {}
