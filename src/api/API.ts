import axios from 'axios';

const configOMB = {
    baseURL: 'https://www.omdbapi.com',
};
const key = '?apikey=14d87255';
const defaultPage: number = 1;
const axiosInstance = axios.create(configOMB);

export const API = {
    searchFilmsByTitle: (data: FindMoviesDataType, page = defaultPage) => {
        const query = `${key}&s=${data.title}&type=${data.type}&page=${page}`;
        return axiosInstance.get<GetMoviesResponseType & FindRejectType>(query);
    },
    getCurrentMovie(title: string) {
        return axiosInstance.get<CurrentMovieType>(`${key}&t=${title}`);
    },
}

// types
export type MoviesType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export type CurrentMovieType = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: [
        {
            Source: string;
            Value: string;
        },
    ];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
};


export type FindMoviesDataType = {
    title: string;
    type: string;
}

export type GetMoviesResponseType = {
    Response: string;
    Search: MoviesType[];
    totalResults: string;
}

export type FindRejectType = {
    Response: string;
    Error: string;
}
