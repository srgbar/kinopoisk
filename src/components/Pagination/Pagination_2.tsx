import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "../../redux/state";
import {Button, Stack} from "@mui/material";
import s from "./Pagination.module.css";
import {InitialStateType, thunkSetMovies} from "../../redux/movies-reducer";

type PropsType = {
    title: string;
    type: string;
}

export const Pagination_2 = ({title, type}: PropsType) => {

    const {page, totalResults} = useSelector<RootStoreType, InitialStateType>(state => state.movies);

    const currentPage = page;

    const dispatch = useDispatch();

    const pages = [] as number[];
    const onPageCount = 10;
    const pagesCount = Math.ceil(totalResults! / onPageCount);
    const onPageChange = (page: number) => {
        dispatch(thunkSetMovies({title, type}, page));
    };

    if (currentPage <= 4) {
        for (let i = 1; i <= 5; i += 1) {
            pages.push(i);
        }
        return (
            <div className={s.paginator}>

                <Stack
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        margin: '0 10px',
                    }}
                    spacing={2}
                    direction="row"
                >

                    {pages.map((el, i) => (
                        <Button
                            sx={{marginLeft: i === 0 ? '16px' : '0',}}
                            key={el}
                            variant={el === page ? 'contained' : 'outlined'}
                            onClick={() => onPageChange(el)}
                        >
                            {el}
                        </Button>
                    ))}

                    <div>...</div>

                    <Button
                        variant={pagesCount === page ? 'contained' : 'outlined'}
                        onClick={() => onPageChange(pagesCount)}
                    >{pagesCount}</Button>

                </Stack>

            </div>
        );
    }
    if (currentPage <= pagesCount - 4) {
        for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
            pages.push(i);
        }
        return (
            <div className={s.paginator}>

                <Stack
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        margin: '0 10px',
                    }}
                    spacing={2}
                    direction="row"
                >

                    <Button
                        variant={1 === page ? 'contained' : 'outlined'}
                        onClick={() => onPageChange(1)}
                    >{1}</Button>

                    <div>...</div>

                    {pages.map((el, i) => (

                        <Button
                            sx={{marginLeft: i === 0 ? '16px' : '0',}}
                            key={el}
                            variant={el === page ? 'contained' : 'outlined'}
                            onClick={() => onPageChange(el)}
                        >{el}</Button>
                    ))}

                    <div>...</div>

                    <Button
                        onClick={() => onPageChange(pagesCount)}
                        variant={pagesCount === page ? 'contained' : 'outlined'}
                    >{pagesCount}</Button>

                </Stack>

            </div>
        );
    }

    for (let i = pagesCount - 4; i <= pagesCount; i += 1) {
        pages.push(i);
    }
    return (
        <div className={s.paginator}>

            <Stack
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '0 10px',
                }}
                spacing={2}
                direction="row"
            >

                <Button
                    onClick={() => onPageChange(1)}
                    variant={1 === page ? 'contained' : 'outlined'}
                >{1}</Button>

                <div>...</div>

                {pages.map(el => (
                    <Button
                        key={el}
                        onClick={() => onPageChange(el)}
                        variant={el === page ? 'contained' : 'outlined'}
                    >{el}</Button>
                ))}

            </Stack>

        </div>
    );
};