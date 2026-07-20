# Nature Brique — Homepage Premium

Première industrie céramique du Bénin. Site vitrine premium avec Next.js 16.

## Stack

- **Next.js 16** (Turbopack)
- **Tailwind CSS v4**
- **Framer Motion** (animations scroll)
- **Playfair Display** (headings) + **Outfit** (body)

## Sections

1. Navigation (glassmorphism + scroll progress)
2. Hero (parallax + TextReveal ligne par ligne)
3. Trust Bar (marquee)
4. Avantages (bento grid 5 cartes)
5. Photo Mosaic (5 photos, parallax horizontal)
6. Solutions (horizontal scroll snap 4 produits)
7. Réalisations (grid asymétrique 7/5)
8. Processus (4 étapes, trait animé scroll-linked)
9. Services (4 blocs numérotés)
10. À propos (split-screen, compteurs animés)
11. Citation fondatrice (scale scroll-linked)
12. CTA + Footer

## SEO

- 4 schémas JSON-LD (LocalBusiness, Organization, WebSite, Place)
- Meta tags géolocalisation
- Open Graph + Twitter Cards

## Déploiement

### Vercel (recommandé)
```bash
npm install
# Push sur GitHub, puis connecter le repo sur vercel.com
```

### Local
```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm start
```

## Photos

26 photos extraites de naturebrique.com dans `public/images/nb/`.