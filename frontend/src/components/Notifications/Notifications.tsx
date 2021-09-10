import React, { useContext } from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { CartContext } from "../../contexts/CartContext";
import { CommonContext } from '../../contexts/CommonContext';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { Grid, Button, Box, Typography, Snackbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" size="4rem" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography style={{ fontSize: "18px" }} variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        orderCompleteMessage: {
            fontSize: '22px'
        }, newOrderButton: {
            padding: 10,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #3a24f1 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white'
        }
    }),
);


export default function Notifications() {
    const classes = useStyles();
    const cartCtx: any = useContext(CartContext);
    const commonCtx: any = useContext(CommonContext);


    return (
        <>
            {
                cartCtx.orderCreated && (
                    <Grid container justifyContent="space-between" direction="column" alignItems="center" spacing={5}>
                        <Grid item >
                            <Alert className={classes.orderCompleteMessage} severity="success" action={
                                <Button >

                                    <CircularProgressWithLabel value={commonCtx.progress} />

                                </Button>
                            }>
                                <AlertTitle style={{ fontSize: "18px" }}>Thank you! {sessionStorage.getItem("userName") && JSON.parse(sessionStorage.getItem("userName")!)}, Your Order has Successfully been placed!</AlertTitle>
                                We are super quick with our orders! Give us 2 mins.
                            </Alert>
                            <Snackbar open={!commonCtx.cooking} autoHideDuration={6000} >
                                <Alert className={classes.orderCompleteMessage} severity="success">
                                    Hi there {sessionStorage.getItem("userName") && JSON.parse(sessionStorage.getItem("userName")!)}, Thank you for waiting! Good Cooking takes a bit of Time. Your Order is ready for Pickup.
                                </Alert>
                            </Snackbar>
                        </Grid>
                        <Grid item >
                            <Button className={classes.newOrderButton} fullWidth={true} onClick={() => {
                                sessionStorage.clear()
                                window.location.reload(false);
                            }}>
                                place new Order
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}
