import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Personne_Entity } from "./personne.entity";

@Entity("taches")
export class Taches_Entity {

    @PrimaryGeneratedColumn()
    id_taches: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    isDone: boolean;

    @ManyToOne(() => Personne_Entity, (personne) => personne.taches_user, { onDelete: 'CASCADE' })
    personne_tache: Personne_Entity;
}
