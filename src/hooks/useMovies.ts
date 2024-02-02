import useMoviesStore from '@/lib/store';
import { getMovies, searchMovie } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react';



export const useMovies = () => {
    const movies = useMoviesStore((state: any) => state.movies || []); // Proporciona un valor predeterminado
    const search = useMoviesStore((state: any) => state.search)

    const { data, error, isLoading } = useQuery({
        queryKey: ['movies', search],
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
    });

    return { data: data, error, isLoading };
};