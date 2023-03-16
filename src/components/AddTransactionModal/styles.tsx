import { Modal, Container, Divider, AppBar } from '@mui/material';
import { styled } from '@mui/material';

const ModalContainer = styled(Modal)({
  display: 'flex',
  alignItems: 'center',

  '& *': {
    fontFamily: 'Poppins',
  },
});

const InnerContainer = styled(Container)({
  backgroundColor: '#fff',
  borderRadius: '.5rem',
});

const BorderDivider = styled(Divider)({
  width: '444px',
  marginLeft: '-24px',
});

const Bar = styled(AppBar)({
  borderRadius: '8px 8px 0 0',
  color: '#666',
  backgroundColor: '#fff',
  boxShadow: 'none',

  '& .MuiToolbar-root': {
    padding: 0,
  },

  '& .MuiTypography-root': {
    flexGrow: 1,
    color: '#666',
  },
});

export { ModalContainer, InnerContainer, BorderDivider, Bar };
