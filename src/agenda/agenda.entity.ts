import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";

@Entity()
export class AgendaEntity{
    @PrimaryColumn()//'uuid'
    // id_agenda = id_cita
    id_agenda: string;
    
    @Column({default:""})
    idPaciente: string;

    @Column({default:""})
    idEspecialista: string;
    
    @Column({default:""})
    iCalUID : string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    start: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    end: Date;

    @Column({default:""})
    correoEspecialista: string;
    
    @Column({default:""})
    correoPaciente: string;
}
/*
 id?: string;
  idPaciente: string;
  idEspecialista: string;
  iCalUID : string = mbsjh26n47g6gk3t83e5n2p78c@google.com;
  start: Date;
  end: Date;
  attendees: string*/