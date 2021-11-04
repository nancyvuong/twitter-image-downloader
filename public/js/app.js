const messageOne = document.querySelector("#message-1");
const tweetForm = document.querySelector("form");
const search = document.querySelector('input');

tweetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tweet = search.value;
    let tweetId = tweet.split('/')[5];

    if(tweetId.includes('?')){
        tweetId = tweetId.split('?')[0];
    }

    messageOne.textContent = "Loading...";

    fetch('/tweet?id=' + tweetId).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = "Download completed!"
            }
        });
    });
});