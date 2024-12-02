import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { personneDto } from 'src/dtos/personnes.dtos';
import { Personne_Entity } from 'src/entities/personne.entity';
import { Taches_Entity } from 'src/entities/taches.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonnesService {
 constructor( 
    @InjectRepository(Taches_Entity)
    private readonly tache_reporsitory: Repository<Taches_Entity>,
    @InjectRepository(Personne_Entity)
    private readonly personne_repository: Repository<Personne_Entity>,
 ){}

 GetAllUsers(){
    return this.personne_repository.find();
 }

 async GetOneUser(id_personne){
    const users = await this.personne_repository.findOne(
        {where:{id:id_personne}}
    )
    if(users)
        return users;

    return"cet utilisateur n'existe pas ";

 }

 async supprimerUser(id){
   
    const users = await this.personne_repository.findOne(
        {where:{id:id}}
    )
    if(users){
        return this.personne_repository.remove(users)   }

    else return "cet utilisateurs n'existe pas";

 }

 async creatusers(usersdto: personneDto){

    const users = await this.personne_repository.save(usersdto);

    return users;
 }

 async updateUsers(id_user, userdto:personneDto){

    const users = this.personne_repository.findOne({
        where:{id:id_user}
    })

    if(users){
        await this.personne_repository.update(id_user, userdto);
       return await this.personne_repository.findOne({ where: { id: id_user } });}
    return"cet utilisateur n'existe pas";

 }




 
}
