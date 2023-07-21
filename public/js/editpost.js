async function editFunction(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="blogpost-title"]').value;
    const Blogpost_content = document.querySelector('textarea[name="blogpost-content"]').value.trim();
    const Blogpost_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${Blogpost_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            Blogpost_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert("error!");
    }
};

document.querySelector('.edit-form').addEventListener('submit', editFunction);