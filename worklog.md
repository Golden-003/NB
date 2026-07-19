---
Task ID: 1
Agent: Main Agent
Task: Typography replacement + Scroll animation overhaul + Photo changes for Nature Brique homepage

Work Log:
- Read current project state: layout.tsx (DM Serif Display + DM Sans), globals.css, page.tsx (1013 lines, 12 sections)
- Identified 26+ photos in /public/images/nb/
- Replaced DM Serif Display → Playfair Display (weights 400, 700, 900) for headings
- Replaced DM Sans → Outfit for body text
- Updated globals.css font variables, added clip-reveal CSS, parallax-layer, overscroll-behavior, improved img-reveal transitions
- Rewrote entire page.tsx animation system:
  - Added TextReveal (mask-based overflow hidden line reveal with translateY 100%→0)
  - Added ImageReveal (scale 1.08→1 + opacity + y for images)
  - Added SlideIn (directional left/right/up reveals)
  - Added ParallaxSection component (scroll-linked y transform)
  - Improved FadeIn with better easing and longer durations
  - Improved StaggerGroup with scale 0.97→1 in staggerItem
- Hero: line-by-line TextReveal for h1, scroll-linked zoom (scale 1.1→1.2), scroll-linked contentY, changed photo to facade2.jpg
- Avantages: directional SlideIn for header, floating parallax accent shape
- PhotoMosaic: scroll-linked horizontal parallax, ImageReveal for each photo
- Solutions: directional SlideIn headers
- Travaux: scroll-linked parallax bg accent, ImageReveal for all projects
- ProcessSection: scroll-linked connector line with scaleX progress
- Services: directional SlideIn for headers
- StatsFounder: scroll-linked image scale (1.15→1→1.1), changed about photo to fab-production.jpg, directional SlideIn for content
- MissionSection: scroll-linked quote scale (0.92→1→0.98)
- CtaSection: scroll-linked parallax background, changed photo to work-site3.jpg
- Build: 0 errors, all pages generated successfully
- Server: runs on localhost but sandbox kills background processes

Stage Summary:
- Typography: Playfair Display + Outfit (premium pairing for ceramic brand)
- Scroll: 6 new animation components, scroll-linked parallax on 5+ sections, clip-path reveals
- Photos: hero→facade2.jpg, about→fab-production.jpg, CTA→work-site3.jpg
- Build passes with 0 errors
- Preview issue: sandbox kills background processes (infrastructure limitation)