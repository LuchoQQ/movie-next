import useMoviesStore from '@/lib/store';
import { searchMovie } from '@/utils/api'
import { useInfiniteQuery } from '@tanstack/react-query'


export const useMovies = () => {
    const search = useMoviesStore((state: any) => state.search);

    const initialPage = 1
    const {
        data: movies,
        error,
        fetchNextPage,
        isLoading,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['movies', search],
        queryFn: async ({ pageParam = initialPage }) => {
            const res = await searchMovie(search, pageParam)
            return res
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.nextCursor
        },
        initialPageParam: initialPage
    });


    return { data: movies?.pages.flatMap((page: any) => page.movies), error, isLoading, fetchNextPage, isFetchingNextPage };
};