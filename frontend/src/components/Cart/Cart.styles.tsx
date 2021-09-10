import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    borderRadius: '6px'
  },
  cartPaper: {
    padding: theme.spacing(1),
  },
  cartTitle: {
    // padding: theme.spacing(1),
    fontWeight: 500,
    textTransform: 'uppercase',
    opacity: 0.7
  },
  cartItemContainer: {
    margin: "10px",
    padding: "10px",
  },
  cartItemName: {
    flex: 1,
    textAlign: "left",
    fontWeight: 300
  },
  cartItemTotal: {
    fontSize: "20px",
    fontWeight: 300
  },
  cartItemQuantity: {
    fontSize: "16px",
  },
  cartApplyOffer: {
    padding: 10,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #3a24f1 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white'
  }
  ,
  cartCheckoutButton: {
    padding: 10,
    background: 'linear-gradient(45deg, #2471a6 30%, #3a24f1 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white'
  }

}));

export { useStyles };