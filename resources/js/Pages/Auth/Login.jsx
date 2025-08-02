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

            <div className=" mx-auto mt-20 bg-[#1c1c1c] text-white p-8 max-w-3xl w-full rounded-3xl shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center mb-4">Welcome Back 👋</h2>
                {status && (
                    <div className="text-sm text-green-400 bg-green-900 p-2 rounded">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-gray-100" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-1 text-red-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-gray-100" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-1 text-red-400" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-400">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2">Remember me</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-green-400 hover:text-green-500 underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <PrimaryButton
                        className="block w-full d-flex justify-center text-center bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded-md shadow"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>

                </form>

                <p className="text-center text-sm text-gray-400">
                    Don’t have an account?{' '}
                    <Link href={route('register')} className="text-green-400 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
