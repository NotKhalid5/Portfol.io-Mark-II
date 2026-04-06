import React, { useEffect, useRef } from 'react';
import { Project } from '../data/projects';
import './ProjectPage.css';

interface Props {
  project: Project;
  onBack: () => void;
}

const ProjectPage: React.FC<Props> = ({ project, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let t = 0;

    if (project.bgAnimation === 'matrix') {
      const cols = Math.floor(canvas.width / 14);
      const drops = Array(cols).fill(0).map(() => Math.random() * canvas.height);
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';

      const draw = () => {
        ctx.fillStyle = 'rgba(0,8,20,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ffcc';
        ctx.font = '13px monospace';
        drops.forEach((y, i) => {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = i % 5 === 0 ? '#ffffff' : '#00ffcc';
          ctx.globalAlpha = 0.7 + Math.random() * 0.3;
          ctx.fillText(ch, i * 14, y);
          drops[i] = y > canvas.height && Math.random() > 0.975 ? 0 : y + 14;
        });
        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(draw);
      };
      ctx.fillStyle = '#000814';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    else if (project.bgAnimation === 'stars') {
      const stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
      }));
      const nebula = Array.from({ length: 6 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 120 + 60,
        color: ['#f97316', '#a855f7', '#06b6d4', '#ec4899'][Math.floor(Math.random() * 4)],
      }));

      const draw = () => {
        ctx.fillStyle = '#030014';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        nebula.forEach(n => {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
          g.addColorStop(0, n.color + '33');
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        });
        t += 0.01;
        stars.forEach(s => {
          s.twinkle += 0.04;
          ctx.globalAlpha = 0.4 + Math.sin(s.twinkle) * 0.3;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          s.y -= s.speed;
          if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        });
        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (project.bgAnimation === 'petals') {
      const petals = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 14 + 6,
        speed: Math.random() * 1.5 + 0.5,
        drift: Math.random() * 2 - 1,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.6 + 0.3,
      }));

      const drawPetal = (x: number, y: number, size: number, rot: number, alpha: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffb7c5';
        ctx.beginPath();
        ctx.ellipse(0, 0, size / 2, size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff85a2';
        ctx.beginPath();
        ctx.ellipse(0, 0, size / 4, size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      const draw = () => {
        ctx.fillStyle = 'rgba(10,5,20,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        bg.addColorStop(0, '#0a0518');
        bg.addColorStop(0.5, '#1a0830');
        bg.addColorStop(1, '#0a1520');
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        petals.forEach(p => {
          p.y += p.speed;
          p.x += p.drift + Math.sin(t * 0.5 + p.y * 0.01) * 0.5;
          p.rot += p.rotSpeed;
          if (p.y > canvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
          drawPetal(p.x, p.y, p.size, p.rot, p.alpha);
        });
        t += 0.016;
        animId = requestAnimationFrame(draw);
      };
      ctx.fillStyle = '#0a0518';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    else if (project.bgAnimation === 'fire') {
      const particles = Array.from({ length: 120 }, () => ({
        x: canvas.width / 2 + (Math.random() - 0.5) * 300,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 4 + 2),
        life: Math.random(),
        maxLife: Math.random() * 60 + 40,
        size: Math.random() * 8 + 3,
      }));

      const draw = () => {
        ctx.fillStyle = 'rgba(5,2,0,0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx + Math.sin(t * 2 + p.y * 0.01) * 0.5;
          p.y += p.vy;
          p.life += 1 / p.maxLife;
          p.vy -= 0.05;
          if (p.life >= 1) {
            p.x = canvas.width / 2 + (Math.random() - 0.5) * 300;
            p.y = canvas.height + 10;
            p.vx = (Math.random() - 0.5) * 2;
            p.vy = -(Math.random() * 4 + 2);
            p.life = 0;
            p.maxLife = Math.random() * 60 + 40;
          }
          const alpha = Math.sin(p.life * Math.PI) * 0.9;
          const r = Math.floor(255);
          const g = Math.floor(p.life < 0.5 ? p.life * 2 * 180 : (1 - p.life) * 2 * 180);
          const b = 0;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - p.life * 0.5), 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
        t += 0.02;
        animId = requestAnimationFrame(draw);
      };
      ctx.fillStyle = '#050200';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    else if (project.bgAnimation === 'waves') {
      const draw = () => {
        ctx.fillStyle = '#000d1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let w = 0; w < 6; w++) {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2);
          for (let x = 0; x <= canvas.width; x += 5) {
            const y = canvas.height / 2
              + Math.sin(x * 0.008 + t + w * 0.8) * (40 + w * 12)
              + Math.sin(x * 0.015 - t * 1.3 + w) * (20 + w * 6);
            ctx.lineTo(x, y);
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          const alpha = 0.08 - w * 0.008;
          ctx.fillStyle = `rgba(6,182,212,${alpha})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(6,182,212,${alpha * 3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        t += 0.012;
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (project.bgAnimation === 'pulse') {
      const nodes = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 4 + 2,
        pulse: Math.random() * Math.PI * 2,
      }));

      const draw = () => {
        ctx.fillStyle = 'rgba(5,0,15,0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(n => {
          n.x += n.vx; n.y += n.vy; n.pulse += 0.04;
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        });

        nodes.forEach((a, i) => {
          nodes.slice(i + 1).forEach(b => {
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              ctx.globalAlpha = (1 - dist / 180) * 0.4;
              ctx.strokeStyle = '#a855f7';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          });
          const pulse = Math.sin(n.pulse) * 2;
          ctx.globalAlpha = 0.6 + Math.sin(n.pulse) * 0.3;
          ctx.fillStyle = '#a855f7';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + pulse, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(draw);
      };
      ctx.fillStyle = '#05000f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    else if (project.bgAnimation === 'grid') {
      const draw = () => {
        ctx.fillStyle = '#000a10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const size = 40;
        const pulse = Math.sin(t * 0.8) * 0.3 + 0.4;

        for (let x = 0; x < canvas.width; x += size) {
          for (let y = 0; y < canvas.height; y += size) {
            const dx = x - canvas.width / 2;
            const dy = y - canvas.height / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const wave = Math.sin(dist * 0.03 - t * 2) * 0.5 + 0.5;
            ctx.globalAlpha = wave * pulse * 0.6;
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, size, size);
          }
        }
        ctx.globalAlpha = 1;
        t += 0.025;
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (project.bgAnimation === 'lightning') {
      let nextBolt = 0;
      const bolts: { x1: number; y1: number; segs: { x: number; y: number }[]; alpha: number }[] = [];

      const generateBolt = (x: number, y: number) => {
        const segs: { x: number; y: number }[] = [{ x, y }];
        let cx = x, cy = y;
        while (cy < canvas.height) {
          cx += (Math.random() - 0.5) * 80;
          cy += Math.random() * 60 + 20;
          segs.push({ x: cx, y: cy });
        }
        return { x1: x, y1: y, segs, alpha: 1 };
      };

      const draw = () => {
        ctx.fillStyle = 'rgba(2,8,2,0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        nextBolt--;
        if (nextBolt <= 0) {
          bolts.push(generateBolt(Math.random() * canvas.width, 0));
          nextBolt = Math.floor(Math.random() * 80 + 30);
        }
        bolts.forEach((b, i) => {
          ctx.globalAlpha = b.alpha;
          ctx.strokeStyle = '#4ade80';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#4ade80';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(b.segs[0].x, b.segs[0].y);
          b.segs.slice(1).forEach(s => ctx.lineTo(s.x, s.y));
          ctx.stroke();
          ctx.shadowBlur = 0;
          b.alpha -= 0.04;
          if (b.alpha <= 0) bolts.splice(i, 1);
        });
        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(draw);
      };
      ctx.fillStyle = '#020802';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [project]);

  return (
    <div className="project-page">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="page-overlay" style={{ '--accent': project.accentColor } as React.CSSProperties}>
        <button className="back-btn" onClick={onBack}>
          <span className="back-arrow">‹</span> Back
        </button>

        <div className="page-content">
          <div className="page-type-badge">{project.type}</div>
          <h1 className="page-title" style={{ color: project.accentColor }}>{project.name}</h1>
          <p className="page-description">{project.description}</p>

          <div className="page-section">
            <h3 className="section-label">Tech Stack</h3>
            <div className="page-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="page-pill">{tech}</span>
              ))}
            </div>
          </div>

          <div className="page-section">
            <h3 className="section-label">Tags</h3>
            <div className="page-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>

          <div className="page-section">
            <h3 className="section-label">Links</h3>
            <div className="page-links">
              {project.links.map((link) => (
                <a key={link} href={link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View on GitHub ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
