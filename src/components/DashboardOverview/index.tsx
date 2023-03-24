import {
  AccountBalanceOutlined,
  TrendingDownRounded,
  TrendingUpRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React, { ElementType } from 'react';
import DashboardItem from '../DashboardItem';
import './styles.scss';
import { useSelector } from 'react-redux';
import { getFilteredTransactions } from '../../services/transactions';

interface DataItem {
  title: string;
  value: string;
  color: string;
  icon: ElementType;
  to?: string;
}

const DashboardOverview = () => {
  const sumTransactionsByType = (type: string) =>
    useSelector(getFilteredTransactions(type))
      .filter(transaction => transaction.type === type)
      .reduce((total, transaction) => total + transaction.value, 0);

  const revenuesSum = sumTransactionsByType('revenues');
  const expensesSum = sumTransactionsByType('expenses');

  const data: DataItem[] = [
    {
      title: 'Receitas',
      value: `R$${revenuesSum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: 'icon__green',
      icon: <TrendingUpRounded />,
      to: '/receitas',
    },
    {
      title: 'Balanço',
      value: `R$${(revenuesSum - expensesSum).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}`,
      color: 'icon__grey',
      icon: <AccountBalanceOutlined />,
    },
    {
      title: 'Despesas',
      value: `R$${expensesSum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: 'icon__red',
      icon: <TrendingDownRounded />,
      to: '/despesas',
    },
  ];

  return (
    <DashboardItem>
      {data.map((square, i) => (
        <DashboardItemSquare key={i} {...square} />
      ))}
    </DashboardItem>
  );
};

interface DashboardItemSquareProps extends DataItem {}

const DashboardItemSquare = ({ title, value, color, icon, to }: DashboardItemSquareProps) => {
  return (
    <div className='dashboard__item__square'>
      <div>
        <div className='item__square__title'>
          <div className={`item__square__title ${color}`}>{icon}</div>
          {to ? (
            <Link to={to}>
              <span>{title}</span>
              <KeyboardArrowRightRounded />
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </div>
        <div className='item__square__value'>{value}</div>
      </div>
    </div>
  );
};

export default DashboardOverview;
