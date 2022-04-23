import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersDto, UserResponseDto } from './dto/users.dto';
import { UsersService } from './users.service';
import  { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/create') //Se crea un nuevo usuario
    //TODO Generar DTO que no regrese contraseña
    create(@Body() body: UsersDto): Promise<UserResponseDto> {
      return this.usersService.create(body);
    }

    @Get('/:email')//Login mediante el email
    loginByEmail(@Param('email') email:string): Promise<UsersDto> {
      return this.usersService.findByEmail(email);
    }

    // @UseGuards(JwtAuthGuard)
    // @HttpCode(HttpStatus.OK)
    // @Get('/verify/token')//Buscar usuario mediante el Id
    // checkToken(): Promise<UsersDto> {
    //   return ;
    // }
}


