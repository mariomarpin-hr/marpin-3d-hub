import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Video, Image as ImageIcon, Download } from 'lucide-react';
import type { GalleryItem } from '../types';

interface LightboxProps {
    items: GalleryItem[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ items, currentIndex, onClose, onPrev, onNext }) => {
    const item = items[currentIndex];
    const [zoom, setZoom] = useState(1);
    const isVideo = item.type === 'video';

    useEffect(() => setZoom(1), [currentIndex]);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onPrev, onNext]);

    const toggleZoom = (e: React.MouseEvent) => { e.stopPropagation(); setZoom(prev => prev === 1 ? 2.5 : 1); };
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center animate-fade-in backdrop-blur-sm" onClick={onClose}>
            <button onClick={onClose} className="absolute top-6 right-6 z-[120] group bg-white/10 hover:bg-red-500/90 text-white p-4 rounded-full backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 transform hover:scale-110" title="Zatvori (Esc)"><X size={32} className="group-hover:rotate-90 transition-transform duration-300" /></button>
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-6 text-white/50 hover:text-white hover:bg-white/10 p-6 rounded-full transition-all z-40 hidden md:block"><ChevronLeft size={48} /></button>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-6 text-white/50 hover:text-white hover:bg-white/10 p-6 rounded-full transition-all z-40 hidden md:block"><ChevronRight size={48} /></button>
            
            <div className="flex flex-col items-center justify-center w-full h-full p-4" onClick={(e) => e.stopPropagation()}>
                <div className={`relative transition-all duration-300 shadow-2xl ${isVideo ? 'bg-black rounded-lg overflow-hidden ring-1 ring-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : ''} ${isVideo ? '' : (zoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in')}`} 
                     onClick={isVideo ? undefined : toggleZoom} 
                     style={{ maxHeight: '75vh', maxWidth: '85vw' }}>
                    {isVideo ? (
                        <video src={item.url} controls autoPlay playsInline className="max-h-[75vh] max-w-[85vw] w-auto h-auto block" />
                    ) : (
                        <img src={item.url} className="max-h-[75vh] max-w-[85vw] object-contain rounded-xl shadow-2xl transition-transform duration-300" style={{ transform: `scale(${zoom})` }} alt={item.title} />
                    )}
                </div>
                <div className="mt-6 w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 animate-fade-in shadow-2xl">
                     <div className="bg-blue-600/20 p-3 rounded-full text-blue-400">
                        {isVideo ? <Video size={24} /> : <ImageIcon size={24} />}
                     </div>
                     <div className="flex-1 min-w-0 text-left">
                        <h3 className="text-white font-bold text-lg truncate">{item.title}</h3>
                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest">{item.category}</p>
                     </div>
                     <a href={item.url} download={item.title} className="bg-white text-slate-900 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 whitespace-nowrap">
                        <Download size={18}/> <span className="hidden sm:inline">Preuzmi</span>
                     </a>
                </div>
            </div>
        </div>
    );
};

export default Lightbox;