const fetch = require('node-fetch');

module.exports = {
    listPhotos: async (req, res) => {
        
    },
    listPosts: async (req, res) => {
        try{
            const posts = await fetch('https://jsonplaceholder.typicode.com/posts');

            const jsonPosts = await posts.json();

            return res.status(200).json({response: jsonPosts});
        }catch(e){
            return res.status(400).json({e});
        }
    }
};