import { ExpedienteEntity } from "src/expediente/expediente.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";

@Entity()
export class NotificacionEntity{
    @PrimaryColumn()//'uuid'
    // id_agenda = id_cita
    id_agenda: string;
    
    @Column({default:""})
    idPaciente: string;

    // @Column({default:""})
    // idEspecialista: string;
    // @OneToOne(() => ExpedienteEntity, expediente => expediente.agenda)
    // @JoinColumn()
    // expediente: ExpedienteEntity;
    
    @Column({default:""})
    iCalUID : string;

    @Column({default:""})
    start: string;

    @Column({default:""})
    end: string;

    // @Column({default:""})
    // correoEspecialista: string;
    
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