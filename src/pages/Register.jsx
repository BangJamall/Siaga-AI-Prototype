import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Mail, ShieldAlert, UserPlus, Loader2 } from "lucide-react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirm) {
            setError("Password tidak cocok. Periksa kembali.");
            return;
        }
        if (password.length < 6) {
            setError("Password minimal 6 karakter.");
            return;
        }
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("Email sudah terdaftar. Silakan login.");
            } else {
                setError("Gagal membuat akun. Coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background decorative blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-600 rounded-full opacity-10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl pointer-events-none" />

            <div className="w-full max-w-md z-10">
                {/* Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black/50 p-8">

                    {/* Logo & Branding */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-900/50">
                            <ShieldAlert size={30} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Buat Akun SIGAP</h1>
                        <p className="text-slate-400 text-sm mt-1">Bergabung dan lindungi diri dari penipuan digital</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Mail size={16} className="text-slate-500" />
                                </div>
                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <KeyRound size={16} className="text-slate-500" />
                                </div>
                                <input
                                    id="register-password"
                                    type="password"
                                    placeholder="Min. 6 karakter"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <KeyRound size={16} className="text-slate-500" />
                                </div>
                                <input
                                    id="register-confirm"
                                    type="password"
                                    placeholder="Ulangi password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-900/30 border border-red-700/50 text-red-400 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            id="register-submit"
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-900/40 mt-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <><Loader2 size={18} className="animate-spin" /> Mendaftar...</>
                            ) : (
                                <><UserPlus size={18} /> Buat Akun</>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-800" />
                        <span className="text-xs text-slate-600">sudah punya akun?</span>
                        <div className="flex-1 h-px bg-slate-800" />
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-slate-500">
                        <Link to="/" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                            Masuk ke akun yang ada
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-700 mt-6">
                    © 2026 SIGAP · Sistem Deteksi Penipuan Terpadu
                </p>
            </div>
        </div>
    );
}
