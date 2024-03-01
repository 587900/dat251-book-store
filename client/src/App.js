import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Commerce Site
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Products</Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Featured Products
          </Typography>
          {/* Example grid for product layout */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center" p={1} border={1}>
                <Typography variant="subtitle1">Product 1</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center" p={1} border={1}>
                <Typography variant="subtitle1">Product 2</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center" p={1} border={1}>
                <Typography variant="subtitle1">Product 3</Typography>
              </Box>
            </Grid>
            {/* Add more products as needed */}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
