async function createPostFunction(event) {
    event.preventDefault();

    document.location.replace('/dashboard/new')
}


document.querySelector('#create-new-post').addEventListener('submit', createPostFunction);