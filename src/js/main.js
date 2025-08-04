let barChartInstance = null;

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('barChart');
    if (ctx) {
        barChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [{
                    label: 'Income',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)'
                }, {
                    label: 'Expenses',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        document.getElementById('chart-tab').addEventListener('click', updateChartData);

        const downloadBtn = document.querySelector('.btn.btn-primary.mt-3');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function () {
                const canvas = document.getElementById('barChart');
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'chart.png';
                link.click();
            });
        }
    }
});

function updateChartData() {
    if (barChartInstance) {
        const data = getMonthlyData();
        barChartInstance.data.datasets[0].data = data.income;
        barChartInstance.data.datasets[1].data = data.expenses;
        barChartInstance.update();
    }
}

function getMonthlyData() {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const income = [];
    const expenses = [];

    months.forEach(month => {
        const incomeInput = document.getElementById(`income-${month}`);
        const expensesInput = document.getElementById(`expenses-${month}`);
        income.push(incomeInput ? Number(incomeInput.value) || 0 : 0);
        expenses.push(expensesInput ? Number(expensesInput.value) || 0 : 0);
    });

    return { income, expenses };
}

window.onload = function () {
    // input with id "username" on change
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function () {
            const username = usernameInput.value;
            // regex to check if username has at least 1 cappital letter, 1 special character, 1 number and it's at least 8 characters long
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;
            if (!regex.test(username)) {
                // set the username input to red
                usernameInput.style.borderColor = 'red';
            } else {
                //set the username input to green
                usernameInput.style.borderColor = 'green';
            }
        });
    }
}