import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { createSelector } from '@reduxjs/toolkit';
import { useStore } from 'react-redux';
import { transactionsStore } from '../services/redux/transactions/constants';

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

// Criação do seletor
export const getCategoryColors = async categories => {
  try {
    const colors = await Object.fromEntries(categories.map(({ category, color }) => [category, color]));
    return colors;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default options;
