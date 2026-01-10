import { Mail, Youtube, Printer, ExternalLink } from 'lucide-react';

const AboutPage = () => (
    <div className="max-w-[95rem] mx-auto px-6 py-12 lg:py-20 animate-fade-in">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,700px)_1fr] gap-10 items-start">
            
            {/* --- LIJEVI STUPAC (Slika 1) --- */}
            <div className="hidden xl:flex flex-col gap-6 mt-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
                 <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-slate-100 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                     <div className="aspect-[3/4] bg-slate-100 rounded-[2rem] overflow-hidden relative mb-4">
                         {/* OVDJE SE MIJENJA LIJEVA SLIKA (mora biti u public mapi) */}
                         <img src="/left-image.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Lijeva slika" />
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">High Detail</div>
                     </div>
                     {/* TEKST ISPOD LIJEVE SLIKE */}
                     <h3 className="text-2xl font-black text-slate-900 text-center">Bambu Lab P2S</h3>
                     <p className="text-slate-400 text-center text-sm font-bold uppercase tracking-widest mt-1">Multi-Color Print</p>
                 </div>
            </div>

            {/* --- SREDNJI STUPAC (Tvoj Profil) --- */}
            <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-100 text-center relative z-10">
                {/* TVOJA PROFILNA SLIKA */}
                <div className="w-80 h-80 bg-slate-100 rounded-full mx-auto mb-10 overflow-hidden border-8 border-white shadow-xl relative">
                    <img src="/profile.jpg" className="w-full h-full object-cover" alt="Author" />
                </div>
                
                {/* --- GLAVNI NASLOV (Promijeni svoje ime ovdje) --- */}
                <h1 className="text-5xl font-black text-slate-900 mb-6">
                    Bok, ja sam Mario!
                </h1>
                
                {/* --- TVOJ OPIS (Promijeni tekst ovdje) --- */}
                <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">
                    Bavim se 3D modeliranjem već 5 godina. 
                    Volim dizajnirati funkcionalne dijelove i umjetničke figure. 
                    Svi moji modeli na ovoj stranici su besplatni za preuzimanje.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                    {/* EMAIL GUMB */}
                    <a href="mailto:mario.marpin@gmail.com" className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl hover:bg-slate-900 hover:text-white transition-all group">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-900 group-hover:text-blue-600"><Mail size={24}/></div>
                        <div><p className="text-xs font-bold uppercase tracking-widest opacity-60">Kontaktiraj me</p><p className="font-bold text-lg">Email</p></div>
                    </a>
                    
                    {/* YOUTUBE GUMB */}
                    <a href="https://youtube.com/@mariomarpin5385" target="_blank" className="flex items-center gap-6 p-6 bg-red-50 rounded-3xl hover:bg-red-600 hover:text-white transition-all group">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-red-600 group-hover:text-red-600"><Youtube size={24}/></div>
                        <div><p className="text-xs font-bold uppercase tracking-widest opacity-60">Pretplati se</p><p className="font-bold text-lg">YouTube</p></div>
                    </a>

                    {/* STATUS BAR */}
                    <div className="flex items-center gap-6 p-6 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-200 md:col-span-2">
                        <div className="p-4 bg-white/20 rounded-2xl"><Printer size={24}/></div>
                        <div><p className="text-xs font-bold uppercase tracking-widest opacity-60">Status</p><p className="font-bold text-lg">Trenutno printam...</p></div>
                    </div>
                </div>
            </div>

            {/* --- DESNI STUPAC (Slika 2) --- */}
            <div className="hidden xl:flex flex-col gap-6 mt-10 animate-fade-in" style={{animationDelay: '0.4s'}}>
                 <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-slate-100 rotate-[2deg] hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                     <div className="aspect-[3/4] bg-slate-100 rounded-[2rem] overflow-hidden relative mb-4">
                         {/* OVDJE SE MIJENJA DESNA SLIKA */}
                         <img src="/right-image.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Desna slika" />
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">Workhorse</div>
                     </div>
                     {/* TEKST ISPOD DESNE SLIKE */}
                     <h3 className="text-2xl font-black text-slate-900 text-center">Elegoo Neptune</h3>
                     <p className="text-slate-400 text-center text-sm font-bold uppercase tracking-widest mt-1">Veliki Format</p>
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