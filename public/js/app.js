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
        response.json().then( async (data) => {
            
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                //console.log(data);
                for(url in data){
                    const response = await fetch(url);
                    const blob = await response.blob();

                    const blobURL = URL.createObjectURL(blob);

                    const anchor = document.createElement("a");
                    anchor.style.display = "none";

                    anchor.href = blobURL;
                    anchor.download = data[url];

                    document.body.appendChild(anchor);
                    anchor.click();
                }

                messageOne.textContent = "Download completed!"
            } 
        });
    });
});