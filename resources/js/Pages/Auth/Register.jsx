import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        image: null,
        active: true,
        registered_at: new Date().toISOString().slice(0, 16),
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            forceFormData: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mx-auto mt-20 bg-[#1c1c1c] text-white p-8 max-w-3xl w-full rounded-3xl shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center mb-4">Create an Account 📝</h2>

                <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-gray-100" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-1 text-red-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-gray-100" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-1 text-red-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" className="text-gray-100" />
                        <TextInput
                            id="phone"
                            type="tel"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-1 text-red-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="image" value="Profile Image" className="text-gray-100" />
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-gray-300 file:bg-green-700 file:text-white file:rounded file:px-3 file:py-1 file:border-0"
                        />
                        <InputError message={errors.image} className="mt-1 text-red-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-gray-100" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-1 text-red-400" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-100" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-400"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-1 text-red-400" />
                    </div>

                    <PrimaryButton
                        className="block d-flex justify-center w-full text-center bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded-md shadow"
                        disabled={processing}
                    >
                        Register
                    </PrimaryButton>
                </form>

                <p className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href={route('login')} className="text-green-400 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
