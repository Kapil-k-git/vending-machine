import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      mt={12}
      py={5}
      textAlign="center"
      sx={{
        background: 'linear-gradient(to right, #9333ea, #ec4899)',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.875rem', 
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} CandyCo. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
