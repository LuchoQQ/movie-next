/* eslint-disable */
import Image from "next/image";
import { forwardRef } from "react";
import { ThumbsUpIcon } from "lucide-react";

const Thumbnail = ({ result }: any) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";


    return (
        <>
            {/* MOVIE ITEM */}
            <div className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
                {!result.backdrop_path || !result.poster_path ? (
                    <Image
                        src={`https://res.cloudinary.com/diylksocz/image/upload/v1653600542/No-image-found_dlyvql.jpg`}
                        alt="Image not found"
                        height={1080}
                        width={1920}
                    />
                ) : (
                    <Image
                        src={`${
                            BASE_URL + result.backdrop_path ||
                            BASE_URL + result.poster_path
                        }`}
                        height={500}
                        width={400}
                        alt="image-thumbnail"
                    />
                )}

                <div className="p-2">
                    <p className="truncate max-w-md text-gray-400">
                        {result.overview}
                    </p>

                    <h2 className="mt-1 text-2xl text-white transition-all duration-100 easy-in-out group-hover:font-bold">
                        {result.title || result.original_name}
                    </h2>

                    <div className="flex items-center opacity-0 group-hover:opacity-100 text-white">
                        <p className="text-white">
                            {result.media_type && `${result.media_type} •`}{" "}
                        </p>
                        {result.release_date || result.first_air_date} •{" "}
                        <ThumbsUpIcon className="h-5 mx-2" />{" "}
                        {result.vote_count}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Thumbnail;
