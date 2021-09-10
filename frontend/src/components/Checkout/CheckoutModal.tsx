import React, { useContext } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CartContext } from "../../contexts/CartContext";
import { CommonContext } from '../../contexts/CommonContext';


export default function CheckoutModal(props: any) {
    const cartCtx: any = useContext(CartContext)

    const commonCtx: any = useContext(CommonContext)

    const handleClickOpen = () => {
        cartCtx.setCheckoutModelOpen(true)
    };

    const handleClose = () => {
        cartCtx.setCheckoutModelOpen(false)
    };

    return (
        <div>
            <Button variant="contained" fullWidth={true} onClick={handleClickOpen} style={{ padding: 10, borderRadius: 3, background: "linear-gradient(45deg, #2471a6 30%, #3a24f1 90%)", color: 'white' }}>
                {props.label}
            </Button>
            <Dialog open={cartCtx.checkoutModelOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle >Checkout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Our Chef loves to personalize orders for our customers. Kindly enter your Name and Mobile number for him to call you.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        value={cartCtx.userName}
                        onChange={e => { sessionStorage.setItem('userName', JSON.stringify(e.target.value)); cartCtx.setUserName(e.target.value) }}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Mobile Number"
                        type="number"
                        value={cartCtx.userMob}
                        onChange={e => {
                            sessionStorage.setItem('userMob', JSON.stringify(e.target.value))
                            cartCtx.setUserMob(e.target.value)
                        }}
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={cartCtx.userName === "" || cartCtx.userMob === ""} onClick={() => cartCtx.checkOut()} color="primary">
                        {
                            cartCtx.checkoutLoading ? <CircularProgress color="primary" size={24} /> : "Checkout"
                        }
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
