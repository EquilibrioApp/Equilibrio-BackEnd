import { ExpedienteEntity } from "src/expediente/expediente.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";

@Entity()
export class AgendaEntity{
    @PrimaryColumn('uuid')//'uuid'
    expedienteId: string;

    @OneToOne(() => ExpedienteEntity, expediente => expediente.agenda)
    @JoinColumn()
    expediente: ExpedienteEntity;
    
    @Column({default:""})
    iCalUID : string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    start: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    end: Date;

    @Column({default:""})
    attendees: string;
}
/*
 id?: string;
  idPaciente: string;
  idEspecialista: string;
  iCalUID : string;
  start: Date;
  end: Date;
  attendees: string*/