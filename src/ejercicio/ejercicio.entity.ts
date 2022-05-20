import { ExpedienteEntity } from "src/expediente/expediente.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class EjercicioEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')//'uuid'
    id: string;

    @ManyToOne(() => ExpedienteEntity, expediente => expediente.ejercicio)
    @JoinColumn()
    expediente: ExpedienteEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    exercises:string;
    
    @Column()
    time:number;    
}