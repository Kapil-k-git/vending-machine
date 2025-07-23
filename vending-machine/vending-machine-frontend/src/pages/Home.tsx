
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChocolateList from '../components/ChocolateList';
import { Box, Container } from '@mui/material';

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="#EBF3FF">
      <Navbar />

      <Box component="main" flex={1} display="flex" justifyContent="center" alignItems="center" px={2}>
        <Container maxWidth="lg">
          <ChocolateList />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
