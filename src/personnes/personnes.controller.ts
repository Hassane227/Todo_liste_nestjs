import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PersonnesService } from './personnes.service';
import { personneDto } from 'src/dtos/personnes.dtos';

@Controller('personnes')
export class PersonnesController {
    constructor(private readonly usersService: PersonnesService){}

    @Get()
    GetAllUser(){
        return this.usersService.GetAllUsers()
    }
    @Get(':id')
    async GetOneUser(@Param('id') id_users){

        const user= await this.usersService.GetOneUser(id_users);

         if(user)
            return user;
        throw new HttpException('utilisateur not found',HttpStatus.NOT_FOUND);
    }

    @Post()
    async createUser(@Body() userdto: personneDto){
        const users = await this.usersService.creatusers(userdto);
        if(users)
            return users
        throw new HttpException('on a pas pu creer l\'utilisateur',HttpStatus.NOT_FOUND);

    }

    @Put(':id_user')
    async update_user(@Param('id_user') id_user:number,@Body() userdto:personneDto){
     
        const users = await this.usersService.updateUsers(id_user,userdto);
        if(users)
            return users
        throw new HttpException('la ressours n\'est pas trouver',HttpStatus.NOT_FOUND);
    }


}
