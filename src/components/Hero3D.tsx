import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 12;
        
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0x3b82f6, 2);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);
        
        const pinkLight = new THREE.PointLight(0xd946ef, 2);
        pinkLight.position.set(-5, -5, 5);
        scene.add(pinkLight);
        
        const geometry = new THREE.TorusKnotGeometry(2.5, 0.8, 128, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.9 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        
        const onDocumentMouseMove = (event: MouseEvent) => { 
            mouseX = (event.clientX - windowHalfX) * 0.001; 
            mouseY = (event.clientY - windowHalfY) * 0.001; 
        };
        
        document.addEventListener('mousemove', onDocumentMouseMove);
        
        let requestID: number;
        const animate = () => { 
            requestID = requestAnimationFrame(animate); 
            const time = Date.now() * 0.001; 
            mesh.rotation.x = time * 0.2 + mouseY * 2; 
            mesh.rotation.y = time * 0.1 + mouseX * 2; 
            mesh.position.y = Math.sin(time) * 0.2; 
            renderer.render(scene, camera); 
        };
        animate();
        
        const handleResize = () => { 
            if (!container) return; 
            const w = container.clientWidth; 
            const h = container.clientHeight; 
            camera.aspect = w / h; 
            camera.updateProjectionMatrix(); 
            renderer.setSize(w, h); 
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => { 
            document.removeEventListener('mousemove', onDocumentMouseMove); 
            window.removeEventListener('resize', handleResize); 
            cancelAnimationFrame(requestID); 
            if(renderer) { 
                renderer.dispose(); 
                if (renderer.forceContextLoss) renderer.forceContextLoss(); 
                if(renderer.domElement && container.contains(renderer.domElement)) { 
                    container.removeChild(renderer.domElement); 
                } 
            } 
        };
    }, []);

    return <div ref={mountRef} className="w-full h-[500px] md:h-[600px] cursor-pointer" />;
};

export default Hero3D;