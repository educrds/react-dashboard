import React from 'react';
import { CheckRounded, CloseRounded } from '@mui/icons-material';
import './styles.scss';

interface PaymentChipProps {
  status: string;
  label: string;
}

const PaymentChip = ({ label }: PaymentChipProps) => {
  const isPaid = label === 'Pago' || label === 'Recebido';
  const icon = isPaid ? <CheckRounded /> : <CloseRounded />;
  const color = isPaid ? 'check' : 'error';

  return (
    <div className={`payment__chip ${color}`}>
      <div className='payment__icon'>{icon}</div>
      <div className='payment__label'>{label}</div>
    </div>
  );
};

export default PaymentChip;
