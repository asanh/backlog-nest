import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Genre} from "../../genre/entities/genre.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    img: string;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];
}
