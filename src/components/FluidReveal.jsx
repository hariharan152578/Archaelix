"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const FluidReveal = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Orthographic Camera for flat rendering
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, 0, 1
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- Ping-Pong Buffers ---
    // We need two render targets to swap between reading and writing
    const size = new THREE.Vector2(window.innerWidth, window.innerHeight);
    const targetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType, // FloatType for precision in decay
    };
    let readBuffer = new THREE.WebGLRenderTarget(size.x, size.y, targetOptions);
    let writeBuffer = new THREE.WebGLRenderTarget(size.x, size.y, targetOptions);

    // --- Shaders ---

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fluidFragmentShader = `
      uniform sampler2D previousTrailTexture;
      uniform vec2 mouse;
      uniform vec2 prevMouse;
      uniform vec2 resolution;
      uniform float decay;
      uniform bool isMoving;
      varying vec2 vUv;

      float line(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return length(pa - ba * h);
      }

      void main() {
        vec2 uv = vUv;
        vec4 color = texture2D(previousTrailTexture, uv);
        
        // Decay
        color.r *= decay;
        
        if (isMoving) {
          // Adjust coordinates for aspect ratio to ensure circular brush
          float aspect = resolution.x / resolution.y;
          vec2 p = uv;
          p.x *= aspect;
          vec2 m = mouse;
          m.x *= aspect;
          vec2 pm = prevMouse;
          pm.x *= aspect;

          float d = line(p, pm, m);
          
          // Brush size (0.05) and intensity
          float intensity = smoothstep(0.05, 0.0, d);
          color.r += intensity;
        }
        
        color.r = clamp(color.r, 0.0, 1.0);
        gl_FragColor = vec4(color.r, 0.0, 0.0, 1.0);
      }
    `;

    const displayFragmentShader = `
      uniform sampler2D fluidTexture;
      uniform sampler2D topTexture;
      uniform sampler2D bottomTexture;
      uniform vec2 screenResolution;
      uniform vec2 textureSize;
      varying vec2 vUv;

      // Function to mimic background-size: cover
      vec2 getCoverUV(vec2 uv, vec2 resolution, vec2 texSize) {
        float screenAspect = resolution.x / resolution.y;
        float texAspect = texSize.x / texSize.y;
        
        vec2 ratio = vec2(
          min(screenAspect / texAspect, 1.0),
          min(texAspect / screenAspect, 1.0)
        );
        
        return vec2(
          uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
          uv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );
      }

      void main() {
        vec2 uv = vUv;
        float mask = texture2D(fluidTexture, uv).r;
        
        vec2 coverUV = getCoverUV(uv, screenResolution, textureSize);
        
        vec4 topColor = texture2D(topTexture, coverUV);
        vec4 bottomColor = texture2D(bottomTexture, coverUV);
        
        // Mix top and bottom based on mask
        // Mask 1.0 means we drew on it. 
        // Requirement: "trail is drawn that acts as a mask, revealing a 'Bottom Image' underneath"
        // So Mask=1 should show Bottom, Mask=0 should show Top.
        gl_FragColor = mix(topColor, bottomColor, mask);
      }
    `;

    // --- Materials & Meshes ---

    // 1. Fluid Simulation Plane
    // We render this into the off-screen buffer
    const fluidUniforms = {
      previousTrailTexture: { value: null },
      mouse: { value: new THREE.Vector2(0.5, 0.5) },
      prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      decay: { value: 0.98 }, // Adjust for fade speed
      isMoving: { value: false }
    };

    const fluidMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fluidFragmentShader,
      uniforms: fluidUniforms
    });

    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const fluidMesh = new THREE.Mesh(planeGeometry, fluidMaterial);
    
    // We need a separate scene for the fluid simulation or just swap materials?
    // Swapping materials on a single full-screen quad is easier.
    // Or use two scenes. Let's use one scene and swap materials/meshes.
    // Actually, simpler: Create one mesh, and in the render loop, change the material.
    // Or better: Two meshes, one visible at a time? No, that's messy.
    // Standard approach: One full-screen quad.
    const quad = new THREE.Mesh(planeGeometry, fluidMaterial);
    scene.add(quad);


    // 2. Display Material
    const loader = new THREE.TextureLoader();
    const topTexture = loader.load('https://picsum.photos/seed/dark/1920/1080?grayscale');
    const bottomTexture = loader.load('https://picsum.photos/seed/vibrant/1920/1080');
    
    const displayUniforms = {
      fluidTexture: { value: null },
      topTexture: { value: topTexture },
      bottomTexture: { value: bottomTexture },
      screenResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      textureSize: { value: new THREE.Vector2(1920, 1080) } // Assuming 1920x1080 images
    };

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayFragmentShader,
      uniforms: displayUniforms
    });


    // --- Mouse Handling ---
    const mouse = new THREE.Vector2(0.5, 0.5);
    const prevMouse = new THREE.Vector2(0.5, 0.5);
    let isMoving = false;
    let mouseTimer = null;

    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight; // Invert Y for UV
      
      mouse.set(x, y);
      isMoving = true;
      
      if (mouseTimer) clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        isMoving = false;
      }, 50);
    };

    window.addEventListener('mousemove', onMouseMove);


    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      // 1. Update Fluid Uniforms
      fluidUniforms.previousTrailTexture.value = readBuffer.texture;
      fluidUniforms.mouse.value.copy(mouse);
      fluidUniforms.prevMouse.value.copy(prevMouse);
      fluidUniforms.isMoving.value = isMoving;
      
      // 2. Render Fluid Shader to Write Buffer
      quad.material = fluidMaterial;
      renderer.setRenderTarget(writeBuffer);
      renderer.render(scene, camera);
      
      // 3. Swap Buffers
      const temp = readBuffer;
      readBuffer = writeBuffer;
      writeBuffer = temp;
      
      // 4. Update Display Uniforms
      displayUniforms.fluidTexture.value = readBuffer.texture;
      
      // 5. Render Display Shader to Screen
      quad.material = displayMaterial;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      
      // Update prevMouse
      if (isMoving) {
          prevMouse.copy(mouse);
      }
    };

    animate();

    // --- Resize Handling ---
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      
      // Resize buffers
      readBuffer.setSize(width, height);
      writeBuffer.setSize(width, height);
      
      fluidUniforms.resolution.value.set(width, height);
      displayUniforms.screenResolution.value.set(width, height);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mouseTimer) clearTimeout(mouseTimer);
      mount.removeChild(renderer.domElement);
      // Dispose resources
      readBuffer.dispose();
      writeBuffer.dispose();
      fluidMaterial.dispose();
      displayMaterial.dispose();
      planeGeometry.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        overflow: 'hidden'
      }} 
    />
  );
};

export default FluidReveal;
