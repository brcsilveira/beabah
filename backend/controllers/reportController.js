const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

exports.generateReports = (req, res) => {
    const { reportType } = req.body;

    let scriptCommand = `python ${path.resolve(__dirname, '../python_services/report_generator.py')}`;

    switch (reportType) {
        case 'users':
            scriptCommand += ' users_report';
            break;
        case 'profiles':
            scriptCommand += ' profiles_report';
            break;
        case 'modules':
            scriptCommand += ' modules_report';
            break;
        case 'transactions':
            scriptCommand += ' transactions_report';
            break;
        case 'functions':
            scriptCommand += ' functions_report';
            break;
        default:
            return res.status(400).json({ error : 'Tipo de relatório inválido' });
    }

    exec(scriptCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o script Python: ${error}`);
            return res.status(500).json({ error: 'Erro ao gerar relatório' });
        }
        console.log(`Saída do script Python: ${stdout}`);

        const reportsDir = path.resolve(__dirname, '../python_services');
        let reportPath;

        switch (reportType) {
            case 'users':
                reportPath = path.join(reportsDir, 'users_report.csv');
                break;
            case 'profiles':
                reportPath = path.join(reportsDir, 'profiles_report.csv');
                break;
            case 'modules':
                reportPath = path.join(reportsDir, 'modules_report.csv');
                break;
            case 'transactions':
                reportPath = path.join(reportsDir, 'transactions_report.csv');
                break;
            case 'functions':
                reportPath = path.join(reportsDir, 'functions_report.csv');
                break;
            default:
                return res.status(400).json({ error : 'Tipo de relatório inválido' });
        }

        fs.readFile(reportPath, (err, data) => {
            if (err) {
                console.error(`Erro ao ler o arquivo ${reportPath}: ${err}`);
                return res.status(500).json({ error: 'Erro ao ler o arquivo de relatório' });
            }

            // Retorna os dados do arquivo como resposta
            res.set({
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename=${reportType}_report.csv`
            });
            res.send(data);
        });
    });
};