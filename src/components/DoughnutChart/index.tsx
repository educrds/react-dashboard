import React, { useEffect, useState } from 'react';
import DashboardItem from '../DashboardItem';
import { Doughnut } from 'react-chartjs-2';
import options from '../../charts/doughnutChartConfig';
import { getCategoryColors } from '../../charts/doughnutChartConfig';
import { useSelector } from 'react-redux';

type DoughnutChartProps = {
  title: string;
  labels: string[];
  data: number[];
  colors: string[];
  backgroundColor: string[];
  fallbackLabel: string;
};

// const labelCenter = {
//   beforeDatasetsDraw(chart) {
//     const { ctx } = chart;
//     if (chart.data.datasets[0]) {
//       const total = `R$ ${chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0)}`;
//       const fontSize = 16;
//       ctx.font = `medium ${fontSize}px Poppins`;
//       ctx.textAlign = 'center';
//       ctx.baseline = 'middle';
//       ctx.fillStyle = '#bfbfbf';
//       const x = chart.getDatasetMeta(0).data[0].x;
//       const y = chart.getDatasetMeta(0).data[0].y;
//       ctx.fillText(total, x, y);
//       ctx.save();
//     }
//   },
// };

const DoughnutChart = ({
  title,
  labels,
  data,
  fallbackLabel = 'Sem dados',
}: DoughnutChartProps) => {
  const [categoriesByColor, setCategoriesByColor] = useState(null);
  const categories = useSelector((state: any) => state.categories.categories);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    const fetchCategoryColors = async () => {
      try {
        const colors = await getCategoryColors(categories);
        setCategoriesByColor(colors);
        setDataReady(true);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    if (categories) {
      fetchCategoryColors();
    }
  }, [categories]);

  const configureChartData = () => {
    if (!dataReady || !categoriesByColor) {
      return null;
    }

    return {
      labels: data.length > 0 ? labels : [fallbackLabel],
      datasets: [
        {
          data: data.length > 0 ? data : [1],
          backgroundColor: data.length > 0
            ? labels.map(label => categoriesByColor[label])
            : '#bfbfbf',
        },
      ],
    };
  };
  const chartData = configureChartData();

  if (!dataReady) {
    return <div>Carregando...</div>; // ou null, dependendo do comportamento desejado
  }

  const chartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: { ...options.plugins.title, text: title },
    },
  };

  return (
    <DashboardItem>
      <Doughnut options={chartOptions} data={chartData} />
    </DashboardItem>
  );
};

export default DoughnutChart;
