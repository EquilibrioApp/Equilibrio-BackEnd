import { AvanceEntity } from "src/avances/avances.entity";
import { MetaEntity } from "src/metas/meta.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Generated} from "typeorm";

@Entity()
export class ExpedienteEntity extends BaseEntity{
    // @PrimaryColumn()
    // @Generated('uuid')
    // id:string;
    @PrimaryGeneratedColumn("uuid")//'uuid'
    id: string;

    @Column({default : ""})
    especialistaId: string;
    
    @Column({default : ""})
    pacienteId: string;

    @Column({default : ""})
    sexo: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column("decimal", { precision: 5, scale: 2 })
    alturaPaciente: number;

    @OneToMany(()=> AvanceEntity, avance => avance.expediente, {eager: true})
    avances:AvanceEntity;

    // @OneToMany(()=> RegistroEntity, registros => registros.expediente, {eager: true})
    // registros:RegistroEntity;

    @OneToOne(() => MetaEntity , meta => meta.expediente, {eager: true})
    meta: MetaEntity;
  
}

/*create table expediente (
  id_expediente serial primary key,
  id_especialista bigint,
  id_paciente bigint,
  id_meta bigint,
  altura_paciente float);
*/