import { AvanceEntity } from "src/avances/avances.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity, PrimaryColumn} from "typeorm";
//import { ExpedienteEntity } from "./expediente.entity";

@Entity()
export class IndiceEntity extends BaseEntity{
    // @PrimaryGeneratedColumn('uuid')//'uuid'
    // id: string;

    @PrimaryColumn( )
    avanceId: string;

    @OneToOne(() => AvanceEntity, avance => avance.indice) 
    @JoinColumn()
    avance: AvanceEntity;
    
    @Column("numeric", { precision: 14, scale: 4 }) 
    masaCorporal: number;

    @Column("numeric", { precision: 14, scale: 4 })
    masaGrasa: number;
    
    @Column("numeric", { precision: 14, scale: 4 }) 
    masaMagra: number;
    
    @Column("numeric", { precision: 14, scale: 4 })
    masaOsea: number;
    
    @Column("numeric", { precision: 14, scale: 4 })
    masaResidual: number;
    
    @Column("numeric", { precision: 14, scale: 4 }) //peso/(altura)altura
    masaMuscular: number;
}



// Fuentes:
// Masa magra y masa grasa https://www.nivea.es/consejos/piel-bonita/calcular-masa-magra-masa-grasa-0nrp0
// IMC = https://hablandodeobesidad.com/que-es-la-obesidad/que-es-imc-y-como-se-relaciona-con-la-obesidad/?gclid=CjwKCAiA1JGRBhBSEiwAxXblwSgfKMV34Ym-3jWgalLqy6OSZPMDO7RhoqMCBSgzo64dBPlk0N14irhoCmucQAvD_BwE