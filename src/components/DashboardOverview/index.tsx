import DashboardItem from '../DashboardItem';
import './styles.scss';

const data = [
  { title: 'Receitas', value: 'R$5.000', color: 'circle__green' },
  { title: 'Balanço', value: 'R$2.000', color: 'circle__blue' },
  { title: 'Despesas', value: 'R$3.000', color: 'circle__red' },
];

const DashboardOverview = () => {
  return (
    <DashboardItem>
      {data.map((square, i) => <DashboardItemSquare key={i} {...square} /> )}
    </DashboardItem>
  );
};

interface DashboardItemSquareProps {
  title: string;
  value: string;
  color: string;
}

const DashboardItemSquare = ({ title, value, color }: DashboardItemSquareProps) => {
  return (
    <div className='dashboard__item__square'>
      <div>
        <div className='item__square__title'>
          <div className={`item__square__circle ${color}`}></div>
          <span>{title}</span>
        </div>
        <div className='item__square__value'>{value}</div>
      </div>
    </div>
  );
};

export default DashboardOverview;
