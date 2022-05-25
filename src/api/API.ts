import axios from 'axios';

export type MoviesType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

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

const configOMB = {
    baseURL: 'https://www.omdbapi.com',
};
const key = '?apikey=14d87255';
const defaultPage: number = 1;
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (data: FindMoviesDataType, page = defaultPage) => {
        const query = `${key}&s=${data.title}&type=${data.type}&page=${page}`;
        return axiosInstance.get<GetMoviesResponseType & FindRejectType>(query);
    },
}

export default API;

