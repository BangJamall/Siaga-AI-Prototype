import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const SLIDES = [
  '/public/1.png',
  '/public/2.png'
];

export default function WalkthroughModal({ isOpenExternal, onCloseExternal }) {
  // 1. Set state awal langsung true agar selalu muncul saat refresh
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Ref untuk menandai render pertama
  const isInitialMount = useRef(true);

  // 2. Handle pembukaan manual dari Navbar tanpa mengganggu render pertama
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // Abaikan check pertama kali agar modal tidak langsung tertutup
    }

    if (isOpenExternal) {
      setIsOpen(true);
      setCurrentIndex(0); // Reset ke slide pertama
    }
  }, [isOpenExternal]);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm animate-fade-in">
      
      {/* Kartu Rasio 4:5 Full Foto */}
      <div className="relative w-full max-w-sm aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Gambar Background 4:5 */}
        <img 
          src={SLIDES[currentIndex]} 
          alt={`Walkthrough Step ${currentIndex + 1}`} 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradasi Overlay */}
        <div/>

        {/* Tombol Silang (Close) */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all z-10 cursor-pointer"
          aria-label="Tutup Panduan"
        >
          <X size={18} />
        </button>

        {/* Footer Navigasi */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between z-10">
          {/* Indikator Titik */}
          <div className="flex gap-1.5">
            {SLIDES.map((_, idx) => (
              <span 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-blue-200'
                }`}
              />
            ))}
          </div>

          {/* Tombol Lanjut / Mulai */}
          <button 
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold text-xs shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            {currentIndex === SLIDES.length - 1 ? 'Mulai' : 'Lanjut'}
          </button>
        </div>

      </div>
    </div>
  );
}