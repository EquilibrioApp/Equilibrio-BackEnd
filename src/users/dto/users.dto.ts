import { Contains, IsEmail, IsNotEmpty } from "class-validator";

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

    nutriCodigo?: string;
    
}

export class UserResponseDto {
    id?: string;
    name: string;
    userType: string;
    fathersLastName: string;
    mothersLastName: string;
    email: string;
    sex: string;
    birthDate: Date;
    phoneNumber: string;
}