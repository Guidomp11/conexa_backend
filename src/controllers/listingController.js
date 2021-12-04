const fetch = require('node-fetch');

module.exports = {
    listPhotos: async (req, res) => {
        try{
            const { offset, limit } = req.query;

            if(!offset || !limit) throw {status: 400, errors: `Offset: ${offset} - Limit: ${limit}`};

            const photos = await fetch(`http://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${limit}`);
            
            const jsonPhotos = await photos.json();
            
            return res.status(200).json({response: jsonPhotos});

        }catch(e){
            const { status, errors } = e;

            return res.status(status || 400).json({errors});
        }
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