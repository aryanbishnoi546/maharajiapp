import { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Users as UsersIcon,
    CreditCard,
    Package,
    ShoppingCart,
    ShieldCheck,
    Layers,
    Settings as SettingsIcon,
    LogOut,
    ChevronUp,
    ChevronDownIcon,
    ChevronUpIcon
} from 'lucide-react';

import Users from './Dashboard/Users';
import Product from './Dashboard/Products';
import EditUser from '@/Components/Users/Edit';
import CreateUser from '@/Components/Users/CreateUser';
import Category from './Dashboard/Category';
import Orders from './Dashboard/Orders';
import Settings from './Dashboard/Settings';
import OrderDetails from './Dashboard/OrderDetails';

export default function Dashboard({ section, products }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const { users, categories, order, url } = usePage().props;

    useEffect(() => {
        if (url && url.startsWith('/dashboard/settings')) {
            setOpenDropdown('settings');
        } else {
            setOpenDropdown(null);
        }
    }, [url]);

    const renderContent = () => {
        switch (section) {
            case 'users': return <Users users={users} />;
            case 'create': return <CreateUser />;
            case 'edit-user': return <EditUser user={usePage().props.user} />;
            case 'transactions': return <div className="p-6">Transactions</div>;
            case 'sales': return <div className="p-6">Sales Content</div>;
            case 'products': return <Product products={products} categories={categories} />;
            case 'members': return <div className="p-6">Prime Members Content</div>;
            case 'settings': return <Settings />;
            case 'Categories': return <Category categories={categories} />;
            case 'orders': return <Orders orders={usePage().props.orders} />;
            case 'order-details': return <OrderDetails order={order} />;
            default: return <div className="p-6">You're logged in!</div>;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="lg:hidden bg-white px-4 py-3 shadow-md flex justify-between items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-green-700 text-xl"
                >
                    ☰
                </button>
                <span className="font-semibold text-green-700">Dashboard</span>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out transform p-4 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="mb-4 text-xl font-bold">Admin Panel</div>
                    <nav className="space-y-1">
                        <SidebarLink href="/dashboard/users" label="All Users" icon={UsersIcon} />
                        <SidebarLink href="/dashboard/transactions" label="Transactions" icon={CreditCard} />
                        <SidebarLink href="/dashboard/sales" label="Sales" icon={Package} />
                        <SidebarLink href="/dashboard/products" label="Products" icon={ShoppingCart} />
                        <SidebarLink href="/dashboard/members" label="Prime Members" icon={ShieldCheck} />
                        <SidebarLink href="/dashboard/Categories" label="Categories" icon={Layers} />
                        <SidebarLink href="/dashboard/orders" label="All Orders" icon={Package} />

                        <SidebarDropdown
                            label="Settings"
                            icon={SettingsIcon}
                            isOpen={openDropdown === 'settings'}
                            toggle={() => setOpenDropdown(openDropdown === 'settings' ? null : 'settings')}
                            links={[
                                { label: 'Update Profile', href: '/dashboard/settings?tab=profile' },
                                { label: 'Change Password', href: '/dashboard/settings?tab=password' },
                                { label: 'Assign Role', href: '/dashboard/settings?tab=role' },
                                { label: 'Logout', href: route('logout'), method: 'post', as: 'button', icon: LogOut },
                            ]}
                        />
                    </nav>
                </aside>

                {sidebarOpen && (
                    <div className="fixed inset-0 z-20 bg-black bg-opacity-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                <main className="flex-1 overflow-y-auto bg-gray-100">
                    {renderContent()}
                </main>
            </div>
        </AuthenticatedLayout>
    );
}

function SidebarLink({ href, label, icon: Icon }) {
    const { url } = usePage();
    const isActive = url.startsWith(href);

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${isActive ? 'bg-green-700 text-white' : 'hover:bg-green-700 hover:text-white'
                }`}
        >
            {Icon && <Icon size={18} />}
            {label}
        </Link>
    );
}

function SidebarDropdown({ label, icon: Icon, isOpen, toggle, links }) {
    return (
        <div>
            <button
                onClick={toggle}
                className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
                <span className="flex items-center gap-2">
                    {Icon && <Icon size={18} />}
                    {label}
                </span>
                {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
            </button>
            {isOpen && (
                <div className="ml-4 mt-2 space-y-1">
                    {links.map((link, idx) =>
                        link.as === 'button' ? (
                            <Link
                                key={idx}
                                href={link.href}
                                method={link.method}
                                as="button"
                                className="w-full text-left px-3 py-2 block text-sm text-white hover:bg-green-700 rounded"
                            >
                                {link.icon && <link.icon size={14} className="inline-block mr-1" />}
                                {link.label}
                            </Link>
                        ) : (
                            <Link
                                key={idx}
                                href={link.href}
                                className="block px-3 py-2 text-sm text-white hover:bg-green-700 rounded"
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
