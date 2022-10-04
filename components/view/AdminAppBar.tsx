

import Typography from '@mui/material/Typography';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import useAnchorOpenHandle from '../hooks/useAnchorOpenHandle';

import useUserInfo from '../hooks/useUserInfo';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import useRedirectableRouterPushCallback from '../hooks/useRedirect'
import words from '../../config/words';

import { width as drawerWidth } from '../commonSettings/drawer'
import { userSettings, loginOptions } from '../commonSettings/navMenu'

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const MuiAppBarStyled = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export interface AdminAppBarProps {
    title: string
    open: boolean
    toggle: () => void
}

const AdminAppBar: React.FC<AdminAppBarProps> = (props) => {
    const [anchorElUser, handleOpenUserMenu, handleCloseUserMenu] = useAnchorOpenHandle()

    const router = useRouter()

    const userInfo = useUserInfo()

    const login = useRedirectableRouterPushCallback("/login")
    const register = useRedirectableRouterPushCallback("/register")
    const logout = useRedirectableRouterPushCallback("/logout")

    const avatarLink = userInfo.id ? `/static/images/avatar/${userInfo.id}` : null

    const open = props.open
    const toggleDrawer = props.toggle

    return <MuiAppBarStyled position="absolute" open={open}>
        <Toolbar
            sx={{
                pr: '24px', // keep right padding when drawer closed
            }}
        >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                {props.title}
            </Typography>
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
                            router.push(link)
                        }}>
                            <Typography textAlign="center" >{name}</Typography>
                        </MenuItem>
                    })}
                </Menu>
            </Box>
        </Toolbar>
    </MuiAppBarStyled>
}

export default AdminAppBar