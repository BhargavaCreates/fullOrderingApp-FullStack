import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    tabPanelContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    tabPanel: {
        flex: 1,
        borderRadius: "6px",
        margin: "0 10px",
        marginBottom: "5px"
    },
    tabPanelPaper: {
        padding: '10px',
        marginBottom: "10px"
    },
    dishTitle: {
        fontWeight: 500,
        textAlign: 'left'
    },
    dishAddToCart: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white'
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export { useStyles };