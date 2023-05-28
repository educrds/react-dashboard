import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { createSelector } from '@reduxjs/toolkit';

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

// Função de seleção
const selectCategories = state => state.categories;

// Criação do seletor
const getCategoryColors = createSelector(
  selectCategories,
  categories => Object.fromEntries(
    categories.map(({ category, color }) => [category, color])
  )
);

// Exemplo de uso do seletor
export const categoryColors = getCategoryColors(store.getState());

export default options;
