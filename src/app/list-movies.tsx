"use client";

import Thumbnail from "@/components/Thumbnail";
import { Input } from "@/components/ui/input";
import { useMovies } from "@/hooks/useMovies";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMovies, searchMovie } from "@/utils/api";
import useMoviesStore from "@/lib/store";
import { Search } from "lucide-react";
interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const ListMovies: React.FC = () => {
    const { data: movies, isLoading } = useMovies();
    const setMovies = useMoviesStore((state: any) => state.setMovies);
    const setSearch = useMoviesStore((state: any) => state.setSearch);
    const search = useMoviesStore((state: any) => state.search);

    const schema = z.object({
        search: z
            .string()
            .min(1, { message: "Required" })
            .max(10, { message: "Max 10 characters" }),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        setValue("search", search);
    }, [search, setSearch]);

    const onSubmit = async (data: string) => {
        const res = await searchMovie(data.search);
        setMovies(res);
        setSearch(data.search);
    };

    const onReset = async () => {
        const res = await getMovies()
        setMovies(res)
        setSearch('')
    }

    console.log(search);
    return (
        <>
            <nav className="flex bg-zinc-950 px-5 py-10 gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
            <Controller
                name="search"
                defaultValue={search} // Inicializa el campo con el valor de 'search' del estado
                control={control}
                render={({ field }) => <Input {...field} placeholder="Search movies..."/>}
            />
            <button type="submit" className="ml-4 flex items-center justify-center p-2  hover:bg-red-700 transition-all text-white text-xl rounded">
                <Search /> {/* Asume un componente de ícono de búsqueda */}
            </button>
            {errors.search && <p className="text-red-500 ml-4">{errors.search.message}</p>}
        </form>
                <button className="text-white" onClick={onReset}>Reset</button>

            </nav>

            {movies?.length !== 0 ? (
                <div className="px-5 sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-zinc-950">
                    {movies?.map((result: Movie) => (
                        <Thumbnail key={result.id} result={result} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center align-center mt-80 mb-52 ">
                    <p className="text-4xl min-h-700	">No results!</p>
                </div>
            )}
        </>
    );
};
