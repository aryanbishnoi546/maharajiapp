import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="w-full min-h-screen bg-gradient-to-br from-[#050816] via-[#102a43] to-[#0b4d3a] px-4 md:px-10 py-16 flex items-center justify-center">
                <div className="grid gap-10 md:grid-cols-2 w-full max-w-5xl text-white">
                    <div className="rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 flex flex-col justify-between shadow-2xl">
                        <div>
                            <p className="uppercase tracking-[0.3em] text-sm text-emerald-200 mb-4">Maharaji Healthcare</p>
                            <h2 className="text-4xl font-semibold leading-tight">
                                Personalized Ayurvedic care, now just a login away.
                            </h2>
                            <p className="text-emerald-100 mt-4 text-sm">
                                Access your dashboard, manage consultations, and track every order with a single, secure account.
                            </p>
                        </div>
                        <div className="mt-10 space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <span className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg">🔒</span>
                                <span>Enterprise-grade encryption keeps your medical data private.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg">⚡</span>
                                <span>Lightning-fast support and real-time appointment updates.</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-900">
                        <h3 className="text-2xl font-semibold mb-2">Welcome back 👋</h3>
                        <p className="text-sm text-gray-500 mb-6">Log in to continue your wellness journey.</p>

                        {status && (
                            <div className="text-sm text-emerald-700 bg-emerald-100 border border-emerald-200 p-3 rounded mb-4">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-gray-700" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 block w-full border-gray-200 focus:border-emerald-400 focus:ring-emerald-200"
                                    placeholder="you@example.com"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1 text-red-500" />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <InputLabel htmlFor="password" value="Password" className="text-gray-700" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-emerald-600 hover:text-emerald-700"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full border-gray-200 focus:border-emerald-400 focus:ring-emerald-200"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1 text-red-500" />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-600">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span>Remember me</span>
                                </label>
                                <span className="text-gray-400">Secure login</span>
                            </div>

                            <PrimaryButton
                                className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl shadow-lg"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            New to Maharaji Healthcare?{' '}
                            <Link href={route('register')} className="text-emerald-600 font-medium">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
