
//make sure to add document items in handlbars to coincide with all queryselectors 
const newpostForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="Blogpost-title"]').value;
    const content = document.querySelector('textarea[name="Blogpost-content"]').value;

    const response = await fetch('/api/Blogpost', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('error!');
    }
};

document.querySelector('#newpost-form').addEventListener('submit', newpostForm);