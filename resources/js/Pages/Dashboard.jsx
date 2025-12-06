import { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Users as UsersIcon,
    Package,
    ShoppingCart,
    Layers,
    ChevronDownIcon,
    ChevronUpIcon,
    TicketIcon,
    CalendarDays,
    ShieldCheck
} from 'lucide-react';

import Users from './Dashboard/Users';
import Product from './Dashboard/Products';
import EditUser from '@/Components/Users/Edit';
import CreateUser from '@/Components/Users/CreateUser';
import Category from './Dashboard/Category';
import Orders from './Dashboard/Orders';
import Settings from './Dashboard/Settings';
import OrderDetails from './Dashboard/OrderDetails';
import MeetingsTable from './Dashboard/MeetingsTable';
import Create_coupon from './Dashboard/Coupons/Create_coupon';
import CouponList from '@/Components/Coupon';
import Edit_Coupon from './Dashboard/Coupons/Edit_coupon';
export default function Dashboard({ section, products, coupons }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const { users, categories, order, url, orders, auth } = usePage().props;
    const totalUsers = users?.length ?? 0;
    const totalProducts = products?.total ?? products?.data?.length ?? 0;
    const totalOrders = orders?.total ?? 0;
    const showOverviewStats = !section || section === 'home';

    useEffect(() => {
        if (url && url.startsWith('/dashboard/settings')) {
            setOpenDropdown('settings');
        } else {
            setOpenDropdown(null);
        }
    }, [url]);

    const statCards = [
        {
            label: 'Active Users',
            value: totalUsers,
            change: '+4 this week',
            icon: UsersIcon,
            accent: 'bg-emerald-500/15 text-emerald-600'
        },
        {
            label: 'Live Products',
            value: totalProducts,
            change: '+2 launched',
            icon: ShoppingCart,
            accent: 'bg-amber-500/15 text-amber-600'
        },
        {
            label: 'Orders this month',
            value: totalOrders,
            change: 'Updated hourly',
            icon: Package,
            accent: 'bg-blue-500/15 text-blue-600'
        }
    ];

    const renderContent = () => {
        switch (section) {
            case 'users': return <Users users={users} />;
            case 'coupon': return <CouponList coupons={coupons} />;
            case 'create': return <CreateUser />;
            case 'Create_coupon': return <Create_coupon />;
            case 'Edit_Coupon': return <Edit_Coupon />;
            case 'edit-user': return <EditUser user={usePage().props.user} />;
            case 'transactions': return <div className="p-6">Transactions</div>;
            case 'sales': return <div className="p-6">Sales Content</div>;
            case 'products': return <Product products={products} categories={categories} />;
            case 'members': return <div className="p-6">Prime Members Content</div>;
            case 'settings': return <Settings />;
            case 'Categories': return <Category categories={categories} />;
            case 'orders': return <Orders orders={usePage().props.orders} />;
            case 'meetings': return <MeetingsTable meetings={usePage().props.meetings} />;
            case 'order-details': return <OrderDetails order={order} />;
            default: return <Users users={users} />;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-slate-50">
                <aside
                    className={`fixed inset-y-0 left-0 z-30 w-72 bg-[#0f1f1a] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-2xl">🪷</div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Admin</p>
                            <h1 className="text-lg font-semibold">Maharaji Panel</h1>
                        </div>
                    </div>
                    <nav className="px-4 py-6 space-y-1">
                        <SidebarLink href="/dashboard/users" label="All Users" icon={UsersIcon} />
                        <SidebarLink href="/dashboard/Categories" label="Categories" icon={Layers} />
                        <SidebarLink href="/dashboard/products" label="Products" icon={ShoppingCart} />
                        <SidebarLink href="/dashboard/orders" label="Orders" icon={Package} />
                        <SidebarLink href="/dashboard/coupons" label="Coupons" icon={TicketIcon} />
                        <SidebarLink href="/meetings" label="Meetings" icon={CalendarDays} />
                    </nav>
                </aside>

                {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

                <div className="flex-1 flex flex-col">
                    <div className="lg:hidden bg-white px-4 py-3 shadow flex justify-between items-center">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-emerald-700 text-xl">☰</button>
                        <span className="font-semibold text-emerald-700">Dashboard</span>
                    </div>

                    <header className="hidden lg:flex items-center justify-between px-10 py-6 border-b border-slate-200 bg-white">
                        <div>
                            <p className="text-sm text-slate-500">Welcome back</p>
                            <h2 className="text-2xl font-semibold text-slate-800">{auth?.user?.name ?? 'Team Maharaji'}</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-slate-500">Role</p>
                                <p className="font-medium text-slate-800">{auth?.user?.role ?? 'admin'}</p>
                            </div>
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-lg text-emerald-600">
                                {auth?.user?.name?.[0]?.toUpperCase() ?? 'M'}
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto">
                        <div className="px-4 py-6 lg:px-10 lg:py-8 space-y-8">
                            {showOverviewStats && (
                                <div className="grid gap-4 md:grid-cols-3">
                                    {statCards.map((card) => (
                                        <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{card.label}</p>
                                                    <p className="text-3xl font-semibold text-slate-900 mt-2">{card.value}</p>
                                                    <p className="text-xs text-slate-500 mt-1">{card.change}</p>
                                                </div>
                                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${card.accent}`}>
                                                    <card.icon size={22} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="bg-gradient-to-br from-[#0f1f1a] to-[#1b4332] rounded-2xl p-5 text-white flex flex-col justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">System health</p>
                                            <p className="text-3xl font-semibold mt-2">100%</p>
                                            <p className="text-sm text-emerald-100 mt-1">Services & queues operational</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm mt-4 text-emerald-100">
                                            <ShieldCheck size={18} />Backups synced 10 min ago
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition text-sm ${isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`}
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
                className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-[#3a543c] transition"
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
                                className="w-full text-left px-3 py-2 block text-sm text-white hover:bg-[#3a543c] rounded"
                            >
                                {link.icon && <link.icon size={14} className="inline-block mr-1" />}
                                {link.label}
                            </Link>
                        ) : (
                            <Link
                                key={idx}
                                href={link.href}
                                className="block px-3 py-2 text-sm text-white hover:bg-[#3a543c] rounded"
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
