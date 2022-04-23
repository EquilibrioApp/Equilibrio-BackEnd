export class PatientsResponseDto { 
    userId: string;
}

export class DoctorPCResponseDto {
    userId:      string;
    cedula:      string;
    houseNumber: string;
    streetName:  string;
    postalCode:  string;
    user:        User;
}

export class User {
    id:              string;
    name:            string;
    userType:        string;
    fathersLastName: string;
    mothersLastName: string;
    email:           string;
    sex:             string;
    birthDate:       Date;
    phoneNumber:     string;
}
