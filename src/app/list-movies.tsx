"use client";

import { useMovies } from "@/hooks/useMovies";
import React from "react";

export const ListMovies: React.FC = () => {
    const { data: movies, isLoading } = useMovies();

    console.log(movies, 'movies')
    return <></>;
};

