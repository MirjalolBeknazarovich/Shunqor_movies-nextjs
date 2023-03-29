import Image from "next/image";
import { AiOutlineSearch, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { HiOutlineBellAlert } from 'react-icons/hi2'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import NavMenu from "src/components/nav-menu/nav-menu";

const Header = () => {
  const [ scrolled, setScrolled] = useState(false);
  const { logout } = useAuth()
  useEffect( () => {
    const handleScroll = () => {
      if ( window.scrollY > 0 ){
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  return (
    <header className={`${scrolled && 'bg-[#141414] shadow-lg'}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
            <Link href='/'>
              <Image src={"/logo.svg"} alt={"logo"} width={56} height={56} className={"cursor-pointer object-contain"} />
            </Link>
            <NavMenu />
            <ul className="space-x-4 md:flex hidden">
              <li className="navLink">Home</li>
              <li className="navLink">Movies</li>
              <li className="navLink">TV Shows</li>
              <li className="navLink">New</li>
              <li className="navLink">Popular</li>
            </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          <AiOutlineSearch className="h-6 w-6 cursor-pointer" />
          <p className="hidden lg:inline navLink">Kids</p>
          <HiOutlineBellAlert className="h-6 w-6 cursor-pointer" />
          <Link href={'/account'}>
            <AiOutlineUser className="h-6 w-6 cursor-pointer" />
          </Link>
          <AiOutlineLogout className="h-6 w-6 cursor-pointer" onClick={logout} />
        </div>
    </header>
  )
}

export default Header