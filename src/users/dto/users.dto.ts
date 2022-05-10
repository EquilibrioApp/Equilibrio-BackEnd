import { Contains, IsEmail, IsNotEmpty } from "class-validator";
import { token, User } from "src/auth/dto/auth.dto";
import { ExpedienteEntity } from "src/expediente/expediente.entity";

export class UsersDto {
    //TODO Averiguar pipes
    id?: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    userType: string;

    @IsNotEmpty()
    fathersLastName: string;

    @IsNotEmpty()
    mothersLastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Contains('@gmail.com')
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    sex: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    phoneNumber: string;

    //Info en caso de ser Doctor
    
    cedula?: string;

    
    houseNumber?: string;
    
    
    streetName?: string;

    
    postalCode?: string;

    //Info en caso de ser paciente

    nutriCodigoId?: ExpedienteEntity;
    
}

export class UserResponseDto {
    //TODO Averiguar pipes
    token: token;
    response: User;
    // id?: string;
    // name: string;
    // userType: string;
    // fathersLastName: string;
    // mothersLastName: string;
    // email: string;
    // sex: string;
    // birthDate: Date;
    // phoneNumber: string;
}

export class CheckCedula {
    name: string;
    fathersLastName: string;
    mothersLastName: string;
    cedula: string;
}