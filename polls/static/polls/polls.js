document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.question-card form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const card = form.closest('.question-card');
            const resultsDiv = card.querySelector('.results');
            const csrf = form.querySelector('[name=csrfmiddlewaretoken]').value;

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
                let html = '<h1>' + data.question + '</h1><ul>';
                data.choices.forEach(c => {
                    html += '<li>' + c.text + ' -- ' + c.votes + ' vote' + (c.votes === 1 ? '' : 's') + '</li>';
                });
                html += '</ul>';
                resultsDiv.innerHTML = html;
            });
        });
    });
});

