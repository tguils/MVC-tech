const BlogpostId = document.querySelector('input[name="Blogpost-id"]').value;
//make sure to add document items in handlbars to coincide with all queryselectors 
const commentFunction = async (event) => {
    event.preventDefault();
    const comments = document.querySelector('textarea[name="comments-body"]').value.trim();
    console.log(comments);

    if (comments) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comments: comments,
                BlogpostId: BlogpostId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    };
} 

if(document.querySelector('.comment-form') !=null) {  
    document.querySelector('.comment-form').addEventListener('submit', commentFunction);
}