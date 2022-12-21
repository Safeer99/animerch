import mongoose from 'mongoose';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CartState } from '../context/CartContext';
import Order from '../models/Order'

const MyOrder = ({ order }) => {
    const products = order.products;
    const router = useRouter()
    const { clearCart } = CartState()
    const [date, setDate] = useState()
    useEffect(() => {
        if (router.query.clearcart == 1) clearCart()
        const d = new Date(order.createdAt);
        setDate(d);
    }, [])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">SHOPNOW.COM</h2>
                        <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">Order id: {order.orderId}</h1>
                        <p className="leading-relaxed mb-1">Your order has been successfully placed.</p>
                        <p className="leading-relaxed mb-1">Order placed on:  {date?.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
                        <p className="leading-relaxed mb-4">Your payment status is <span className='font-semibold text-slate-700'>{order.status}</span>.</p>
                        <div className="flex mb-4">
                            <span className="flex-grow border-gray-300 py-2 text-lg px-1">Item description</span>
                            <span className="flex-grow text-right border-gray-300 py-2 text-lg px-1">Quantity</span>
                            <span className="flex-grow text-right border-gray-300 py-2 text-lg px-1">Item Total</span>
                        </div>
                        {Object.keys(products).map((item) => {
                            return <div key={item} className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">{products[item].name} ({products[item].size}/{products[item].variant})</span>
                                <span className="ml-auto text-gray-900">{products[item].qty}</span>
                                <span className="ml-auto text-gray-900">₹{products[item].price}</span>
                            </div>
                        })}
                        <div className="flex flex-col">
                            <span className="title-font mt-2 font-medium text-xl text-gray-900">SubTotal: ₹{order.amount}</span>
                            <button className="w-[120px] mt-4 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let order = await Order.findById(context.query.id)

    return {
        props: { order: JSON.parse(JSON.stringify(order)) }
    }
}

export default MyOrder
