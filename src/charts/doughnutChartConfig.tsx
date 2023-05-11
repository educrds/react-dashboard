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
  { category: 'Serviços', type: 'expense', color: '#402dec' },
  { category: 'Aluguel', type: 'expense', color: '#a654cc' },
  { category: 'Farmácia', type: 'expense', color: '#70cee6' },
  { category: 'Vestuário', type: 'expense', color: '#5b9436' },
  { category: 'Casa', type: 'expense', color: '#023047' },
  { category: 'Lazer', type: 'expense', color: '#ffb703' },
  { category: 'Internet', type: 'expense', color: '#fb8500' },
  { category: 'Alimentos', type: 'expense', color: '#d62828' },
  { category: 'Transporte', type: 'expense', color: '#e76f51' },
  { category: 'Faculdade', type: 'expense', color: '#e74f81' },
  { category: 'Saúde', type: 'expense', color: '#a54e80' },
  { category: 'Salário', type: 'revenue', color: '#60d394' },
  { category: 'Mercado', type: 'expense', color: '#466334' },
  { category: 'Outras receitas', type: 'revenue', color: '#5b9436' },
  { category: 'Saldo', type: 'revenue', color: '#a2dd7a' },
  { category: 'Outras despesas', type: 'expense', color: '#bfbfbf' },
];

export const categoryColors = Object.fromEntries(
  categories.map(({ category, color }) => [category, color])
);

export default options;
