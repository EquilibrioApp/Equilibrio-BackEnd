import { CircunferenciaEntity } from "src/circunferencias/circunferencia.entity";
import { ExpedienteEntity } from "src/expediente/expediente.entity";
import { IndiceEntity } from "src/indices/indice.entity";
import { PesoEntity } from "src/pesos/peso.entity";
import { PlieguesEntity } from "src/pliegues/pliegues.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class AvanceEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')//'uuid'
    id: string;

    @ManyToOne(() => ExpedienteEntity, expediente => expediente.avances)
    expediente: ExpedienteEntity;

    @Column("text")
    observacion: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => PesoEntity, peso => peso.avance, {eager: true})
    peso: PesoEntity;

    @OneToOne(() => CircunferenciaEntity, circunferencia => circunferencia.avance, {eager: true})
    circunferencia: CircunferenciaEntity;

    @OneToOne(() => IndiceEntity, indice => indice.avance, {eager: true})
    indice: IndiceEntity;

    @OneToOne(() => PlieguesEntity, pliegue => pliegue.avance, {eager: true})
    pliegue: PlieguesEntity;
}
/*
 id_avance serial primary key, 
 fecha date,
  observacion text,
  id_expediente bigint);*/