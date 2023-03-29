import Image from 'next/image';
import Link from 'next/link';
import { VscError } from 'react-icons/vsc';

const Cancel = () => {
  return (
    <div>
        <div className='flex justify-start py-2 px-4'>
            <Image src={"/logo.svg"} alt={"logo"} width={56} height={56} className={"cursor-pointer object-contain"} />
        </div>
        <div className='h-[90vh] flex flex-col justify-center items-center'>
            <VscError className='w-[100px] h-[100px] text-red-500' />
            <h1 className='text-2xl md:text-5xl mt-4'>Canceled Subscription</h1>
            <Link href={'/'}>
                <button className='mt-4 bg-[#E10856] py-4 px-10 rounded '>Choose Plan</button>
            </Link>
        </div>
    </div>
  )
}

export default Cancel