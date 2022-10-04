import shopItemImage from "../../images/shop-item-demo.jpg"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState, useContext } from "react";
import Link from "next/link"

import store from "../../store"

const ShopItemData = {
    name: 'SKIRT [BLACK] 鳥籠 ❖ 囚'
}

export default function ActionAreaCard() {



    const { data, setData } = useContext(store);

    const [size, setSize] = useState<"S" | "M" | "L">("M")
    const [color, setColor] = useState<"Black" | "White">("Black")

    const map = { S: 20000, M: 24000, L: 24000 }

    let price = map[size] + (color === "White" ? 2000 : 0)

    const handleChangeSize = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: "S" | "M" | "L") => {
        setSize(value)
    }

    const handleChangeColor = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: "Black" | "White") => {
        setColor(value)
    }

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={shopItemImage.src}
                    alt="鳥籠 ❖ 囚 SKIRT [BLACK]"
                />
                <CardContent>
                    <Typography variant="body1">
                        SKIRT [BLACK] 鳥籠 ❖ 囚
                    </Typography>
                    <Typography variant="body1">
                        ￥ {price}
                    </Typography>
                    <ToggleButtonGroup
                        color="secondary"
                        value={size}
                        exclusive
                        onChange={handleChangeSize}
                    >
                        <ToggleButton value="S" color="secondary">S</ToggleButton>
                        <ToggleButton value="M" color="secondary">M</ToggleButton>
                        <ToggleButton value="L" color="secondary">L</ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        color="secondary"
                        value={color}
                        exclusive
                        onChange={handleChangeColor}
                    >
                        <ToggleButton value="Black" color="secondary">BLCAK</ToggleButton>
                        <ToggleButton value="White" color="secondary">WHITE</ToggleButton>
                    </ToggleButtonGroup>
                    <Link href="/shop/EE22091"><Button variant="outlined" color="warning">Details</Button></Link>
                    <Button variant="outlined" color="warning" onClick={() => {
                        const newData = { ...data }
                        newData.cart.items = [...newData.cart.items, {
                            id: 'EE22091',
                            name: 'SKIRT [BLACK] 鳥籠 ❖ 囚',
                            size: size,
                            color: color,
                            amount: 1,
                            price: price
                        }]
                        setData(newData)
                    }}>Add</Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}