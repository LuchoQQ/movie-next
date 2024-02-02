"use client";

import Thumbnail from "@/components/Thumbnail";
import { useMovies } from "@/hooks/useMovies";
import Image from "next/image";
import React from "react";
import FlipMove from "react-flip-move";
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

    console.log(movies, "movies");
    return (
        <>
            <nav className="flex">
                <p>e</p>
                <p>e</p>
                <p>e</p>
                <p>e</p>
            </nav>

            {movies.length !== 0 ? (
                <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-zinc-950">
                    {movies.map((result: Movie) => (
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
