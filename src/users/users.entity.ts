import { Exclude, instanceToPlain } from 'class-transformer';
import { ExpedienteEntity } from 'src/expediente/expediente.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: ''})
    name: string;

    @Column({default: ''})
    userType: string;

    @Column({default: ''})
    fathersLastName: string;

    @Column({default: ''})
    mothersLastName: string;

    @Column({default: '', unique: true})
    email: string;
    
    @Exclude()
    @Column({default: ''})
    password: string;

    @Column({default: ''})
    sex: string;
    
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    birthDate: Date;
    
    @Column({default: ''})
    phoneNumber: string;

    @OneToMany(()=> ExpedienteEntity, expediente => expediente.doctor)
    expediente:ExpedienteEntity;

    toJSON(){
        return instanceToPlain(this);
    }
}