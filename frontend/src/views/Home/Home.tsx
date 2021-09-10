import React from 'react'
import { Container, Grid, Paper } from '@material-ui/core';
import { useStyles } from './Home.styles';
import MenuTab from '../../components/menu/MenuTab';
import Cart from '../../components/Cart/Cart';

export default function Home() {
    const classes = useStyles();

    return (
        <>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <MenuTab />
                                </Grid>
                                <Grid item xs={4}>
                                    <Cart />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
