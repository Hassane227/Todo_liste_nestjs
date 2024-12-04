import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taches_Entity } from 'src/entities/taches.entity';
import { TachesService } from './taches.service';
import { tacheDto } from 'src/dtos/taches.dtos';

@Controller('taches')
export class TachesController {
    constructor(private readonly tache_service : TachesService){}

    @Get()
    Affiche_tache(){
        return this.tache_service.getAlltaches();
    }
    @Get(':id')
   async AfficherOnTache(@Param('id')id){
    const tache = await this.tache_service.getOneTache(id);
    if(tache)
        return  tache;
    throw new HttpException('cette tache n\'existe pas',HttpStatus.NOT_FOUND);

    }
    @Post('personne/:id')
    async creationTaches(@Body() tachedto: tacheDto, @Param('id') id){

        const tache = await this.tache_service.creat_taches(tachedto,id);
        if(tache)
            return tache;
        throw new HttpException('cette tache n\'existe pas',HttpStatus.NOT_FOUND);

    }
    @Put(':id')
    async moddifier(
        @Body() tachedto: tacheDto,
        @Param('id') id_taches: number
 ) {
        const tache = await this.tache_service.update_tache(tachedto, id_taches);
    
        if (tache) {
            return tache;
        }
    
        throw new HttpException(
            'Cette tâche n\'existe pas',
            HttpStatus.NOT_FOUND
        );
    }


    
  
}
