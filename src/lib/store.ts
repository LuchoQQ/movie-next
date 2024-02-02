import { getMovies } from '@/utils/api';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useMoviesStore = create(persist((set, get) => ({
    movies: [],
    searchTerm: '',
    setSearchTerm: (term: any) => set({ searchTerm: term }),
    setMovies: (movies: any) => set({ movies }),
    fetchMovies: async () => {
        try {
            const movies = await getMovies(); // Asegúrate de que esta función pueda usar `searchTerm` si es necesario
            set({ movies });
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    },
}), {
    name: "movies-store", // El nombre de tu almacenamiento en localStorage
}));

export default useMoviesStore;
