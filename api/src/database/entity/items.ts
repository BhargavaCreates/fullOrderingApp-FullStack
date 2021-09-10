import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn, ManyToOne } from "typeorm";
import { Category } from "./category";

@Entity({ name: 'item' })

export class Item extends BaseEntity {

    @PrimaryGeneratedColumn() // auto generate id for Orders
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Category, category => category.items)
    category: Category;
}
