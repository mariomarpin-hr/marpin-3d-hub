import { Mail, Youtube, Printer, ExternalLink } from 'lucide-react';

const AboutPage = () => (
    <div className="max-w-[95rem] mx-auto px-6 py-12 lg:py-20 animate-fade-in">
        {/* Adjusted grid to give more space to side columns (700px center instead of 900px) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,700px)_1fr] gap-10 items-start">
            <div className="hidden xl:flex flex-col gap-6 mt-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
                 <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-slate-100 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                     <div className="aspect-[3/4] bg-slate-100 rounded-[2rem] overflow-hidden relative mb-4">
                         <img src="https://picsum.photos/400/600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Printer 1" />
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">High Detail</div>
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 text-center">Bambu Lab P2S Combo</h3>
                     <p className="text-slate-400 text-center text-sm font-bold uppercase tracking-widest mt-1">Multi-Color</p>
                 </div>
            </div>

            <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-100 text-center relative z-10">
                {/* Increased profile image size to w-80 h-80 */}
                <div className="w-80 h-80 bg-slate-100 rounded-full mx-auto mb-10 overflow-hidden border-8 border-white shadow-xl relative"><img src="https://picsum.photos/300/300" className="w-full h-full object-cover" alt="Author" /></div>
                <h1 className="text-5xl font-black text-slate-900 mb-6">O Autoru</h1>
                <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">Bok! Ja sam zaljubljenik u 3D printanje i dizajn. Ovu stranicu koristim kako bih podijelio svoje radove sa svijetom. Slobodno preuzmi bilo koji model, STL ili sliku za svoje potrebe.</p>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                    <a href="mailto:moj@email.com" className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl hover:bg-slate-900 hover:text-white transition-all group">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-900 group-hover:text-blue-600"><Mail size={24}/></div>
                        <div><p className="text-xs font-bold uppercase tracking-widest opacity-60">Kontaktiraj me</p><p className="font-bold text-lg">Email</p></div>
                    </a>
                    
                    <a href="https://youtube.com/@tvojkanal" target="_blank" className="flex items-center gap-6 p-6 bg-red-50 rounded-3xl hover:bg-red-600 hover:text-white transition-all group">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-red-600 group-hover:text-red-600"><Youtube size={24}/></div>
                        <div><p className="text-xs font-bold uppercase tracking-widest opacity-60">Pretplati se</p><p className="font-bold text-lg">YouTube</p></div>
                    </a>

                    <div className="flex items-center gap-6 p-6 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-200 md:col-span-2">
                        <div className="p-4 bg-white/20 rounded-2xl"><Printer size={24}/></div>
                        <div><p className="text-xs font-bold uppercase tracking-widest opacity-60">Status</p><p className="font-bold text-lg">Printam...</p></div>
                    </div>
                </div>
            </div>

            <div className="hidden xl:flex flex-col gap-6 mt-10 animate-fade-in" style={{animationDelay: '0.4s'}}>
                 <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-slate-100 rotate-[2deg] hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                     <div className="aspect-[3/4] bg-slate-100 rounded-[2rem] overflow-hidden relative mb-4">
                         <img src="https://picsum.photos/400/601" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Printer 2" />
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">FDM Workhorse</div>
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 text-center">Elegoo Neptune 4 PRO</h3>
                     <p className="text-slate-400 text-center text-sm font-bold uppercase tracking-widest mt-1">Modificiran</p>
                 </div>
            </div>
        </div>

        {/* EXTERNAL LINKS SECTION */}
        <div className="mt-24 pt-12 border-t border-slate-200 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">Službene Stranice & Oprema</p>
            <div className="flex flex-wrap justify-center gap-6">
                <a href="https://eu.store.bambulab.com" target="_blank" rel="noopener noreferrer" className="group bg-white px-8 py-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3">
                    <span className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">BAMBU LAB</span>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </a>
                
                <a href="https://eu.elegoo.com/" target="_blank" rel="noopener noreferrer" className="group bg-white px-8 py-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3">
                    <span className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">ELEGOO</span>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </a>

                <a href="https://www.3djake.hr/" target="_blank" rel="noopener noreferrer" className="group bg-white px-8 py-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3">
                    <span className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">3DJAKE</span>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </a>
            </div>
        </div>
    </div>
);

export default AboutPage;