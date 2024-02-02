"use server"


const axios = require('axios');


export const getMovies = async (page: number) => {

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    const res = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.MOVIE_API_KEY}` } }).then((res: any) => res.data).catch((err: any) => { console.log(err); return [] })

    return { movies: res.results, nextCursor: res.page + 1 }
}

export const searchMovie = async (search: string, page: number) => {
    if (search === '') {
        return getMovies(page)
    }
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, { headers: { 'Authorization': `Bearer ${process.env.MOVIE_API_KEY}` } }).then((res: any) => res.data).catch((err: any) => { console.log(err); return [] })

    return { movies: res.results, nextCursor: res.page + 1 }
}