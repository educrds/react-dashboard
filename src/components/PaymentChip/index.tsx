import React from 'react';
import { CheckRounded, CloseRounded } from '@mui/icons-material';
import { Chip } from '@mui/material';
import './styles.scss';

interface PaymentChipProps {
  label: string;
}

const PaymentChip = ({ label }: PaymentChipProps) => {
  const isPaid = label === 'Paga' || label === 'Recebida';
  const icon = isPaid ? <CheckRounded /> : <CloseRounded />;
  const color = isPaid ? 'check' : 'error';

  return <Chip label={label} icon={icon} className={`payment__chip ${color}`} />;
};

export default PaymentChip;
