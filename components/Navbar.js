import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { CartState } from '../context/CartContext'

const Navbar = () => {

    const { key, logout, token, cart, addToCart, removeFromCart, clearCart, subTotal } = CartState();
    const [dropDown, setDropDown] = useState(false);
    const [sideBar, setSideBar] = useState(false);

    const toggleCart = () => {
        setSideBar(!sideBar);
    }

    useEffect(() => {
        setSideBar(key);
    }, [key])

    return (
        <>
            {/* menu items and logog */}
            <div className={"flex sticky top-0 z-10 text-black bg-white flex-col md:flex-row md:justify-start md:items-center justify-center items-start py-2 shadow-md"}>
                <div className="logo mx-5">
                    <Link legacyBehavior href={'/'}>
                        <a><Image src="/logo.png" alt="" width={200} height={40} /></a>
                    </Link>
                </div>
                <div className="nav mx-auto md:mx-0">
                    <ul className='flex space-x-6 mt-2 md:mt-0 font-bold md:text-md'>
                        <Link legacyBehavior href={'/tshirts'}><a><li className='hover:text-pink-700'>Tshirts</li></a></Link>
                        <Link legacyBehavior href={'/hoodies'}><a><li className='hover:text-pink-700'>Hoodies</li></a></Link>
                        <Link legacyBehavior href={'/stickers'}><a><li className='hover:text-pink-700'>Stickers</li></a></Link>
                        <Link legacyBehavior href={'/mugs'}><a><li className='hover:text-pink-700'>Mugs</li></a></Link>
                    </ul>
                </div>

            </div>

            {/* dropdown menu and login button */}
            <div className="z-30 cursor-pointer fixed right-9 top-3 mx-3 text-black">
                <div onMouseOver={() => { setDropDown(true) }} onMouseLeave={() => { setDropDown(false) }}>
                    {token.value && <MdAccountCircle className='text-2xl' />}
                    {token.value && dropDown && <div className="absolute right-0 w-36 py-2 bg-pink-100 rounded-md shadow-xl">
                        <Link legacyBehavior href={'/myaccount'}><a className="block px-4 py-2 text-sm text-black font-bold hover:bg-pink-300 hover:text-white">My Account</a></Link>
                        <Link legacyBehavior href={'/orders'}><a className="block px-4 py-2 text-sm text-black font-bold hover:bg-pink-300 hover:text-white">Orders</a></Link>
                        <Link legacyBehavior href={'/wishlist'}><a className="block px-4 py-2 text-sm text-black font-bold hover:bg-pink-300 hover:text-white">Wishlist</a></Link>
                        <a onClick={logout} className="block px-4 py-2 text-sm text-black font-bold hover:bg-pink-300 hover:text-white">Logout</a>
                    </div>}
                </div>
                {!token.value && <Link legacyBehavior href={'/login'}>
                    <a>
                        <button className='flex text-white border-0 mr-2 py-1 px-3 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>
                            Log In
                        </button>
                    </a>
                </Link>}
            </div>

            {/* cart */}
            <div onClick={() => setSideBar(false)} className={`fixed left-0 top-0 z-30 w-full h-full ${sideBar ? 'block' : 'hidden'} bg-black opacity-80`}></div>
            <div className='top-3 right-3 z-30 fixed text-black'>
                <AiOutlineShoppingCart onClick={toggleCart} className='z-30 text-2xl mx-1 cursor-pointer' />
                <div className={`w-72 h-[100vh] absolute -top-2 ${sideBar ? "-translate-x-60" : "translate-x-12"} transition-transform overflow-y-scroll  z-40  bg-pink-100 px-8 py-10`}>
                    <h2 className='font-bold text-center text-xl'>Shopping Cart</h2>
                    <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer text-pink-500 text-2xl"><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {Object.keys(cart).length === 0 && <div className='my-4 font-normal'>Your cart is empty</div>}
                        {Object.keys(cart).map((item) => {
                            return <li key={item}>
                                <div className="item flex my-5">
                                    <div className='w-2/3 font-semibold' >{cart[item].name}({cart[item].size})</div>
                                    <div className='flex items-center justify-center font-semibold w-1/3 text-lg' >
                                        <AiFillMinusCircle onClick={() => removeFromCart(item, 1)} className='cursor-pointer text-pink-500' />
                                        <span className='mx-2 text-sm' >{cart[item].qty}</span>
                                        <AiFillPlusCircle onClick={() => addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)} className='cursor-pointer text-pink-500' />
                                    </div>
                                </div>
                            </li>
                        })}
                    </ol>
                    <div className='font-bold my-2'>SubTotal: ₹{subTotal}</div>
                    <div className="flex justify-between">
                        <Link legacyBehavior href={'/checkout'}>
                            <button onClick={toggleCart} disabled={Object.keys(cart).length === 0} className='flex mt-3 disabled:bg-pink-300 text-white border-0 py-2 px-4 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>
                                <BsFillBagCheckFill className='m-1' /> Checkout
                            </button>
                        </Link>
                        <button onClick={clearCart} disabled={Object.keys(cart).length === 0} className='flex mt-3 disabled:bg-pink-300 text-white border-0 py-2 px-4 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>
                            Clear Cart
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar
