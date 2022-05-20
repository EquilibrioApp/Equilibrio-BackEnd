import { AgendaEntity } from "src/agenda/agenda.entity";
import { AvanceEntity } from "src/avances/avances.entity";
import { DoctorEntity } from "src/doctor/doctor.entity";
import { EjercicioEntity } from "src/ejercicio/ejercicio.entity";
import { MetaEntity } from "src/metas/meta.entity";
import { RegistroEntity } from "src/registros/registro.entity";
import { UserEntity } from "src/users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";

@Entity()
export class ExpedienteEntity extends BaseEntity{
    // @PrimaryColumn()
    // @Generated('uuid')
    // id:string;
    @PrimaryGeneratedColumn("uuid")//'uuid'
    id: string;
    
    @ManyToOne(()=> UserEntity, doctor => doctor.expediente, {eager: true})
    @JoinColumn()
    doctor:UserEntity;

    @Column({default : ""})
    sexo: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    birthDate: Date;

    @Column({default: ''})
    nombre: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column("decimal", { precision: 5, scale: 2 })
    alturaPaciente: number;

    @OneToMany(()=> AvanceEntity, avance => avance.expediente, {eager:true})
    avances:AvanceEntity;

    @OneToMany(()=> RegistroEntity, registros => registros.expediente, {eager: true})
    registros:RegistroEntity;

    @OneToOne(() => MetaEntity , meta => meta.expediente, {eager: true})
    meta: MetaEntity;

    // @OneToOne(() => AgendaEntity , agenda => agenda.expediente, {eager: true})
    // agenda: AgendaEntity;

    @OneToMany(()=> EjercicioEntity, ejercicio => ejercicio.expediente, {eager: true})
    ejercicio:EjercicioEntity;

    @OneToMany(()=> EjercicioEntity, equivalencia => equivalencia.expediente, {eager: true})
    equivalencia:EjercicioEntity;
}

/*create table expediente (
  id_expediente serial primary key,
  id_especialista bigint,
  id_paciente bigint,
  id_meta bigint,
  altura_paciente float);
*/