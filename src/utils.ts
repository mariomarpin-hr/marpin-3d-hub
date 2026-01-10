import JSZip from 'jszip';
import saveAs from 'file-saver';
import type { Project } from './types';

export const safeStorage = {
    getItem: (key: string): string | null => { 
        try { return localStorage.getItem(key); } catch (e) { return null; } 
    },
    setItem: (key: string, value: string): void => { 
        try { localStorage.setItem(key, value); } catch (e) { } 
    }
};

export const zipAndDownload = async (project: Project) => {
    const zip = new JSZip();
    const folder = zip.folder(project.title);
    
    if (folder) {
        for (const file of project.files) {
            try {
                const response = await fetch(file.url);
                const blob = await response.blob();
                folder.file(file.name, blob);
            } catch (err) { 
                console.error(`Failed to download file ${file.name}`, err); 
            }
        }
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${project.title}.zip`);
    }
};