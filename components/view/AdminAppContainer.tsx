import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useCallback, useState } from 'react';
import AdminAppBar from './AdminAppBar';
import AdminDrawer from './AdminDrawer';
import useUserInfo from '../hooks/useUserInfo';

export interface AppAdminContainerProps {
    title: string
}

const AppAdminContainer: React.FC<AppAdminContainerProps> = (props) => {
    const [open, setOpen] = useState(true);

    const userInfo = useUserInfo()

    const toggleDrawer = useCallback(() => {
        setOpen(!open);
    }, [open]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AdminAppBar title={props.title} open={open} toggle={toggleDrawer}></AdminAppBar>
            <AdminDrawer open={open} toggle={toggleDrawer}></AdminDrawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {props.children}
                </Container>
            </Box>
        </Box>
    );
}

export default AppAdminContainer