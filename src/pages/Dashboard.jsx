import { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Search,
    ShieldAlert,
    Globe,
    Phone,
    MessageSquare,
    AlertTriangle,
    Loader2,
    LogOut,
} from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [input, setInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const calculateRiskScore = (links, numbers, keywords) => {
        let score = 0;
        if (links.length > 0) score += 40;
        if (numbers.length > 0) score += 20;
        if (keywords) score += 40;
        return score;
    };

    const analyzeContent = () => {
        if (!input.trim()) return;
        setIsAnalyzing(true);
        setResult(null);

        setTimeout(() => {
            const detectedLinks = input.match(/(https?:\/\/[^\s]+)/g) || [];
            const detectedNumbers = input.match(/(\+?\d{10,15})/g) || [];
            const hasKeywords = /hadiah|menang|undian|klik|rekening|urgent|polisi|bank/i.test(input);
            const score = calculateRiskScore(detectedLinks, detectedNumbers, hasKeywords);

            setResult({
                score,
                links: detectedLinks,
                numbers: detectedNumbers,
                textAnalysis: hasKeywords
                    ? "Mencurigakan: Mengandung kata kunci manipulatif."
                    : "Normal: Tidak ditemukan pola teks penipuan umum.",
                verdict: score > 70 ? "BAHAYA" : score > 30 ? "WASPADA" : "AMAN",
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={22} className="text-blue-600" />
                    <span className="font-bold text-blue-600">SIGAP</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 hidden sm:block">{user?.email}</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition cursor-pointer"
                    >
                        <LogOut size={15} />
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="p-4 md:p-8">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <header className="text-center mb-10 mt-4">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-4 text-white shadow-lg shadow-blue-200">
                            <ShieldAlert size={32} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">SIGAP</h1>
                        <p className="text-slate-500 mt-2">Deteksi penipuan terpadu: Nomor, Pesan, dan Link dalam satu langkah.</p>
                    </header>

                    {/* Input Area */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-8">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Tempel Pesan atau Link di sini
                        </label>
                        <textarea
                            className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                            placeholder="Contoh: Selamat! Anda menang undian 50jt dari Bank ABC. Klik link ini: http://bit.ly/undian-palsu atau hubungi 08123456789"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            onClick={analyzeContent}
                            disabled={isAnalyzing || !input}
                            className={`w-full mt-4 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${isAnalyzing || !input
                                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
                                }`}
                        >
                            {isAnalyzing ? (
                                <><Loader2 className="animate-spin" /> Menganalisis dengan AI...</>
                            ) : (
                                <><Search size={20} /> Periksa Sekarang</>
                            )}
                        </button>
                    </div>

                    {/* Results */}
                    {result && (
                        <div className={`rounded-3xl p-1 ${result.verdict === 'BAHAYA' ? 'bg-red-100' :
                                result.verdict === 'WASPADA' ? 'bg-amber-100' : 'bg-green-100'
                            }`}>
                            <div className="bg-white rounded-[1.4rem] p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">Hasil Analisis</h2>
                                    <div className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest ${result.verdict === 'BAHAYA' ? 'bg-red-500 text-white' :
                                            result.verdict === 'WASPADA' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
                                        }`}>
                                        {result.verdict}
                                    </div>
                                </div>

                                {/* Score Bar */}
                                <div className="mb-8">
                                    <div className="flex justify-between text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                        <span>Tingkat Risiko</span>
                                        <span>{result.score}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${result.score > 70 ? 'bg-red-500' :
                                                    result.score > 30 ? 'bg-amber-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${result.score}%` }}/>
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-4">
                                    {/* Text */}
                                    <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg h-fit">
                                            <MessageSquare size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm uppercase text-slate-400 tracking-tight">Analisis Konten Teks</h3>
                                            <p className="text-slate-700 mt-1">{result.textAnalysis}</p>
                                        </div>
                                    </div>

                                    {/* Numbers */}
                                    <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg h-fit">
                                            <Phone size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm uppercase text-slate-400 tracking-tight">Deteksi Nomor Telepon</h3>
                                            {result.numbers.length > 0 ? (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {result.numbers.map((num, i) => (
                                                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-mono">{num}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-slate-400 text-sm italic mt-1">Tidak ada nomor terdeteksi.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg h-fit">
                                            <Globe size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm uppercase text-slate-400 tracking-tight">Deteksi Tautan (URL)</h3>
                                            {result.links.length > 0 ? (
                                                <div className="mt-2 space-y-2">
                                                    {result.links.map((link, i) => (
                                                        <div key={i} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200 text-sm">
                                                            <span className="truncate text-blue-600 max-w-[200px]">{link}</span>
                                                            <span className="text-red-500 flex items-center gap-1 text-[10px] font-bold uppercase">
                                                                <AlertTriangle size={12} /> Domain Baru
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-slate-400 text-sm italic mt-1">Tidak ada link terdeteksi.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
