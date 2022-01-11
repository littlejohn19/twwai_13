import React from 'react';
import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

export function LineChart() {



    const [chartData, chartDataSet] = useState(null);

    useEffect( () => {
        const fetchAir = async () => {
            let data = {
                labels: [],
                datasets: [
                    {
                        label: 'Temperatura',
                        data: [],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
            };

            const res = await fetch("https://twwai-pr1.herokuapp.com/api/params")
            const dataRes = await res.json();

            data.datasets[0].data = dataRes.map(item => {
                return item.temp;
            })

            data.labels = dataRes.map (item => {
                return item.date;
            })
            chartDataSet(data);
        }
        fetchAir()
    }, []);

    if (!chartData) {
        return null;
    }

    return <Line options={options} data={chartData} height={200} width={200}/>;
}
