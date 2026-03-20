import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"  // ← fungsi yang berbeda!
import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"

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
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Konfirmasi Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
