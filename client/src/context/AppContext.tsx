import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
interface User {
    id: string;
    name: string;
    email: string;
    plan: string;
    analysisCount?: number;
}
interface AppContextType {
    user : User | null;
    token: string | null;
    loading: boolean;
    api: AxiosInstance;
    login: (email: string, password: string) => Promise<{success: boolean; message?: string}>;
    register: (name: string, email: string, password: string) => Promise<{success: boolean; message?: string}>;
    logout: () => void;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState<boolean>(true);

    const api = axios.create({
        baseURL: BACKEND_URL,
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    const loadUser = async () => {
        if (token) {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to load user:', error);
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    // useState(() => {
    //     loadUser();
    // });
    useEffect(() => {
        loadUser();
    }, []);
    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            return { success: true };
        } catch (error: any) {
            console.error('Login error:', error);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { token, user } = response.data;  
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            return { success: true };
        } catch (error: any) {
            console.error('Registration error:', error);
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };



    const value = {
        user,
        token,
        loading,
        api,
        login,
        register,
        logout
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};