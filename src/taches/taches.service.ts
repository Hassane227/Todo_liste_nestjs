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

async getAllTachesUser(){
        return await this.personne_repository.find({ relations: ['taches_user'] });
     
}
async getOneTache(id) {
    const user = await this.tache_repository.findOne({
        where: { id_taches: id },
        relations: ['personne_tache'] // ✅ Utilise le bon nom de relation !
    });
    return user || null;
}


async creat_taches(tachedto: tacheDto,personne_id){
    // pour creer une tache qui a une relation avec une autre table il faut d'abord definir la relation grace a relations: ['nom de la relation']
    // ensuite cree une entite pour creer pour copier le dto  ensuit une fois le user existe  on le copie tache.personne_tache = user; 
    // l'instance pour  maintenir la relation

    /* async creat_taches(tachedto: tacheDto, personne_id: number) {
    // Récupérer l'utilisateur avec l'ID fourni
    const user = await this.personne_repository.findOne({ where: { id: personne_id } });

    // Si l'utilisateur existe
    if (user) {
        // Créer la tâche avec les données de tachedto et lier la personne
        const tache = this.tache_repository.create({
            ...tachedto, // Copie les propriétés de tachedto
            personne_tache: user, // Lier la tâche à la personne (utilisateur)
        });

        // Sauvegarder la tâche et retourner l'objet tâche
        return await this.tache_repository.save(tache);
    }

    // Si l'utilisateur n'existe pas, retourner un message d'erreur
    return "Vous ne pouvez pas créer une tâche sans créer un compte.";
}
 */
const user =  await this.personne_repository.findOne({where: {id:personne_id},relations: ['taches_user']})

    if(user){
    const tache = new Taches_Entity()
     tache.description=tachedto.description;
     tache.id_taches = tachedto.id_taches;
     tache.isDone = tachedto.isDone;
     tache.title = tachedto.title;
     tache.personne_tache = user;
        
       const tch = await this.tache_repository.save(tache);
       return tch;
    }
    return "vous ne pouvez pas creer une tache sans créer un compte dans l'application";

}

async supprimer_tache(id){

    const tache = await this.tache_repository.findOne({where: {id_taches:id}});
    if(tache)
        return this.tache_repository.remove(tache);
    else return "cette tache n'existe pas";

}

async update_tache(tachedto:tacheDto,id_taches:number){

    const tache = await this.tache_repository.findOne({
        where: { id_taches: id_taches }, // Assurez-vous que la colonne "id_taches" existe
    });    if(tache)
    {
         // pour modifier et retourne le resultat
        /*const updatedTache = Object.assign(tache, tachedto);
        return await this.tache_repository.save(updatedTache);*/
        return await this.tache_repository.update(id_taches,tachedto);
    return "cette taches n'existe pour que vous puis la suipprimé"
    }

}


}
