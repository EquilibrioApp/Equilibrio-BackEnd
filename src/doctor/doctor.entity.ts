import { UserEntity } from 'src/users/users.entity';
import { Entity, BaseEntity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';


@Entity()
export class DoctorEntity extends BaseEntity {
    @PrimaryColumn()
    userId: string;

    @OneToOne(()=> UserEntity, (user) => user.id)
    @JoinColumn()
    user: UserEntity;

    @Column({default: ''})
    cedula: string;

    @Column({default: ''})
    houseNumber: string;

    @Column({default: ''})
    streetName: string;

    @Column({default: ''})
    postalCode: string;
}