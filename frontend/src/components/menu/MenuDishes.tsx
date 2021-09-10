import React, { useContext } from 'react'
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useStyles } from "./MenuDishes.styles"
import { CartContext } from "../../contexts/CartContext"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  className: any;
  data: any;
}


export default function MenuDishes(props: any) {
  const classes = useStyles()

  const cartCtx: any = useContext(CartContext)


  const handleAddToCart = (item: any) => {


    cartCtx.addToCart(item)
  }


  function TabPanel(props: TabPanelProps) {
    const { children, value, data, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && data && (
          data.map((item: any, itemIndex: any) => {
            return (
              <Paper className={classes.tabPanelPaper}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6" className={classes.dishTitle} >
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">
                      ${(item.price).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button className={classes.dishAddToCart} onClick={() => handleAddToCart(item)}>
                      <AddShoppingCartIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            )
          })
        )}
      </div>
    );
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={props.loadingMenu}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TabPanel data={props.data} className={classes.tabPanel} value={props.value} index={props.value} />
    </>
  )
}