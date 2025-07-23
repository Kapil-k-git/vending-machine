import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #9333ea, #ec4899)',
        boxShadow: 3,
      }}
    >
      <Toolbar>
        <Typography variant="h5" fontWeight="bold">
           Vending Machine
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
