import { useContext } from "react";

import Link from "next/link"

import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import Badge from "@mui/material/Badge"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import store from "../../store"
import useMounted from "../hooks/useMounted"

const CartButton = () => {
    const storeValue = useContext(store)

    const hasMounted = useMounted();

    return (
        <Box sx={{
            position: 'fixed',
            justifyContent: "center",
            top: 'auto',
            bottom: '0',
            width: "100%",
            display: 'flex',
            zIndex: 0xffff
        }}>
            <Box maxWidth="xl" sx={{
                position: 'relative',
                width: "100%",
            }}>
                <Box sx={{
                    position: 'absolute',
                    right: '3rem',
                    bottom: '3rem',
                    left: 'auto',
                    top: 'auto'
                }}>
                    <Link href="/cart">
                        <Badge
                            badgeContent={hasMounted ? storeValue.data.cart.items.length : 0}
                            color="warning"
                            overlap="rectangular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}>
                            <Fab color="primary" aria-label="shopping-cart" >
                                <ShoppingCartIcon />
                            </Fab>
                        </Badge>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default CartButton