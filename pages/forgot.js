import Link from 'next/link'
import React from 'react'

const Forgot = () => {
    return (
        <section className="">
            <div className="px-6 h-full text-gray-800">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="flex justify-center grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12">
                        <img
                            src="/icon.png"
                            width="45%"
                            alt="Sample image"
                        />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 mt-6 md:mt-12">
                        <form>
                            <div className="flex flex-row items-center justify-center mb-6">
                                <p className="text-lg font-bold">Forgot Password</p>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Email address"
                                />
                            </div>

                            <div className="text-center flex justify-center lg:text-left">
                                <button
                                    type="button"
                                    className="inline-block px-7 py-3 bg-pink-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Continue
                                </button>
                            </div>
                            <div className="flex justify-center my-3">
                                <Link legacyBehavior href={'/login'}>
                                    <a href="#!" className="px-2 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">LogIn</a>
                                </Link>/
                                <Link legacyBehavior href={'/signup'}>
                                    <a href="#!" className="px-2 text-purple-600 hover:text-purple-700 focus:text-purple-700 transition duration-200 ease-in-out">SignUp</a>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Forgot
