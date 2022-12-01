import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {

    const ref = useRef();

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full');
            ref.current.classList.add('translate-x-0');
        } else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0');
            ref.current.classList.add('translate-x-full');
        }
    }

    return (
        <div className='flex sticky top-0 z-10 bg-white flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md'>
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
            <div onClick={toggleCart} className="cart cursor-pointer absolute right-0 top-2 mx-5">
                <AiOutlineShoppingCart className=' text-xl md:text-3xl' />
            </div>

            <div ref={ref} className={`w-72 h-[100vh] z-10 sideCart transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'} absolute top-2 right-0 bg-pink-100 px-8 py-10`}>
                <h2 className='font-bold text-center text-xl'>Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer text-pink-500 text-2xl"><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length === 0 && <div className='my-4 font-normal'>Your cart is empty</div>}
                    {Object.keys(cart).map((item) => {
                        return <li key={item}>
                            <div className="item flex my-5">
                                <div className='w-2/3 font-semibold' >{cart[item].name}</div>
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
                        <button className='flex mt-3 text-white border-0 py-2 px-4 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>
                            <BsFillBagCheckFill className='m-1' /> Checkout
                        </button>
                    </Link>
                    <button onClick={clearCart} className='flex mt-3 text-white border-0 py-2 px-4 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>
                        Clear Cart
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Navbar
