
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn, OneToMany } from "typeorm";
import { OrderDetail } from "./orderDetail";

@Entity({ name: 'order' })

export class Order extends BaseEntity {

    @PrimaryGeneratedColumn() // auto generate id for Orders
    id: number;

    @Column()
    total: number;

    @Column({ default: false}) //allows null value
    ready: boolean;

    @Column()
    userName: string;

    @Column()
    userMob: string;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}

