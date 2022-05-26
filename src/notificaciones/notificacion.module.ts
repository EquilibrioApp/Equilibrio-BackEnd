import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { NotificacionController } from './notificacion.controller';
import { NotificacionEntity } from './notificacion.entity';
import { NotificacionService } from './notificacion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificacionEntity, UserEntity])],
  controllers: [NotificacionController],
  providers: [NotificacionService]
})
export class NotificacionModule {}
