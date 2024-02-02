import useMoviesStore from '@/lib/store';
import { getMovies } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react';



export const useMovies = () => {
    const movies = useMoviesStore((state: any) => state.movies);
    const setMovies = useMoviesStore((state: any) => state.setMovies);

    const { data, error, isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: () => getMovies(),
        initialData: movies.length > 0 ? movies : [], 
    });

    useEffect(() => {
        if (movies.length === 0 && data) {
            setMovies(data);
        }
    }, [data, movies.length, setMovies]);


    return { data: movies, error, isLoading };
}