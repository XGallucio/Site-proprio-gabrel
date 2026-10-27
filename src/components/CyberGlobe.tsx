import React, { useEffect, useRef } from 'react';

interface CyberGlobeProps {
  className?: string;
  size?: number;
}

export const CyberGlobe: React.FC<CyberGlobeProps> = ({ className = '', size = 500 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    rotationY: 0.4,
    rotationX: 0.25,
    autoRotateSpeed: 0.0035,
    isHovered: false,
    mouseX: 0,
    mouseY: 0,
    targetRotY: 0.4,
    targetRotX: 0.25,
    radarAngle: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const currentSize = rect.width || size;
      canvas.width = currentSize * dpr;
      canvas.height = currentSize * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();

    // Specific cyber nodes on globe (Lat/Lon in radians)
    const nodes = [
      { lat: 0.35, lon: 0.8, label: 'SP_SEC_OPS', pulse: 0 },
      { lat: -0.4, lon: 2.1, label: 'DEF_CORE_01', pulse: 1.5 },
      { lat: 0.7, lon: -1.2, label: 'SAT_UPLINK', pulse: 3 },
      { lat: 0.1, lon: 3.5, label: 'REVERSE_LAB', pulse: 4.2 },
      { lat: -0.6, lon: -0.5, label: 'IOT_PROBE', pulse: 2.1 },
    ];

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const radius = Math.min(w, h) * 0.42;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Smooth rotation interpolation
      const state = stateRef.current;
      state.rotationY += (state.targetRotY - state.rotationY) * 0.05 + state.autoRotateSpeed;
      state.rotationX += (state.targetRotX - state.rotationX) * 0.05;
      state.radarAngle += 0.025;

      const rotY = state.rotationY;
      const rotX = state.rotationX;

      // 1. Atmosphere Rim Glow (Crimson Accent)
      const gradAtmosphere = ctx.createRadialGradient(
        centerX + radius * 0.25,
        centerY - radius * 0.2,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.25
      );
      gradAtmosphere.addColorStop(0, 'rgba(232, 38, 38, 0)');
      gradAtmosphere.addColorStop(0.75, 'rgba(232, 38, 38, 0.08)');
      gradAtmosphere.addColorStop(0.95, 'rgba(232, 38, 38, 0.35)');
      gradAtmosphere.addColorStop(1, 'rgba(232, 38, 38, 0)');

      ctx.fillStyle = gradAtmosphere;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Globe Silhouette Base (Deep Dark #0F0F0F)
      const gradBody = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      gradBody.addColorStop(0, '#151515');
      gradBody.addColorStop(0.7, '#0D0D0D');
      gradBody.addColorStop(1, '#080808');

      ctx.fillStyle = gradBody;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3D coordinate projection helper
      const project = (lat: number, lon: number) => {
        // Spherical to 3D Cartesian
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        const cosLon = Math.cos(lon + rotY);
        const sinLon = Math.sin(lon + rotY);

        let x = radius * cosLat * sinLon;
        let y = radius * sinLat;
        let z = radius * cosLat * cosLon;

        // Rotate around X axis
        const cosRx = Math.cos(rotX);
        const sinRx = Math.sin(rotX);
        const y2 = y * cosRx - z * sinRx;
        const z2 = y * sinRx + z * cosRx;

        return {
          x: centerX + x,
          y: centerY - y2,
          z: z2,
          visible: z2 > 0,
        };
      };

      // 3. Draw Parallels (Latitudes)
      const latCount = 9;
      for (let i = 1; i < latCount; i++) {
        const lat = -Math.PI / 2 + (Math.PI * i) / latCount;
        ctx.beginPath();
        let first = true;
        const steps = 60;
        for (let j = 0; j <= steps; j++) {
          const lon = (Math.PI * 2 * j) / steps;
          const p = project(lat, lon);
          if (p.visible) {
            // Lighting based on position: right/top rim light
            const light = Math.max(0.08, (p.z / radius) * 0.4 + (p.x > centerX ? 0.3 : 0.05));
            ctx.strokeStyle = `rgba(240, 240, 240, ${light * 0.4})`;
            ctx.lineWidth = 0.75;
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 4. Draw Meridians (Longitudes)
      const lonCount = 12;
      for (let i = 0; i < lonCount; i++) {
        const lon = (Math.PI * 2 * i) / lonCount;
        ctx.beginPath();
        let first = true;
        const steps = 40;
        for (let j = 0; j <= steps; j++) {
          const lat = -Math.PI / 2 + (Math.PI * j) / steps;
          const p = project(lat, lon);
          if (p.visible) {
            const light = Math.max(0.08, (p.z / radius) * 0.4 + (p.x > centerX ? 0.3 : 0.05));
            ctx.strokeStyle = `rgba(240, 240, 240, ${light * 0.35})`;
            ctx.lineWidth = 0.75;
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 5. Radar Scan Sweep Arc
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      const radarX = centerX + Math.cos(state.radarAngle) * radius;
      const radarY = centerY + Math.sin(state.radarAngle) * radius;

      const scanGrad = ctx.createRadialGradient(radarX, radarY, 0, radarX, radarY, radius * 0.7);
      scanGrad.addColorStop(0, 'rgba(232, 38, 38, 0.22)');
      scanGrad.addColorStop(1, 'rgba(232, 38, 38, 0)');

      ctx.fillStyle = scanGrad;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, state.radarAngle - 0.4, state.radarAngle);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 6. Cyber Nodes & Geo Markers
      const now = Date.now() * 0.003;
      nodes.forEach((n) => {
        const p = project(n.lat, n.lon);
        if (p.visible) {
          const pulseScale = (Math.sin(now + n.pulse) + 1) / 2;
          const markerRadius = 2.5 + pulseScale * 2;

          // Pulse ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, markerRadius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(232, 38, 38, ${0.6 - pulseScale * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Core node
          ctx.beginPath();
          ctx.arc(p.x, p.y, markerRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#E82626';
          ctx.fill();

          // Subtle technical label
          ctx.fillStyle = 'rgba(245, 240, 233, 0.75)';
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillText(n.label, p.x + 8, p.y + 3);
        }
      });

      // 7. Outer Equatorial Gimbal Ring with Technical Ticks
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.08, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 8. Intense Rim Light on Right Edge (Awwwards directional rim light)
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.strokeStyle = 'rgba(232, 38, 38, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#E82626';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      stateRef.current.targetRotY = x * 1.2;
      stateRef.current.targetRotX = -y * 0.8;
    };

    const handleMouseEnter = () => {
      stateRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      stateRef.current.isHovered = false;
      stateRef.current.targetRotX = 0.25;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateSize);
    };
  }, [size]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background ambient crimson diffusion */}
      <div 
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-[80px] opacity-35 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232, 38, 38, 0.6) 0%, rgba(13, 13, 13, 0) 70%)' }}
      />
      <canvas
        ref={canvasRef}
        className="w-full max-w-[540px] aspect-square relative z-10 cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: 'auto' }}
        aria-label="Globo holográfico 3D interativo de cibersegurança e operações globais"
        role="img"
      />
      {/* Technical HUD Coordinates Overlay */}
      <div className="absolute bottom-4 left-6 z-20 pointer-events-none font-mono-tech text-[10px] text-[#8E8E93] tracking-widest uppercase flex flex-col gap-0.5">
        <span className="text-white/60">NODE: LAT -23.5505 / LON -46.6333</span>
        <span className="text-[#E82626]">STATUS: SECURE_CORE // READY</span>
      </div>
    </div>
  );
};
