document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.question-card form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const card = form.closest('.question-card');
            const resultsDiv = card.querySelector('.results');

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

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrf,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: new FormData(form)
            })
            .then(resp => resp.json())
            .then(data => {
                let html = '';
                data.choices.forEach(c => {
                    html += '<li>' + c.text + ' -- ' + c.votes + ' vote' + (c.votes === 1 ? '' : 's') + '</li>';
                });
                resultsDiv.innerHTML = html;
            });
        });
    });
});

