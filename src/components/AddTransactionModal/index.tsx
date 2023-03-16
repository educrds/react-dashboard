import React from 'react';
import { IconButton, Toolbar } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { ModalContainer, InnerContainer, BorderDivider, Bar, BarTitle } from './styles';

import AddTransactionForm from '../AddTransactionForm';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => {};
  type: string;
}

const AddTransactionModal = ({ open, onClose, type }: AddTransactionModalProps) => {
  const transactionType = type === 'receita' ? 'Nova receita' : 'Nova despesa';

  return (
    <ModalContainer open={open}>
      <InnerContainer maxWidth='xs'>
        <Bar position='static'>
          <Toolbar>
            <BarTitle variant='h5'>{transactionType}</BarTitle>
            <IconButton onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Toolbar>
        </Bar>
        <BorderDivider />
        <AddTransactionForm transactionType={type} />
      </InnerContainer>
    </ModalContainer>
  );
};

export default AddTransactionModal;
