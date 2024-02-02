"use client";

import Thumbnail from "@/components/Thumbnail";
import { Input } from "@/components/ui/input";
import { useMovies } from "@/hooks/useMovies";
import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMovies, searchMovie } from "@/utils/api";
import useMoviesStore from "@/lib/store";
import { Search } from "lucide-react";
import { useIntersection } from "@mantine/hooks";
export interface Movie {
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
    first_air_date: string;
    media_type: string;
    original_name: string;
}

export const ListMovies: React.FC = () => {
    const { data: movies, fetchNextPage } = useMovies();

    const setMovies = useMoviesStore((state) => state.setMovies);
    const setSearch = useMoviesStore((state) => state.setSearch);
    const search = useMoviesStore((state) => state.search);

    const onReset = async () => {
        const res = await getMovies(1);
        setMovies(res.movies);
        setSearch("");
    };

    const lastPostRef = useRef<HTMLElement>(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting) fetchNextPage();
    }, [entry, fetchNextPage]);

    const searchSchema = z.object({
        search: z
            .string()
            .min(1, { message: "Required" })
            .max(10, { message: "Max 10 characters" }),
    });

    type SearchFormValue = z.infer<typeof searchSchema>;

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<SearchFormValue>({
        resolver: zodResolver(searchSchema),
    });

    const onSubmit = async (data: SearchFormValue) => {
        const res = await searchMovie(data.search, 1);
        setMovies(res.movies);
        setSearch(data.search);
    };

    useEffect(() => {
        setValue("search", search);
    }, [search, setSearch, setValue]);

    return (
        <>
            <nav className="flex bg-zinc-950 px-5 py-10 gap-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center"
                >
                    <Controller
                        name="search"
                        defaultValue={search}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="Search movies..." />
                        )}
                    />
                    <button
                        type="submit"
                        className="ml-4 flex items-center justify-center p-2  hover:bg-red-700 transition-all text-white text-xl rounded"
                    >
                        <Search />
                    </button>
                    {errors.search && (
                        <p className="text-red-500 ml-4">
                            {errors.search.message}{" "}
                        </p>
                    )}
                </form>
                <button className="text-white" onClick={onReset}>
                    Reset
                </button>
            </nav>

            {movies?.length !== 0 ? (
                <div className="px-5 sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-zinc-950">
                    {movies?.map((result: Movie, index: number) => {
                        // Corrected condition to correctly assign ref to the last item
                        if (index === movies.length - 1)
                            return (
                                <Thumbnail
                                    key={result.id}
                                    result={result}
                                    ref={ref}
                                />
                            );
                        return <Thumbnail key={result.id} result={result} />;
                    })}
                </div>
            ) : (
                <div className="flex justify-center align-center mt-80 mb-52 ">
                    <p className="text-4xl min-h-700	">No results!</p>
                </div>
            )}
            <div className="flex bg-zinc-950 py-4 justify-center item-center text-3xl text-white font-bold">
                ...Loading
            </div>
        </>
    );
};
