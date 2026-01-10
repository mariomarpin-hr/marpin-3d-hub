import React, { useState } from 'react';
import { Activity, Folder, ArrowRight, Video, ArrowLeft, FolderOpen, PlayCircle, Maximize2 } from 'lucide-react';
import type { GalleryItem } from '../types';
import { AnimatedBackground, TechAnimations } from '../components/AnimatedBackground';
import Lightbox from '../components/Lightbox';

interface GalleryPageProps {
    items: GalleryItem[];
}

const GalleryPage: React.FC<GalleryPageProps> = ({ items }) => {
    const [currentFolder, setCurrentFolder] = useState<'images' | 'video' | null>(null);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    const getFolderItems = () => { 
        if (currentFolder === 'images') return items.filter(i => i.type === 'image'); 
        if (currentFolder === 'video') return items.filter(i => i.type === 'video'); 
        return []; 
    };
    
    const folderItems = getFolderItems();
    const imageCount = items.filter(i => i.type === 'image').length;
    const videoCount = items.filter(i => i.type === 'video').length;

    return (
        <div className="relative min-h-screen overflow-hidden">
            <AnimatedBackground />
            <TechAnimations />
            
            <div className="absolute top-32 left-0 w-full h-[1px] bg-blue-500/30 z-0">
                <div className="absolute top-1/2 -translate-y-1/2 w-8 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-sm shadow-[0_0_15px_rgba(37,99,235,0.6)] animate-print-head z-10 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in relative z-10">
                <div className="mb-8 relative">
                    <h2 className="text-5xl font-black text-slate-900 mb-2 relative inline-block">
                        Galerija
                        <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-600 rounded-full"></div>
                    </h2>
                    <p className="text-slate-500 text-lg flex items-center gap-2 mt-2">
                        <Activity size={16} className="text-emerald-500 animate-pulse" />
                    </p>
                </div>

                {!currentFolder && (
                    <div className="flex flex-wrap gap-4 mb-12 animate-scale-in">
                        <div onClick={() => setCurrentFolder('images')} className="group flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-full border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber-400 hover:-translate-y-1 transition-all cursor-pointer min-w-[200px]">
                            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <Folder size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-800 leading-none">Slike</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider group-hover:text-amber-500">{imageCount} datoteka</span>
                            </div>
                            <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-amber-500 transition-colors" />
                        </div>

                        <div onClick={() => setCurrentFolder('video')} className="group flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-full border border-slate-200 shadow-sm hover:shadow-lg hover:border-red-400 hover:-translate-y-1 transition-all cursor-pointer min-w-[200px]">
                            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <Video size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-800 leading-none">Video</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider group-hover:text-red-500">{videoCount} datoteka</span>
                            </div>
                            <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-red-500 transition-colors" />
                        </div>
                    </div>
                )}

                {currentFolder && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/50">
                            <button onClick={() => setCurrentFolder(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase text-xs tracking-widest bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-slate-200 hover:border-blue-400 transition-all">
                                <ArrowLeft size={14} /> Natrag
                            </button>
                            <div className="flex items-center gap-3">
                                <FolderOpen size={18} className={currentFolder === 'images' ? "text-amber-500" : "text-red-500"} />
                                <span className="font-bold text-slate-900 capitalize">{currentFolder}</span>
                                <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs font-bold">{folderItems.length}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                            {folderItems.map((item, i) => (
                                <div key={i} onClick={() => setActiveIdx(i)} className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-slate-200 hover:border-blue-400">
                                    {item.type === 'video' ? (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-900 relative">
                                            <PlayCircle size={24} className="text-white opacity-80 z-10" />
                                            <video src={item.url} className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" />
                                        </div>
                                    ) : (
                                        <>
                                            <img src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" alt={item.title} />
                                        </>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white text-[10px] font-medium truncate">{item.title}</p>
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="bg-black/50 backdrop-blur-sm p-1.5 rounded-md text-white">
                                            <Maximize2 size={12} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {folderItems.length === 0 && (<div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest bg-white/50 backdrop-blur rounded-[3rem]">Ova mapa je prazna.</div>)}
                    </div>
                )}
                {activeIdx !== null && currentFolder && (
                    <Lightbox 
                        items={folderItems} 
                        currentIndex={activeIdx} 
                        onClose={() => setActiveIdx(null)} 
                        onPrev={() => setActiveIdx(prev => prev! > 0 ? prev! - 1 : folderItems.length - 1)} 
                        onNext={() => setActiveIdx(prev => prev! < folderItems.length - 1 ? prev! + 1 : 0)} 
                    />
                )}
            </div>
        </div>
    );
};

export default GalleryPage;