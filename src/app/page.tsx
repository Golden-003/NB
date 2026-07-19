'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Thermometer,
  Volume2,
  Flame,
  Zap,
  Shield,
  Leaf,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Quote,
  Facebook,
  Instagram,
  MessageCircle,
  Clock,
  Building2,
  Award,
  Lightbulb,
  GraduationCap,
  HardHat,
} from 'lucide-react'

/* ═══════════════════════════════════════════
   ANIMATION PRIMITIVES
   ═══════════════════════════════════════════ */
const ease = [0.22, 1, 0.36, 1] as const

function FadeIn({ children, delay = 0, y = 20, className = '' }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerGroup({ children, className = '', stagger = 0.08 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════ */
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref} className="stat-number">{prefix}{count}{suffix}</span>
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Avantages', href: '#avantages' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Réalisations', href: '#travaux' },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
]

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Scroll Progress */}
      <ScrollProgress />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#accueil" className="relative z-50">
            <Image src="/images/logo.png" alt="Nature Brique" width={160} height={40} className="h-9 w-auto" priority />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'text-earth hover:text-terracotta hover:bg-terracotta/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <a
            href="tel:+22996505057"
            className="hidden lg:flex items-center gap-2 btn-premium bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide"
          >
            <Phone size={15} />
            Nous contacter
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={24} className={scrolled ? 'text-earth' : 'text-white'} />
            ) : (
              <Menu size={24} className={scrolled ? 'text-earth' : 'text-white'} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-earth/98 flex flex-col items-center justify-center gap-6"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease }}
                className="text-cream text-2xl font-heading tracking-wide hover:text-terracotta transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="tel:+22996505057"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease }}
              className="mt-4 btn-premium bg-terracotta text-white px-8 py-3 rounded-full font-semibold"
            >
              <Phone size={16} className="inline mr-2" />
              +229 96 50 50 57
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ═══════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

/* ═══════════════════════════════════════════
   HERO SECTION — Cinematic
   ═══════════════════════════════════════════ */
function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 150])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section id="accueil" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <Image
          src="/images/nb/hero-construction.jpg"
          alt="Chantier Nature Brique"
          fill
          className="object-cover scale-110"
          priority
          quality={85}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth/70 via-earth/40 to-earth/80 z-[1]" />

      {/* Grain */}
      <div className="absolute inset-0 grain-overlay-dark z-[2]" />

      {/* Bottom curve transition */}
      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 69.3C960 69 1056 59 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H0Z" fill="#2D1B0E"/>
        </svg>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-[3] flex flex-col justify-end h-full max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="section-label !text-terracotta-light mb-6"
          >
            Depuis 2011 au Bénin
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading leading-[1.05] mb-6"
          >
            Construisons<br />
            notre monde<br />
            <span className="text-terracotta-light">écologique</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="text-cream/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Première industrie céramique du Bénin. Des briques en terre cuite pour un habitat durable, confortable et authentique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease }}
            className="flex flex-wrap gap-4"
          >
            <a href="#solutions" className="btn-premium bg-terracotta text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide flex items-center gap-2">
              Découvrir nos solutions
              <ChevronRight size={18} />
            </a>
            <a href="#travaux" className="btn-premium bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-white/20">
              Voir nos réalisations
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="text-cream/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-cream/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-cream/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   MARQUEE TRUST BAR
   ═══════════════════════════════════════════ */
