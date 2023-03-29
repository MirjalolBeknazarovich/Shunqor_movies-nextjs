import Image from "next/image"
import { useEffect, useState } from "react"
import { image_base } from "src/helpers/constants"
import { IMovie } from "src/interfaces/app.interfaces"
import { HeroProps } from "./hero.props";
import { TbPlayerPlay } from 'react-icons/tb'
import ReactStars from "react-stars";
import { useInfoState } from "src/store";


const Hero = ({ trending }:HeroProps): JSX.Element => {
    const [ movie, setMovie ] = useState<IMovie>({} as IMovie)

    const { setModal, setCurrentMovie } = useInfoState()

    useEffect( () => {
        const randomMovie = trending[Math.floor(Math.random() * trending.length)]
        setMovie(randomMovie)
        
    }, [trending])

    const hendleCurrentMovie = () => {
        setModal(true);
        setCurrentMovie(movie);
    }
    
    
  return (
    <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:justify-center">
        <div className="absolute top-0 -z-10 left-0 h-[95vh] w-full">
            <Image src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`} alt='logo' fill />
        </div>
        <div className="py-[4px] px-[8px] text-center rounded-bl-[8px] rounded-tr-[8px] w-[110px] bg-[#1D1D1D]/50">{movie?.media_type}</div>
        <div className="flex items-center space-x-2">
            <ReactStars edit={false} count={10} value={movie.vote_average} color2={"#fff"} />
            <p>({movie.vote_count})</p>
        </div>
        <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">{ movie?.title || movie?.name || movie?.original_name }</h1>
        <p className="max-w-xs md:max-w-lg text-shadow-md lg:max-w-2xl text-xs md:text-lg lg:text-2xl">{movie?.overview?.slice(0, 100)}...</p>
        <div>
            <button onClick={ hendleCurrentMovie } className="flex justify-center items-center hover:bg-white/80 transition-all hover:text-black bg-white/10 border-solid space-x-2 border-2 rounded-full px-12 py-3"><TbPlayerPlay className="mr-2 h-5 w-5 md:h-7 md:w-7" /> Watch now</button>
        </div>
    </div>
  )
}

export default Hero