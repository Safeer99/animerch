import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Navbar = () => {
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md'>
            <div className="logo mx-5">
                <Link legacyBehavior href={'/'}>
                    <a><Image src="/logo.png" alt="" width={200} height={40} /></a>
                </Link>
            </div>
            <div className="nav">
                <ul className='flex space-x-6 mt-2 md:mt-0 font-bold md:text-md'>
                    <Link legacyBehavior href={'/tshirts'}><a><li>Tshirts</li></a></Link>
                    <Link legacyBehavior href={'/hoodies'}><a><li>Hoodies</li></a></Link>
                    <Link legacyBehavior href={'/stickers'}><a><li>Stickers</li></a></Link>
                    <Link legacyBehavior href={'/mugs'}><a><li>Mugs</li></a></Link>
                </ul>
            </div>
            <div className="cart absolute right-0 top-2 mx-5">
                <AiOutlineShoppingCart className=' text-xl md:text-3xl' />
            </div>

        </div>
    )
}

export default Navbar
