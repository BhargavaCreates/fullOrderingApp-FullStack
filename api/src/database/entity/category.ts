import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn, OneToMany } from "typeorm";
import {Item} from "./items"

@Entity({ name: 'category' })

export class Category extends BaseEntity {

    @PrimaryGeneratedColumn() // auto generate id for Orders
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Item, item => item.category)
    items: Item[] 
}
