import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CartState } from '../context/CartContext'

const Wishlist = () => {

    const { fetchUserData } = CartState();

    const [products, setProducts] = useState({});

    const fetchItems = async () => {
        let data = await fetchUserData();
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproducts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wishlist: data.wishlist })
        })
        let response = await res.json();
        setProducts(response.products);
    }

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
                <h2 className='m-3 font-bold text-2xl text-black'>Your Wishlist</h2>
                <div className="flex justify-around flex-wrap -m-4">
                    {Object.keys(products).length === 0 && <p>Sorry all the tshirts are currently out of stock. New stock coming soon. Stay Tuned!</p>}
                    {Object.keys(products).map((item) => {
                        return <Link key={products[item]._id} legacyBehavior href={`/product/${products[item].slug}`} >
                            <div className="lg:w-1/5 w-1/2 p-4 cursor-pointer shadow-xl m-5">
                                <a className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].img} />
                                </a>
                                <div className="mt-4 text-center md:text-left">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                    <p className="mt-1">₹{products[item].price}</p>
                                    <div className="mt-1">
                                        {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                                        {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1' >M</span>}
                                        {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1' >L</span>}
                                        {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1' >XL</span>}
                                        {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1' >XXL</span>}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        </section>
    )
}

export default Wishlist
