import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsPencilFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartState } from '../context/CartContext';

const MyAccount = () => {

    const router = useRouter();

    const { userState, token } = CartState();

    const [user, setUser] = useState(userState)
    const [selectedField, setSelectedField] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleChange = (e) => {
        if (e.target.name === 'name') setUser({ ...user, name: e.target.value });
        else if (e.target.name === 'phone') setUser({ ...user, phone: e.target.value });
        else if (e.target.name === 'address') setUser({ ...user, address: e.target.value });
        else if (e.target.name === 'pincode') setUser({ ...user, pincode: e.target.value });
        else if (e.target.name === 'current-password') setCurrentPassword(e.target.value);
        else if (e.target.name === 'new-password') setNewPassword(e.target.value);
    }

    const handleUserSubmit = async () => {
        let data = { token: token.value, name: user.name, phone: user.phone, address: user.address, pincode: user.pincode }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        let updatedData = await res.json()
        if (updatedData.success) {
            toast.success('Successfully updated details Yayy', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setUser(updatedData.data);
        } else {
            toast.error('Please retry again', {
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
        setSelectedField("");
    }

    const handleChangePass = async () => {
        let data = { token: token.value, currentPassword, newPassword }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.success) {
            toast.success('Password change successfully', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
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
        setSelectedField("");
        setCurrentPassword("");
        setNewPassword("");
    }

    useEffect(() => {
        if (token.value === null) router.push('/');
        setSelectedField("");
    }, [])

    return (
        <>
            <div className='container mx-auto my-9 px-3'>
                <ToastContainer />
                <div className='max-w-3xl mx-auto'>
                    <h2 className='my-4 text-2xl font-bold'>Manage Your Profile</h2>
                    <div className='w-full h-[100px] rounded relative text-xl font-semibold p-4 bg-gray-100 shadow-lg '>
                        {user?.name}<BsPencilFill onClick={() => setSelectedField("name")} className='absolute text-base cursor-pointer top-6 right-5' />
                        <p className='text-sm mt-2' >Account Owner</p>
                    </div>
                    <div className='w-full relative p-4 rounded border-2 mt-5'>
                        <h3 className='text-xl mb-2 font-semibold'>Contact Details</h3>
                        <p className='my-2 font-semibold'>Email: <span className='font-normal mr-2'>{user?.email}</span> <span className='font-light'>( Not editable )</span></p>
                        <p className='font-semibold'>Phone: <span className='font-normal mr-2'>{user?.phone ? user?.phone : "Not set"}</span> <BsPencilFill onClick={() => setSelectedField("phone")} className='absolute text-base cursor-pointer bottom-4 right-5' /></p>
                    </div>
                    <div className='w-full relative p-4 rounded border-2 mt-5'>
                        <h3 className='text-xl mb-2 font-semibold'>Address</h3>
                        <p className='font-normal my-2 mr-2'>{user?.address ? user?.address : "Not set"}</p>
                        <p className='font-semibold'>Pin-code: <span className='font-normal'>{user?.pincode ? user?.pincode : "Not set"}</span> <BsPencilFill onClick={() => setSelectedField("address")} className='absolute text-base cursor-pointer bottom-4 right-5' /></p>
                    </div>
                    <div className='w-full relative p-4 rounded border-2 mt-5'>
                        <h3 className='text-xl mb-2 font-semibold'>Change Password</h3>
                        <p className='font-normal'>******** <BsPencilFill onClick={() => setSelectedField("password")} className='absolute text-base cursor-pointer bottom-4 right-5' /></p>
                    </div>
                </div>
            </div>
            <div className={` ${selectedField ? 'block' : 'hidden'} w-[100%] h-[100vh] fixed top-0 bg-black opacity-70 left-0`}></div>
            <div className={` ${selectedField ? 'block' : 'hidden'} w-[100%] h-[100vh] p-4 fixed top-0 left-0`}>
                <div className="max-w-sm rounded mx-auto my-48 p-5 bg-white">
                    <h3 className='text-xl mb-4 font-semibold relative'>Update {selectedField} <span className='absolute right-0 top-1 text-pink-500 cursor-pointer'><AiFillCloseCircle onClick={() => setSelectedField("")} /> </span></h3>
                    {
                        selectedField === "password" && <>
                            <div className="mb-2">
                                <label htmlFor="password" className='leading-7 text-sm text-gray-600'>Current Password</label>
                                <input onChange={handleChange} value={currentPassword} type="password" name='current-password' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password" className='leading-7 text-sm text-gray-600'>New Password</label>
                                <input onChange={handleChange} value={newPassword} type="password" name='new-password' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                            </div>
                        </>
                    }
                    {
                        selectedField === ("address" || "pincode") && <>
                            <div className="mb-2">
                                <label htmlFor="text" className='leading-7 text-sm text-gray-600'>Address</label>
                                <textarea onChange={handleChange} value={user?.address} name="address" id="address" cols="30" rows="2" className='w-full h-20 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' ></textarea>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="text" className='leading-7 text-sm text-gray-600'>Pin-code</label>
                                <input onChange={handleChange} value={user?.pincode} type="text" name='pincode' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                            </div>
                        </>
                    }
                    {
                        selectedField === "phone" && <>
                            <div className="mb-2">
                                <label htmlFor="text" className='leading-7 text-sm text-gray-600'>Phone</label>
                                <input onChange={handleChange} value={user?.phone} type="text" name='phone' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                            </div>
                        </>
                    }
                    {
                        selectedField === "name" && <>
                            <div className="mb-2">
                                <label htmlFor="text" className='leading-7 text-sm text-gray-600'>Name</label>
                                <input onChange={handleChange} value={user?.name} type="text" name='name' className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                            </div>
                        </>
                    }
                    <button onClick={() => { selectedField === 'password' ? handleChangePass() : handleUserSubmit() }} className='disabled:bg-pink-300 flex my-4 text-white border-0 py-2 px-6 focus:outline-none rounded text-sm bg-pink-500 hover:bg-pink-600'>Submit</button>
                </div>
            </div>
        </>
    )
}

export default MyAccount
