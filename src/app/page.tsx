'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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
  Clock,
  ChevronRight,
  Menu,
  X,
  ArrowDown,
  CheckCircle,
  Compass,
  GraduationCap,
  HardHat,
  Facebook,
  Instagram,
  MessageCircle,
} from 'lucide-react'

/* ─── Stagger Container ─── */
function StaggerContainer({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── NAV LINKS ─── */
const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Construire en Terre Cuite', href: '#avantages' },
  { label: 'Nos Solutions', href: '#solutions' },
  { label: 'Nos Travaux', href: '#travaux' },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
]

/* ─── AVANTAGES DATA ─── */
const AVANTAGES = [
  {
    icon: Thermometer,
    title: 'Confort Thermique',
    desc: "La terre cuite régule naturellement la température intérieure, gardant votre maison fraîche en saison chaude et douce en saison fraîche. Jusqu'à 8°C de différence avec le béton.",
  },
  {
    icon: Volume2,
    title: 'Isolation Acoustique',
    desc: "Grâce à sa structure poreuse, la brique en terre cuite absorbe les bruits et offre un isolement phonique supérieur pour un cadre de vie paisible.",
  },
  {
    icon: Flame,
    title: 'Résistance au Feu',
    desc: "Incombustible par nature, la terre cuite résiste aux températures élevées et protège votre famille et vos biens.",
  },
  {
    icon: Zap,
    title: 'Performance Énergétique',
    desc: "Moins de climatisation, moins de chauffage. Les bâtiments en terre cuite consomment jusqu'à 30% d'énergie en moins.",
  },
  {
    icon: Shield,
    title: 'Durabilité Exceptionnelle',
    desc: "Les constructions en terre cuite traversent les décennies sans perdre ni leur solidité ni leur beauté.",
  },
  {
    icon: Leaf,
    title: "Respect de l'Environnement",
    desc: "Matériau 100% naturel, recyclable et local. Un bilan carbone largement inférieur au béton.",
  },
]

/* ─── SOLUTIONS DATA ─── */
const SOLUTIONS = [
  {
    title: 'Briques Porteuses',
    desc: 'Briques structurelles haute résistance pour les murs porteurs de votre bâtiment.',
    img: 'https://sfile.chatglm.cn/images-ppt/c12fbbe6e423.jpg',
    alt: 'Briques porteuses en terre cuite Nature Brique',
    tag: 'Structure',
  },
  {
    title: 'Briques de Parement',
    desc: 'Finitions décoratives qui donnent caractère et élégance à vos façades.',
    img: 'https://sfile.chatglm.cn/images-ppt/1d19b42ca88b.jpg',
    alt: 'Briques de parement décoratives en terre cuite',
    tag: 'Finition',
  },
  {
    title: 'Pavés & Dalles',
    desc: "Aménagements extérieurs durables qui allient esthétique et robustesse.",
    img: 'https://sfile.chatglm.cn/images-ppt/acc3564a28d5.jpg',
    alt: 'Pavés et dalles en terre cuite pour aménagement extérieur',
    tag: 'Extérieur',
  },
  {
    title: 'Hourdis & Accessoires',
    desc: 'Solutions complètes pour votre chantier : hourdis, linteaux, claustras.',
    img: 'https://sfile.chatglm.cn/images-ppt/cdb6770829c1.jpg',
    alt: 'Hourdis et accessoires en terre cuite',
    tag: 'Complément',
  },
]

/* ─── TRAVAUX DATA ─── */
const TRAVAUX = [
  {
    title: 'Villa Résidentielle à Cotonou',
    desc: "Une villa moderne où la brique en terre cuite crée une ambiance fraîche et contemporaine. Confort thermique optimal sans climatisation excessive.",
    img: 'https://sfile.chatglm.cn/images-ppt/996e4d038810.jpg',
    alt: 'Villa résidentielle construite en briques terre cuite à Cotonou',
    category: 'Résidentiel',
  },
  {
    title: 'Bâtiment Public à Zogbodomey',
    desc: "Un édifice public construit entièrement en briques Nature Brique, démontrant la fiabilité de nos produits pour les projets institutionnels.",
    img: 'https://sfile.chatglm.cn/images-ppt/a0fd4170d85d.jpg',
    alt: 'Bâtiment public en terre cuite à Zogbodomey',
    category: 'Institutionnel',
  },
  {
    title: 'Complexe Scolaire',
    desc: "Des salles de classe fraîches et saines grâce à la terre cuite, offrant un environnement d'apprentissage optimal pour les élèves.",
    img: 'https://sfile.chatglm.cn/images-ppt/c084aece8f33.jpeg',
    alt: 'Complexe scolaire construit en briques terre cuite',
    category: 'Éducation',
  },
]

/* ─── SERVICES DATA ─── */
const SERVICES = [
  {
    icon: Compass,
    title: 'Études Techniques',
    desc: "Notre équipe d'ingénieurs vous accompagne dans la conception de votre projet avec des solutions optimisées en terre cuite.",
    for: 'Architectes & Promoteurs',
  },
  {
    icon: HardHat,
    title: 'Eco-Build',
    desc: "Notre partenaire Eco-Build vous propose une approche globale de la construction écologique, de l'architecture aux finitions.",
    for: 'Tous porteurs de projet',
  },
  {
    icon: GraduationCap,
    title: 'Formation',
    desc: "Des sessions de formation pour vos équipes de maçons et entrepreneurs sur les techniques de pose de la brique en terre cuite.",
    for: 'Entreprises & Artisans',
  },
  {
    icon: CheckCircle,
    title: 'Assistance Chantier',
    desc: "Un suivi technique sur vos chantiers pour garantir la qualité de la mise en oeuvre et le respect des normes.",
    for: 'Tous clients',
  },
]

/* ─── Counter Animation ─── */
function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const num = parseInt(target)
    if (isNaN(num)) {
      setDisplay(target)
      return
    }
    let start = 0
    const duration = 1800
    const stepTime = duration / num
    const timer = setInterval(() => {
      start += 1
      setDisplay(String(start))
      if (start >= num) clearInterval(timer)
    }, Math.max(stepTime, 16))
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans text-earth">
      {/* ─── 1. HEADER ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(45,27,14,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 sm:px-6 lg:px-8 h-16 md:h-20">
          <a href="#accueil" className="relative shrink-0" aria-label="Nature Brique - Accueil">
            <Image
              src={scrolled ? '/images/logo.png' : '/images/logo-white.png'}
              alt="Nature Brique"
              width={140}
              height={60}
              priority
              className="h-9 w-auto md:h-11 lg:h-12 object-contain transition-all duration-300"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-[13px] tracking-wide uppercase transition-colors duration-300 ${
                  scrolled
                    ? 'text-earth-light hover:text-terracotta'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className={`hidden lg:inline-flex items-center rounded-full px-6 py-2.5 text-[13px] tracking-wide uppercase font-medium transition-all duration-300 hover:scale-[1.03] ${
              scrolled
                ? 'bg-terracotta text-white hover:bg-terracotta-dark shadow-sm'
                : 'bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm'
            }`}
          >
            Demander un devis
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? (
              <X className={`h-6 w-6 transition-colors ${scrolled ? 'text-earth' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 transition-colors ${scrolled ? 'text-earth' : 'text-white'}`} />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden bg-white border-t border-cream-dark/60 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-5">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="py-3 text-sm text-earth/80 hover:text-terracotta transition-colors border-b border-cream-dark/40 last:border-0"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-white transition-all hover:bg-terracotta-dark"
                >
                  Demander un devis
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* ─── 2. HERO ─── */}
        <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://sfile.chatglm.cn/images-ppt/71994ed677c7.jpg"
              alt="Bâtiment moderne construit en briques terre cuite"
              className="w-full h-full object-cover scale-105"
              loading="eager"
            />
            <div className="hero-overlay absolute inset-0" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-6 lg:px-8 py-32 md:py-40">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-mint font-heading text-xs md:text-sm tracking-[0.25em] uppercase mb-5 pb-1 border-b border-mint/30"
              >
                Construisons notre monde écologique
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-7"
              >
                La terre cuite,
                <br />
                <span className="text-terracotta-light">un art de construire</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
              >
                Depuis 2011, Nature Brique fabrique au Bénin des briques en terre
                cuite qui allient confort thermique, durabilité et esthétique.
                Construisons ensemble un avenir plus sain.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#solutions"
                  className="group inline-flex items-center gap-2 rounded-full bg-terracotta pl-7 pr-6 py-3.5 text-white font-heading text-sm transition-all duration-300 hover:bg-terracotta-dark hover:shadow-lg hover:shadow-terracotta/20"
                >
                  Découvrir nos solutions
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-white font-heading text-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/60"
                >
                  Demander un devis
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <a
              href="#avantages"
              className="flex flex-col items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors"
              aria-label="Défiler vers le bas"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase">Découvrir</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </a>
          </motion.div>
        </section>

        {/* ─── 3. AVANTAGES ─── */}
        <section id="avantages" className="bg-cream-dark py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14 md:mb-20"
            >
              <p className="text-terracotta font-heading text-xs tracking-[0.2em] uppercase mb-3">
                Les avantages
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-earth leading-tight">
                Pourquoi construire
                <br className="hidden sm:block" />
                {' '}en terre cuite ?
              </h2>
              <p className="text-warm-gray text-base md:text-lg mt-4 max-w-lg mx-auto">
                Un matériau qui transforme votre habitat
              </p>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" stagger={0.07}>
              {AVANTAGES.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 border-t-[3px] border-terracotta/80 hover:border-terracotta"
                  >
                    <div className="w-13 h-13 rounded-xl bg-terracotta/[0.07] group-hover:bg-terracotta/[0.12] flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-terracotta" />
                    </div>
                    <h3 className="font-heading text-lg text-earth mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </StaggerContainer>
          </div>
        </section>

        <hr className="earth-divider" />

        {/* ─── 4. NOS SOLUTIONS ─── */}
        <section id="solutions" className="bg-cream py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14 md:mb-20"
            >
              <p className="text-terracotta font-heading text-xs tracking-[0.2em] uppercase mb-3">
                Produits
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-earth leading-tight">
                Nos Solutions Constructives
              </h2>
              <p className="text-warm-gray text-base md:text-lg mt-4 max-w-lg mx-auto">
                Des briques pour chaque besoin de votre chantier
              </p>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" stagger={0.08}>
              {SOLUTIONS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-earth text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5 pt-4">
                    <h3 className="font-heading text-[1.05rem] text-earth mb-2">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <a
                      href="#solutions"
                      className="group/link inline-flex items-center text-terracotta text-sm font-medium hover:text-terracotta-dark transition-colors"
                    >
                      En savoir plus
                      <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12 md:mt-16"
            >
              <a
                href="#solutions"
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta pl-7 pr-6 py-3.5 text-white font-heading text-sm transition-all duration-300 hover:bg-terracotta-dark hover:shadow-lg hover:shadow-terracotta/20"
              >
                Voir toutes nos solutions
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </section>

        <hr className="earth-divider" />

        {/* ─── 5. NOS TRAVAUX ─── */}
        <section id="travaux" className="bg-white py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14 md:mb-20"
            >
              <p className="text-terracotta font-heading text-xs tracking-[0.2em] uppercase mb-3">
                Réalisations
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-earth leading-tight">
                Nos Réalisations
              </h2>
              <p className="text-warm-gray text-base md:text-lg mt-4 max-w-lg mx-auto">
                Des projets qui prouvent notre savoir-faire
              </p>
            </motion.div>

            <div className="flex flex-col gap-12 md:gap-20">
              {TRAVAUX.map((item, i) => {
                const isEven = i % 2 === 0
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex flex-col ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-6 md:gap-10 items-stretch`}
                  >
                    <div className="lg:w-[55%] relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[380px] shadow-md">
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-4 left-4 bg-terracotta/90 backdrop-blur-sm text-white text-[11px] font-medium tracking-wider uppercase px-3.5 py-1.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="lg:w-[45%] flex flex-col justify-center py-2 lg:pl-4">
                      <h3 className="font-heading text-2xl md:text-[1.7rem] text-earth mb-4 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-warm-gray text-[0.94rem] md:text-base leading-relaxed mb-6">
                        {item.desc}
                      </p>
                      <a
                        href="#travaux"
                        className="group inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors text-sm"
                      >
                        Voir le projet
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <hr className="earth-divider" />

        {/* ─── 6. SERVICES ─── */}
        <section id="services" className="bg-cream py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14 md:mb-20"
            >
              <p className="text-terracotta font-heading text-xs tracking-[0.2em] uppercase mb-3">
                Accompagnement
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-earth leading-tight">
                Nos Services
              </h2>
              <p className="text-warm-gray text-base md:text-lg mt-4 max-w-lg mx-auto">
                Un accompagnement complet de la conception à la réalisation
              </p>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" stagger={0.08}>
              {SERVICES.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 border-l-[3px] border-mint/70 hover:border-mint"
                  >
                    <div className="w-13 h-13 rounded-xl bg-mint/10 group-hover:bg-mint/20 flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-mint-dark" />
                    </div>
                    <h3 className="font-heading text-lg text-earth mb-2">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <span className="inline-block text-[11px] text-warm-gray/70 tracking-wide uppercase">
                      {item.for}
                    </span>
                  </motion.div>
                )
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── 7. POURQUOI NOUS CHOISIR ─── */}
        <section id="apropos" className="bg-terracotta py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14 md:mb-20"
            >
              <p className="text-white/60 font-heading text-xs tracking-[0.2em] uppercase mb-3">
                Notre force
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-tight">
                Nature Brique, c&apos;est plus qu&apos;un fabricant
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-14 md:mb-20">
              {[
                { num: '2011', label: 'Année de création', target: '2011' },
                { num: '30+', label: 'Employés engagés', target: '30' },
                { num: '1ère', label: 'Industrie céramique du Bénin' },
                { num: '100%', label: 'Terre cuite naturelle', target: '100' },
              ].map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="text-center"
                >
                  <div className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-2">
                    {fact.target ? (
                      <AnimatedCounter target={fact.target} suffix={fact.num.includes('+') ? '+' : fact.num.includes('%') ? '%' : ''} />
                    ) : (
                      fact.num
                    )}
                  </div>
                  <p className="text-white/70 text-xs md:text-sm tracking-wide">
                    {fact.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="text-white/85 text-base md:text-lg leading-relaxed">
                Fondée par Franck Kidjo, ingénieur revenu de Belgique après 20
                ans d&apos;expérience, Nature Brique est née de la conviction
                qu&apos;il est possible de construire différemment au Bénin. Notre
                mission : offrir aux populations des matériaux sains, performants
                et respectueux de l&apos;environnement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── 8. CTA ─── */}
        <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://sfile.chatglm.cn/images-ppt/a0bd1d6bfa72.jpg"
              alt="Construction en terre cuite au Bénin"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-earth/88" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-white mb-4 leading-tight"
            >
              Prêt à construire avec la terre cuite ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-white/75 text-base md:text-lg leading-relaxed mb-10"
            >
              Contactez-nous pour discuter de votre projet. Notre équipe vous
              accompagne du devis à la réalisation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-mint px-8 py-3.5 text-earth font-heading text-sm transition-all duration-300 hover:bg-mint-light hover:shadow-lg hover:shadow-mint/20"
              >
                Demander un devis
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/22996505057"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-white text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="tel:+22996505057"
                className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone className="mr-1.5 h-3.5 w-3.5" />
                +229 96 50 50 57
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-earth text-white/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-16 pb-10 md:pt-20 md:pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Image
                src="/images/logo-white.png"
                alt="Nature Brique"
                width={120}
                height={52}
                className="h-10 w-auto mb-5 object-contain brightness-110"
              />
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
                Première industrie céramique du Bénin. Des briques en terre cuite
                pour une construction durable, confortable et respectueuse de
                l&apos;environnement.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/naturebrique.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-terracotta transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/naturebrique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-terracotta transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="mailto:info@naturebrique.com"
                  className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-terracotta transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-heading text-white text-sm tracking-wider uppercase mb-5">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-white/55 hover:text-terracotta-light transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-heading text-white text-sm tracking-wider uppercase mb-5">
                Nos Solutions
              </h4>
              <ul className="space-y-2.5">
                {['Briques porteuses', 'Briques de parement', 'Pavés & Dalles', 'Hourdis & Accessoires'].map((s) => (
                  <li key={s}>
                    <a
                      href="#solutions"
                      className="text-sm text-white/55 hover:text-terracotta-light transition-colors duration-200"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-white text-sm tracking-wider uppercase mb-5">
                Contact
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-terracotta-light/70 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/55 leading-relaxed">
                    Lot 3614, Fidjrosse-Houta<br />Cotonou, Bénin
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-terracotta-light/70 shrink-0" />
                  <a href="tel:+22996505057" className="text-sm text-white/55 hover:text-terracotta-light transition-colors duration-200">
                    +229 96 50 50 57
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-terracotta-light/70 shrink-0" />
                  <a href="mailto:info@naturebrique.com" className="text-sm text-white/55 hover:text-terracotta-light transition-colors duration-200">
                    info@naturebrique.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-terracotta-light/70 shrink-0" />
                  <span className="text-sm text-white/55">
                    Lun - Ven : 8h - 18h
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/35">
            <p>&copy; {new Date().getFullYear()} Nature Brique. Tous droits réservés.</p>
            <p>Cotonou, Bénin</p>
          </div>
        </div>
      </footer>
    </div>
  )
}