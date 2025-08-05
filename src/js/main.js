let barChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('barChart');
    if (ctx) {
        barChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [
                    {
                        label: 'Income',
                        data: Array(12).fill(0),
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    },
                    {
                        label: 'Expenses',
                        data: Array(12).fill(0),
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }
                ]
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

        document.getElementById('chart-tab')?.addEventListener('click', updateChartData);

        document.querySelector('.btn.btn-primary.mt-3')?.addEventListener('click', () => {
            const canvas = document.getElementById('barChart');
            if (canvas) {
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'chart.png';
                link.click();
            }
        });

        
    }
});

function updateChartData() {
    if (barChartInstance) {
        const { income, expenses } = getMonthlyData();
        barChartInstance.data.datasets[0].data = income;
        barChartInstance.data.datasets[1].data = expenses;
        barChartInstance.update();
    }
}

function getMonthlyData() {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const income = months.map(month => {
        const input = document.getElementById(`income-${month}`);
        return input ? Number(input.value) || 0 : 0;
    });
    const expenses = months.map(month => {
        const input = document.getElementById(`expenses-${month}`);
        return input ? Number(input.value) || 0 : 0;
    });

    return { income, expenses };
}

function usernameInputCallback() {
    const username = usernameInput.value;
    // regex to check if username has at least 1 capital letter, 1 special character, 1 number and it's at least 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;
    usernameInput.style.borderColor = regex.test(username) ? 'green' : 'red';
}

window.onload = () => {
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', usernameInputCallback);
    }
}


function sendChartByEmail(email) {
    const canvas = document.getElementById('barChart');
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    fetch('http://localhost:3000/send-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, image })
    })
        .then(res => res.json())
        .then(data => alert(data.message))
        .catch(err => alert('Error sending email'));
}


document.getElementById('send-chart-btn')?.addEventListener('click', () => {
    const email = document.getElementById('email-input').value;
    sendChartByEmail(email);
});
