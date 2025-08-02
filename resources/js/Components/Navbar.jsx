import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Navbar({ auth }) {
    const [expanded, setExpanded] = useState(false);
    const { url, props } = usePage();
    const { cartCount } = props;
    const isAdmin = auth?.user?.role === 'admin';

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/best-sellers' },
        { name: 'Online Consultation', href: '/book-online' },
        { name: 'Vision', href: '/vision' }
    ];

    return (
        <div className="bg-[#2d2b2b] text-black">
            <header className="py-4">
                <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between relative">
                    {/* Logo (Left) */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <img className="h-10" src="https://static.wixstatic.com/media/b4cfae_57ddf0f5536847acbffabdb980fde295~mv2.png/v1/fill/w_110,h_108,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b4cfae_57ddf0f5536847acbffabdb980fde295~mv2.png" alt="Logo" />
                        </Link>
                    </div>

                    {/* Centered Nav Links */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-5 py-2 rounded-full font-semibold transition-all ${
                                    url === link.href ? 'bg-gray-300' : 'bg-white'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Login + Cart */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Auth Actions */}
                        {auth?.user ? (
                            <>
                                {auth.user.role === 'admin' ? (
                                    <Link href={route('dashboard')} className="text-white hover:text-gray-300">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href={route('profile.edit')} className="text-white hover:text-gray-300">Profile</Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-white hover:text-gray-300">
                                            Log Out
                                        </Dropdown.Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <Link href={route('login')} className="flex items-center space-x-1 text-white hover:text-gray-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.2 0-9.6 1.6-9.6 4.9v2.2h19.2v-2.2c0-3.3-6.4-4.9-9.6-4.9z"/>
                                </svg>
                                <span>Log In</span>
                            </Link>
                        )}

                        {/* Cart */}
                        <Link href={route('cart.index')} className="relative text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h11.4L17 13M7 13L5.4 5M17 13l1.6-8" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs bg-pink-200 text-black w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button onClick={() => setExpanded(!expanded)} className="text-white focus:outline-none">
                            {expanded ? (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                        {/* Cart for Mobile */}
                        <Link href={route('cart.index')} className="relative text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h11.4L17 13M7 13L5.4 5M17 13l1.6-8" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs bg-pink-200 text-black w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {expanded && (
                    <div className="lg:hidden px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block w-full px-5 py-2 rounded-full font-semibold ${
                                    url === link.href ? 'bg-gray-300' : 'bg-white'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {auth?.user ? (
                            <>
                                {auth.user.role === 'admin' ? (
                                    <Link href={route('dashboard')} className="text-white hover:text-gray-300">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href={route('profile.edit')} className="text-white hover:text-gray-300">Profile</Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-white hover:text-gray-300">
                                            Log Out
                                        </Dropdown.Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-white hover:text-gray-300">Log in</Link>
                                <Link href={route('register')} className="text-white hover:text-gray-300">Register</Link>
                            </>
                        )}
                    </div>
                )}
            </header>
        </div>
    );
}
