import React from 'react';
import { Box, ArrowRight } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import PartnerMarquee from '../components/PartnerMarquee';
import type { Page } from '../types';

interface HomePageProps {
    onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center pt-20">
            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-10">
                <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 space-y-10 text-center lg:text-left z-20">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}><Box size={16} /> Moj 3D Svijet</div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] animate-fade-in drop-shadow-sm" style={{animationDelay: '0.2s'}}>Ideja. <br/>Model. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">Stvarnost.</span></h1>
                        <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto lg:mx-0 animate-fade-in leading-relaxed" style={{animationDelay: '0.3s'}}>Dobrodošli u moj digitalni radni prostor. Ovdje pohranjujem svoje 3D modele, STL datoteke i galeriju projekata. Sve je spremno za preuzimanje.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                            <button onClick={() => onNavigate('models')} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-3">Moji Modeli <ArrowRight size={20} /></button>
                            <button onClick={() => onNavigate('gallery')} className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-5 rounded-2xl font-bold text-lg hover:border-slate-300 transition-all hover:scale-105">Pregledaj Galeriju</button>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-[500px] lg:h-[700px] animate-scale-in relative -mt-20 lg:mt-0"><div className="absolute inset-0 z-10"><Hero3D /></div></div>
                </div>
            </div>
            <PartnerMarquee />
        </div>
    );
};

export default HomePage;