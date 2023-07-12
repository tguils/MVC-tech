const deleteButton = document.querySelector('#delete-post-btn');
const BlogpostId = document.querySelector('input[name="Blogpost-id"]').value;
//make sure to add document items in handlbars to coincide with all queryselectors 
const deleteFunction = async () => {
    const response = await fetch(`/api/Blogpost/${BlogpostId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

if(delButton!=null){
    delButton.addEventListener('click', deleteFunction);
}