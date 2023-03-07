import React from 'react';
import { CheckRounded, CloseRounded } from '@mui/icons-material';
import './styles.scss';
import { Chip } from '@mui/material';

interface PaymentChipProps {
  label: string;
}

const PaymentChip = ({ label }: PaymentChipProps) => {
  const isPaid = label === 'Pago' || label === 'Recebido';
  const icon = isPaid ? <CheckRounded /> : <CloseRounded />;
  const color = isPaid ? 'check' : 'error';

  return <Chip label={label} icon={icon} className={`payment__chip ${color}`} />;
};

export default PaymentChip;
