import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "src/users/users.entity";
import { ExpedienteEntity } from "src/expediente/expediente.entity";

@Entity()
export class PatientEntity extends BaseEntity{
    @PrimaryColumn("uuid")//
    userId: string;

    @OneToOne(()=> UserEntity, (user) => user.id)
    @JoinColumn()
    user: UserEntity;

    @OneToOne(() => ExpedienteEntity , (nutriCodigo) => nutriCodigo.id,  {eager: true})
    @JoinColumn()
    nutriCodigo: ExpedienteEntity;
    // patient: Promise<ExpedienteEntity>;
}