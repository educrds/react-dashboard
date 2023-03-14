import React from 'react';
import { IconButton, Toolbar } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { ModalContainer, InnerContainer, BorderDivider, Bar, BarTitle } from './styles';

import AddTransactionForm from '../AddTransactionForm';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => {};
}

const AddTransactionModal = ({ open, onClose }: AddTransactionModalProps) => (
  <ModalContainer open={open}>
    <InnerContainer maxWidth='xs'>
      <Bar position='static'>
        <Toolbar>
          <BarTitle variant='h5'>Nova receita</BarTitle>
          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </Toolbar>
      </Bar>
      <BorderDivider />
      <AddTransactionForm />
    </InnerContainer>
  </ModalContainer>
);

export default AddTransactionModal;
