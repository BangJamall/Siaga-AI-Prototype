import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"  // ← fungsi yang berbeda!
import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { KeyRound, Mail, UserRoundKey } from "lucide-react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirm) {
            setError("Password tidak cocok!");
            return;
        }
        if (password.length < 6) {
            setError("Password minimal 6 karakter!");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <div className="bg-gray-500 p-4 rounded-lg">
            <form onSubmit={handleRegister} className="flex flex-col gap-4 py-5 px-10">

                <div className="flex items-center gap-2">
                <Mail size={15} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>

                <div className="flex items-center gap-2">
                <KeyRound size={15} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="flex items-center gap-2">
                <UserRoundKey size={15} />
                <input type="password" placeholder="Konfirmasi Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-5">Register</button>
            </form>
            {error && <p>{error}</p>}
            </div>
            </div>
        </div>
    );
}
