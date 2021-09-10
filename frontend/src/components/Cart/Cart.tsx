import React, { useContext } from 'react'
import { useStyles } from "./Cart.styles"
import { Grid, Paper, Typography, IconButton, Button, CircularProgress } from "@material-ui/core"
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import { CartContext } from "../../contexts/CartContext"
import CheckoutModal from '../Checkout/CheckoutModal';
import Notifications from '../Notifications/Notifications';

export default function Cart() {
    const classes = useStyles()

    const cartCtx: any = useContext(CartContext)


    return (
        <div className={classes.root}>
            {
                cartCtx.cart.length !== 0 ? (
                    <Paper className={classes.cartPaper}>
                        <Typography variant="h5" className={classes.cartTitle}>
                            Cart
                        </Typography>
                        {

                            cartCtx.cart.map((item: any, itemIndex: number) => {
                                return (
                                    <>
                                        <Grid container spacing={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Grid item xs={8}>
                                                <Grid container direction="column" alignItems="flex-start">
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6" className={classes.cartItemName}>
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption" className={classes.cartItemQuantity}>
                                                            ${item.price} x {item.quantity}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="h6" className={classes.cartItemTotal}>
                                                    ${item.quantity * item.price}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton color="secondary" aria-label="decrement" onClick={() => cartCtx.decrement(item, itemIndex)}>
                                                    <IndeterminateCheckBoxRoundedIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </>
                                )

                            })
                        }
                        {/* </Paper> */}
                        <Grid spacing={3} container justifyContent="center">
                            <Grid item xs={10}>
                                <Typography align="right" variant="h6">Bill: ${cartCtx.total}</Typography>
                            </Grid>

                            {
                                Object.keys(cartCtx.offerResponse).length !== 0 && (
                                    <Grid item xs={10}>

                                        {
                                            cartCtx.offerResponse.totalDiscount !== "0.00" && (
                                                <Typography align="right" variant="h6">Discount: -${cartCtx.offerResponse.totalDiscount}</Typography>
                                            )
                                        }

                                        <Typography align="right" variant="h6">To Pay: ${cartCtx.offerResponse.amountAfterDiscout}</Typography>
                                        <Typography align="center" variant="caption">{

                                            cartCtx.offerResponse && cartCtx.offerResponse.message && cartCtx.offerResponse.message.map((message: String) => {
                                                return (
                                                    <Typography variant="body1" style={{ color: "red" }}>
                                                        *{message}
                                                    </Typography>
                                                )
                                            })
                                        }</Typography>
                                    </Grid>
                                )
                            }

                        </Grid>
                        <Grid spacing={4} container justifyContent="center" style={{ padding: "10px 0" }}>
                            <Grid item xs={4}>
                                {
                                    (
                                        <Button className={classes.cartApplyOffer} fullWidth={true} onClick={() => cartCtx.checkForOffers()}>
                                            {
                                                cartCtx.applyOfferLoading ? <CircularProgress color="primary" size={24} /> : "Appy Offers"
                                            }

                                        </Button>
                                    )
                                }
                            </Grid>
                            <Grid item xs={4}>
                                <CheckoutModal label="Checkout" />
                            </Grid>
                        </Grid>
                    </Paper>
                ) : (
                    <>
                        {
                            cartCtx.orderCreated ? (<Notifications />) : (
                                <>
                                    <Grid>
                                        <Typography>Your Cart is Currently Empty</Typography>
                                    </Grid>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}
