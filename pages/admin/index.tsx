
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import AdminAppContainer from "../../components/view/AdminAppContainer"

const AdminUserPage: React.FC = () => {
  return <AdminAppContainer title="User">
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          aaaaa
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          aaaaa
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          aaaaa
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          aaaaa
        </Paper>
      </Grid>
    </Grid>
  </AdminAppContainer>
}

export default AdminUserPage