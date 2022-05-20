import { ExpedienteEntity } from "src/expediente/expediente.entity";
import { UserEntity } from "src/users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne, BaseEntity} from "typeorm";

@Entity()
export class EquivalenciaExpEntity extends BaseEntity{
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

    @ManyToOne(() => ExpedienteEntity, expediente => expediente.equivalencia)
    @JoinColumn()
    expediente: ExpedienteEntity;
}
/*
 id_avance serial primary key, 
 fecha date,
  observacion text,
  id_expediente bigint);*/