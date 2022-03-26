import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from '../utils/bcrypt';
import { UsersService } from '../users/users.service';
import { AuthResponseDto, token, User } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser( email: string, password: string ): Promise<AuthResponseDto> {
      //Se itenta obtener el usuario mediante email
    try {
      //En caso de que esto falle, para que no de error se envuelve dentro del try
      const user = await this.usersService.findByEmail(email);

      const isPasswordValid = comparePassword(password, user.password);
      // console.log(isPasswordValid);

      if (isPasswordValid) {
        //Se desestructura el objeto de usuario para no retornar contrasena
        //Nota personal: El atributo que ponemos entre parentesis es el que se quita del objeto final
        const { password, ...result } = user;
        const token = await this.signToken(result);
        console.log({...token, result});
        //TODO Hace falta reotrnar el objeto como se expresa en AuthresponseDto
        return {token, result};
      }
      //Excepcion en caso de que la contrasena no sea correcta
      throw new UnauthorizedException();
    } 
    //Excepcion en caso de que el correo no sea encotrado en la BD
    catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signToken(user:User): Promise<token>{
    const payload = { 
      id: user.id, 
      name: user.name, 
      // userType: user.userType, 
      // fathersLastName: user.fathersLastName, 
      // mothersLastName: user.mothersLastName, 
      // email: user.email, 
      // sex: user.sex, 
      // birthDate: user.birthDate, 
      // phone: user.phoneNumber
    };

    return {access_token: this.jwtService.sign(payload)};
  
  }
}
