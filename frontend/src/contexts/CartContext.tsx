import React, { useState, useContext } from 'react';
import { CommonContext } from './CommonContext';
import { checkOffer, createOrder } from '../services/Menu.service';

export const CartContext = React.createContext({});

export const CartProvider: React.FC = ({ children }) => {
    const commonCtx: any = useContext(CommonContext)

    const [cart, setCart] = useState<Array<any>>(
        sessionStorage.getItem('cart')
            ? JSON.parse(sessionStorage.getItem('cart')!)
            : []
    );
    // This state is designed as per the DS used in the backend for offer checking.
    const [cartBody, setCartBody] = useState<any>(
        sessionStorage.getItem('cartBody')
            ? JSON.parse(sessionStorage.getItem('cartBody')!)
            : {}
    );
    const [total, setTotal] = useState<number>(
        sessionStorage.getItem('total')
            ? JSON.parse(sessionStorage.getItem('total')!)
            : 0
    )
    const [userName, setUserName] = useState<string>(
        sessionStorage.getItem('userName')
            ? JSON.parse(sessionStorage.getItem('userName')!)
            : ''
    );
    const [userMob, setUserMob] = useState<string>(
        sessionStorage.getItem('userMob')
            ? JSON.parse(sessionStorage.getItem('userMob')!)
            : ''
    );
    const [orderCreated, setOrderCreated] = useState<boolean>(
        sessionStorage.getItem('orderCreated')
            ? JSON.parse(sessionStorage.getItem('orderCreated')!)
            : false
    );
    const [checkoutModelOpen, setCheckoutModelOpen] = useState<boolean>(
        sessionStorage.getItem('checkoutModelOpen')
            ? JSON.parse(sessionStorage.getItem('checkoutModelOpen')!)
            : false
    );
    const [offerResponse, setOfferResponse] = useState<object>(
        sessionStorage.getItem('offerResponse')
            ? JSON.parse(sessionStorage.getItem('offerResponse')!)
            : {}
    );

    const [applyOfferLoading, setApplyOfferLoading] = useState<boolean>(
        sessionStorage.getItem('applyOfferLoading')
            ? JSON.parse(sessionStorage.getItem('applyOfferLoading')!)
            : false
    );

    const [checkoutLoading, setCheckoutLoading] = useState<boolean>(
        sessionStorage.getItem('applyOfferLoading')
            ? JSON.parse(sessionStorage.getItem('applyOfferLoading')!)
            : false
    );

    const store = (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    const addToCart = (item: any) => {
        // Try finding of the Item is already present in the Cart.
        const _foundItemIndex = cart.findIndex((ele) => item.id === ele.id);
        if (_foundItemIndex !== -1) {
            // If found Increment the quantity
            let newArr = [...cart];
            newArr[_foundItemIndex].quantity += 1;
            store('cart', newArr);
            setCart(newArr)

            // cartBody
            let _newCartBody: any = { ...cartBody };
            _newCartBody[item.category.name].push({ id: item.id });
            store('cartBody', _newCartBody);
            setCartBody(_newCartBody)
        } else {
            item['quantity'] = 1;
            store('cart', [...cart, item])
            setCart([...cart, item])


            let _newCartBody: any = { ...cartBody };
            if (!_newCartBody[item.category.name]) {
                // If category already not present. Create a category Key in Object and assign array.
                _newCartBody[item.category.name] = [{ id: item.id }];
            } else {
                // Else push on to the array of existing category.
                _newCartBody[item.category.name].push({ id: item.id });
            }
            store("cartBody", _newCartBody)
            setCartBody(_newCartBody)
        }

        // wipe Total Bill and Offer Suggestion.
        setOfferResponse({})
        store("offerResponse", {})

        //Add to Total 
        let totalP = total
        totalP += item.price
        store('total', totalP)
        setTotal(totalP)
    };


    const decrement = (item: any, itemIndex: number): void => {
        let newArr = [...cart];

        if (newArr[itemIndex].quantity === 1) {
            newArr.splice(itemIndex, 1);
            store("cart", newArr);
            setCart(newArr)

            // Pop Element from Cart Body
            let _newCartBody: any = { ...cartBody };
            let _toDelete = _newCartBody[item.category.name].findIndex(
                (ele: any) => ele.id === item.id
            );
            _newCartBody[item.category.name].splice(_toDelete, 1);
            store('cartBody', _newCartBody)
            setCartBody(_newCartBody)
        } else {
            newArr[itemIndex].quantity -= 1;
            store('cart', newArr);
            setCart(newArr)

            // Pop Element from Cart Body
            let _newCartBody: any = { ...cartBody };
            let _toDelete = _newCartBody[item.category.name].findIndex(
                (ele: any) => ele.id === item.id
            );
            _newCartBody[item.category.name].splice(_toDelete, 1);
            store('cartBody', _newCartBody);
            setCartBody(_newCartBody)
        }
        //Calculate Total 
        let totalP = total;
        totalP -= item.price;
        store('total', totalP)
        setTotal(totalP)
    };

    const checkForOffers = async () => {
        store("applyOfferLoading", true)
        setApplyOfferLoading(true)
        await checkOffer(cartBody).then((response) => {
            if (response && response.data) {
                store('offerResponse', response.data)
                setOfferResponse(response.data)
                store("applyOfferLoading", false)
                setApplyOfferLoading(false)
            }
        });
    };

    const checkOut = async () => {
        setCheckoutLoading(true)
        store("checkoutLoading", true)

        let total = 0;
        cart.forEach((cartItem) => (total += cartItem.quantity * cartItem.price));

        let data: any = {
            ready: false,
            userName,
            userMob,
            orderItems: cart,
            total,
        };

        await createOrder(data).then((response) => {
            if (response) {
                store('orderCreated', true);
                store('checkoutModelOpen', false);
                store('cart', [])
                setOrderCreated(true);
                setCheckoutModelOpen(false);
                setCart([]);

                commonCtx.replicateChef();
                setCheckoutLoading(false)
                store("checkoutLoading", false)
            }
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                total,
                addToCart,
                decrement,
                checkForOffers,
                offerResponse,
                checkoutModelOpen,
                setCheckoutModelOpen,
                checkOut,
                userName,
                userMob,
                setUserName,
                setUserMob,
                orderCreated,
                applyOfferLoading,
                checkoutLoading
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
