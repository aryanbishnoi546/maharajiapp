import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Your Password?</h2>

                <p className="mb-6 text-sm text-gray-300 text-center">
                    No worries! Enter your email address and we’ll send you a link to reset your password.
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-400 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                            placeholder="you@example.com"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2 text-red-400" />
                    </div>

                    <PrimaryButton
                        className="w-full d-flex justify-center text-center bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded-md shadow"
                        disabled={processing}
                    >
                        Email Password Reset Link
                    </PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}
