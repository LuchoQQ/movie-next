'use client'
import useMoviesStore from '@/lib/store';
import { getMovies } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';



export const ListMovies: React.FC = () => {
    const { searchTerm, movies }: any = useMoviesStore()

    const { data } = useQuery({
        queryKey: ['movies'],
        queryFn: () => getMovies(),
        initialData: movies,
    })

    console.log(data, 'data')

    return (
        <>
        
        </>
    );
};
