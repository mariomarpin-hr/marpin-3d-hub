import React, { useState, useEffect } from 'react';
import { ArrowLeft, Tag, CheckCircle2, Box, Image as ImageIcon, FileText, Download, Heart, FileCode, Archive, MessageSquare, Send, ThumbsUp, Trash2 } from 'lucide-react';
import type { Project, ProjectFile, Comment } from '../types';
import { AnimatedBackground, TechAnimations } from '../components/AnimatedBackground';
import STLViewer from '../components/STLViewer';
import Lightbox from '../components/Lightbox';
import { safeStorage, zipAndDownload } from '../utils';

interface ModelDetailProps {
    project: Project;
    onBack: () => void;
    onDownload: (id: string) => void;
}

const ModelDetail: React.FC<ModelDetailProps> = ({ project, onBack, onDownload }) => {
    const stls = project.files.filter(f => f.type === 'stl'); 
    const images = project.files.filter(f => f.type === 'image');
    // Map project images to GalleryItem format for Lightbox
    const galleryImages = images.map(img => ({
        url: img.url,
        title: img.name,
        category: project.title,
        type: 'image' as const
    }));

    const [activeStl, setActiveStl] = useState<ProjectFile | undefined>(stls[0]); 
    const [comments, setComments] = useState<Comment[]>([]); 
    const [newCommentName, setNewCommentName] = useState(''); 
    const [newCommentText, setNewCommentText] = useState(''); 
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [instructionText, setInstructionText] = useState<string | null>(null);

    // Učitavanje komentara
    useEffect(() => { 
        const saved = safeStorage.getItem(`comments_${project.id}`); 
        if (saved) { 
            try { setComments(JSON.parse(saved)); } catch (e) { setComments([]); } 
        } else { 
            setComments([]); 
        } 
    }, [project.id]);

    // Učitavanje teksta uputa (ako je .txt datoteka)
    useEffect(() => {
        if (project.instructions && project.instructions.endsWith('.txt')) {
            fetch(project.instructions)
                .then(res => {
                    if (!res.ok) throw new Error("File not found");
                    return res.text();
                })
                .then(text => setInstructionText(text))
                .catch(err => {
                    console.error("Failed to load instructions:", err);
                    setInstructionText("Nije moguće učitati upute. Provjerite putanju datoteke.");
                });
        } else {
            setInstructionText(project.instructions);
        }
    }, [project.instructions]);

    const updateComments = (newComments: Comment[]) => { 
        setComments(newComments); 
        safeStorage.setItem(`comments_${project.id}`, JSON.stringify(newComments)); 
    };

    const handlePostComment = (e: React.FormEvent) => { 
        e.preventDefault(); 
        if (!newCommentName.trim() || !newCommentText.trim()) return; 
        const newComment: Comment = { 
            id: Date.now(), 
            name: newCommentName, 
            text: newCommentText, 
            date: new Date().toLocaleDateString('hr-HR'), 
            likes: 0 
        }; 
        updateComments([newComment, ...comments]); 
        setNewCommentText(''); 
    };

    const handleDeleteComment = (commentId: number) => { 
        if(confirm("Jeste li sigurni da želite obrisati ovaj komentar?")) { 
            const updated = comments.filter(c => c.id !== commentId); 
            updateComments(updated); 
        } 
    };

    const handleLikeComment = (commentId: number) => { 
        const updated = comments.map(c => c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c); 
        updateComments(updated); 
    };

    return (
        <div className="relative min-h-screen pb-20">
            <AnimatedBackground />
            <TechAnimations />
            
            <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <button onClick={onBack} className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase text-xs tracking-widest bg-white/50 backdrop-blur px-5 py-2.5 rounded-full border border-slate-200 transition-all shadow-sm hover:shadow">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Povratak
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"><Tag size={12}/> {project.category}</span>
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"><CheckCircle2 size={12}/> Verified</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 mb-16">
                    <div className="space-y-6">
                        <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-2xl bg-slate-900 group h-[450px]">
                            <div className="absolute inset-0 border-[4px] border-slate-800/50 rounded-2xl pointer-events-none z-20"></div>
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest font-mono">LIVE PREVIEW // STL</span>
                            </div>
                            {activeStl ? (
                                <STLViewer url={activeStl.url} />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                                    <Box size={48} className="opacity-20" />
                                    <p className="font-mono text-xs uppercase tracking-widest">Nema 3D Podataka</p>
                                </div>
                            )}
                        </div>

                        {images.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 custom-scroll">
                                {images.map((img, i) => (
                                    <div key={i} className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer group" onClick={() => setLightboxIndex(i)}>
                                        <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {instructionText && (
                            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                                <h3 className="flex items-center gap-2 font-black text-slate-800 mb-4 uppercase tracking-widest text-xs relative z-10"><FileText size={16} className="text-blue-600"/> Upute & Postavke</h3>
                                <div className="font-mono text-xs md:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 relative z-10 selection:bg-blue-100 selection:text-blue-900">
                                    {instructionText}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Box size={100} /></div>
                            <h1 className="text-4xl font-black text-slate-900 mb-4 relative z-10 leading-tight">{project.title}</h1>
                            <p className="text-slate-600 font-medium leading-relaxed relative z-10">Ovo je moj vlastiti 3D model spreman za printanje. Sadrži optimiziranu geometriju.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg border border-slate-700 flex flex-col items-center justify-center text-center">
                                <Download className="text-blue-400 mb-2" />
                                <span className="text-2xl font-bold">{project.downloads || 0}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Preuzimanja</span>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center justify-center text-center">
                                <Heart className="text-red-500 mb-2 fill-red-500" />
                                <span className="text-2xl font-bold text-slate-800">{project.likes || 0}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Sviđanja</span>
                            </div>
                        </div>

                        <div className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex-grow flex flex-col">
                            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Datoteke Projekta</h3>
                                <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Ready to Print</span>
                            </div>
                            <div className="overflow-y-auto max-h-[250px] custom-scroll p-2 space-y-1">
                                {project.files.map((f, i) => {
                                    const isActive = activeStl && activeStl.url === f.url;
                                    return (
                                        <div key={i} onClick={() => { if(f.type === 'stl') setActiveStl(f); }} 
                                             className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all text-sm group ${isActive ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-700'}`}>
                                            <div className="flex items-center gap-3 min-w-0">
                                                {f.type === 'stl' && <Box size={16} className={isActive ? "text-white" : "text-blue-500"} />}
                                                {f.type === 'image' && <ImageIcon size={16} className={isActive ? "text-white" : "text-amber-500"} />}
                                                {f.type === 'gcode' && <FileCode size={16} className={isActive ? "text-white" : "text-emerald-500"} />}
                                                <span className="font-bold truncate">{f.name}</span>
                                            </div>
                                            <a href={f.url} download={f.name} onClick={(e) => { e.stopPropagation(); onDownload(project.id); }} className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/20 hover:bg-white/30 text-white' : 'hover:bg-blue-100 text-slate-400 hover:text-blue-600'}`}>
                                                <Download size={14} />
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button onClick={() => { onDownload(project.id); zipAndDownload(project); }} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95">
                            <Archive size={20} /> Preuzmi Cijeli Projekt (.zip)
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto border-t border-slate-200 pt-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><MessageSquare size={24} /></div>
                        <h3 className="text-2xl font-black text-slate-900">Rasprava <span className="text-slate-300 text-lg font-medium">({comments.length})</span></h3>
                    </div>
                    
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm mb-8">
                        <form onSubmit={handlePostComment} className="flex gap-4">
                            <div className="flex-grow space-y-3">
                                <input type="text" value={newCommentName} onChange={(e) => setNewCommentName(e.target.value)} placeholder="Tvoje Ime" className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-3 font-bold text-sm outline-none border transition-all" />
                                <input type="text" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} placeholder="Napiši komentar..." className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-3 font-medium text-sm outline-none border transition-all" />
                            </div>
                            <button type="submit" className="bg-slate-900 text-white px-6 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg self-stretch flex flex-col items-center justify-center gap-1">
                                <Send size={18} /> <span className="text-[10px] uppercase">Send</span>
                            </button>
                        </form>
                    </div>

                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex gap-4 p-4 bg-white/50 rounded-2xl border border-slate-100/50 hover:bg-white transition-colors">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                    {comment.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-slate-800">{comment.name}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{comment.date}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-2">{comment.text}</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleLikeComment(comment.id)} className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"><ThumbsUp size={12} /> {comment.likes || 0}</button>
                                        <button onClick={() => handleDeleteComment(comment.id)} className="text-xs font-bold text-slate-300 hover:text-red-500 flex items-center gap-1 transition-colors"><Trash2 size={12} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {lightboxIndex !== null && ( 
                <Lightbox 
                    items={galleryImages} 
                    currentIndex={lightboxIndex} 
                    onClose={() => setLightboxIndex(null)} 
                    onPrev={() => setLightboxIndex(prev => prev! > 0 ? prev! - 1 : galleryImages.length - 1)} 
                    onNext={() => setLightboxIndex(prev => prev! < galleryImages.length - 1 ? prev! + 1 : 0)} 
                /> 
            )}
        </div>
    );
};

export default ModelDetail;