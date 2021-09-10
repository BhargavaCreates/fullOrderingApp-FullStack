import { Order } from "@entity/order";
import { OrderDetail } from "@entity/orderDetail";

interface IOrderItem {
    name: string,
    price: number,
    quantity: number
}

export interface IOrder {
    total: number,
    ready: boolean,
    userName: string,
    userMob: string,
    orderItems: Array<any>
}

// Create Service
export const createOrder = async (order: IOrder) => {
    try {
        const _newOrder = new Order();
        _newOrder['total'] = order['total'];
        _newOrder['userName'] = order['userName'];
        _newOrder['userMob'] = order['userMob'];
        const newOrder = await _newOrder.save()
        

        // Could be improved using https://typeorm.io/#/insert-query-builder
        order.orderItems.forEach( async item => {
            const _newOrderDetail = new OrderDetail();
            _newOrderDetail.name = item.name;
            _newOrderDetail.price = item.price;
            _newOrderDetail.quantity = item.price;
            _newOrderDetail.order = newOrder;

            return await _newOrderDetail.save()
        })
        return {
            message: "order created!",
            order: newOrder
        }
    } catch (e) {
        console.log(e);
    }
}

// Update Order
export const updateOrder = async (order: { id: number } & IOrder) => {
    try {
        const _foundOrder = await Order.findOne({ where: { id: order['id'] } });
        if (!_foundOrder) return ({ message: "Order is not found!" });

        // Only Writing logic to update the status of the Order.
        if (order['ready']) _foundOrder['ready'] = order['ready'];
        return await _foundOrder.save();
    } catch (error) {
        console.error(error);
    }
}