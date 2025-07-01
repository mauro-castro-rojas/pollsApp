// console.log("Choices Map:", choicesMap);
const charts = {};
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrf = getCookie('csrftoken');

document.addEventListener('DOMContentLoaded', () => {
    Object.entries(choicesMap).forEach(([qid, jsonData]) => {
        const data = JSON.parse(jsonData);
        const labels = data.map(c => c.text);
        const votes  = data.map(c => c.votes);

        const ctx = document.getElementById(`chart-${qid}`).getContext('2d');
        charts[qid] = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: labels,
            datasets: [{
                    label: 'Votes',
                    data: votes,
                    backgroundColor: 'rgba(19, 241, 137, 0.99)',
                    borderColor:   'rgb(255, 255, 255)',
                    borderWidth: 2
                }]
            },
            options: {
                plugins: {
                legend: {
                    labels: {
                        color: '#fff',            
                        font: {family: 'exo', size: 14}
                    }
                },
                // title: {
                //     display: true,
                //     text: 'Results',
                //     color: '#fff',                      // title color
                //     font: {family: 'exo',size: 18,weight: 'bold'}
                // }
                },
                scales: {
                x: {
                    grid: {
                    color: 'rgba(255,255,255,0.2)'    // x-axis grid line color
                    },
                    ticks: {
                    color: '#ffe',                    // x-axis tick (label) color
                    font: {
                        family: 'Courier New, monospace',
                        size: 12
                    }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                    color: 'rgba(255,255,255,0.2)'    // y-axis grid line color
                    },
                    ticks: {
                    color: '#efe',                    // y-axis tick color
                    font: {
                        family: 'Courier New, monospace',
                        size: 12
                    }
                    }
                }
                }
            }
            
        });
    });

    // Intercept each vote form, send AJAX, and redraw the chart
    document.querySelectorAll('.question-cards form').forEach(form => {
    form.addEventListener('submit', evt => {
        evt.preventDefault();
        const url = form.action;
        const formData = new FormData(form);
        fetch(url, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrf
        },
        body: formData,
        credentials: 'same-origin'
        })
        .then(resp => {
        if (!resp.ok) throw new Error('Vote failed');
        return resp.json();
        })
        .then(data => {
        if (data.error) {
            console.error(data.error);
            return;
        }
        // Extract question ID from URL: /polls/<id>/vote/
        const qid = url.match(/\/polls\/(\d+)\/vote\//)[1];
        const results = data.results;
        const labels = results.map(c => c.text);
        const votes  = results.map(c => c.votes);
        const chart = charts[qid];
        chart.data.labels = labels;
        chart.data.datasets[0].data = votes;
        chart.update();
        })
        .catch(err => console.error('Error submitting vote:', err));
    });
    });
});

