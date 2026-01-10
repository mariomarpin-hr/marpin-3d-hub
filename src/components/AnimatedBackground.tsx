import React from 'react';
import { Settings, Box, Layers } from 'lucide-react';

export const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.4]"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </div>
);

export const TechAnimations = () => {
    return (
        <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none opacity-20">
            {/* Rotating Gear */}
            <div className="absolute top-20 right-[10%] animate-spin-slow text-slate-400">
                <Settings size={120} strokeWidth={1} />
            </div>
            {/* Floating 3D Box */}
            <div className="absolute bottom-40 left-[5%] animate-float text-blue-300" style={{ animationDelay: '1s' }}>
                <Box size={80} strokeWidth={1} />
            </div>
            {/* Layers */}
            <div className="absolute top-1/3 left-[20%] animate-float text-emerald-300" style={{ animationDelay: '2s' }}>
                <Layers size={60} strokeWidth={1} />
            </div>
        </div>
    );
};