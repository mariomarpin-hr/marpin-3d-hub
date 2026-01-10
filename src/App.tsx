import { useState, useEffect } from 'react';
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
        id: 'granicnik_za_svrdlo',
        title: 'Granicnik za svrdlo',
        category: 'Alati',
        description: 'Podesivi dio koji se stavlja na svrdlo za regulacije dubine.',
        // Putanja počinje s / što označava public mapu
        thumbnail: '/models/granicnik za svrdlo/granicnik za svrdlo.jpg', 
        instructions: '/models/granicnik za svrdlo/upute.txt',
        downloads: 0,
        likes: 0,
        files: [
            { name: 'granicnik za svrdlo.stl.stl', url: '/models/granicnik za svrdlo/granicnik za svrdlo.stl', type: 'stl' },
            { name: 'granicnik za svrdlo.jpg', url: '/models/granicnik za svrdlo/granicnik za svrdlo.jpg', type: 'image' },

            { name: 'upute.txt', url: '/models/granicnik za svrdlo/upute.txt', type: 'other' },
        ]
    },
    {
    id: 'za_ravnjanje_pločica', // Jedinstveni ID (npr. ime modela bez razmaka)
    title: 'za ravnjanje pločica', // Ime koje vide korisnici
    category: 'Alati', // Kategorija za filtriranje
    description: 'Služi za poravnavanje pločica prilikom posavljanja.',
    // VAŽNO: Putanja mora početi s '/' i odgovarati putanji u 'public' folderu
    thumbnail: '/models/za ravnjanje pločica/za ravnanje pločica.png', 
    downloads: 0,
    likes: 0,
    instructions: '/models/za ravnjanje pločica/upute.txt', 
    files: [
      { name: 'kajla.stl', url: '/models/za ravnjanje pločica/kajla.stl', type: 'stl' },
      { name: 'matica.stl', url: '/models/za ravnjanje pločica/matica.stl', type: 'stl' },
      { name: 'šaraf - baza.stl', url: '/models/za ravnjanje pločica/šaraf - baza.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/za ravnjanje pločica/upute.txt', type: 'other' },
      { name: 'za ravnanje pločica.jpg', url: '/models/za ravnjanje pločica/za ravnanje pločica.jpg', type: 'image' }
    ]
  },
  {
    id: 'zupcanik',
    title: 'zupcanik',
    category: 'Alati',
    description: '?',
    thumbnail: '/models/zupcanik/zupčanik.png',
    downloads: 0,
    likes: 0,
    instructions: '/models/zupcanik/upute.txt',
    files: [
      { name: 'zupčanik.stl', url: '/models/zupcanik/zupčanik .stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/zupcanik/upute.txt', type: 'other' }
    ]
  },
  {
    id: 'držac_za_svijetlo', // Jedinstveni ID (npr. ime modela bez razmaka)
    title: 'Držac za svijetlo', // Ime koje vide korisnici
    category: 'Hobi', // Kategorija za filtriranje
    description: 'Postavlja se na kraj ribolovnog štapa da drži svijetleci element.',
    // VAŽNO: Putanja mora početi s '/' i odgovarati putanji u 'public' folderu
    thumbnail: '/models/držac za svijetlo/držac za svijetlo.jpg', 
    downloads: 0,
    likes: 0,
    instructions: '/models/držac za svijetlo/upute.txt',// Sustav će automatski potražiti 'upute.txt' u files listi ispod
    files: [
      { name: 'držac za svijetlo.stl', url: '/models/držac za svijetlo/držac za svijetlo.stl', type: 'stl' },
      { name: 'držac za svijetlo drugi dio.stl', url: '/models/držac za svijetlo/držac za svijetlo drugi dio.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/držac za svijetlo/upute.txt', type: 'other' },
       // DODAJ SLIKE OVDJE s tipom 'image' da se pojave ispod preglednika:
      { name: 'držac za svijetlo.jpg', url: '/models/držac za svijetlo/držac za svijetlo.jpg', type: 'image' }
    ]
  },
  {
    id: 'kalup_za_olovo_200g', // Jedinstveni ID (npr. ime modela bez razmaka)
    title: 'Kalup za olovo 200g', // Ime koje vide korisnici
    category: 'Hobi', // Kategorija za filtriranje
    description: 'Pozitiv i negativ kalupa za izradu od gipla.',
    // VAŽNO: Putanja mora početi s '/' i odgovarati putanji u 'public' folderu
    thumbnail: '/models/kalup za olovo 200g/kalup za olovo 200g.jpg', 
    downloads: 0,
    likes: 0,
    instructions: '/models/kalup za olovo 200g/upute.txt',// Sustav će automatski potražiti 'upute.txt' u files listi ispod
    files: [
      { name: 'D kalup 2.stl', url: '/models/kalup za olovo 200g/D kalup 2.stl', type: 'stl' },
      { name: 'D kalup 2-1.stl', url: '/models/kalup za olovo 200g/D kalup 2-1.stl', type: 'stl' },
      { name: 'D kalup 2-2.stl', url: '/models/kalup za olovo 200g/D kalup 2-2.stl', type: 'stl' },
      { name: 'D kalup 2-3.stl', url: '/models/kalup za olovo 200g/D kalup 2-3.stl', type: 'stl' },
      { name: 'D kalup 2-4.stl', url: '/models/kalup za olovo 200g/D kalup 2-4.stl', type: 'stl' },
      { name: 'doljnji kalup.stl', url: '/models/kalup za olovo 200g/doljnji kalup.stl', type: 'stl' },
      { name: 'G kalup 2.stl', url: '/models/kalup za olovo 200g/G kalup 2.stl', type: 'stl' },
      { name: 'gornji kalup.stl', url: '/models/kalup za olovo 200g/gornji kalup.stl', type: 'stl' },
      { name: 'kajla m.stl', url: '/models/kalup za olovo 200g/kajla m.stl', type: 'stl' },
      { name: 'kajla v.stl', url: '/models/kalup za olovo 200g/kajla v.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/kalup za olovo 200g/upute.txt', type: 'other' },
       // DODAJ SLIKE OVDJE s tipom 'image' da se pojave ispod preglednika:
      { name: 'kalup za olovo 200g.jpg', url: '/models/kalup za olovo 200g/kalup za olovo 200g.jpg', type: 'image' }
    ]
  },
  {
    id: 'kutija za udice', // Jedinstveni ID (npr. ime modela bez razmaka)
    title: 'Kutija za udice', // Ime koje vide korisnici
    category: 'Hobi', // Kategorija za filtriranje
    description: 'Kutijica sa dvije strane za predveze udica.',
    // VAŽNO: Putanja mora početi s '/' i odgovarati putanji u 'public' folderu
    thumbnail: '/models/kutija za udice/kutija za udice.jpg', 
    downloads: 0,
    likes: 0,
    instructions: '/models/kutija za udice/upute.txt',// Sustav će automatski potražiti 'upute.txt' u files listi ispod
    files: [
      { name: 'donji dio.stl', url: '/models/kutija za udice/donji dio.stl', type: 'stl' },
      { name: 'gornji dio.stl', url: '/models/kutija za udice/gornji dio.stl', type: 'stl' },
      { name: 'klin.stl', url: '/models/kutija za udice/klin.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/kutija za udice/upute.txt', type: 'other' },
       // DODAJ SLIKE OVDJE s tipom 'image' da se pojave ispod preglednika:
      { name: 'kutija za udice.jpg', url: '/models/kutija za udice/kutija za udice.jpg', type: 'image' }
    ]
  },{
    id: 'posuda_za_loviti_kukce', // Jedinstveni ID (npr. ime modela bez razmaka)
    title: 'Posuda za loviti kukce', // Ime koje vide korisnici
    category: 'Hobi', // Kategorija za filtriranje
    description: 'Posuda u obliku čaše sa dva ulaza sastrane za loviti kukce.',
    // VAŽNO: Putanja mora početi s '/' i odgovarati putanji u 'public' folderu
    thumbnail: '/models/posuda za loviti kukce/posuda za loviti kukce.jpg', 
    downloads: 0,
    likes: 0,
    instructions: '/models/posuda za loviti kukce/upute.txt',// Sustav će automatski potražiti 'upute.txt' u files listi ispod
    files: [
      { name: 'poklopac.stl', url: '/models/posuda za loviti kukce/poklopac.stl', type: 'stl' },
      { name: 'posuda.stl', url: '/models/posuda za loviti kukce/posuda.stl', type: 'stl' },
      { name: 'ulaz za posudu.stl', url: '/models/posuda za loviti kukce/ulaz za posudu.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/posuda za loviti kukce/upute.txt', type: 'other' },
       // DODAJ SLIKE OVDJE s tipom 'image' da se pojave ispod preglednika:
      { name: 'posuda za loviti kukce.jpg', url: '/models/posuda za loviti kukce/posuda za loviti kukce.jpg', type: 'image' }
    ]
  },
  {
    id: 'dio_usisivača_za_usis',
    title: 'Dio usisivača za usis',
    category: 'Inovacije',
    description: 'Za vodeni usisivač prednji dio',
    thumbnail: '/models/dio usisivača za usis/dio usisivača za usis.png',
    downloads: 0,
    likes: 0,
    instructions: '/models/dio usisivača za usis/upute.txt',
    files: [
      { name: 'dio usisivača za usis.stl', url: '/models/dio usisivača za usis/dio usisivača za usis.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/dio usisivača za usis/upute.txt', type: 'other' },
      { name: 'dio usisivača za usis.jpg', url: '/models/dio usisivača za usis/dio usisivača za usis.jpg', type: 'image' },
      { name: 'original i naprintani usis.jpg', url: '/models/dio usisivača za usis/original i naprintani usis.jpg', type: 'image' }
    ]
  },
  {
    id: 'maskica_za_karticu',
    title: 'Maskica za karticu',
    category: 'Inovacije',
    description: 'Zaštita za pokaznu particu',
    thumbnail: '/models/maskica za karticu/maskica za karticu.png',
    downloads: 0,
    likes: 0,
    instructions: '/models/maskica za karticu/upute.txt',
    files: [
      { name: 'maskica za karticu.stl', url: '/models/maskica za karticu/maskica za karticu.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/maskica za karticu/upute.txt', type: 'other' },
      { name: 'maskica za karticu.jpg', url: '/models/maskica za karticu/maskica za karticu.jpg', type: 'image' },
      
    ]
  },
  {
    id: 'zaštita_za_bežično_zvono',
    title: 'Zaštita za bežično zvono',
    category: 'Inovacije',
    description: 'Zaštita zvona od kiše',
    thumbnail: '/models/zaštita za bežično zvono/zaštita za bežično zvono.png',
    downloads: 0,
    likes: 0,
    instructions: '/models/zaštita za bežično zvono/upute.txt',
    files: [
      { name: 'zaštita za bežično zvono.stl', url: '/models/zaštita za bežično zvono/zaštita za bežično zvono.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/zaštita za bežično zvono/upute.txt', type: 'other' },
      { name: 'zaštita za bežično zvono.jpg', url: '/models/zaštita za bežično zvono/zaštita za bežično zvono.jpg', type: 'image' },
      
    ]
  },
  {
    id: 'zaštitni_čep_za_maticu',
    title: 'Zaštitni čep za maticu',
    category: 'Inovacije',
    description: 'Zaštita za maticu na kukurin',
    thumbnail: '/models/zaštitni čep za maticu/zaštitni čep za maticu.png',
    downloads: 0,
    likes: 0,
    instructions: '/models/zaštitni čep za maticu/upute.txt',
    files: [
      { name: 'zaštitni čep za maticu.stl', url: '/models/zaštitni čep za maticu/zaštitni čep za maticu.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/zaštitni čep za maticu/upute.txt', type: 'other' },
      { name: 'zaštitni čep za maticu.jpg', url: '/models/zaštitni čep za maticu/zaštitni čep za maticu.jpg', type: 'image' },
      
    ]
  },
  {
    id: 'zglob_za_naglavne_slusalice_JBL',
    title: 'Zglob za naglavne slusalice JBL',
    category: 'Inovacije',
    description: 'Zglob za naglavne slušalice JBL',
    thumbnail: '/models/zglob za naglavne slusalice JBL/zglob za naglavne slusalice JBL.png',
    downloads: 0,
    likes: 0,
    instructions: '/models/zglob za naglavne slusalice JBL/upute.txt',
    files: [
      { name: 'zglob za naglavne slusalice JBL.stl', url: '/models/zglob za naglavne slusalice JBL/zglob za naglavne slusalice JBL.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/zglob za naglavne slusalice JBL/upute.txt', type: 'other' },
      { name: 'zglob za naglavne slusalice JBL 2.jpg', url: '/models/zglob za naglavne slusalice JBL/zglob za naglavne slusalice JBL 2.jpg', type: 'image' },
      { name: 'zglob za naglavne slusalice JBL 1.jpg', url: '/models/zglob za naglavne slusalice JBL/zglob za naglavne slusalice JBL 1.jpg', type: 'image' },
      
    ]
  },
  {
    id: 'zglob_za_naglavne_slušalice_pioneer_dj',
    title: 'Zglob za naglavne slušalice pioneer dj',
    category: 'Inovacije',
    description: 'Zglob za naglavne slušalice pioneer dj',
    thumbnail: '/models/zglob za naglavne slušalice pioneer dj/desni zglob za naglavne slušalice pioneer dj.png',
    downloads: 0,
    likes: 0,
    instructions: '/models/zglob za naglavne slušalice pioneer dj/upute.txt',
    files: [
      { name: 'desni zglob za naglavne slušalice pioneer dj.stl', url: '/models/zglob za naglavne slušalice pioneer dj/desni zglob za naglavne slušalice pioneer dj.stl', type: 'stl' },
      { name: 'ljevi zglob za naglavne slušalice pioneer dj.stl', url: '/models/zglob za naglavne slušalice pioneer dj/ljevi zglob za naglavne slušalice pioneer dj.stl', type: 'stl' },
      { name: 'upute.txt', url: '/models/zglob za naglavne slušalice pioneer dj/upute.txt', type: 'other' },
      { name: 'desni zglob za naglavne slušalice pioneer dj.jpg', url: '/models/zglob za naglavne slušalice pioneer dj/desni zglob za naglavne slušalice pioneer dj.jpg', type: 'image' },
      { name: 'ljevi zglob za naglavne slušalice pioneer dj.jpg', url: '/models/zglob za naglavne slušalice pioneer dj/ljevi zglob za naglavne slušalice pioneer dj.jpg', type: 'image' },
      
    ]
  },
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
            <footer className="py-12 text-center text-slate-400 text-sm font-medium border-t border-slate-200 mt-20"><p>© 2026 3D MARPIN. Svi modeli su vlasništvo autora.</p></footer>
        </div>
    );
};

export default App;