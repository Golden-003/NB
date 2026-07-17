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
} from 'lucide-react'

/* ─── Animated Section Wrapper ─── */
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
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
    title: 'Respect de l\'Environnement',
    desc: "Matériau 100% naturel, recyclable et local. Un bilan carbone largement inférieur au béton.",
  },
]

/* ─── SOLUTIONS DATA ─── */
const SOLUTIONS = [
  {
    title: 'Briques Porteuses',
    desc: 'Briques structurelles haute résistance pour les murs porteurs de votre bâtiment.',
    img: '/images/nb-photos/nb-site-brick.jpg',
    alt: 'Briques porteuses en terre cuite Nature Brique',
  },
  {
    title: 'Briques de Parement',
    desc: 'Finitions décoratives qui donnent caractère et élégance à vos façades.',
    img: '/images/nb-photos/nb-photo-2.jpg',
    alt: 'Briques de parement décoratives en terre cuite Nature Brique',
  },
  {
    title: 'Pavés & Dalles',
    desc: 'Aménagements extérieurs durables qui allient esthétique et robustesse.',
    img: '/images/nb-photos/nb-photo-3.jpg',
    alt: 'Pavés et dalles en terre cuite Nature Brique',
  },
  {
    title: 'Hourdis & Accessoires',
    desc: 'Solutions complètes pour votre chantier : hourdis, linteaux, claustras.',
    img: '/images/nb-photos/nb-photo-4.jpg',
    alt: 'Hourdis et accessoires en terre cuite Nature Brique',
  },
]

/* ─── TRAVAUX DATA ─── */
const TRAVAUX = [
  {
    title: 'Villa Résidentielle à Cotonou',
    desc: "Une villa moderne où la brique en terre cuite crée une ambiance fraîche et contemporaine. Confort thermique optimal sans climatisation excessive.",
    img: '/images/nb-photos/nb-photo-7.jpg',
    alt: 'Villa résidentielle construite en briques terre cuite Nature Brique',
  },
  {
    title: 'Bâtiment Public à Zogbodomey',
    desc: "Un édifice public construit entièrement en briques Nature Brique, démontrant la fiabilité de nos produits pour les projets institutionnels.",
    img: '/images/nb-photos/nb-site-fabpmt.jpeg',
    alt: 'Bâtiment public en terre cuite à Zogbodomey - Nature Brique',
  },
  {
    title: 'Complexe Scolaire',
    desc: "Des salles de classe fraîches et saines grâce à la terre cuite, offrant un environnement d'apprentissage optimal pour les élèves.",
    img: '/images/nb-photos/nb-photo-1.jpg',
    alt: 'Complexe scolaire construit en briques terre cuite Nature Brique',
  },
]

