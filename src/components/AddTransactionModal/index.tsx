import React from 'react';
import { IconButton, Toolbar, Typography } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import AddTransactionForm from '../AddTransactionForm';
import { ModalContainer, InnerContainer, BorderDivider, Bar } from './styles';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => {};
  type: string;
  transactionToEdit?: string;
}

const AddTransactionModal = ({
  open,
  onClose,
  type,
  transactionToEdit,
}: AddTransactionModalProps) => {
  
  const transactionType = type === 'revenues' ? 'Nova receita' : 'Nova despesa';

  return (
    <ModalContainer open={open}>
      <InnerContainer maxWidth='xs'>
        <Bar position='static'>
          <Toolbar>
            <Typography variant='h5'>{transactionType}</Typography>
            <IconButton onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Toolbar>
        </Bar>
        <BorderDivider />
        <AddTransactionForm
          transactionType={type}
          transactionToEdit={transactionToEdit}
          onClose={onClose}
        />
      </InnerContainer>
    </ModalContainer>
  );
};

export default AddTransactionModal;
