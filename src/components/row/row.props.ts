import { IMovie } from "src/interfaces/app.interfaces";

export interface RowProps {
    title: string;
    movies: IMovie[]
    isBig?: boolean;
    isSmall?: boolean;
}