/* ─── SERVICES DATA ─── */
const SERVICES = [
  {
    icon: Compass,
    title: 'Études Techniques',
    desc: "Notre équipe d'ingénieurs vous accompagne dans la conception de votre projet avec des solutions optimisées en terre cuite.",
  },
  {
    icon: HardHat,
    title: 'Eco-Build',
    desc: "Notre partenaire Eco-Build vous propose une approche globale de la construction écologique, de l'architecture aux finitions.",
  },
  {
    icon: GraduationCap,
    title: 'Formation',
    desc: "Des sessions de formation pour vos équipes de maçons et entrepreneurs sur les techniques de pose de la brique en terre cuite.",
  },
  {
    icon: CheckCircle,
    title: 'Assistance Chantier',
    desc: "Un suivi technique sur vos chantiers pour garantir la qualité de la mise en oeuvre et le respect des normes.",
  },
]

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

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navItem = (label: string, href: string) => (
    <a
      key={href}
      href={href}
      onClick={() => setMobileOpen(false)}
      className={`text-sm font-medium transition-colors hover:text-terracotta ${
        scrolled
          ? 'text-earth hover:text-terracotta'
          : 'text-white/90 hover:text-white'
      }`}
    >
      {label}
    </a>
  )

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans text-earth">
      {/* ─── 1. HEADER / NAVIGATION ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
          {/* Logo */}
          <a href="#accueil" className="relative shrink-0">
            <Image
              src={scrolled ? '/images/logo.png' : '/images/logo-white.png'}
              alt="Nature Brique - Logo"
              width={140}
              height={60}
              priority
              className="h-10 w-auto md:h-12 lg:w-[140px] lg:h-[60px] object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((l) => navItem(l.label, l.href))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center rounded-full bg-terracotta px-6 py-2.5 text-sm font-medium text-white font-heading transition-all hover:bg-terracotta-dark hover:scale-105"
          >
            Demander un devis
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? (
              <X
                className={`h-6 w-6 ${scrolled ? 'text-earth' : 'text-white'}`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${scrolled ? 'text-earth' : 'text-white'}`}
              />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-cream-dark overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-6 py-4">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm font-medium text-earth hover:text-terracotta transition-colors border-b border-cream-dark/50 last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-white font-heading transition-all hover:bg-terracotta-dark"
                >
                  Demander un devis
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* ─── 2. HERO SECTION ─── */}
        <section
          id="accueil"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/nb-photos/nb-photo-7.jpg"
              alt="Bâtiment moderne construit en briques terre cuite"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="hero-overlay absolute inset-0" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-32 md:py-40">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-mint font-heading text-sm md:text-base tracking-widest uppercase mb-4"
              >
                Construisons notre monde écologique
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
              >
                La terre cuite,{' '}
                <span className="text-terracotta-light">un art de construire</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-white/85 text-base md:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl"
              >
                Depuis 2011, Nature Brique fabrique au Bénin des briques en terre
                cuite qui allient confort thermique, durabilité et esthétique.
                Construisons ensemble un avenir plus sain.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#solutions"
                  className="inline-flex items-center rounded-full bg-terracotta px-8 py-3 text-white font-heading text-sm md:text-base transition-all hover:bg-terracotta-dark hover:scale-105"
                >
                  Découvrir nos solutions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border-2 border-white/60 px-8 py-3 text-white font-heading text-sm md:text-base transition-all hover:bg-white/10 hover:border-white hover:scale-105"
                >
                  Demander un devis
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <a
              href="#avantages"
              className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
              aria-label="Défiler vers le bas"
            >
              <span className="text-xs tracking-widest uppercase">Découvrir</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-5 w-5" />
              </motion.div>
            </a>
          </motion.div>
        </section>

        {/* ─── 3. AVANTAGES ─── */}
        <RevealSection id="avantages" className="bg-cream-dark py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-earth mb-4">
                Pourquoi construire en terre cuite ?
              </h2>
              <p className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto">
                Un matériau qui transforme votre habitat
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {AVANTAGES.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-t-4 border-terracotta"
                  >
                    <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mb-5">
                      <Icon className="h-7 w-7 text-terracotta" />
                    </div>
                    <h3 className="font-heading text-xl text-earth mb-3">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </RevealSection>

        <hr className="earth-divider" />

        {/* ─── 4. NOS SOLUTIONS ─── */}
        <RevealSection id="solutions" className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-earth mb-4">
                Nos Solutions Constructives
              </h2>
              <p className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto">
                Des briques pour chaque besoin de votre chantier
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {SOLUTIONS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-earth mb-2">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <a
                      href="#solutions"
                      className="inline-flex items-center text-terracotta text-sm font-medium hover:text-terracotta-dark transition-colors"
                    >
                      En savoir plus
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-14">
              <a
                href="#solutions"
                className="inline-flex items-center rounded-full bg-terracotta px-8 py-3 text-white font-heading text-sm md:text-base transition-all hover:bg-terracotta-dark hover:scale-105"
              >
                Voir toutes nos solutions
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </RevealSection>

        <hr className="earth-divider" />

        {/* ─── 5. NOS TRAVAUX ─── */}
        <RevealSection id="travaux" className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-earth mb-4">
                Nos Réalisations
              </h2>
              <p className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto">
                Des projets qui prouvent notre savoir-faire
              </p>
            </div>

            <div className="flex flex-col gap-10 md:gap-16">
              {TRAVAUX.map((item, i) => {
                const isEven = i % 2 === 0
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className={`flex flex-col ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-6 md:gap-10 items-stretch`}
                  >
                    {/* Image */}
                    <div className="lg:w-1/2 relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Text */}
                    <div className="lg:w-1/2 flex flex-col justify-center py-2">
                      <h3 className="font-heading text-2xl md:text-3xl text-earth mb-4">
                        {item.title}
                      </h3>
                      <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-6">
                        {item.desc}
                      </p>
                      <a
                        href="#travaux"
                        className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors"
                      >
                        Voir le projet
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </RevealSection>

        <hr className="earth-divider" />

        {/* ─── 6. SERVICES ─── */}
        <RevealSection id="services" className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-earth mb-4">
                Nos Services
              </h2>
              <p className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto">
                Un accompagnement complet de la conception à la réalisation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {SERVICES.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-mint"
                  >
                    <div className="w-14 h-14 rounded-full bg-mint/20 flex items-center justify-center mb-5">
                      <Icon className="h-7 w-7 text-mint-dark" />
                    </div>
                    <h3 className="font-heading text-xl text-earth mb-3">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </RevealSection>

        <hr className="earth-divider" />

        {/* ─── 7. POURQUOI NOUS CHOISIR ─── */}
        <section className="bg-terracotta py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-white text-center mb-12 md:mb-16"
            >
              Nature Brique, c&apos;est plus qu&apos;un fabricant
            </motion.h2>

            {/* Key facts */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
              {[
                { num: '2011', label: 'Année de création' },
                { num: '30+', label: 'Employés engagés' },
                { num: '1ère', label: 'Industrie céramique du Bénin' },
                { num: '100%', label: 'Terre cuite naturelle' },
              ].map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="text-center"
                >
                  <div className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-2">
                    {fact.num}
                  </div>
                  <p className="text-white/80 text-sm md:text-base">
                    {fact.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Founder paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/90 text-center text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Fondée par Franck Kidjo, ingénieur revenu de Belgique après 20
              ans d&apos;expérience, Nature Brique est née de la conviction
              qu&apos;il est possible de construire différemment au Bénin. Notre
              mission : offrir aux populations des matériaux sains, performants
              et respectueux de l&apos;environnement.
            </motion.p>
          </div>
        </section>

        {/* ─── 8. CTA SECTION ─── */}
        <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/nb-photos/nb-site-fabpmt.jpeg"
              alt="Construction en terre cuite au Bénin"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-earth/85" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4"
            >
              Prêt à construire avec la terre cuite ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/80 text-base md:text-lg leading-relaxed mb-8 md:mb-10"
            >
              Contactez-nous pour discuter de votre projet. Notre équipe vous
              accompagne du devis à la réalisation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            >
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-mint px-8 py-3 text-earth font-heading text-sm md:text-base transition-all hover:bg-mint-light hover:scale-105"
              >
                Demander un devis
              </a>
              <a
                href="tel:+22996505057"
                className="inline-flex items-center text-white/90 hover:text-white transition-colors text-sm md:text-base"
              >
                <Phone className="mr-2 h-4 w-4" />
                Appelez-nous : +229 96 50 50 57
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-earth text-white/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {/* Column 1: Brand */}
            <div>
              <Image
                src="/images/logo-white.png"
                alt="Nature Brique - Logo"
                width={140}
                height={60}
                className="h-12 w-auto mb-5 object-contain"
              />
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Première industrie céramique du Bénin. Des briques en terre cuite
                pour une construction durable, confortable et respectueuse de
                l&apos;environnement.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/naturebrique.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta transition-colors"
                  aria-label="Facebook de Nature Brique"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/naturebrique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta transition-colors"
                  aria-label="Instagram de Nature Brique"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@naturebrique.com"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta transition-colors"
                  aria-label="Envoyer un email à Nature Brique"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="font-heading text-white text-lg mb-5">
                Navigation
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-white/70 hover:text-terracotta-light transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div>
              <h4 className="font-heading text-white text-lg mb-5">
                Nos Solutions
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#solutions"
                    className="text-sm text-white/70 hover:text-terracotta-light transition-colors"
                  >
                    Briques porteuses
                  </a>
                </li>
                <li>
                  <a
                    href="#solutions"
                    className="text-sm text-white/70 hover:text-terracotta-light transition-colors"
                  >
                    Briques de parement
                  </a>
                </li>
                <li>
                  <a
                    href="#solutions"
                    className="text-sm text-white/70 hover:text-terracotta-light transition-colors"
                  >
                    Pavés &amp; Dalles
                  </a>
                </li>
                <li>
                  <a
                    href="#solutions"
                    className="text-sm text-white/70 hover:text-terracotta-light transition-colors"
                  >
                    Hourdis &amp; Accessoires
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-heading text-white text-lg mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-terracotta-light shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">
                    Lot 3614, Fidjrosse-Houta, Cotonou, Bénin
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-terracotta-light shrink-0" />
                  <a
                    href="tel:+22996505057"
                    className="text-sm text-white/70 hover:text-terracotta-light transition-colors"
                  >
                    +229 96 50 50 57
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-terracotta-light shrink-0" />
                  <a
                    href="mailto:info@naturebrique.com"
                    className="text-sm text-white/70 hover:text-terracotta-light transition-colors"
                  >
                    info@naturebrique.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-terracotta-light shrink-0" />
                  <span className="text-sm text-white/70">
                    Lun-Ven : 8h - 18h
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
            <p>&copy; 2025 Nature Brique. Tous droits réservés.</p>
            <p>Cotonou, Bénin</p>
          </div>
        </div>
      </footer>
    </div>
  )
}