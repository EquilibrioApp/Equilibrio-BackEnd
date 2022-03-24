import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class AgendaEntity{
    @PrimaryGeneratedColumn('uuid')//'uuid'
    id: string;
    
    @Column({default:""})
    iCalUID : string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    start: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    end: Date;

    @Column({default:""})
    attendees: string;

    @Column({default:""})
    paciente: string;

    @Column({default:""})
    especialista: string;
}
/*
 id?: string;
  idPaciente: string;
  idEspecialista: string;
  iCalUID : string;
  start: Date;
  end: Date;
  attendees: string*/