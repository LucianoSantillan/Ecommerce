import React, { FC } from 'react';
import '../App.css';
import logo from '../assets/images/logo.png';
import logoNombre from '../assets/images/logo-nombre.webp';
import { IconButton } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

export function Navbar() {
    return (
        <div style={{
            width: '100%',
            background: '#fff',
            padding: '6px',
            marginBottom: '20px',
            boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',

        }}><div
            className='container'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: 'auto'
            }}>
                <div>
                    <img src={logo} alt="" height={'60px'} />
                    <img src={logoNombre} alt="" height={'60px'} style={{ marginLeft: '-35px' }} />
                </div>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                ><ShoppingCart /></IconButton>
            </div>
        </div>);
}