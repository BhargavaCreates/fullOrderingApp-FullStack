import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { IOrder, createOrder, updateOrder } from "./order.service"
import { Item } from "@entity/items"

interface IItems {
    categoryId: number,
    id: number,
    price: number,
    quantity: number
}

interface ICartItem {
    "id": number
}

interface ICart {
    mains?: Array<ICartItem>,
    drinks?: Array<ICartItem>,
    desserts?: Array<ICartItem>
}


@Tags('Order')
@Route('/api/order')

    
export class OrderController extends Controller {

    // Create Order Controller
    @Post('/create')
    public async createOrder(@Body() order: IOrder) {
        return createOrder(order);
    }

    // Update Order Controller 
    @Post('/update')
    public async updateOrder(@Body() order: { id: number } & IOrder) {
        return updateOrder(order);
    }


    // Check for Offer
    @Post('/checkOffer')
    public async checkOffer(@Body() cart:  ICart ) {

  
 
        let drinks: Array<ICartItem> | undefined = cart.drinks
        let mains: Array<ICartItem> | undefined  = cart.mains
        let desserts: Array<ICartItem> | undefined = cart.desserts
        
        var totalAmount: number = 0;
        var totalDiscount: number = 0;
        var messages: Array<String> = []

        if (mains && mains?.length >= 1 && !drinks || drinks?.length === 0) {
            messages.push("Add an item from Drinks to avail Hot Offer! i.e Get 10% off each main and drink combo.")
        } else if (drinks && drinks.length >= 1 && !mains || mains?.length === 0 ) {
            messages.push("Add an item from Mains to avail Hot Offer! i.e Get 10% off each main and drink combo.")
        } else {
            messages.push("Hot Offer Applied!")
        }

        if (mains && drinks && mains.length === 0 && drinks.length === 0) {
            messages.push("Add a combo to avail Hot Offer! i.e Get 10% off each main and drink combo.")
        }
             
        if (!(drinks && mains && desserts && drinks.length >= 2 && mains.length >= 2 && desserts.length >= 1)) {
            messages.push("Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00.")
        } else {
            messages.push("Discount of $40 has been applied! as per Hungry Date Offer!")
        }

                // Check for Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00.
        if (drinks && mains && desserts && drinks.length >= 2 && mains.length >= 2 && desserts.length >= 1) {
            
            // Take out two drinks.
            drinks.shift()
            drinks.shift()

            // Take out two mains.
            mains.shift()
            mains.shift()

            // Take out one dessert.
            desserts.shift()

            // Add $40 to amount.
            totalAmount = 40
        }

        
        if (drinks) {
            for (const drink of drinks) {
                try {
                    let _foundDrink: any = await Item.find( { id: drink.id})
                    totalAmount += _foundDrink[0].price;
                } catch (error) {
                    console.error(error);
                }
            }
        }

        if (mains) {
            for (const drink of mains) {
                try {
                    let _foundDrink: any = await Item.find( { id: drink.id})
                    totalAmount += _foundDrink[0].price;
                } catch (error) {
                    console.error(error);
                }
            }
        }

        if (desserts) {
            for (const drink of desserts) {
                try {
                    let _foundDrink: any = await Item.find( { id: drink.id})
                    totalAmount += _foundDrink[0].price;
                } catch (error) {
                    console.error(error);
                }
            }
        }

        async function calculateAmountAfterComboDiscount(drinkId: number, mainsId: number) {
            try {
                let _foundDrink: any = await Item.find({ id: drinkId})
                let _foundMain: any = await Item.find({ id: mainsId })
                 return (_foundDrink[0].price + _foundMain[0].price) * 0.10; // 10% discount hard coded
            } catch (err) {
                console.error(err)
                throw new Error("Database fetching Error");
            }
        }
        

        // Combo discount 
        while (drinks && mains && drinks.length >= 1 && mains.length >= 1) {
            totalDiscount += await calculateAmountAfterComboDiscount(drinks[0].id, mains[0].id)
            drinks.shift();
            mains.shift();
        }

    
        return {
            message: messages,
            cart: cart,
            totalAmount: totalAmount,
            totalDiscount: totalDiscount.toFixed(2),
            amountAfterDiscout: (totalAmount - totalDiscount).toFixed(2)
        }
    }

}