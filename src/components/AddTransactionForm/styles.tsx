import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material';

const MainGrid = styled(Grid)({
  marginTop: '3vh',
  marginBottom: '3vh',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '3.5vh',

  '& .MuiSvgIcon-root': {
    color: '#888',
  },
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
  marginTop: '2vh',
  marginBottom: '1.5vh',

  '& .MuiButtonBase-root': {
    backgroundColor: '#666',
    borderRadius: '.5rem',
    textTransform: 'capitalize',
    paddingLeft: '3vw',
    paddingRight: '3vw',
    fontSize: '1rem',
  },
});

const ToggleContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '-16px',

  '& .MuiFormControlLabel-root': {
    marginRight: 0,
    fontFamily: 'Poppins',
    color: '#bfbfbf',
  },
});

export { MainGrid, InputBoxIcon, ButtonBox, ToggleContainer };
