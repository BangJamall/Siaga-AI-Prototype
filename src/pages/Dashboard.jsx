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
    const [backendData, setBackendData] = useState(null);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const analyzeContent = async () => {
        if (!input.trim()) return;
        setIsAnalyzing(true);
        setResult(null);
        setBackendData(null);

        try {
            const response = await fetch('/api/analyze', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Gagal melakukan analisis");
            }

            const data = await response.json();
            console.log("Analysis success:", data);
            setResult(data);
            setBackendData(data);
        } catch (error) {
            console.error("Analysis error:", error);
            setResult({
                final_status: "ERROR",
                skor_detail: { skor_final: 0 },
                error: error.message || "Tidak dapat terhubung ke backend."
            });
            setBackendData({ error: error.message || "Tidak dapat terhubung ke backend" });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={20} className="text-blue-600" />
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
                    <header className="text-center mb-8">
                        <div className="inline-flex flex-col items-center justify-center p-3  bg-blue-600 shadow-lg shadow-blue-200 rounded-xl">
                            <ShieldAlert size={22} className="text-white"/>
                        </div>
                        <div className="mb-4"> <h1 className="font-bold text-blue-500">SIGAP</h1></div>
                        <p className="text-slate-500 text-sm">Deteksi penipuan terpadu: Nomor, Pesan, dan Link dalam satu langkah.</p>
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
                        <div className={`rounded-3xl p-1 ${result.final_status === 'BAHAYA' || result.final_status === 'ERROR' ? 'bg-red-100' :
                            result.final_status === 'WASPADA' ? 'bg-amber-100' : 'bg-green-100'
                            }`}>
                            <div className="bg-white rounded-[1.4rem] p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">Hasil Analisis</h2>
                                    <div className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest ${result.final_status === 'BAHAYA' || result.final_status === 'ERROR' ? 'bg-red-500 text-white' :
                                        result.final_status === 'WASPADA' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
                                        }`}>
                                        {result.final_status}
                                    </div>
                                </div>

                                {result.error ? (
                                    <p className="text-red-500 text-sm font-medium">{result.error}</p>
                                ) : (
                                    <>
                                        {/* Score Bar */}
                                        <div className="mb-8">
                                            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                                <span>Tingkat Risiko</span>
                                                <span>{result.skor_detail?.skor_final}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${result.skor_detail?.skor_final > 70 ? 'bg-red-500' :
                                                        result.skor_detail?.skor_final > 30 ? 'bg-amber-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${result.skor_detail?.skor_final}%` }} />
                                            </div>
                                            {/* {result.skor_detail?.bobot && (
                                                <div className="mt-2 flex gap-4 text-[10px] text-slate-400">
                                                    <span>Bobot Teks: {result.skor_detail.bobot.teks} (Skor: {result.skor_detail.skor_teks})</span>
                                                    <span>Bobot Link: {result.skor_detail.bobot.link} (Skor: {result.skor_detail.skor_link})</span>
                                                    <span>Bobot Nomor: {result.skor_detail.bobot.nomor} (Skor: {result.skor_detail.skor_nomor})</span>
                                                </div>
                                            )} */}
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
                                                    <div className="mt-1">
                                                        <span className={`text-sm font-semibold ${
                                                            result.text_analysis?.risk === 'BAHAYA' ? 'text-red-600' :
                                                            result.text_analysis?.risk === 'WASPADA' ? 'text-amber-600' : 'text-green-600'
                                                        }`}>
                                                            {result.text_analysis?.risk || 'AMAN'}
                                                        </span>
                                                        <p className="text-slate-600 text-sm mt-0.5">
                                                            Model TF-IDF ({result.text_analysis?.layer1?.label} - {result.text_analysis?.layer1?.confidence}%)
                                                        </p>
                                                        {result.text_analysis?.pola && result.text_analysis.pola.length > 0 && (
                                                            <div className="mt-1 flex flex-wrap gap-1">
                                                                {result.text_analysis.pola.map((polaStr, idx) => (
                                                                    <span key={idx} className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-[10px] uppercase font-bold">{polaStr}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Numbers */}
                                            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg h-fit">
                                                    <Phone size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-sm uppercase text-slate-400 tracking-tight">Deteksi Nomor Telepon</h3>
                                                    {result.phone_analysis?.phones_found && result.phone_analysis.phones_found.length > 0 ? (
                                                        <div className="mt-2 space-y-2">
                                                            {result.phone_analysis.details.map((phone, i) => (
                                                                <div key={i} className="flex flex-col bg-white p-3 rounded-lg border border-slate-200 text-sm">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="font-mono font-semibold">{phone.original}</span>
                                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                                            phone.risk_level === 'BAHAYA' ? 'bg-red-500 text-white' :
                                                                            phone.risk_level === 'WASPADA' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
                                                                        }`}>
                                                                            {phone.risk_level}
                                                                        </span>
                                                                    </div>
                                                                    {(phone.carrier || phone.line_type) && (
                                                                        <div className="text-xs text-slate-400 mt-1">
                                                                            Provider: {phone.carrier || '-'} | Tipe: {phone.line_type || '-'}
                                                                        </div>
                                                                    )}
                                                                    {phone.warnings && phone.warnings.length > 0 && (
                                                                        <ul className="mt-1.5 text-xs text-red-500 list-disc list-inside">
                                                                            {phone.warnings.map((w, idx) => <li key={idx}>{w}</li>)}
                                                                        </ul>
                                                                    )}
                                                                </div>
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
                                                    {result.url_analysis?.urls_found && result.url_analysis.urls_found.length > 0 ? (
                                                        <div className="mt-2 space-y-2">
                                                            {result.url_analysis.urls_found.map((url, i) => {
                                                                const detection = result.url_analysis.detections?.find(d => d.url === url);
                                                                return (
                                                                    <div key={i} className="flex flex-col bg-white p-3 rounded-lg border border-slate-200 text-sm">
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="truncate text-blue-600 max-w-[200px] font-mono">{url}</span>
                                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                                                detection?.status === 'BAHAYA' ? 'bg-red-500 text-white' :
                                                                                detection?.status === 'WASPADA' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
                                                                            }`}>
                                                                                {detection?.status || 'AMAN'}
                                                                            </span>
                                                                        </div>
                                                                        {detection?.warnings && detection.warnings.length > 0 && (
                                                                            <ul className="mt-1.5 text-xs text-red-500 list-disc list-inside">
                                                                                {detection.warnings.map((w, idx) => <li key={idx}>{w}</li>)}
                                                                            </ul>
                                                                        )}
                                                                        {detection?.message && (!detection.warnings || detection.warnings.length === 0) && (
                                                                            <p className="mt-1 text-xs text-red-500">{detection.message}</p>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <p className="text-slate-400 text-sm italic mt-1">Tidak ada link terdeteksi.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* {backendData && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mt-6">
                            <h2 className="text-lg font-bold mb-3">Respons Backend</h2>
                            <pre className="whitespace-pre-wrap text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 overflow-x-auto">
                                {JSON.stringify(backendData, null, 2)}
                            </pre>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
