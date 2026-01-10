import React from 'react';
import { Printer, Box, Cpu, Layers, Zap, Droplets, Wrench } from 'lucide-react';

const PartnerMarquee = () => {
    const partners = [
        { name: "ELEGOO", icon: <Printer size={16} /> }, 
        { name: "BAMBU LAB", icon: <Box size={16} /> }, 
        { name: "NEPTUNE 4 PRO", icon: <Cpu size={16} /> }, 
        { name: "P2S", icon: <Layers size={16} /> }, 
        { name: "COMBO", icon: <Box size={16} /> }, 
        { name: "3DJOKE", icon: <Zap size={16} /> }, 
        { name: "Polymaker", icon: <Droplets size={16} /> }, 
        { name: "SolidWorks", icon: <Wrench size={16} /> }
    ];

    return (
        <div className="w-full bg-white border-t border-slate-200 py-3 overflow-hidden relative mt-8">
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            <div className="flex animate-scroll hover:pause">
                <div className="flex gap-20 px-10">{partners.map((p, i) => (<div key={i} className="flex items-center gap-3 text-slate-400 font-bold text-sm whitespace-nowrap hover:text-blue-600 transition-colors cursor-default grayscale hover:grayscale-0">{p.icon} <span>{p.name}</span></div>))}</div>
                <div className="flex gap-20 px-10">{partners.map((p, i) => (<div key={`dup-${i}`} className="flex items-center gap-3 text-slate-400 font-bold text-sm whitespace-nowrap hover:text-blue-600 transition-colors cursor-default grayscale hover:grayscale-0">{p.icon} <span>{p.name}</span></div>))}</div>
                <div className="flex gap-20 px-10">{partners.map((p, i) => (<div key={`dup2-${i}`} className="flex items-center gap-3 text-slate-400 font-bold text-sm whitespace-nowrap hover:text-blue-600 transition-colors cursor-default grayscale hover:grayscale-0">{p.icon} <span>{p.name}</span></div>))}</div>
            </div>
        </div>
    );
};

export default PartnerMarquee;