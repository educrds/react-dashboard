import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material';

const MainGrid = styled(Grid)({
  marginTop: '3vh',
  marginBottom: '3vh',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '4vh',
});

const InputBoxIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1vw',
  color: '#666',
});

const ButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignSelf: 'flex-end',
});

export { MainGrid, InputBoxIcon, ButtonBox };
