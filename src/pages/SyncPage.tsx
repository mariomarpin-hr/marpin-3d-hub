import React, { useRef, useState } from 'react';
import { FolderSync, Loader2 } from 'lucide-react';
import type { Project, GalleryItem, ProjectFile, FileType } from '../types';
import { safeStorage } from '../utils';

interface SyncPageProps {
    onSync: (projects: Project[], gallery: GalleryItem[]) => void;
}

const SyncPage: React.FC<SyncPageProps> = ({ onSync }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [scanning, setScanning] = useState(false);

    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !files.length) return;
        setScanning(true);
        const projectsMap: { [key: string]: Project } = {};
        const gallery: GalleryItem[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const path = file.webkitRelativePath ? file.webkitRelativePath.split('/') : [file.name];
            const folderName = path.length >= 2 ? path[1] : 'Unsorted';
            const folderNameLower = folderName.toLowerCase();
            const fileName = file.name.toLowerCase();
            const url = URL.createObjectURL(file);

            if (folderNameLower.includes('galerija') || folderNameLower.includes('gallery') || folderNameLower.includes('slike') || folderNameLower.includes('images')) {
                if (fileName.match(/\.(jpg|jpeg|png|webp)$/)) { 
                    gallery.push({ url, title: fileName, category: 'Galerija', type: 'image' }); 
                }
            } else if (folderNameLower.includes('video')) {
                 if (fileName.match(/\.(mp4|webm|mov)$/)) { 
                     gallery.push({ url, title: fileName, category: 'Video', type: 'video' }); 
                }
            } else {
                let category = "Razno";
                let projectTitle = folderName;
                if (path.length >= 4) { 
                    category = path[1]; 
                    projectTitle = path[2]; 
                } else { 
                    projectTitle = folderName; 
                }
                projectTitle = projectTitle.replace(/_/g, ' '); 
                category = category.replace(/_/g, ' ');

                if (!projectsMap[projectTitle]) { 
                     // Učitaj spremljene statistike
                     const savedDL = safeStorage.getItem('dl_local_' + projectTitle);
                     const savedLikes = safeStorage.getItem('likes_local_' + projectTitle);
                     
                     projectsMap[projectTitle] = { 
                         id: projectTitle, 
                         title: projectTitle, 
                         category: category, 
                         files: [], 
                         thumbnail: null, 
                         instructions: null,
                         downloads: savedDL ? parseInt(savedDL) : 0,
                         likes: savedLikes ? parseInt(savedLikes) : 0
                     }; 
                }
                let type: FileType = 'other';
                if (fileName.endsWith('.stl')) type = 'stl'; 
                else if (fileName.endsWith('.gcode')) type = 'gcode'; 
                else if (fileName.match(/\.(jpg|jpeg|png)$/)) type = 'image';
                
                if (type === 'image' && !projectsMap[projectTitle].thumbnail) {
                    projectsMap[projectTitle].thumbnail = url;
                }
                if (fileName === 'upute.txt' || fileName === 'readme.txt') { 
                    const text = await file.text(); 
                    projectsMap[projectTitle].instructions = text; 
                }
                projectsMap[projectTitle].files.push({ name: file.name, url, type });
            }
        }
        const projectList = Object.values(projectsMap).filter(p => p.files.length > 0);
        setTimeout(() => { onSync(projectList, gallery); setScanning(false); }, 800);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-20 animate-fade-in">
            <div className="bg-white rounded-[4rem] p-20 text-center shadow-2xl border border-slate-100">
                <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-10 text-blue-600"><FolderSync size={64} /></div>
                <h2 className="text-6xl font-black text-slate-900 mb-6">Učitaj Svoje Radove</h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-16">Klikni gumb ispod i odaberi svoj glavni folder.</p>
                <div onClick={() => inputRef.current?.click()} className={`border-4 border-dashed rounded-[3rem] p-20 cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 ${scanning ? 'opacity-50 pointer-events-none' : ''}`}>
                    {scanning ? (<div className="flex flex-col items-center gap-4"><Loader2 className="animate-spin text-blue-600" size={48} /><p className="font-bold text-slate-900">Analiziram...</p></div>) : (<div className="flex flex-col items-center gap-4"><div className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl">Odaberi Folder</div><p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-4">Podržava: STL, GCODE, JPG, MP4</p><p className="text-slate-400 text-xs mt-2">Imenuj foldere: "Kategorija/Projekt" ili "Slike"/"Video"</p></div>)}
                    <input 
                        type="file" 
                        ref={inputRef} 
                        className="hidden" 
                        // @ts-ignore
                        webkitdirectory="" 
                        directory="" 
                        multiple 
                        onChange={handleFiles} 
                    />
                </div>
            </div>
        </div>
    );
};

export default SyncPage;