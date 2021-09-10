import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn, ManyToOne } from "typeorm";
import { Order } from "./order";

@Entity({ name: 'orderDetail' })

export class OrderDetail extends BaseEntity {

    @PrimaryGeneratedColumn() // auto generate id for Orders
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, order => order.orderDetails)
    order: Order

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}
