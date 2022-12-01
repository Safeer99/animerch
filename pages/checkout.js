import Link from 'next/link'
import React from 'react'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'

const Checkout = ({ cart, removeFromCart, addToCart, subTotal }) => {
    return (
        <div className='container mx-1 px-2 md:m-auto'>
            <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
            <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
            <div className="mx-auto flex flex-wrap my-4">
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="name" className='leading-7 text-sm text-gray-600'>Name</label>
                        <input type="text" name='name' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="email" className='leading-7 text-sm text-gray-600'>Email</label>
                        <input type="email" name='email' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-[100%]">
                    <div className="mb-2">
                        <label htmlFor="address" className='leading-7 text-sm text-gray-600'>Address</label>
                        <textarea name="address" id="address" cols="30" rows="5" className='w-full h-20 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' ></textarea>
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="phone" className='leading-7 text-sm text-gray-600'>Phone</label>
                        <input type="phone" name='phone' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="city" className='leading-7 text-sm text-gray-600'>City</label>
                        <input type="text" name='city' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="state" className='leading-7 text-sm text-gray-600'>State</label>
                        <input type="text" name='state' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="pincode" className='leading-7 text-sm text-gray-600'>PinCode</label>
                        <input type="pincode" name='pincode' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
            </div>
            <h2 className='font-semibold text-xl'>2. Review Cart Items & pay</h2>
            <div className="sideCart px-6 py-2 mx-4 my-2">
                <span className="absolute top-2 right-2 cursor-pointer text-pink-500 text-2xl"><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length === 0 && <div className='my-4 font-normal'>Your cart is empty</div>}
                    {Object.keys(cart).map((item) => {
                        return <li key={item}>
                            <div className="item flex m-5">
                                <div className='font-semibold' >{cart[item].name}</div>
                                <div className='flex items-center justify-center font-semibold w-1/3 text-lg' >
                                    <AiFillMinusCircle onClick={() => removeFromCart(item, 1)} className='cursor-pointer text-pink-500' />
                                    <span className='mx-2 text-sm' >{cart[item].qty}</span>
                                    <AiFillPlusCircle onClick={() => addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)} className='cursor-pointer text-pink-500' />
                                </div>
                            </div>
                        </li>
                    })}
                </ol>
                <span className='font-bold'>SubTotal: ₹{subTotal}</span>
                <Link legacyBehavior href={'/checkout'}>
                    <button className='flex mt-3 text-white border-0 py-2 px-4 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>
                        <BsFillBagCheckFill className='m-1' /> Pay ₹{subTotal}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Checkout
