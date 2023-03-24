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
  type: 'revenue' | 'expense';
  color: string;
}

export const categories: Category[] = [
  { category: 'Serviços', type: 'expense', color: '#8ecae6' },
  { category: 'Aluguel', type: 'expense', color: '#219ebc' },
  { category: 'Casa', type: 'expense', color: '#023047' },
  { category: 'Lazer', type: 'expense', color: '#ffb703' },
  { category: 'Internet', type: 'expense', color: '#fb8500' },
  { category: 'Mercado', type: 'expense', color: '#d62828' },
  { category: 'Mensalidades', type: 'expense', color: '#60d394' },
  { category: 'Transporte', type: 'expense', color: '#e76f51' },
  { category: 'Salário', type: 'revenue', color: '#60d394' },
  { category: 'Outras receitas', type: 'revenue', color: '#90be6d' },
  { category: 'Outras despesas', type: 'expense', color: '#bfbfbf' },
];

export const categoryColors = Object.fromEntries(
  categories.map(({ category, color }) => [category, color])
);

export default options;
