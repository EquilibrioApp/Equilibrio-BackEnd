import { ExpedienteEntity } from "src/expediente/expediente.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity, PrimaryColumn} from "typeorm";
//import { ExpedienteEntity } from "./expediente.entity";

@Entity()
export class MetaEntity extends BaseEntity{
    @PrimaryColumn('uuid')//'uuid'
    expedienteId: string;

    @OneToOne(() => ExpedienteEntity, expediente => expediente.meta)
    @JoinColumn()
    expediente: ExpedienteEntity;

    @Column({default: ''})
    pesoMeta: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechaMeta: Date;
}