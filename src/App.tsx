import React, { useState, useEffect } from 'react';
import { Box, FolderSync } from 'lucide-react';
import type { Project, GalleryItem, Page } from './types';
import { safeStorage } from './utils';

import HomePage from './pages/HomePage';
import ModelsPage from './pages/ModelsPage';
import ModelDetail from './pages/ModelDetailPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import SyncPage from './pages/SyncPage';

// --- JAVNI PODACI ZA WEB (PORTFOLIO) ---
// Ovi podaci se učitavaju iz mape 'public'
const PUBLIC_PORTFOLIO: Project[] = [
    {
        id: 'demo-1',
        title: 'Moj Prvi Model',
        category: 'Prototipovi',
        description: 'Primjer modela dostupnog na webu. Datoteke se nalaze u public mapi.',
        // Putanja počinje s / što označava public mapu
        thumbnail: '/images/projekt1_thumb.jpg', 
        instructions: 'Printati s 20% infilla, PLA plastika.',
        downloads: 120,
        likes: 45,
        files: [
            { name: 'model.stl', url: '/models/model1.stl', type: 'stl' },
            { name: 'slika.jpg', url: '/images/projekt1_thumb.jpg', type: 'image' }
        ]
    }
    // OVDJE DODAJ SVOJE OSTALE PROJEKTE KOPIRANJEM BLOKA IZNAD
];

const PUBLIC_GALLERY: GalleryItem[] = [
    { url: '/images/projekt1_thumb.jpg', title: 'Radiona', category: 'Galerija', type: 'image' }
];

const App = () => {
    const [page, setPage] = useState<Page>('home');
    
    // Inicijalno stanje su javni podaci iz public mape
    const [projects, setProjects] = useState<Project[]>(PUBLIC_PORTFOLIO);
    const [gallery, setGallery] = useState<GalleryItem[]>(PUBLIC_GALLERY);
    
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLocalMode, setIsLocalMode] = useState(false);

    useEffect(() => {
        // Ovdje se može dodati logika za učitavanje, npr. analitika
    }, []);

    const handleSync = (p: Project[], g: GalleryItem[]) => { 
        setProjects(p); 
        setGallery(g); 
        setIsLocalMode(true); 
        setPage('models'); 
    };

    const incrementDownload = (projectId: string) => {
        const updatedProjects = projects.map(p => {
            if (p.id === projectId) {
                const newCount = (p.downloads || 0) + 1;
                const key = isLocalMode ? 'dl_local_' + p.title : 'dl_' + p.id;
                safeStorage.setItem(key, newCount.toString());
                if (selectedProject && selectedProject.id === projectId) {
                    setSelectedProject({...p, downloads: newCount});
                }
                return { ...p, downloads: newCount };
            }
            return p;
        });
        setProjects(updatedProjects);
    };

    const incrementLike = (projectId: string) => {
        const updatedProjects = projects.map(p => {
            if (p.id === projectId) {
                const newCount = (p.likes || 0) + 1;
                const key = isLocalMode ? 'likes_local_' + p.title : 'likes_' + p.id;
                safeStorage.setItem(key, newCount.toString());
                if (selectedProject && selectedProject.id === projectId) {
                    setSelectedProject({...p, likes: newCount});
                }
                return { ...p, likes: newCount };
            }
            return p;
        });
        setProjects(updatedProjects);
    };

    const renderContent = () => {
        switch(page) {
            case 'home': return <HomePage onNavigate={setPage} />;
            case 'gallery': return <GalleryPage items={gallery} />;
            case 'models': return <ModelsPage projects={projects} onSelect={(p) => { setSelectedProject(p); setPage('detail'); }} onLike={incrementLike} />;
            case 'detail': 
                if (!selectedProject) return <ModelsPage projects={projects} onSelect={(p) => { setSelectedProject(p); setPage('detail'); }} onLike={incrementLike} />;
                return <ModelDetail project={selectedProject} onBack={() => setPage('models')} onDownload={incrementDownload} />;
            case 'about': return <AboutPage />;
            case 'sync': return <SyncPage onSync={handleSync} />;
            default: return <HomePage onNavigate={setPage} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="sticky top-0 z-50 glass h-20 px-6">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                    <div onClick={() => setPage('home')} className="flex items-center gap-3 font-black text-xl tracking-tighter cursor-pointer text-slate-900 hover:text-blue-600 transition-colors">
                        <div className="bg-slate-900 text-white p-2 rounded-lg"><Box size={20}/></div> 3D MARPIN
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => setPage('home')} className={`text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${page === 'home' ? 'text-blue-600' : 'text-slate-500'}`}>Početna</button>
                        <button onClick={() => setPage('gallery')} className={`text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${page === 'gallery' ? 'text-blue-600' : 'text-slate-500'}`}>Galerija</button>
                        <button onClick={() => setPage('models')} className={`text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${page === 'models' ? 'text-blue-600' : 'text-slate-500'}`}>Modeli</button>
                        <button onClick={() => setPage('about')} className={`text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${page === 'about' ? 'text-blue-600' : 'text-slate-500'}`}>O Meni</button>
                    </div>
                    <button onClick={() => setPage('sync')} className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg flex items-center gap-2"><FolderSync size={16} /> Sync</button>
                </div>
            </nav>
            <main className="flex-grow">{renderContent()}</main>
            <footer className="py-12 text-center text-slate-400 text-sm font-medium border-t border-slate-200 mt-20"><p>© 2024 3D MARPIN. Svi modeli su vlasništvo autora.</p></footer>
        </div>
    );
};

export default App;