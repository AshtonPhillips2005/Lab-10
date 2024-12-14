document.getElementById('fetchButton').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('dataDisplay').innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        })
        .catch(error => {
            document.getElementById('dataDisplay').innerHTML = `<p class="error-message">${error.message}</p>`;
        });
});

document.getElementById('xhrButton').addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    
    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            document.getElementById('dataDisplay').innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        } else {
            document.getElementById('dataDisplay').innerHTML = `<p class="error-message">Error: ${this.status}</p>`;
        }
    };

    xhr.onerror = function() {
        document.getElementById('dataDisplay').innerHTML = '<p class="error-message">Network Error</p>';
    };

    xhr.send();
});

document.getElementById('postForm').addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, body })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('postResponse').innerHTML = `<p class="success-message">Post created successfully! ID: ${data.id}</p>`;
    })
    .catch(error => {
        document.getElementById('postResponse').innerHTML = `<p class="error-message">${error.message}</p>`;
    });
});

document.getElementById('updateForm').addEventListener('submit', event => {
    event.preventDefault();
    const id = document.getElementById('updateId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    
    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            document.getElementById('updateResponse').innerHTML = `<p class="success-message">Post updated successfully!</p>`;
        } else {
            document.getElementById('updateResponse').innerHTML = `<p class="error-message">Error: ${this.status}</p>`;
        }
    };

    xhr.onerror = function() {
        document.getElementById('updateResponse').innerHTML = '<p class="error-message">Network Error</p>';
    };

    xhr.send(JSON.stringify({ title, body }));
});