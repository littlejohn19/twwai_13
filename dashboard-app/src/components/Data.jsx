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

export function Data() {



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

            const res = await fetch("http://localhost:3001/api/params/last")
            const dataRes = await res.json();

            chartDataSet(dataRes);
        }
        fetchAir()
    }, []);

    if (!chartData) {
        return null;
    }

    return (<div>
        <h1>Current state:</h1>
        <ul>
            <li>Temp: {chartData.temp}</li>
            <li>Humidity: {chartData.humidity}</li>
            <li>Pressure: {chartData.pressure}</li>
        </ul>
    </div>);
}
