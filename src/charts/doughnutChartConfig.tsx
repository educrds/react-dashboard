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

export const categoryColors = {
  Serviços: '#8ecae6',
  Aluguel: '#219ebc',
  Casa: '#023047',
  Lazer: '#ffb703',
  Internet: '#fb8500',
  Mercado: '#d62828',
  Mensalidades: '#60d394',
  Receita: '#60d394',
  'Outras receitas': '#90be6d',
  Outros: '#bfbfbf',
};

export default options;
