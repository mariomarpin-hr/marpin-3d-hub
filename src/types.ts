export type FileType = 'stl' | 'image' | 'gcode' | 'video' | 'other';

export interface ProjectFile {
    name: string;
    url: string;
    type: FileType;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    description?: string;
    thumbnail: string | null;
    instructions: string | null;
    files: ProjectFile[];
    downloads: number;
    likes: number;
}

export interface GalleryItem {
    url: string;
    title: string;
    category: string;
    type: 'image' | 'video';
}

export interface Comment {
    id: number;
    name: string;
    text: string;
    date: string;
    likes: number;
}

export type Page = 'home' | 'gallery' | 'models' | 'detail' | 'about' | 'sync';