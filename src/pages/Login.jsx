import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom"
import { KeyRound, Mail } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <div className="bg-gray-500 p-4 rounded-lg">
                    <form onSubmit={handleLogin} className="flex flex-col space-y-4 py-5 px-10">
                        <div className="flex items-center gap-2">
                        <Mail size={15} /><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>

                        <div className="flex items-center gap-2">
                        <KeyRound size={15} /><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Login</button>
                    </form>
                    
                    <p>Belum punya akun? <Link to="/register" className="text-blue-500 bg-white rounded-lg px-2 py-1">Register</Link></p>
                    <p className="text-sm mt-2">atau login menggunakan <span className="font-bold">digdaya@gmail.com</span>, pw: <span className="font-bold">12345678</span></p>
                    {error && <p className="text-red-800">{error}</p>}
                </div>
            </div>
        </div>
    );
}