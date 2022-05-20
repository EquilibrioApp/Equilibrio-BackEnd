import { UserEntity } from "src/users/users.entity";

export class EquivalenciaDto {
    id?: string
    nombre:string;
    grupoAlimencio:string;
    subgrupo:string;
    racion : string; 	

    // "nombre": "",
    // "grupoAlimencio": "",
    // "subgrupo": "",
    // "racion": ""
    //doctor : UserEntity[];
}