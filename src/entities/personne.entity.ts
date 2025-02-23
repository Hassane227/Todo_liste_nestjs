import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Taches_Entity } from "./taches.entity";

@Entity("personne")
export class Personne_Entity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    Matricule: string;

    @Column()
    Email: string;

    @Column()
    age: number;

    @OneToMany(() => Taches_Entity, (tache) => tache.personne_tache, { cascade: ['remove'] })
    taches_user: Taches_Entity[];
}