function TrustBar() {
  const items = [
    'Première industrie céramique du Bénin',
    'Fondée en 2011 par Franck Kidjo',
    'Certifié Eco-Build',
    '25+ employés',
    'Usine à Zogbodomey',
    'Siège à Cotonou',
  ]
  return (
    <div className="bg-earth py-4 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-cream/40 text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-8">
            {item}
            <span className="text-terracotta/40">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   AVANTAGES — Bento Grid
   ═══════════════════════════════════════════ */
const AVANTAGES = [
  { icon: Thermometer, title: 'Confort Thermique', desc: 'Régulation naturelle de la température. Jusqu\'à 8°C de différence avec le béton.', span: 'md:col-span-2' },
  { icon: Volume2, title: 'Isolation Acoustique', desc: 'Structure poreuse absorbant les bruits pour un cadre de vie paisible.', span: '' },
  { icon: Flame, title: 'Résistance au Feu', desc: 'Incombustible par nature, la terre cuite protège votre famille.', span: '' },
  { icon: Leaf, title: 'Écologique', desc: 'Matériau 100% naturel, recyclable, faible empreinte carbone.', span: '' },
  { icon: Zap, title: 'Performance Énergétique', desc: 'Réduit la dépendance à la climatisation jusqu\'à 40%.', span: 'md:col-span-2' },
]

function Avantages() {
  return (
    <section id="avantages" className="relative py-24 lg:py-32 bg-cream grain-overlay overflow-hidden">
      <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header — Asymmetric */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <FadeIn>
              <span className="section-label">Pourquoi la terre cuite</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-earth mt-4 leading-tight">
                Un matériau d&apos;exception<br />pour un habitat <span className="text-terracotta">durable</span>
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <FadeIn delay={0.2}>
              <p className="text-warm-gray text-base leading-relaxed">
                La brique en terre cuite allie performance technique, confort au quotidien et respect de l&apos;environnement. Un choix responsable pour les générations futures.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Bento Grid */}
        <StaggerGroup className="grid md:grid-cols-3 gap-4 lg:gap-5" stagger={0.08}>
          {AVANTAGES.map((item) => (
            <motion.div key={item.title} variants={staggerItem} className={`bento-card ${item.span} bg-white rounded-2xl p-8 lg:p-10 relative group`}>
              <div className="w-12 h-12 rounded-xl bg-terracotta/8 flex items-center justify-center mb-6 group-hover:bg-terracotta group-hover:scale-110 transition-all duration-500">
                <item.icon size={22} className="text-terracotta group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-heading text-earth mb-3">{item.title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   NOS SOLUTIONS — Horizontal Scroll
   ═══════════════════════════════════════════ */
const SOLUTIONS = [
  {
    title: 'Briques Porteuses',
    desc: 'Briques structurelles pour murs porteurs. Résistance mécanique exceptionnelle et isolation thermique intégrée.',
    img: '/images/nb/brick-wall.jpg',
    tag: 'Structure',
  },
  {
    title: 'Briques de Parement',
    desc: 'Finition décorative pour façades authentiques. Chaque brique offre une texture unique et naturelle.',
    img: '/images/nb/facade.jpg',
    tag: 'Esthétique',
  },
  {
    title: 'Pavés en Terre Cuite',
    desc: 'Aménagement extérieur élégant et durable. Allées, terrasses et espaces publics.',
    img: '/images/nb/paves-straat.jpg',
    tag: 'Extérieur',
  },
  {
    title: 'Eco-Build',
    desc: 'Notre certification engagement pour une construction responsable et écologique au Bénin.',
    img: '/images/nb/ecobuild.jpg',
    tag: 'Engagement',
  },
]

function Solutions() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDown(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }, [])

  const onMouseLeave = useCallback(() => setIsDown(false), [])
  const onMouseUp = useCallback(() => setIsDown(false), [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }, [isDown, startX, scrollLeft])

  return (
    <section id="solutions" className="relative py-24 lg:py-32 bg-earth grain-overlay-dark overflow-hidden">
      <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn>
          <span className="section-label">Nos Solutions</span>
        </FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-4 mb-12 lg:mb-16">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-cream leading-tight">
              Des produits pour<br />chaque <span className="text-terracotta">projet</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="hidden lg:flex gap-3 mt-6 lg:mt-0">
              <button onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all">
                <ChevronRight size={18} className="rotate-180" />
              </button>
              <button onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal Scroll Cards — drag + snap */}
      <div
        ref={scrollRef}
        className="scroll-container flex gap-5 lg:gap-6 overflow-x-auto px-6 lg:px-10 pb-4 snap-x select-none cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {SOLUTIONS.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.1}>
            <div className="flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[380px] snap-start group">
              <div className="img-reveal relative rounded-2xl overflow-hidden aspect-[4/5] bg-earth-light/30 mb-5">
                <Image src={s.img} alt={s.title} fill className="object-cover" sizes="380px" />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-widest uppercase bg-terracotta/90 text-white backdrop-blur-sm">
                    {s.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-white text-sm font-semibold flex items-center gap-1">
                    En savoir plus <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-heading text-cream mb-2">{s.title}</h3>
              <p className="text-cream/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   NOS TRAVAUX — Asymmetric Showcase
   ═══════════════════════════════════════════ */
const PROJETS = [
  {
    title: 'Résidence Éco-Habitat',
    location: 'Cotonou, Bénin',
    desc: 'Maison individuelle en brique porteuse avec façade en terre cuite apparente. Confort thermique optimal sans climatisation.',
    img: '/images/nb/project-maison.jpg',
    large: true,
  },
  {
    title: 'Mur de Clôture Premium',
    location: 'Zogbodomey, Bénin',
    desc: 'Clôture en brique de parement alliant sécurité et esthétique pour un domaine résidentiel.',
    img: '/images/nb/project-mur.jpg',
    large: false,
  },
  {
    title: 'Complexe Résidentiel',
    location: 'Cotonou, Bénin',
    desc: 'Ensemble de 4 villas construites entièrement en briques Nature Brique. Projet pilote Eco-Build.',
    img: '/images/nb/ext-1.jpg',
    large: false,
  },
]

function Travaux() {
  const { scrollYProgress } = useScroll({ target: useRef(null), offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="travaux" className="relative py-24 lg:py-32 bg-cream grain-overlay overflow-hidden">
      {/* Subtle parallax background accent */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-terracotta/[0.03] -skew-x-12 -mr-20 pointer-events-none"
        style={{ y: bgY }}
      />
      <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn>
          <span className="section-label">Nos Réalisations</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-earth mt-4 mb-16 lg:mb-20 leading-tight">
            Des projets qui<br /><span className="text-terracotta">inspirent</span>
          </h2>
        </FadeIn>

        {/* Asymmetric Grid */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Large Featured Project */}
          <FadeIn className="lg:col-span-7">
            <div className="img-reveal relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer">
              <Image src={PROJETS[0].img} alt={PROJETS[0].title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <span className="text-terracotta-light text-xs font-semibold tracking-[0.2em] uppercase">{PROJETS[0].location}</span>
                <h3 className="text-2xl lg:text-3xl font-heading text-cream mt-2 mb-3">{PROJETS[0].title}</h3>
                <p className="text-cream/60 text-sm max-w-md leading-relaxed">{PROJETS[0].desc}</p>
              </div>
            </div>
          </FadeIn>

          {/* Stacked Right Projects */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
            {PROJETS.slice(1).map((p, i) => (
              <FadeIn key={p.title} delay={0.15 + i * 0.1}>
                <div className="img-reveal relative rounded-2xl overflow-hidden aspect-[16/10] group cursor-pointer">
                  <Image src={p.img} alt={p.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <span className="text-terracotta-light text-xs font-semibold tracking-[0.2em] uppercase">{p.location}</span>
                    <h3 className="text-xl font-heading text-cream mt-1.5 mb-2">{p.title}</h3>
                    <p className="text-cream/50 text-sm leading-relaxed line-clamp-2">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SERVICES — Split Blocks
   ═══════════════════════════════════════════ */
const SERVICES = [
  {
    icon: Lightbulb,
    title: 'Conseil & Conception',
    desc: 'Accompagnement technique personnalisé pour optimiser votre projet en terre cuite. Études de faisabilité, plans détaillés et recommandations sur les meilleures solutions.',
  },
  {
    icon: Building2,
    title: 'Production Industrielle',
    desc: 'Notre usine à Zogbodomey produit des briques de qualité constante, conformes aux normes internationales. Capacité de production adaptée aux projets de toute envergure.',
  },
  {
    icon: HardHat,
    title: 'Pôle Construction',
    desc: 'Notre équipe qualifiée prend en charge la réalisation complète de votre projet, de la fondation à la finition. Garantie décennale sur tous nos ouvrages.',
  },
  {
    icon: GraduationCap,
    title: 'Formation & Transfer',
    desc: 'Programmes de formation pour professionnels de la construction. Maîtrise de la technique de pose des briques en terre cuite et bonnes pratiques du bâtiment durable.',
  },
]

function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-cream-dark grain-overlay overflow-hidden">
      <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn>
          <span className="section-label">Nos Services</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-earth mt-4 mb-16 lg:mb-20 leading-tight">
            Un accompagnement<br /><span className="text-terracotta">complet</span>
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="group flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 py-8 lg:py-10 border-b border-earth/8 first:border-t cursor-pointer">
                {/* Number */}
                <span className="text-earth/15 font-heading text-3xl lg:text-4xl lg:w-16 shrink-0">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-terracotta/8 flex items-center justify-center shrink-0 group-hover:bg-terracotta group-hover:scale-110 transition-all duration-500">
                  <s.icon size={24} className="text-terracotta group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-heading text-earth mb-2 group-hover:text-terracotta transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed max-w-2xl">{s.desc}</p>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex w-10 h-10 rounded-full border border-earth/10 items-center justify-center group-hover:bg-terracotta group-hover:border-terracotta transition-all duration-500">
                  <ArrowUpRight size={16} className="text-earth/30 group-hover:text-white transition-colors duration-500" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   STATS + FOUNDER
   ═══════════════════════════════════════════ */
function StatsFounder() {
  const stats = [
    { value: 13, suffix: '+', label: "Années d'expertise" },
    { value: 500, suffix: '+', label: 'Projets réalisés' },
    { value: 25, suffix: '+', label: 'Collaborateurs' },
    { value: 100, suffix: '%', label: 'Terre cuite naturelle' },
  ]

  return (
    <section id="apropos" className="relative">
      {/* Split: Image Left, Content Right */}
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Image Side */}
        <FadeIn className="relative overflow-hidden">
          <Image
            src="/images/nb/about-team.jpg"
            alt="Équipe Nature Brique"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 grain-overlay-dark" />
          {/* Floating stat card */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-auto glass-card rounded-2xl p-6 z-[3]">
            <p className="text-cream/60 text-xs font-semibold tracking-widest uppercase mb-2">Notre engagement</p>
            <p className="text-cream text-lg font-heading leading-snug">
              &laquo; Chaque brique que nous produisons porte la promesse d&apos;un avenir plus durable. &raquo;
            </p>
          </div>
        </FadeIn>

        {/* Content Side */}
        <div className="bg-earth grain-overlay-dark flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0">
          <FadeIn>
            <span className="section-label">À propos</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-cream mt-4 mb-6 leading-tight">
              Pionniers de la<br />terre cuite au <span className="text-terracotta">Bénin</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-cream/50 leading-relaxed mb-4">
              Fondée en 2011 par Franck Kidjo, Nature Brique est la première industrie céramique du Bénin. Nous transformons l&apos;argile locale en briques de qualité supérieure pour répondre aux défis de la construction durable en Afrique de l&apos;Ouest.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-cream/50 leading-relaxed mb-10">
              De notre siège social à Cotonou à notre usine de production à Zogbodomey, nous maîtrisons l&apos;intégralité de la chaîne de valeur : de l&apos;extraction de l&apos;argile à la cuisson, en passant par le moulage et le contrôle qualité.
            </p>
          </FadeIn>

          {/* Stats Grid */}
          <StaggerGroup className="grid grid-cols-2 gap-6 lg:gap-8" stagger={0.1}>
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="border-t border-cream/10 pt-4">
                <div className="text-3xl lg:text-4xl text-terracotta mb-1">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-cream/40 text-xs font-semibold tracking-widest uppercase">{s.label}</p>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   QUOTE / MISSION SECTION
   ═══════════════════════════════════════════ */
function MissionSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-cream grain-overlay overflow-hidden">
      <div className="relative z-[3] max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <FadeIn>
          <Quote size={48} className="text-terracotta/20 mx-auto mb-6" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading text-earth leading-snug mb-8">
            La terre cuite n&apos;est pas un matériau du passé — c&apos;est le matériau de l&apos;avenir. Naturel, performant, intemporel.
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
              <Award size={18} className="text-terracotta" />
            </div>
            <div className="text-left">
              <p className="text-earth font-semibold text-sm">Franck Kidjo</p>
              <p className="text-warm-gray text-xs">Fondateur & Directeur Général</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════ */
function CtaSection() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <Image src="/images/nb/work-site2.jpg" alt="Chantier Nature Brique" fill className="object-cover" />
      <div className="absolute inset-0 bg-earth/85" />
      <div className="absolute inset-0 grain-overlay-dark" />

      <div className="relative z-[3] max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <FadeIn>
          <span className="section-label !text-terracotta-light">Passons à l'action</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-cream mt-4 mb-6 leading-tight">
            Votre projet en terre cuite<br />commence <span className="text-terracotta-light">ici</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-cream/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Contactez notre équipe pour discuter de votre projet. Devis gratuit, conseil personnalisé et accompagnement de A à Z.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+22996505057" className="btn-premium bg-terracotta text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide flex items-center justify-center gap-2">
              <Phone size={16} />
              +229 96 50 50 57
            </a>
            <a href="mailto:info@naturebrique.com" className="btn-premium bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-white/20">
              <Mail size={16} />
              info@naturebrique.com
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-earth grain-overlay-dark">
      <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/images/logo.png" alt="Nature Brique" width={140} height={35} className="h-8 w-auto mb-5 brightness-0 invert" />
            <p className="text-cream/40 text-sm leading-relaxed mb-6">
              Première industrie céramique du Bénin. Construisons ensemble un avenir écologique.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/naturebrique.net" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center text-cream/40 hover:text-cream hover:border-terracotta hover:bg-terracotta/10 transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/naturebrique" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center text-cream/40 hover:text-cream hover:border-terracotta hover:bg-terracotta/10 transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="https://wa.me/22996505057" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center text-cream/40 hover:text-cream hover:border-terracotta hover:bg-terracotta/10 transition-all duration-300">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-cream font-semibold text-sm tracking-widest uppercase mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-cream/40 text-sm hover:text-terracotta transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream font-semibold text-sm tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+22996505057" className="text-cream/40 text-sm hover:text-terracotta transition-colors flex items-center gap-2">
                  <Phone size={14} /> +229 96 50 50 57
                </a>
              </li>
              <li>
                <a href="mailto:info@naturebrique.com" className="text-cream/40 text-sm hover:text-terracotta transition-colors flex items-center gap-2">
                  <Mail size={14} /> info@naturebrique.com
                </a>
              </li>
              <li>
                <span className="text-cream/40 text-sm flex items-start gap-2">
                  <MapPin size={14} className="shrink-0 mt-0.5" /> Lot 3614 Fidjrosse-Houta, Cotonou, Bénin
                </span>
              </li>
              <li>
                <span className="text-cream/40 text-sm flex items-center gap-2">
                  <Clock size={14} /> Lun-Ven : 8h - 18h
                </span>
              </li>
            </ul>
          </div>

          {/* Usine */}
          <div>
            <h4 className="text-cream font-semibold text-sm tracking-widest uppercase mb-5">Usine</h4>
            <div className="space-y-3 text-cream/40 text-sm">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                Zone de Tanwé Hessou, Zogbodomey, Bénin
              </p>
              <p className="mt-4 text-cream/25 text-xs leading-relaxed">
                Visites d&apos;usine possibles sur rendez-vous. Contactez-nous pour organiser votre visite.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-cream/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/25 text-xs">
            &copy; {new Date().getFullYear()} Nature Brique. Tous droits réservés.
          </p>
          <p className="text-cream/25 text-xs">
            Première industrie céramique du Bénin depuis 2011
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════
   PHOTO MOSAIC STRIP
   ═══════════════════════════════════════════ */
const MOSAIC_IMGS = [
  { src: '/images/nb/facade3.jpg', span: 'row-span-2' },
  { src: '/images/nb/brick-detail2.jpg', span: '' },
  { src: '/images/nb/work-site3.jpg', span: '' },
  { src: '/images/nb/ext-3.jpg', span: 'col-span-2' },
  { src: '/images/nb/facade4.jpg', span: '' },
]

function PhotoMosaic() {
  return (
    <section className="relative py-2 lg:py-4 bg-earth-dark">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-1.5 lg:gap-2 auto-rows-[120px] md:auto-rows-[160px] lg:auto-rows-[200px]">
        {MOSAIC_IMGS.map((img, i) => (
          <FadeIn key={img.src} delay={i * 0.06} className={`img-reveal rounded-lg overflow-hidden ${img.span}`}>
            <Image src={img.src} alt="" fill className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105" sizes="400px" />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   PROCESS SECTION — How we work
   ═══════════════════════════════════════════ */
const PROCESS_STEPS = [
  { num: '01', title: 'Consultation', desc: 'Échange avec notre équipe pour comprendre vos besoins, votre budget et vos contraintes.' },
  { num: '02', title: 'Conception', desc: 'Étude technique et recommandations sur les solutions les plus adaptées à votre projet.' },
  { num: '03', title: 'Production', desc: 'Fabrication de vos briques dans notre usine à Zogbodomey avec contrôle qualité rigoureux.' },
  { num: '04', title: 'Réalisation', desc: 'Pose professionnelle par notre pôle construction avec garantie décennale sur tous nos ouvrages.' },
]

function ProcessSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-cream grain-overlay overflow-hidden">
      <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="section-label justify-center">Notre Processus</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-earth mt-4 leading-tight">
              De l&apos;idée à la <span className="text-terracotta">réalité</span>
            </h2>
          </FadeIn>
        </div>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" stagger={0.12}>
          {PROCESS_STEPS.map((step) => (
            <motion.div key={step.num} variants={staggerItem} className="relative group">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-earth/8 -translate-x-0" />
              <span className="text-5xl lg:text-6xl font-heading text-earth/[0.06] group-hover:text-terracotta/20 transition-colors duration-500">{step.num}</span>
              <h3 className="text-xl font-heading text-earth mt-2 mb-3 group-hover:text-terracotta transition-colors duration-300">{step.title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <TrustBar />
      <Avantages />
      <PhotoMosaic />
      <Solutions />
      <Travaux />
      <ProcessSection />
      <Services />
      <StatsFounder />
      <MissionSection />
      <CtaSection />
      <Footer />
    </main>
  )
}