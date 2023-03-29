import { RowProps } from './row.props';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import Thumbnail from '../thumbnail/thumbnail';
import { useRef, useState } from 'react';

const Row = ({ title, movies, isBig = false, isSmall = false }:RowProps): JSX.Element => {
  const [ moved, setMoved ] = useState<boolean>(false)
  const carouselRef = useRef<HTMLDivElement>(null);
  const handleClick = ( direction: 'left'|'right' ) => {
    setMoved(true);
    if(carouselRef.current){
      const { scrollLeft, clientWidth} = carouselRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth"})
      if( direction === 'left' && scrollTo === 0 ){
        setMoved(false)
      }
      if ( direction === 'right' && scrollTo === 0 ) {
        setMoved(false)
      }
    }
  }
  return (
    <div className={`space-y-3 md:space-y-2 ${!isBig ? ' mt-[100px]' : 'mt-10'} ${isSmall && 'mt-10'}`}>
      <h2 className='w-56 cursor-pointer flex items-center justify-center text-lg md:text-2xl font-semibold text-[#b7b4b4] hover:text-white transition duration-200'>{title} <AiOutlineRight className='w-5 h-5 mx-1 my-1 text-[#b7b4b4] hover:text-white transition duration-200' /></h2>
      <div className='group relative md:ml-2'>
        <AiOutlineRight className={`absolute top-0 bottom-0 right-6 z-40 m-auto h-7 w-7 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125`} 
        onClick={() => handleClick('right')} />
        <div ref={carouselRef} className={`flex items-center ${ !isBig && 'space-x-1 md:space-x-4'} overflow-hidden scrollbar-hide  overflow-x-scroll`}>
          {movies.map( item => (
            <Thumbnail key={item.id} movie={item} isBig={isBig} />
          ))}
        </div>
        <AiOutlineLeft className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-7 w-7 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125 ${!moved && 'hidden'}`} 
        onClick={() => handleClick('left')} />
      </div>
    </div>
  )
}

export default Row