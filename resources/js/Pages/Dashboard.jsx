import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Users from './Dashboard/Users';
import Product from './Dashboard/Products';
import EditUser from '@/Components/Users/Edit';
import CreateUser from '@/Components/Users/CreateUser'; 
import Category from './Dashboard/Category'; 
import Orders from './Dashboard/Orders';
import Settings from './Dashboard/Settings';
import OrderDetails from './Dashboard/OrderDetails';

// Icons
import {
    Users as UsersIcon,
    CreditCard,
    Package,
    ShoppingCart,
    ShieldCheck,
    Layers,
    Settings as SettingsIcon,
    LogOut,
} from 'lucide-react';

export default function Dashboard({ section,products }) {
     const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); 
    const { users, categories, order } = usePage().props;
    const { url } = usePage();

     useEffect(() => {
    if (url.startsWith('/dashboard/settings')) {
        setOpenDropdown('settings');
    } else {
        setOpenDropdown(null);
    }
}, [url]);


    const renderContent = () => {
        switch (section) {
            case 'users': return <Users users={users} />;
            case 'create': return <CreateUser />;
            case 'edit-user': return <EditUser user={usePage().props.user} />
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

            {/* Mobile Menu */}
            <div className="lg:hidden bg-white px-4 py-3 shadow-md flex justify-between items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-green-700 focus:outline-none"
                >
                    ☰
                </button>
            </div>

            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-30 w-64 backdrop-blur-md bg-green-800/60 shadow-xl transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out p-4 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:flex lg:flex-col`}>
                    <div className="text-white text-xl font-bold mb-4 flex lg:hidden justify-between items-center">
                        <span>Menu</span>
                        <button onClick={() => setSidebarOpen(false)}>✕</button>
                    </div>
                    <nav className="flex flex-col mt-2">
                        <SidebarLink href="/dashboard/users" label="All Users" />
                        <SidebarLink href="/dashboard/sales" label="Sales" />
                        <SidebarLink href="/dashboard/products" label="Products" />
                        <SidebarLink href="/dashboard/members" label="Prime Members" />
                       <SidebarLink href="/dashboard/Categories" label="Categories" />
                       <SidebarLink href="/dashboard/orders" label="All Orders" />
                       <SidebarLink href="/dashboard/transactions" label="Transactions" />
                    <SidebarLink
    label="Settings"
    isDropdown={true}
    dropdownKey="settings"
    openDropdown={openDropdown}
    setOpenDropdown={setOpenDropdown}
>
    <Link
        href="/dashboard/settings?tab=profile"
        className="block px-8 py-2 text-sm text-green-700 hover:bg-green-200"
    >
        Update Profile
    </Link>
    <Link
        href="/dashboard/settings?tab=password"
        className="block px-8 py-2 text-sm text-green-700 hover:bg-green-200"
    >
        Update Password
    </Link>
    <Link
        href="/dashboard/settings?tab=role"
        className="block px-8 py-2 text-sm text-green-700 hover:bg-green-200"
    >
        Assign Role
    </Link>
    <Link
        href="/logout"
        method="post"
        as="button"
        className="block w-full text-left px-8 py-2 text-sm text-green-600 hover:bg-green-200"
    >
        Logout
    </Link>
</SidebarLink>

                    <nav className="flex flex-col gap-2">
                        <SidebarLink href="/dashboard/users" label="All Users" icon={UsersIcon} />
                        <SidebarLink href="/dashboard/transactions" label="Transactions" icon={CreditCard} />
                        <SidebarLink href="/dashboard/sales" label="Sales" icon={Package} />
                        <SidebarLink href="/dashboard/products" label="Products" icon={ShoppingCart} />
                        <SidebarLink href="/dashboard/members" label="Prime Members" icon={ShieldCheck} />
                        <SidebarLink href="/dashboard/Categories" label="Categories" icon={Layers} />
                        <SidebarLink href="/dashboard/orders" label="All Orders" icon={Package} />
                        <SidebarLink
                            label="Settings"
                            icon={SettingsIcon}
                            subLinks={[
                                { href: '/dashboard/settings?tab=profile', label: 'Update Profile' },
                                { href: '/dashboard/settings?tab=password', label: 'Change Password' },
                                { href: '/dashboard/settings?tab=role', label: 'Assign Role' },
                                { href: route('logout'), label: 'Logout', method: 'post', as: 'button', icon: LogOut },
                            ]}
                        />
                    </nav>
                </aside>

                {/* Overlay on mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-100">
                    {renderContent()}
                </main>
            </div>
        </AuthenticatedLayout>
    );
}

function SidebarLink({ href, label, icon: Icon, subLinks = [] }) {
    const [isOpen, setIsOpen] = useState(false);

export function SidebarLink({
    href,
    label,
    children,
    isDropdown = false,
    dropdownKey,           
    openDropdown,
    setOpenDropdown
}) {
    const { url } = usePage();
    const isActive = href && url.startsWith(href);

    const isOpen = dropdownKey === openDropdown;

    const handleToggle = () => {
        if (isOpen) {
            setOpenDropdown(null); 
        } else {
            setOpenDropdown(dropdownKey); 
        }
    };

    const linkClasses = `px-6 py-3 text-green-700 font-medium block border-b border-gray-300 ${
        isActive ? 'bg-green-100' : 'hover:bg-green-100'
    }`;

    if (isDropdown) {
        return (
            <div className="mb-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 rounded-xl transition"
                >
                    <span className="flex items-center gap-2">
                        {Icon && <Icon size={18} />}
                        {label}
                    </span>
                    <span>{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                    <div className="ml-6 mt-1 space-y-1">
                        {subLinks.map(({ href, label, method, as, icon: SubIcon }) => (
                            <Link
                                key={label}
                                href={href}
                                method={method}
                                as={as}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition"
                            >
                                {SubIcon && <SubIcon size={16} />}
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={href}
            className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition"
        >
            {Icon && <Icon size={18} />}
            {label}
        </Link>
    );
}
