import { AvanceEntity } from "src/avances/avances.entity";
import { ExpedienteEntity } from "src/expediente/expediente.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RegistroEntity extends BaseEntity{ 
    @PrimaryGeneratedColumn('uuid')//'uuid'
    id: string;

    @ManyToOne(() => ExpedienteEntity, expediente => expediente.registros)
    expediente: ExpedienteEntity;

    @CreateDateColumn()
    createdAt: Date;

    @Column() 
    questionOne: boolean;

    @Column({ default: "" }) 
    questionTwo: string;

    @Column() 
    questionThree: number;

    @Column({default : null}) 
    questionFour: boolean;

    @Column({default : null}) 
    questionFive: boolean;

    @Column({default : null}) 
    questionSix: boolean;

    @Column() 
    questionSeven: boolean;
    
    @Column() 
    questionEight: boolean;

    @Column() 
    questionNine: boolean;

    @Column() 
    questionTen: boolean;

    @Column() 
    questionEleven: boolean;

    @Column() 
    questionTwelve: boolean;
}