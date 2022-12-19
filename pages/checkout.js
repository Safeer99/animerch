import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { CartState } from '../context/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Head from 'next/head'
// import Script from 'next/script'
import { useRouter } from 'next/router'

const Checkout = () => {
    const { cart, clearCart, removeFromCart, addToCart, subTotal } = CartState()
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [disabled, setDisabled] = useState(true);

    const handleChange = async (e) => {

        if (e.target.name === 'name') setName(e.target.value);
        else if (e.target.name === 'phone') setPhone(e.target.value);
        else if (e.target.name === 'address') setAddress(e.target.value);
        else if (e.target.name === 'pincode') {
            setPinCode(e.target.value);
            if (e.target.value.length === 6) {
                let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
                let pinJson = await pins.json()
                if (Object.keys(pinJson).includes(e.target.value)) {
                    setState(pinJson[e.target.value][1])
                    setCity(pinJson[e.target.value][0])
                }
            } else {
                setState('');
                setCity('')
            }
        }

        setTimeout(() => {
            if (name.length > 3 && address.length > 3 && phone.length > 8 && pinCode.length > 3) setDisabled(false);
            else setDisabled(true);
        }, 200);
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) router.push('/login')
        if (localStorage.getItem("email")) setEmail(localStorage.getItem("email"))
    }, [])


    const initiatePayment = async () => {
        let orderId = Math.floor(Math.random() * Date.now());

        const data = { cart, subTotal, orderId, email, name, address, pinCode, phone };
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json();
        if (response.success) {
            toast.success(response.message, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // var config = {
            //     "root": "",
            //     "flow": "DEFAULT",
            //     "data": {
            //         "orderId": orderId, /* update order id */
            //         "token": response.txnToken, /* update token value */
            //         "tokenType": "TXN_TOKEN",
            //         "amount": subTotal /* update amount */
            //     },
            //     "handler": {
            //         "notifyMerchant": function (eventName, data) {
            //             console.log("notifyMerchant handler function called");
            //             console.log("eventName => ", eventName);
            //             console.log("data => ", data);
            //         }
            //     }
            // };
            // window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            //     // after successfully updating configuration, invoke JS Checkout
            //     window.Paytm.CheckoutJS.invoke();
            // }).catch(function onError(error) {
            //     console.log("error => ", error);
            // });
        } else {
            clearCart();
            toast.error(response.error, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className='container mx-1 px-2 md:m-auto'>
            <ToastContainer />
            {/* <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head> */}
            {/* <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" /> */}
            <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
            <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
            <div className="mx-auto flex flex-wrap my-4">
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="name" className='leading-7 text-sm text-gray-600'>Name</label>
                        <input onChange={handleChange} value={name} type="text" name='name' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="email" className='leading-7 text-sm text-gray-600'>Email</label>
                        <input readOnly={true} value={email} type="email" name='email' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-[100%]">
                    <div className="mb-2">
                        <label htmlFor="address" className='leading-7 text-sm text-gray-600'>Address</label>
                        <textarea onChange={handleChange} value={address} name="address" id="address" cols="30" rows="5" className='w-full h-20 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' ></textarea>
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="phone" className='leading-7 text-sm text-gray-600'>Mobile Number</label>
                        <input onChange={handleChange} value={phone}
                            placeholder="Your 10 digit mobile number" type="phone" name='phone' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="pincode" className='leading-7 text-sm text-gray-600'>PinCode</label>
                        <input onChange={handleChange} value={pinCode} type="pincode" name='pincode' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="city" className='leading-7 text-sm text-gray-600'>City</label>
                        <input onChange={handleChange} value={city} type="text" name='city' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-2">
                        <label htmlFor="state" className='leading-7 text-sm text-gray-600'>State</label>
                        <input onChange={handleChange} value={state} type="text" name='state' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
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
                    <button onClick={initiatePayment} disabled={subTotal > 0 ? disabled : true} className='disabled:bg-pink-300 flex mt-3 text-white border-0 py-2 px-4 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>
                        <BsFillBagCheckFill className='m-1' /> Pay ₹{subTotal}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Checkout
