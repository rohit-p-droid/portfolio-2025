import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiRequest';
import { useAuth } from '../../../contexts/AuthContext';
import Loader from '../../../components/Loader';
import ThemeToggle from '../../../components/ThemeToggle';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await apiRequest<{
                success: boolean;
                data: { accessToken: string };
            }>({ url: '/auth/login', method: 'POST', data: { email, password } });

            if (response.success && response.data?.accessToken) {
                const userData = {
                    id: 'user-id',
                    name: 'Admin User',
                    email: email,
                };

                login(response.data.accessToken, userData);
                navigate('/admin');
            }
        } catch (err: any) {
            setError(err?.message ?? 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-center">Admin Login</h2>
                    </div>

                    {error && (
                        <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>
                    )}
                    <form onSubmit={submit}>
                        <label className="block mb-2 text-sm">Email <span className='text-red-600'>*</span></label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mb-4 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                        />

                        <label className="block mb-2 text-sm">Password <span className='text-red-600'>*</span></label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mb-4 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                        />

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? <Loader size={20} /> : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
