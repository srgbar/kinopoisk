import axios from 'axios';

export type ResponseType = {
    Search: Array<MoviesType>
    Error: string
    Response: string
}

export type MoviesType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

const configOMB = {
    baseURL: 'https://www.omdbapi.com',
};
const key = '?apikey=14d87255';
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        const query = `${key}&s=${title}`;
        return axiosInstance.get<ResponseType>(query);
    }
};

export default API;

