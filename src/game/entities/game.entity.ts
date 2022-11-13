import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Genre} from "../../genre/entities/genre.entity";
import {Platform} from "../../platform/entities/platform.entity";

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

    @Column({ nullable: true })
    how_long_to_beat: string;

    @ManyToMany(() => Platform)
    @JoinTable()
    platforms: Platform[];
}
