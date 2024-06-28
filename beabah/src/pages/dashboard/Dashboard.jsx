import { useEffect, useState } from "react";
import styles from "../../styles/dashboard/dashboard.module.css";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Select from 'react-select';

// Registrar os elementos e escalas necessários
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
    const [userDistributionData, setUserDistributionData] = useState(null);
    const [summaryData, setSummaryData] = useState({
        usersCount: 0,
        profilesCount: 0,
        modulesCount: 0,
        transactionsCount: 0,
        functionsCount: 0
    });
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: '', label: 'Selecionar Relatório para Download' },
        { value: 'users', label: 'Relatório de Usuários' },
        { value: 'profiles', label: 'Relatório de Perfis' },
        { value: 'modules', label: 'Relatório de Módulos' },
        { value: 'transactions', label: 'Relatório de Transações' },
        { value: 'functions', label: 'Relatório de Funções' }
    ]

    const handleReportDownload = () => {
        if (selectedOption) {
            downloadReport(selectedOption.value);
        }
    }

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://localhost:3000/dashboardData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Dashboard data:', data);
                setSummaryData(data);
                
                const distributionData = {
                    labels: ['Usuários', 'Perfis', 'Módulos', 'Transações', 'Funções'],
                    datasets: [
                        {
                            label: 'Quantidade',
                            data: [
                                data.usersCount,
                                data.profilesCount,
                                data.modulesCount,
                                data.transactionsCount,
                                data.functionsCount
                            ],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(153, 102, 255, 0.6)'
                            ]
                        }
                    ]
                };
                setUserDistributionData(distributionData);
            } catch (error) {
                console.error('Erro ao buscar dados do dashboard:', error);
            }
        }
    fetchDashboardData();
    }, []);

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.titulo}>Dashboard</h1>
            <div className={styles.summary}>
                <div className={styles.summaryItem}>
                    <h2>Usuários</h2>
                    <p>Total: {summaryData.usersCount}</p>
                </div>
                <div className={styles.summaryItem}>
                    <h2>Perfis</h2>
                    <p>Total: {summaryData.profilesCount}</p>
                </div>
                <div className={styles.summaryItem}>
                    <h2>Módulos</h2>
                    <p>Total: {summaryData.modulesCount}</p>
                </div>
                <div className={styles.summaryItem}>
                    <h2>Funções</h2>
                    <p>Total: {summaryData.functionsCount}</p>
                </div>
                <div className={styles.summaryItem}>
                    <h2>Transações</h2>
                    <p>Total: {summaryData.transactionsCount}</p>
                </div>
            </div>

            <div className={styles.charts}>
                <div className={styles.chartItem}>
                    <h2 className={styles.tituloGrafico}>Dados Inseridos na Aplicação</h2>
                    {userDistributionData && <Pie data={userDistributionData} />}
                </div>
            </div>

            <div className={styles.actions}>
                <Select 
                    options={options}
                    onChange={setSelectedOption}
                    placeholder='Selecionar Relatório para Download'
                    value={selectedOption}
                    className={styles.selectReport}
                />
                <button onClick={handleReportDownload} className={styles.downloadButton} disabled={!selectedOption || !selectedOption.value}>
                    Baixar Relatório
                </button>
            </div>
        </div>
    );
}

function downloadReport(reportType) {
    fetch(`http://localhost:3000/generateReports`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reportType })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao baixar o relatório');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${reportType}_report.csv`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    })
    .catch(error => console.error('Erro ao baixar o relatório:', error));
}