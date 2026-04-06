let myChart;

// Date Display
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// Show/Hide Sections
function showSection(section) {
    const dash = document.getElementById('dashboard-section');
    const cma = document.getElementById('cma-section');
    const title = document.getElementById('pageTitle');
    
    if(section === 'dashboard') {
        dash.style.display = 'block';
        cma.style.display = 'none';
        title.innerText = "Financial Dashboard";
        document.getElementById('nav-dash').classList.add('active');
        document.getElementById('nav-cma').classList.remove('active');
    } else {
        dash.style.display = 'none';
        cma.style.display = 'block';
        title.innerText = "CMA Corner";
        document.getElementById('nav-cma').classList.add('active');
        document.getElementById('nav-dash').classList.remove('active');
    }
}

// Budget Logic
function updateDashboard() {
    const income = parseFloat(document.getElementById('incomeInput').value);
    const grid = document.getElementById('results-grid');
    
    if (income > 0) {
        const n = income * 0.5, w = income * 0.3, s = income * 0.2;
        grid.innerHTML = `
            <div class="result-box needs">Needs (50%)<br>₹${n.toFixed(0)}</div>
            <div class="result-box wants">Wants (30%)<br>₹${w.toFixed(0)}</div>
            <div class="result-box savings">Savings (20%)<br>₹${s.toFixed(0)}</div>`;
        updateChart(n, w, s);
    }
}

function updateChart(n, w, s) {
    const ctx = document.getElementById('financeChart').getContext('2d');
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Needs', 'Wants', 'Savings'],
            datasets: [{ data: [n, w, s], backgroundColor: ['#e67e22', '#9b59b6', '#27ae60'] }]
        }
    });
}

// GST & CMA Logic
function calculateGST() {
    const p = parseFloat(document.getElementById('basePrice').value);
    const g = parseInt(document.getElementById('gstPercent').value);
    if(p > 0) {
        const gst = (p * g) / 100;
        document.getElementById('gstResult').innerHTML = `GST: ₹${gst.toFixed(2)}<br>Total: ₹${(p+gst).toFixed(2)}`;
    }
}

function nextTip() {
    const tips = ["Save first, spend later.", "Avoid luxury debt.", "Invest in assets.", "Track every rupee."];
    document.getElementById('tipBox').innerHTML = `<p>"${tips[Math.floor(Math.random()*tips.length)]}"</p>`;
}

function downloadPDF() {
    const element = document.getElementById('reportArea');
    html2pdf().from(element).save('FinSmart_Pro_Report.pdf');
}
