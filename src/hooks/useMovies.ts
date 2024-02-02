import useMoviesStore from '@/lib/store';
import { getMovies } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'



export const useMovies = () => {
    const movies = useMoviesStore((state: any) => state.movies);
    const setMovies = useMoviesStore((state: any) => state.setMovies);

    const { data, error, isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: () => getMovies(),
        initialData: movies.length > 0 ? movies : [], // Usa movies como datos iniciales si ya están cargados
    });

    // Devuelve data desde el estado si está disponible, de lo contrario, desde la consulta
    const finalData = movies.length > 0 ? movies : data;

    return { data: finalData, error, isLoading };
}