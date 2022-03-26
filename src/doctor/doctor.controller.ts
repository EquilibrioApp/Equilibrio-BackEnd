import { Controller, Get, Param } from '@nestjs/common';

import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
    constructor(
        private doctorService: DoctorService
    ){}
    
    @Get('/find/:cp')
     findAlldoctorsByPC(@Param('cp') cp: string){
         return this.doctorService.findAlldoctorsByPc(cp);
     }
}
