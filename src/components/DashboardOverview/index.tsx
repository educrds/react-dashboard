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

interface DataItem {
  title: string;
  value: string;
  color: string;
  icon: ElementType;
  to?: string;
}

const data: DataItem[] = [
  {
    title: 'Receitas',
    value: 'R$5.000',
    color: 'icon__green',
    icon: <TrendingUpRounded />,
    to: '/receitas',
  },
  { title: 'Balanço', value: 'R$2.000', color: 'icon__grey', icon: <AccountBalanceOutlined /> },
  {
    title: 'Despesas',
    value: 'R$3.000',
    color: 'icon__red',
    icon: <TrendingDownRounded />,
    to: '/despesas',
  },
];

const DashboardOverview = () => {
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
