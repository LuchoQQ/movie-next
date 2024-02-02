import { Movie } from '@/app/list-movies';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MoviesState {
    movies: Movie[];
    search: string;
    setMovies: (movies: Movie[]) => void;
    setSearch: (search: string) => void;
}

const useMoviesStore = create(persist<MoviesState>((set, get) => ({
    movies: [],
    search: '',
    setSearch: (str: any) => set({ search: str }),
    setMovies: (movies: Movie[]) => set({ movies }),
}), {
    name: "movies-store",
}));

export default useMoviesStore;
