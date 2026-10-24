import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

const DebtChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const debtData = [
      { year: 1995, debt: 58.0 }, { year: 1996, debt: 59.2 }, { year: 1997, debt: 61.3 },
      { year: 1998, debt: 61.2 }, { year: 1999, debt: 60.9 }, { year: 2000, debt: 59.4 },
      { year: 2001, debt: 59.2 }, { year: 2002, debt: 60.3 }, { year: 2003, debt: 64.4 },
      { year: 2004, debt: 65.9 }, { year: 2005, debt: 67.4 }, { year: 2006, debt: 64.6 },
      { year: 2007, debt: 65.8 }, { year: 2008, debt: 68.8 }, { year: 2009, debt: 83.0 },
      { year: 2010, debt: 85.3 }, { year: 2011, debt: 87.8 }, { year: 2012, debt: 90.6 },
      { year: 2013, debt: 93.4 }, { year: 2014, debt: 94.9 }, { year: 2015, debt: 95.6 },
      { year: 2016, debt: 96.6 }, { year: 2017, debt: 98.1 }, { year: 2018, debt: 98.1 },
      { year: 2019, debt: 97.4 }, { year: 2020, debt: 115.0 }, { year: 2021, debt: 112.9 },
      { year: 2022, debt: 111.8 }, { year: 2023, debt: 110.6 }, { year: 2024, debt: 112.2 },
      { year: 2025, debt: 112.8 }
    ];

    const labels = debtData.map(d => d.year);
    const values = debtData.map(d => d.debt);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Dette publique (% du PIB)',
          data: values,
          borderColor: '#1e3c72',
          backgroundColor: 'rgba(30, 60, 114, 0.1)',
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#1e3c72',
          tension: 0.2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Évolution de la dette publique française (1995-2025)',
            font: { size: 18, weight: 'bold' },
            padding: 20,
            color: '#1e3c72'
          },
          subtitle: {
            display: true,
            text: 'En % du PIB (critère de Maastricht)',
            font: { size: 12, style: 'italic' },
            padding: { bottom: 10 },
            color: '#666'
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: { font: { size: 12 }, padding: 15 }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: { size: 14 },
            bodyFont: { size: 13 },
            callbacks: {
              label: function(context) {
                return 'Dette: ' + context.parsed.y.toFixed(1) + '% du PIB';
              }
            }
          },
          annotation: {
            annotations: {
              maastricht: {
                type: 'line',
                yMin: 60,
                yMax: 60,
                borderColor: 'rgb(255, 0, 0)',
                borderWidth: 2,
                borderDash: [10, 5],
                label: {
                  display: true,
                  content: 'Critère de Maastricht (60%)',
                  position: 'end',
                  backgroundColor: 'rgba(255, 0, 0, 0.8)',
                  color: 'white',
                  font: { size: 11, weight: 'bold' }
                }
              },
              chirac: {
                type: 'box',
                xMin: 0,
                xMax: 12,
                backgroundColor: 'rgba(100, 149, 237, 0.15)',
                borderWidth: 0,
                label: {
                  display: true,
                  content: ['J. Chirac', '(1995-2007)'],
                  position: { x: 'center', y: 'start' },
                  font: { size: 11 }
                }
              },
              sarkozy: {
                type: 'box',
                xMin: 12,
                xMax: 17,
                backgroundColor: 'rgba(255, 140, 0, 0.15)',
                borderWidth: 0,
                label: {
                  display: true,
                  content: ['N. Sarkozy', '(2007-2012)'],
                  position: { x: 'center', y: 'start' },
                  font: { size: 11 }
                }
              },
              hollande: {
                type: 'box',
                xMin: 17,
                xMax: 22,
                backgroundColor: 'rgba(144, 238, 144, 0.15)',
                borderWidth: 0,
                label: {
                  display: true,
                  content: ['F. Hollande', '(2012-2017)'],
                  position: { x: 'center', y: 'start' },
                  font: { size: 11 }
                }
              },
              macron: {
                type: 'box',
                xMin: 22,
                xMax: 30,
                backgroundColor: 'rgba(221, 160, 221, 0.15)',
                borderWidth: 0,
                label: {
                  display: true,
                  content: ['E. Macron', '(2017-2025)'],
                  position: { x: 'center', y: 'start' },
                  font: { size: 11 }
                }
              },
              crise2008: {
                type: 'label',
                xValue: 14,
                yValue: 78,
                content: ['Crise financière'],
                backgroundColor: 'rgba(255, 140, 0, 0.9)',
                color: 'white',
                font: { size: 10, weight: 'bold' },
                padding: 6,
                borderRadius: 4
              },
              covid: {
                type: 'label',
                xValue: 25,
                yValue: 118,
                content: ['COVID-19'],
                backgroundColor: 'rgba(221, 160, 221, 0.9)',
                color: 'white',
                font: { size: 10, weight: 'bold' },
                padding: 6,
                borderRadius: 4
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 50,
            max: 120,
            ticks: {
              callback: function(value) {
                return value + '%';
              },
              font: { size: 11 }
            },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            title: {
              display: true,
              text: 'Dette publique en % du PIB',
              font: { size: 13, weight: 'bold' }
            }
          },
          x: {
            ticks: { font: { size: 11 } },
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            title: {
              display: true,
              text: 'Année',
              font: { size: 13, weight: 'bold' }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="my-8 bg-gray-50 p-6 rounded-lg">
      <div style={{ position: 'relative', height: '500px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default DebtChart;
