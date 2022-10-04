import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from "next/image"
import Link from "next/link"

import logoImage from "../../images/logo.png"
import useAnchorOpenHandle from '../hooks/useAnchorOpenHandle';
import useUserInfo from '../hooks/useUserInfo';
import useRedirect from '../hooks/useRedirect';
import useRedirectTo from '../hooks/useRedirectTo';

import { userSettings, loginOptions, pages } from '../commonSettings/navMenu'
import words from '../../config/words';

const AppBar = () => {
    const [anchorElNav, handleOpenNavMenu, handleCloseNavMenu] = useAnchorOpenHandle()
    const [anchorElUser, handleOpenUserMenu, handleCloseUserMenu] = useAnchorOpenHandle()

    const redirectTo = useRedirectTo()

    const userInfo = useUserInfo()

    const login = useRedirect("/login")
    const register = useRedirect("/register")
    const logout = useRedirect("/logout")

    const avatarLink = userInfo.id ? `/static/images/avatar/${userInfo.id}` : null

    return (
        <MuiAppBar position="fixed" style={{
            zIndex: 500
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* big screen logo */}
                    <Link href="/">
                        <Box component="a" sx={{ mr: 2, minWidth: "150px", maxWidth: "200px", cursor: "pointer", display: { xs: 'none', md: 'flex' } }}>
                            <Image src={logoImage} />
                        </Box>
                    </Link>

                    {/* small screen menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({ link, name }, index) => (
                                <Link href={link} key={index} >
                                    <MenuItem component="a" onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    {/* small screen Logo */}
                    <Box component="a" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Link href="/">
                            <Box sx={{ minWidth: "150px", maxWidth: "200px", cursor: "pointer", display: 'flex' }}>
                                <Image src={logoImage} />
                            </Box>
                        </Link>
                    </Box>

                    {/* big screen nav */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({ link, name }, index) => (
                            <Link href={link} key={index}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    {name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/* small screen user info */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={words.site.titles.settings}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userInfo.name || ""} src={userInfo.id ? avatarLink : void 0} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px', }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {(!userInfo.id ? loginOptions : userSettings).map(({ name, link }, index) => {

                                if (link === '/login') {
                                    return <MenuItem key={index} onClick={() => {
                                        handleCloseUserMenu()
                                        login()
                                    }}>
                                        <Typography textAlign="center" >{name}</Typography>
                                    </MenuItem>
                                }

                                if (link === '/register') {
                                    return <MenuItem key={index} onClick={() => {
                                        handleCloseUserMenu()
                                        register()
                                    }}>
                                        <Typography textAlign="center" >{name}</Typography>
                                    </MenuItem>
                                }

                                if (link === '/logout') {
                                    return <MenuItem key={index} onClick={() => {
                                        handleCloseUserMenu()
                                        logout()
                                    }}>
                                        <Typography textAlign="center">{name}</Typography>
                                    </MenuItem>
                                }

                                return <MenuItem key={index} onClick={() => {
                                    handleCloseUserMenu()
                                    redirectTo(link)
                                }}>
                                    <Typography textAlign="center" >{name}</Typography>
                                </MenuItem>
                            })}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </MuiAppBar >
    );
};

export default AppBar