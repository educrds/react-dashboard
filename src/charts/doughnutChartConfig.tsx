import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#bfbfbf',
        font: {
          size: 13,
          family: 'Poppins',
        },
        usePointStyle: true,
        padding: 15,
      },
    },
  },
  borderWidth: 0,
  radius: 90,
  cutout: 60,
  hoverOffset: 5,
};

interface Category {
  category: string;
  type: 'receita' | 'despesa';
  color: string;
}

export const categories: Category[] = [
  { category: 'Serviços', type: 'despesa', color: '#8ecae6' },
  { category: 'Aluguel', type: 'despesa', color: '#219ebc' },
  { category: 'Casa', type: 'despesa', color: '#023047' },
  { category: 'Lazer', type: 'despesa', color: '#ffb703' },
  { category: 'Internet', type: 'despesa', color: '#fb8500' },
  { category: 'Mercado', type: 'despesa', color: '#d62828' },
  { category: 'Mensalidades', type: 'despesa', color: '#60d394' },
  { category: 'Transporte', type: 'despesa', color: '#e76f51' },
  { category: 'Salário', type: 'receita', color: '#60d394' },
  { category: 'Outras receitas', type: 'receita', color: '#90be6d' },
  { category: 'Outras despesas', type: 'despesa', color: '#bfbfbf' },
];

export const categoryColors = categories.reduce((colors, category) => {
  return {
    ...colors,
    [category.category]: category.color,
  };
}, {});

export default options;
