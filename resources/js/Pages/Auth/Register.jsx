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

            <div className="w-full min-h-screen bg-gradient-to-br from-[#050816] via-[#102a43] to-[#0b4d3a] px-4 md:px-10 py-16 flex items-center justify-center">
                <div className="grid gap-10 lg:grid-cols-2 w-full max-w-5xl text-white">
                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
                        <p className="uppercase tracking-[0.3em] text-sm text-emerald-200 mb-4">Start your journey</p>
                        <h2 className="text-4xl font-semibold leading-tight">
                            Become part of the Maharaji Healthcare community.
                        </h2>
                        <p className="text-emerald-100 mt-4 text-sm">
                            Register once to unlock curated consultations, personalized recommendations, and priority support.
                        </p>

                        <div className="mt-10 space-y-4 text-sm">
                            {["Verified Ayurvedic experts", "Encrypted medical history", "Priority scheduling"].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg">✔</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-900">
                        <h3 className="text-2xl font-semibold mb-2">Create your account</h3>
                        <p className="text-sm text-gray-500 mb-6">We’ll tailor the experience based on your details.</p>

                        <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
                            <div>
                                <InputLabel htmlFor="name" value="Full name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-2 block w-full border-gray-200 focus:border-emerald-400 focus:ring-emerald-200"
                                    placeholder="Dev Goyal"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-1 text-red-500" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 block w-full border-gray-200 focus:border-emerald-400 focus:ring-emerald-200"
                                    placeholder="you@example.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-1 text-red-500" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone number" />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    inputMode="tel"
                                    pattern="^\\+?[0-9]{7,15}$"
                                    title="Enter a valid phone number (7-15 digits)"
                                    className="mt-2 block w-full border-gray-200 focus:border-emerald-400 focus:ring-emerald-200"
                                    placeholder="+91 98765 43210"
                                    onChange={(e) => setData('phone', e.target.value.replace(/[^0-9+]/g, ''))}
                                    maxLength={16}
                                    required
                                />
                                <InputError message={errors.phone} className="mt-1 text-red-500" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Profile image" />
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="mt-2 block w-full border border-dashed border-gray-300 rounded-lg px-3 py-2 text-sm file:bg-emerald-600 file:text-white file:border-0 file:rounded file:px-4 file:py-2"
                                />
                                <InputError message={errors.image} className="mt-1 text-red-500" />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-2 block w-full border-gray-200 focus:border-emerald-400 focus:ring-emerald-200"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-1 text-red-500" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm password" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-2 block w-full border-gray-200 focus:border-emerald-400 focus:ring-emerald-200"
                                        placeholder="Repeat password"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-1 text-red-500" />
                                </div>
                            </div>

                            <PrimaryButton
                                className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl shadow-lg"
                                disabled={processing}
                            >
                                Create account
                            </PrimaryButton>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Already have an account?{' '}
                            <Link href={route('login')} className="text-emerald-600 font-medium">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
