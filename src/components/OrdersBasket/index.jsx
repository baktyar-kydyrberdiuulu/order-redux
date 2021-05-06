import React, { useEffect } from 'react'
import { data } from '../../store/data'
import { useSelector, useDispatch } from 'react-redux'
import { add_order, DELETE_ORDER, delete_order } from '../../store/actions'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
// alert
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';




function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const OrderBasket = () => {
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders))
    }, [orders])
    // alert
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    return <div style={styles.orderContainer}>
        <div style={styles.menuContainer}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Заказ успешно добавлен!
        </Alert>
            </Snackbar>
            <h1>Menu</h1>
            <MenuList>
                {
                    data.map((el, id) => {
                        return <Tooltip title="Добавить в заказы">
                            <MenuItem
                                onClick={() => {
                                    dispatch(add_order(el))
                                    handleClick()
                                }}
                                style={{ cursor: 'pointer' }}
                                key={id} >
                                {el.title} <b>{el.price}</b>
                            </MenuItem>
                        </Tooltip>
                    })
                }
            </MenuList>
        </div>
        <div style={styles.basketContainer}>
            <h1>Orders</h1>
            <MenuList>
                {
                    orders ? orders.map((el, id) => {
                        return <MenuItem key={id}>
                            <span>{el.title} </span>
                            <b>: {el.price} * {el.count} = {el.sum}</b>
                            <span onClick={() => dispatch(delete_order(el))}>
                                <DeleteIcon />
                            </span>
                        </MenuItem>
                    })
                        : <div>
                            <Skeleton />
                            <Skeleton animation={false} />
                            <Skeleton animation="wave" />
                        </div>
                }
            </MenuList>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Заказ успешно добавлен!
        </Alert>
        </Snackbar>
    </div>
}
const styles = {
    orderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuContainer: {
        width: '50%',
    },
    basketContainer: {
        width: '50%'
    }
}