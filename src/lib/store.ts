import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMoviesStore = create(persist((set, get) => ({
    movies: [],
    search: '',
    setSearch: (str: any) => set({ search: str }),
    setMovies: (movies: any) => set({ movies }),
}), {
    name: "movies-store", // El nombre de tu almacenamiento en localStorage
}));

export default useMoviesStore;
