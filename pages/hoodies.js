import Link from 'next/link'
import React from 'react'
import Product from "../models/Product";
import mongoose from "mongoose";

const Hoodies = ({ products }) => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex justify-around flex-wrap -m-4">
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

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find({ category: 'hoodie' })
    let hoodies = {}
    for (let item of products) {
        if (item.title in hoodies) {
            if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
                hoodies[item.title].size.push(item.size);
            }
        } else {
            hoodies[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                hoodies[item.title].size = [item.size];
            } else hoodies[item.title].size = [];
        }
    }

    return {
        props: { products: JSON.parse(JSON.stringify(hoodies)) }
    }
}

export default Hoodies
