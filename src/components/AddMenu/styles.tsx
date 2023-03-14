import { styled } from '@mui/system';
import { Paper, Typography } from '@mui/material';

const PaperContainer = styled(Paper)({
  width: 175,
  position: 'absolute',
  borderRadius: '.5rem',
  top: '62px',
  zIndex: 1,
  padding: 0,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 3px 5px',
  transition: 'all 0.5s ease-in-out',
  fontFamily: 'Poppins',
});

const ItemText = styled(Typography)({
  fontFamily: 'Poppins',
});

export { PaperContainer, ItemText };
