import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tacheDto } from 'src/dtos/taches.dtos';
import { Personne_Entity } from 'src/entities/personne.entity';
import { Taches_Entity } from 'src/entities/taches.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TachesService {
    constructor(
        @InjectRepository(Taches_Entity)
        private readonly tache_repository: Repository<Taches_Entity>,
        @InjectRepository(Personne_Entity)
        private readonly personne_repository: Repository<Personne_Entity>
    ){}

getAlltaches(){
    return this.tache_repository.find();
}

async getOneTache(id){
    const user = this.tache_repository.findOne({where: {id_taches:id}})
    if(user)
        return user
    return null;

}

async creat_taches(tachedto: tacheDto,personne_id){
const user =  await this.personne_repository.findOne({where: {id:personne_id}})

    if(user){
    const tache = this.tache_repository.save(tachedto);
    }
    return "vous ne pouvez pas creer une tache sans créer un compte";

}

async supprimer_tache(id){

    const tache = await this.tache_repository.findOne({where: {id_taches:id}});
    if(tache)
        return this.tache_repository.remove(tache);
    else return "cette tache n'existe pas";

}

async update_tache(tachedto:tacheDto,id){

    const tache = await this.tache_repository.findOne({where: {id_taches:id}});
    if(tache)
        return this.tache_repository.update(id,tachedto);
    return "cette taches n'existe pour que vous puis la suipprimé"

}


}
