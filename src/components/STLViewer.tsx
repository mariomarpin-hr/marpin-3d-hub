import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Loader2, AlertCircle, RotateCw, Grid, Layers } from 'lucide-react';

interface STLViewerProps {
    url: string;
}

const STLViewer: React.FC<STLViewerProps> = ({ url }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [autoRotate, setAutoRotate] = useState(true);
    const [showGrid, setShowGrid] = useState(true);
    const [wireframe, setWireframe] = useState(false);
    const [modelColor, setModelColor] = useState(0x3b82f6);
    
    const controlsRef = useRef<OrbitControls | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    const gridRef = useRef<THREE.GridHelper | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        
        // Clean up
        container.innerHTML = '';

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        scene.fog = new THREE.Fog(0x0f172a, 10, 60);

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(5, 5, 5);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        scene.add(mainLight);
        const fillLight = new THREE.DirectionalLight(0xb0c4de, 0.5); 
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
        scene.add(hemiLight);

        const gridHelper = new THREE.GridHelper(20, 20, 0x475569, 0x1e293b);
        scene.add(gridHelper);
        gridRef.current = gridHelper;
        
        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.01;
        plane.receiveShadow = true;
        scene.add(plane);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 2.0;
        controlsRef.current = controls;

        const loader = new STLLoader();
        setLoading(true);
        loader.load(url, (geometry) => {
            geometry.center();
            if (!geometry.attributes.normal) geometry.computeVertexNormals();
            const material = new THREE.MeshStandardMaterial({ color: modelColor, metalness: 0.1, roughness: 0.4, wireframe: wireframe });
            const mesh = new THREE.Mesh(geometry, material);
            const box = new THREE.Box3().setFromObject(mesh);
            const size = box.getSize(new THREE.Vector3()).length();
            const scale = 5 / size; 
            mesh.scale.set(scale, scale, scale);
            const ySize = (box.max.y - box.min.y) * scale;
            mesh.position.y = ySize / 2;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            meshRef.current = mesh;
            setLoading(false);
        }, undefined, (err) => { 
            console.error(err);
            setLoading(false); 
            setError("Greška pri učitavanju datoteke."); 
        });

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            if(rendererRef.current) {
                if(controlsRef.current) controlsRef.current.update();
                renderer.render(scene, camera);
            }
        };
        animate();

        const handleResize = () => {
            if (!container || !rendererRef.current) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);
        
        return () => { 
            window.removeEventListener('resize', handleResize); 
            cancelAnimationFrame(animationId);
            
            scene.traverse((object) => {
                // @ts-ignore
                if (object.geometry) object.geometry.dispose();
                // @ts-ignore
                if (object.material) {
                    // @ts-ignore
                    if (Array.isArray(object.material)) {
                        // @ts-ignore
                        object.material.forEach(m => m.dispose());
                    } else {
                        // @ts-ignore
                        object.material.dispose();
                    }
                }
            });

            if(rendererRef.current) {
                rendererRef.current.dispose();
                if (rendererRef.current.forceContextLoss) {
                    rendererRef.current.forceContextLoss();
                }
                const domElement = rendererRef.current.domElement;
                if(domElement && domElement.parentNode) {
                    domElement.parentNode.removeChild(domElement);
                }
                rendererRef.current = null;
            }
        };
    }, [url]);

    useEffect(() => { if(controlsRef.current) controlsRef.current.autoRotate = autoRotate; }, [autoRotate]);
    useEffect(() => { if(gridRef.current) gridRef.current.visible = showGrid; }, [showGrid]);
    useEffect(() => { 
        if(meshRef.current) { 
            // @ts-ignore
            meshRef.current.material.wireframe = wireframe; 
            // @ts-ignore
            meshRef.current.material.color.setHex(modelColor); 
        } 
    }, [wireframe, modelColor]);
    
    const colors = [{ hex: 0x3b82f6, name: 'Blue' }, { hex: 0xef4444, name: 'Red' }, { hex: 0x10b981, name: 'Green' }, { hex: 0xf59e0b, name: 'Orange' }, { hex: 0xffffff, name: 'White' }, { hex: 0x94a3b8, name: 'Grey' }];

    return (
        <div className="w-full h-full bg-slate-900 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-scanline pointer-events-none z-10"></div>
            
            {loading && (<div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 z-30 text-white animate-pulse"><Loader2 className="animate-spin mb-4" size={40} /><p className="font-bold tracking-widest text-sm">UČITAVANJE GEOMETRIJE...</p></div>)}
            {error && (<div className="absolute inset-0 flex items-center justify-center text-red-400 font-bold bg-slate-900 z-30"><AlertCircle className="mr-2" /> {error}</div>)}
            
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10 relative"></div>
            
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-2 rounded-lg flex flex-col gap-2">
                    <button onClick={() => setAutoRotate(!autoRotate)} className={`p-2 rounded-md transition-all ${autoRotate ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><RotateCw size={18} className={autoRotate ? "animate-spin-slow" : ""} /></button>
                    <button onClick={() => setShowGrid(!showGrid)} className={`p-2 rounded-md transition-all ${showGrid ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><Grid size={18} /></button>
                    <button onClick={() => setWireframe(!wireframe)} className={`p-2 rounded-md transition-all ${wireframe ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><Layers size={18} /></button>
                </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700 flex items-center gap-3">
                    {colors.map((c) => (<button key={c.name} onClick={() => setModelColor(c.hex)} className={`w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125 ${modelColor === c.hex ? 'ring-2 ring-white scale-110' : ''}`} style={{ backgroundColor: '#' + c.hex.toString(16).padStart(6, '0') }} />))}
                </div>
            </div>
        </div>
    );
};

export default STLViewer;