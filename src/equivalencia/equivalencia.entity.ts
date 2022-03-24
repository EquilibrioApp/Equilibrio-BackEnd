import { UserEntity } from "src/users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne, BaseEntity} from "typeorm";

@Entity()
export class EquivalenciaEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')//'uuid'
    id: string;

    @Column({default : ""})
    nombre:string;
    
    @Column({default : ""})
    grupoAlimencio:string;
    
    @Column({default : ""})
    subgrupo:string;
    
    @Column({default : ""})
    racion : string; 	

    @ManyToOne(()=> UserEntity, doctor => doctor.equivalencia, {eager: true})
    @JoinColumn()
    doctor:UserEntity;
}
/*
 id_avance serial primary key, 
 fecha date,
  observacion text,
  id_expediente bigint);*/