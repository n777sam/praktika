export interface Movie {
    id: number;
    title: string;
    year: string;
    runtime?: string;
    genres?: string[];
    director: string;
    description: string;
    rating: number;
    actors: string;
    plot?: string;
    posterUrl: string;
}