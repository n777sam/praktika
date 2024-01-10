export interface Movie {
    id: number
    title: string
    year: string
    runtime?: string
    genres?: string[]
    director: string
    rating: number
    actors: string
    plot?: string
    posterUrl: string
    favorites?: boolean
}