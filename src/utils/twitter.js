const Twitter = require('twitter-v2');


const client = new Twitter({
    //consumer_key: 'Yp8dtTMNMiwX5fJRMoP4eAEst',
    //consumer_secret: 'cJz2vwAbbrtPOTTga6iMpwPo9jirSNNGpPtiMYZKNpA6RYN9Zd'
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  });

const getTweet = async (id) =>{
    const data = await client.get('tweets', {
      ids: id,
      expansions: ["attachments.media_keys"],
      media: {
        fields: ["url"]
      }
    });

    if(data.includes){
      const media = data.includes.media;
      let urlObject = {}

      media.forEach(element => {
        let cleanUrl = element.url.substring(0, element.url.length - 3-1) + "?format=png&name=large";
        let cleanName = element.url.split("/")[3+1];
        cleanName = cleanName.substring(0, cleanName.length - 3 - 1) + ".png";
        urlObject[cleanUrl] = cleanName;
      });

      if(Object.keys(urlObject).length == 0){
        throw new Error('Tweet has no images');
      }

      return urlObject;
        
    } else{
        throw new Error('Tweet has no images');
    }
};

module.exports = getTweet;  