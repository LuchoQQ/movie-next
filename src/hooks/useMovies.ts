import useMoviesStore from '@/lib/store';
import { getMovies, searchMovie } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react';



export const useMovies = () => {
    const movies = useMoviesStore((state: any) => state.movies || []); // Proporciona un valor predeterminado
    const setMovies = useMoviesStore((state: any) => state.setMovies);
    const search = useMoviesStore((state: any) => state.search)

    const { data, error, isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: () => {
            if (search !== '') {
                console.log(search, 'search')
                return searchMovie(search)
            } else {
                console.log(search, 'No search')

                return getMovies()
            }
        },
        initialData: movies,
        enabled: movies.length === 0,
    });


    useEffect(() => {
        if (movies.length > 0) {
            setMovies(movies)
        } else {
            if (data?.length > 0) {
                setMovies(data);
            }
        }
    }, [data, setMovies]);

    return { data: movies, error, isLoading };
};