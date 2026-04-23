'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Bot,
  ScanLine,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Shield,
  Cpu,
  Zap,
  Heart,
  Crosshair,
  Activity,
} from 'lucide-react';

/* ================================================================
   PRECISION DENTAL — TECH EDITION
   Dark · Orange · Cyan · Minimalist · Dopaminic
   ================================================================ */

// ─── Stagger Fade-In on Scroll ──────────────────────────────────
function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const map: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...map[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ───────────────────────────────────────────
function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Ambient Background ─────────────────────────────────────────
function AmbientBg() {
  return (
    <div className="ambient-bg">
      {/* Top-right orange glow */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04] hidden md:block"
        style={{
          background: 'radial-gradient(circle, #f97316 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Bottom-left cyan glow */}
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03] hidden md:block"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Tecnología', href: '#tech' },
    { label: 'Resultados', href: '#resultados' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-4">
        <div className={`max-w-7xl mx-auto flex justify-between items-center rounded-full px-6 md:px-8 py-3 ${scrolled ? 'nav-glass scrolled' : 'nav-glass'}`}>
          <a href="#" className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-orange-500" />
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              BIO<span className="text-orange-500">DIGITAL</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/tu-numero"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-cta px-6 py-2.5 text-[13px] font-semibold text-white tracking-wide"
            >
              Agendar Cita
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-50 nav-glass rounded-2xl p-6 space-y-5 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium uppercase tracking-[0.15em] text-white/50 hover:text-orange-500 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/tu-numero"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block text-center neon-cta px-6 py-3 text-sm font-semibold text-white"
            >
              Agendar Cita
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ───────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {/* Desktop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 hidden md:block will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/hero-video/bg-fast.mp4" type="video/mp4" />
        </video>
        {/* Mobile */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 block md:hidden will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/hero-video/bg-mobile.mp4" type="video/mp4" />
        </video>
        {/* Slight translucent overlay — keeps video visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl w-full mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8 md:mb-12"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
            Odontología de Precisión
          </span>
        </motion.div>

        {/* Overlapping Headlines */}
        <div className="relative">
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter text-white/25 select-none"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            Precisión.
          </h1>
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter text-orange-500 text-glow-orange -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-16"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            Sin Dolor.
          </h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/40 text-sm md:text-base max-w-md mx-auto mt-6 md:mt-8 leading-relaxed px-2"
        >
          Ingeniería digital y robótica al servicio de tu sonrisa.
          Resultados que superan la capacidad humana.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 md:mt-12"
        >
          <a
            href="https://wa.me/tu-numero"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-cta inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 text-white font-semibold text-sm md:text-base tracking-wide"
          >
            Agendar Escaneo 3D
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/15">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/20" style={{ animation: 'float-gentle 2s ease-in-out infinite' }} />
      </motion.div>
    </section>
  );
}

// ─── Bento Grid Services ────────────────────────────────────────
function ServicesSection() {
  const services = [
    {
      icon: Bot,
      title: 'Implantes\nRobotizados',
      desc: 'Carga inmediata con precisión micrométrica guiada por computadora. Recuperación ultrarrápida sin suturas visibles.',
      size: 'large',
      accent: 'orange',
    },
    {
      icon: Sparkles,
      title: 'Diseño de\nSonrisa Digital',
      desc: 'Carillas diseñadas con IA que simulan tu resultado final antes de comenzar. Cada milímetro calculado por algoritmos de estética facial.',
      size: 'medium',
      accent: 'cyan',
    },
    {
      icon: ScanLine,
      title: 'Ortodoncia\nInvisible',
      desc: 'Alineadores inteligentes creados por IA que predicen el movimiento dental. Sin brackets, sin molestias.',
      size: 'medium',
      accent: 'orange',
    },
    {
      icon: Shield,
      title: 'Blanqueamiento\nLED Quantum',
      desc: 'Tecnología LED de última generación. Hasta 12 tonos más claros en una sesión sin sensibilidad.',
      size: 'small',
      accent: 'cyan',
    },
    {
      icon: Activity,
      title: 'Diagnóstico\n3D Avanzado',
      desc: 'Escáner intraoral que genera un modelo tridimensional completo en 60 segundos. Cero impresiones tradicionales.',
      size: 'small',
      accent: 'orange',
    },
  ];

  return (
    <section id="servicios" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* ── Cinematic Video Background ────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {/* Desktop video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 hidden md:block will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/tech-video/tech-bg.mp4" type="video/mp4" />
        </video>
        {/* Mobile video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 block md:hidden will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/tech-video/tech-bg-mobile.mp4" type="video/mp4" />
        </video>
        {/* Translucent overlay — cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <Reveal className="mb-12 md:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/20 font-medium block mb-3">
            Nuestros Servicios
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            <span className="text-white/10">Tecnología</span>
            <br />
            <span className="text-gradient-orange">que transforma.</span>
          </h2>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[300px]">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isLarge = s.size === 'large';
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <Reveal
                key={s.title.replace('\n', '')}
                delay={i * 0.1}
                direction={i % 2 === 0 ? 'up' : 'up'}
                className={colSpan}
              >
                <div className="glass-card h-full p-8 md:p-10 flex flex-col justify-between cursor-pointer group">
                  {/* Top: icon + tag */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 rounded-2xl ${
                        s.accent === 'orange'
                          ? 'bg-orange-500/10 border border-orange-500/20'
                          : 'bg-cyan-500/10 border border-cyan-500/20'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          s.accent === 'orange' ? 'text-orange-500' : 'text-cyan-400'
                        }`}
                      />
                    </div>
                    <Zap
                      className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        s.accent === 'orange' ? 'text-orange-500' : 'text-cyan-400'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h3
                      className={`text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3 whitespace-pre-line ${
                        s.accent === 'orange'
                          ? 'text-white/80 group-hover:text-orange-400'
                          : 'text-white/80 group-hover:text-cyan-400'
                      } transition-colors duration-500`}
                      style={{ fontFamily: "'Archivo Black', sans-serif" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-white/30 text-sm leading-relaxed max-w-md">
                      {s.desc}
                    </p>
                  </div>

                  {/* Learn more */}
                  <div
                    className={`flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                      s.accent === 'orange' ? 'text-orange-400' : 'text-cyan-400'
                    }`}
                  >
                    Conocer más
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof & Tech ────────────────────────────────────────
function TechSection() {
  const stats = [
    { value: 12000, suffix: '+', label: 'Sonrisas Transformadas' },
    { value: 99, suffix: '.7%', label: 'Precisión Digital' },
    { value: 24, suffix: 'h', label: 'Recuperación Express' },
    { value: 150, suffix: '+', label: 'Especialistas Certificados' },
  ];

  const techLogos = [
    { name: 'Inteligencia Artificial', icon: Cpu },
    { name: 'Escáner 3D Itero', icon: ScanLine },
    { name: 'Robótica Dental', icon: Bot },
    { name: 'Prototipado Digital', icon: Sparkles },
    { name: 'Planificación Virtual', icon: Crosshair },
    { name: 'Bioseguridad', icon: Shield },
  ];

  return (
    <section id="tech" className="py-24 md:py-32 relative overflow-hidden">
      {/* ── Cinematic Video Background ────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {/* Desktop video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 hidden md:block will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/innovation-video/innovation-bg.mp4" type="video/mp4" />
        </video>
        {/* Mobile video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 block md:hidden will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/innovation-video/innovation-bg-mobile.mp4" type="video/mp4" />
        </video>
        {/* Translucent overlay — cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Stats Counter Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-28">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <div
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-cyan-400 stat-glow"
                  style={{ fontFamily: "'Archivo Black', sans-serif" }}
                >
                  <Counter end={s.value} suffix={s.suffix} duration={2.5} />
                </div>
                <p className="text-white/25 text-xs md:text-sm uppercase tracking-[0.15em] font-medium mt-2">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tech Logos */}
        <Reveal>
          <div className="mb-12 md:mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/20 font-medium block mb-3">
              Tecnología de Vanguardia
            </span>
            <h2
              className="text-3xl md:text-5xl font-black tracking-tighter"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              Potenciado por{' '}
              <span className="text-gradient-cyan">innovación.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {techLogos.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4 group cursor-default">
                  <div className="tech-logo transition-all duration-500 group-hover:!filter-none group-hover:!opacity-100">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mx-auto" />
                  </div>
                  <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors duration-500 font-medium">
                    {t.name}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Results / CTA Final ────────────────────────────────────────
function ResultsSection() {
  return (
    <section id="resultados" className="py-28 md:py-40 relative overflow-hidden">
      {/* ── Cinematic Video Background ────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {/* Desktop video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 hidden md:block will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/results-video/results-bg.mp4" type="video/mp4" />
        </video>
        {/* Mobile video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 block md:hidden will-change-transform"
          style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/results-video/results-bg-mobile.mp4" type="video/mp4" />
        </video>
        {/* Translucent overlay — cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Orange ambient glow on top of video */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.06] z-[1]"
        style={{
          background: 'radial-gradient(ellipse, #f97316 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8">
            <Heart className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-orange-400 font-medium">
              Resultados Reales
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9]"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            Tu sonrisa merece
            <br />
            <span className="text-gradient-orange">precisión absoluta.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-white/30 text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10 md:mb-14">
            No dejes tu salud dental al azar. Nuestra tecnología elimina la
            incertidumbre y garantiza resultados que superan las expectativas
            de cada paciente.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="https://wa.me/tu-numero"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-cta inline-flex items-center gap-3 px-10 md:px-14 py-5 md:py-6 text-white font-bold text-base md:text-lg tracking-wide"
          >
            Hablar con un Especialista
            <ArrowRight className="w-5 h-5" />
          </a>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-8 text-[10px] tracking-[0.3em] text-white/10 uppercase">
            Respuesta inmediata por WhatsApp
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-orange-500" />
          <span
            className="text-sm font-bold tracking-tight"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            BIO<span className="text-orange-500">DIGITAL</span>
          </span>
        </div>
        <div className="flex gap-6 text-[10px] uppercase tracking-[0.15em] text-white/15 font-medium">
          <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
          <a href="#tech" className="hover:text-orange-500 transition-colors">Tecnología</a>
          <a href="#resultados" className="hover:text-orange-500 transition-colors">Resultados</a>
        </div>
        <span className="text-[10px] tracking-[0.1em] text-white/10">
          2025 BioDigital Clinic
        </span>
      </div>
    </footer>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AmbientBg />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechSection />
        <ResultsSection />
      </main>
      <Footer />
    </div>
  );
}
