const axios = require('axios');


const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmVkYzc5MWM2ZmY0ZDk1ZDJlODVhNjE1MmE1MDlkNCIsInN1YiI6IjYyNjYwYjFlZDFhODkzNzA5NGM0Y2NlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.64GVh7kzByzkpYfMrvjrK7Pk8NNXYqnJPINleBZWARs'
    }
};

export const getMovies = async () => {
    return await axios
        .request(options)
        .then((res: any) => {
            return res.data.results
        })
        .catch((err: any) => console.log(err));
}
