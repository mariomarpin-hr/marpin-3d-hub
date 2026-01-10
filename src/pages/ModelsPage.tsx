import React, { useState } from 'react';
import { Search, Folder, ArrowLeft, Box, Download, Heart, ChevronRight } from 'lucide-react';
import type { Project } from '../types';
import { AnimatedBackground, TechAnimations } from '../components/AnimatedBackground';

interface ModelsPageProps {
    projects: Project[];
    onSelect: (project: Project) => void;
    onLike: (projectId: string) => void;
}

const ModelsPage: React.FC<ModelsPageProps> = ({ projects, onSelect, onLike }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const categories = [...new Set(projects.map(p => p.category))];
    const filtered = projects.filter(p => { 
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()); 
        if (activeCategory) return matchSearch && p.category === activeCategory; 
        return matchSearch; 
    });
    const getCount = (cat: string) => projects.filter(p => p.category === cat).length;
    
    return (
        <div className="relative min-h-screen">
            <AnimatedBackground />
            <TechAnimations />
            
            <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div><h2 className="text-5xl font-black text-slate-900 mb-4">Moji Modeli</h2><p className="text-slate-500 text-lg">{activeCategory ? `Kategorija: ${activeCategory}` : ''}</p></div>
                    <div className="relative w-full md:w-96"><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input type="text" placeholder="Pretraži modele..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur border-2 border-slate-100 rounded-2xl font-bold focus:outline-none focus:border-blue-500 transition-all shadow-sm" /></div>
                </div>
                
                {!activeCategory && search === '' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {categories.map((cat, i) => (
                            <div key={i} onClick={() => setActiveCategory(cat)} className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                                        <Folder size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-slate-800 truncate text-lg group-hover:text-blue-600 transition-colors">{cat}</h3>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{getCount(cat)} stavki</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {(activeCategory || search !== '') && (
                    <div className="animate-fade-in">
                        {activeCategory && (<button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase text-xs tracking-widest mb-8 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft size={16} /> Natrag na Kategorije</button>)}
                        {filtered.length === 0 ? (<div className="text-center py-32 bg-white/50 backdrop-blur rounded-[3rem] border-2 border-dashed border-slate-200"><Box size={64} className="mx-auto text-slate-300 mb-4" /><p className="text-slate-400 font-bold text-xl">Nema pronađenih modela.</p></div>) : (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between px-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200/50 mb-2">
                                    <span>Projekt</span>
                                    <span className="hidden sm:block">Status</span>
                                </div>

                                {filtered.map(p => {
                                    return (
                                        <div key={p.id} onClick={() => onSelect(p)} className="group bg-white/90 hover:bg-white backdrop-blur rounded-xl border border-slate-200 hover:border-blue-400 p-2 flex items-center gap-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-x-1">
                                            
                                            <div className="w-20 h-14 shrink-0 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-100">
                                                {p.thumbnail ? (
                                                    <img src={p.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Box size={20} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h3 className="text-base font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{p.title}</h3>
                                                <p className="text-[10px] text-slate-400 font-medium truncate">{p.description || "Nema dodatnog opisa."}</p>
                                            </div>

                                            <div className="flex items-center gap-2 mr-2">
                                                <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200" title="Broj preuzimanja">
                                                    <Download size={12} />
                                                    <span>{p.downloads || 0}</span>
                                                </div>

                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); onLike(p.id); }}
                                                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-100 transition-colors active:scale-95"
                                                    title="Sviđa mi se"
                                                >
                                                    <Heart size={12} className={p.likes > 0 ? "fill-current animate-heart" : ""} />
                                                    <span>{p.likes || 0}</span>
                                                </button>
                                            </div>

                                            <div className="w-8 h-8 flex items-center justify-center rounded-full text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <ChevronRight size={16} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelsPage;