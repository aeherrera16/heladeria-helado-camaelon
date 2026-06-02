import { ContactForm } from '@/components/contact-form';
import { ChameleonChat } from '@/components/chameleon-chat';
import {
  featureCards,
  productStats
} from '@/data/site-content';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

const heroTiles = [
  {
    title: 'HELADO CAMALEÓN',
    image: '/step1-helado-base.png'
  },
  {
    title: 'CAMBIA DE COLOR',
    image: '/step3-cambio-color.png'
  },
  {
    title: 'ACTIVACIÓN CON LIMÓN',
    image: '/step2-agregar-limon.png'
  },
  {
    title: 'EXPERIENCIA VIRAL',
    image: '/step4-comparte.png'
  }
];

const principles = [
  {
    title: 'SORPRESA',
    description: 'Un helado que se transforma a la vista: cada mordida se vuelve un momento memorable.',
    accent: 'var(--red)'
  },
  {
    title: 'NATURAL',
    description: 'El concepto se apoya en ingredientes y pigmentos de origen natural para una historia auténtica.',
    accent: 'var(--turquoise)'
  },
  {
    title: 'VIRAL',
    description: 'Perfecto para videos, ferias y puntos de venta: el cambio de color vende solo.',
    accent: 'var(--red)'
  },
  {
    title: 'CALIDAD',
    description: 'Diseño de marca + operación clara: una propuesta que se ve seria y lista para crecer.',
    accent: 'var(--turquoise)'
  }
];

const metrics = [
  { value: 3, label: 'PASOS' },
  { value: 1, label: 'MOMENTO VIRAL' },
  { value: 2, label: 'TONOS BASE' },
  { value: 4, label: 'FORMATOS' }
];

const testimonials = [
  {
    quote:
      'El cambio de color es impresionante. Es de esas cosas que quieres grabar y compartir.',
    author: 'Karla Suntaxi'
  },
  {
    quote:
      'La experiencia es distinta: llega el limón y de pronto todo se transforma. Súper recomendado.',
    author: 'Marco Alvarez'
  },
  {
    quote:
      'Me encantó que no es solo "un helado", es un show. Los colores quedan increíbles en fotos.',
    author: 'Daniel Zambrano'
  }
];

const gallerySteps = [
  {
    image: '/step1-helado-base.png',
    step: '01',
    caption: 'Helado base'
  },
  {
    image: '/step2-agregar-limon.png',
    step: '02',
    caption: 'Agrega limón'
  },
  {
    image: '/step3-cambio-color.png',
    step: '03',
    caption: '¡Cambia de color!'
  },
  {
    image: '/step4-comparte.png',
    step: '04',
    caption: '¡Comparte!'
  }
];

const chameleonFlavors = [
  {
    id: 'mora',
    name: 'Mora Camaleón',
    description: 'Sabor estrella. Deliciosa base morada de moras silvestres que se transforma en un vibrante rosa fucsia con el limón.',
    baseColor: '#6a1b9a',
    activatedColor: '#e91e63',
    icon: '🍇',
    featured: true,
    image: '/mora-camaleon.png'
  },
  {
    id: 'limon',
    name: 'Limón Celestial',
    description: 'Refrescante y mágico. Un helado azul turquesa que cambia a un profundo violeta eléctrico al contacto con el ácido.',
    baseColor: '#00bcd4',
    activatedColor: '#673ab7',
    icon: '🍋',
    featured: false
  },
  {
    id: 'fresa',
    name: 'Fresa Silvestre',
    description: 'El clásico reinventado. De un místico violeta suave pasa a un rojo carmín brillante e intenso. ¡Super fotografiable!',
    baseColor: '#9c27b0',
    activatedColor: '#d32f2f',
    icon: '🍓',
    featured: false
  },
  {
    id: 'maracuya',
    name: 'Maracuyá Mágico',
    description: 'Pura fruta de la pasión. Una combinación mística de azul cobalto que se enciende en un naranja dorado súper tropical.',
    baseColor: '#3f51b5',
    activatedColor: '#ff9800',
    icon: '🥭',
    featured: false
  },
  {
    id: 'mango',
    name: 'Mango Tropical',
    description: 'Dulce y audaz. Un helado naranja atardecer que se transforma en un rojo coral profundo con la acidez cítrica.',
    baseColor: '#ff5722',
    activatedColor: '#c2185b',
    icon: '🥭',
    featured: false
  },
  {
    id: 'menta',
    name: 'Menta Mágica',
    description: 'Frescura extrema. Una base verde menta suave y natural que se transforma en un azul cerceta súper vibrante.',
    baseColor: '#4caf50',
    activatedColor: '#00838f',
    icon: '🌿',
    featured: false
  },
  {
    id: 'coco',
    name: 'Coco Glaciar',
    description: 'Cremosidad tropical. De un suave azul pastel cielo pasa a revelar destellos violeta amatista mágicos al instante.',
    baseColor: '#90caf9',
    activatedColor: '#b39ddb',
    icon: '🥥',
    featured: false
  },
  {
    id: 'arandano',
    name: 'Arándano Místico',
    description: 'Un viaje de sabor e intensidad. Índigo profundo hecho con arándanos reales que cambia a un magenta neón asombroso.',
    baseColor: '#1a237e',
    activatedColor: '#ff007f',
    icon: '🫐',
    featured: false
  },
  {
    id: 'cereza',
    name: 'Cereza Camaleón',
    description: 'Sabor a cerezas silvestres. Comienza con un tono lavanda azulado y se transforma en un rosa chicle súper brillante al contacto cítrico.',
    baseColor: '#7986cb',
    activatedColor: '#ff4081',
    icon: '🍒',
    featured: false
  },
  {
    id: 'pistacho',
    name: 'Pistacho Mágico',
    description: 'Exótico y cremoso. Un helado verde pistacho suave y natural que revela destellos dorados y de bronce cálido bajo la acidez.',
    baseColor: '#81c784',
    activatedColor: '#d4e157',
    icon: '🍏',
    featured: false
  }
];

const sectionIds = ['inicio', 'concepto', 'sabores', 'experiencia', 'contact'];

export default function App() {
  const [showLemonDrop, setShowLemonDrop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const lemonTimeoutRef = useRef<number | null>(null);

  // Intersection Observer for reveal animations
  useEffect(() => {
    document.documentElement.classList.add('reveal-enabled');
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (revealTargets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    for (const target of revealTargets) observer.observe(target);
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-enabled');
    };
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.2, rootMargin: '-100px 0px -40% 0px' }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const metricsFormatted = useMemo(
    () =>
      metrics.map((metric) => ({
        ...metric,
        valueText: String(metric.value)
      })),
    []
  );

  // Counter animation
  useEffect(() => {
    const metricNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));
    if (metricNodes.length === 0) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduceMotion) {
      for (const node of metricNodes) {
        node.textContent = node.dataset.countTo ?? node.textContent;
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const to = Number(el.dataset.countTo);
          if (!Number.isFinite(to)) continue;

          const durationMs = 850;
          const start = performance.now();
          const from = 0;

          function tick(now: number) {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(from + (to - from) * eased);
            el.textContent = String(current);
            if (t < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );

    for (const node of metricNodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleLemonClick = useCallback(() => {
    if (isAnimating) return; // prevent spam clicks
    // Start lemon drop animation
    setShowLemonDrop(true);
    setIsAnimating(true);
    if (lemonTimeoutRef.current) clearTimeout(lemonTimeoutRef.current);
    lemonTimeoutRef.current = window.setTimeout(() => {
      setShowLemonDrop(false);
      // Keep color pulse for a bit then reset
      lemonTimeoutRef.current = window.setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 900);
  }, [isAnimating]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (lemonTimeoutRef.current) clearTimeout(lemonTimeoutRef.current);
    };
  }, []);

  return (
    <main className="page-shell camaleon-style">
      <ChameleonChat />

      <header className="site-header" data-reveal>
        <a className="site-brand" href="#inicio" aria-label="Helado Camaleón">
          <img className="site-brand__image site-brand__image--wide" src="/helado-camaleon-logo.jpeg" alt="Helado Camaleón" />
        </a>

        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#inicio" className={activeSection === 'inicio' ? 'is-active' : ''}>INICIO</a>
          <a href="#concepto" className={activeSection === 'concepto' ? 'is-active' : ''}>CONCEPTO</a>
          <a href="#sabores" className={activeSection === 'sabores' ? 'is-active' : ''}>SABORES</a>
          <a href="#experiencia" className={activeSection === 'experiencia' ? 'is-active' : ''}>EXPERIENCIA</a>
          <a href="#contact" className={activeSection === 'contact' ? 'is-active' : ''}>CONTACTO</a>
        </nav>

        <a className="button button--cta site-header__button site-header__button--teal" href="#contact">
          CONTÁCTANOS
        </a>
      </header>

      <section className="hero-banner hero-banner--mosaic" id="inicio" aria-label="Helado Camaleón" data-reveal>
        {heroTiles.map((tile) => (
          <article key={tile.title} className="hero-tile hero-tile--chameleon">
            <img
              className="hero-tile__image hero-tile__image--chameleon"
              src={tile.image}
              alt={tile.title}
            />
            <span>{tile.title}</span>
          </article>
        ))}
      </section>

      <section className="marquee" aria-label="Franja informativa" data-reveal>
        <div className="marquee__track">
          <span>CAMBIA DE COLOR</span>
          <span>•</span>
          <span>CON LIMÓN</span>
          <span>•</span>
          <span>CADA MORDIDA ES UNA NUEVA SORPRESA</span>
          <span>•</span>
          <span>EXPERIENCIA VIRAL</span>
          <span>•</span>
          <span>CAMBIA DE COLOR</span>
          <span>•</span>
          <span>CON LIMÓN</span>
          <span>•</span>
          <span>CADA MORDIDA ES UNA NUEVA SORPRESA</span>
          <span>•</span>
          <span>EXPERIENCIA VIRAL</span>
        </div>
      </section>

      <section className="section section--concepto" id="concepto" data-reveal>
        <div className="concepto-layout">
          <div className={`concepto-layout__visual ${isAnimating ? 'is-animating' : ''} ${showLemonDrop ? 'is-dropping' : ''}`}>
            {showLemonDrop && (
              <div className="lemon-drop-container">
                <div className="lemon-drop">🍋</div>
                <div className="lemon-drop lemon-drop--2">💧</div>
                <div className="lemon-drop lemon-drop--3">💧</div>
              </div>
            )}
            <img
              className="concepto-layout__image"
              src="/step1-helado-base.png"
              alt="Helado Camaleón cambia de color"
            />
            {/* Overlay clipped to scoop only — this gets the color animation */}
            <img
              className="concepto-layout__scoop-overlay"
              src="/step1-helado-base.png"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="concepto-layout__content">
            <span className="eyebrow">Concepto</span>
            <h2>Helado Camaleón: el helado que cambia de color.</h2>
            <p>
              La magia sucede cuando activas el helado con limón: el tono se transforma y la
              experiencia se vuelve un show perfecto para fotos, videos y eventos.
            </p>

            <div className="concept-actions">
              <button
                className="button button--primary"
                type="button"
                onClick={handleLemonClick}
              >
                🍋 Agregar limón
              </button>
              <a className="button button--ghost" href="#contact">
                Cotizar para evento
              </a>
            </div>

            <div className="concepto-stats">
              {productStats.map((stat) => (
                <div key={stat.label} className="concepto-stats__item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sabores" id="sabores" data-reveal>
        <div className="section__heading section__heading--center">
          <span className="eyebrow">NUESTROS SABORES</span>
          <h2>La Magia de la Naturaleza en 8 Sabores 🌈</h2>
          <p>
            Cada uno de nuestros helados está elaborado con ingredientes 100% naturales que reaccionan de manera única con las gotitas de limón. ¡Elige tu sabor y vive la transformación!
          </p>
        </div>

        {/* Sabor Estrella (Mora Camaleón) */}
        <div className="sabor-estrella">
          <div className="sabor-estrella__image-container">
            <img src="/mora-camaleon.png" alt="Mora Camaleón - Helado que cambia de color" className="sabor-estrella__image" />
            <div className="sabor-estrella__tag">⭐️ SABOR ESTRELLA</div>
          </div>
          <div className="sabor-estrella__content">
            <span className="eyebrow">Sabor más vendido</span>
            <h3>Mora Camaleón</h3>
            <p className="sabor-estrella__desc">
              Nuestro sabor más popular y viral. Elaborado con un concentrado puro de moras silvestres ricas en antocianinas. Al servirlo, tiene un color morado profundo y misterioso, pero al exprimirle unas gotas de limón fresco, se enciende instantáneamente en un color rosa fucsia súper brillante ante tus ojos. ¡Una experiencia visual y de sabor inigualable!
            </p>
            
            <div className="sabor-estrella__pH">
              <div className="sabor-estrella__pH-circle" style={{ backgroundColor: '#6a1b9a' }}>
                <span>Morado</span>
                <small>Color Base</small>
              </div>
              <div className="sabor-estrella__pH-connector">
                <span>🍋 + 💧</span>
                <div className="arrow-line"></div>
              </div>
              <div className="sabor-estrella__pH-circle active-glow" style={{ backgroundColor: '#e91e63' }}>
                <span>Rosa Fucsia</span>
                <small>¡Activado!</small>
              </div>
            </div>

            <div className="sabor-estrella__actions">
              <a href="#contact" className="button button--cta">Quiero probar este sabor</a>
            </div>
          </div>
        </div>

        {/* Grilla de Sabores */}
        <div className="sabores-grid">
          {chameleonFlavors.filter(f => !f.featured).map((flavor) => {
            return (
              <div key={flavor.id} className="sabor-card">
                <div className="sabor-card__header">
                  <span className="sabor-card__icon">{flavor.icon}</span>
                  <h4>{flavor.name}</h4>
                </div>
                <p>{flavor.description}</p>
                <div className="sabor-card__footer">
                  <div className="sabor-card__color-flow">
                    <span className="color-dot" style={{ backgroundColor: flavor.baseColor }} title="Color Base"></span>
                    <span className="color-flow-indicator">🍋 ➡️</span>
                    <span className="color-dot active-dot" style={{ backgroundColor: flavor.activatedColor }} title="Color Activado"></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section section--gallery" aria-label="Proceso paso a paso" data-reveal>
        <div className="section__heading section__heading--center">
          <span className="eyebrow">Proceso</span>
          <h2>Así funciona la magia 🪄</h2>
        </div>

        <div className="gallery-grid">
          {gallerySteps.map((item) => (
            <figure key={item.step} className="gallery-card">
              <div className="gallery-card__step-badge">{item.step}</div>
              <img src={item.image} alt={item.caption} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section section--principios" id="experiencia" data-reveal>
        <div className="section__heading section__heading--center">
          <span className="eyebrow">Experiencia</span>
          <h2>Un producto que se ve increíble y se recuerda fácil.</h2>
        </div>

        <div className="principles-grid">
          {principles.map((principle) => (
            <article key={principle.title} className="principle-card">
              <div className="principle-card__icon" style={{ color: principle.accent }}>
                ●
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--features" data-reveal>
        <div className="section__heading">
          <span className="eyebrow">Propuesta</span>
          <h2>Diseñado para venderse en físico y en digital</h2>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="feature-card">
              <div className="feature-card__visual" aria-hidden="true">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--metrics" aria-label="Métricas del concepto" data-reveal>
        <div className="metrics-grid">
          {metricsFormatted.map((metric) => (
            <article key={metric.label} className="metric-card">
              <strong data-count-to={metric.valueText}>{0}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--testimonials" data-reveal>
        <div className="section__heading section__heading--center">
          <span className="eyebrow">TESTIMONIOS</span>
          <h2>Lo que dicen los clientes</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.author} className="testimonial-card">
              <div className="testimonial-card__brand">Helado Camaleón</div>
              <p>"{testimonial.quote}"</p>
              <strong>{testimonial.author}</strong>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Accionistas — simple banner linking to contact */}
      <section className="section section--cta-accionista" id="accionista" data-reveal>
        <div className="cta-accionista">
          <div className="cta-accionista__icon">🦎</div>
          <h2>¿Quieres ser parte de Helado Camaleón?</h2>
          <p>Conoce cómo ser accionista de esta experiencia única que cambia de color.</p>
          <a className="button button--cta" href="#contact">
            Contáctanos para más info
          </a>
        </div>
      </section>

      {/* Contact Section — clean and simple */}
      <section className="section section--contact" id="contact" data-reveal>
        <div className="contact-wrapper">
          <div className="contact-wrapper__info">
            <span className="eyebrow">Contacto</span>
            <h2>¿Listo para vivir la experiencia?</h2>
            <p>
              Escríbenos para cotizar eventos, conocer más sobre el producto o para
              ser parte del equipo Helado Camaleón.
            </p>
            <div className="contact-wrapper__highlights">
              <div className="contact-highlight-item">
                <span className="contact-highlight-item__icon">🎪</span>
                <span>Ferias y eventos</span>
              </div>
              <div className="contact-highlight-item">
                <span className="contact-highlight-item__icon">💼</span>
                <span>Oportunidades de inversión</span>
              </div>
              <div className="contact-highlight-item">
                <span className="contact-highlight-item__icon">📦</span>
                <span>Pedidos y cotizaciones</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="footer footer--camaleon" data-reveal>
        <div className="footer__brand">
          <img src="/helado-camaleon-logo.jpeg" alt="Helado Camaleón" />
          <p>Cada mordida es una nueva sorpresa. Helado Camaleón: una experiencia que cambia de color.</p>
          <div className="footer__social-container">
            <strong>SÍGUENOS</strong>
            <div className="footer__social-links">
              <a href="https://www.facebook.com/share/18mYcyBro5/" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/kromahelado?igsh=MW02bzVoeDdjeWdtMw==" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.tiktok.com/@kroma028?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-icon-btn tiktok" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
              <a href="mailto:kromahelados@gmail.com" className="social-icon-btn email" aria-label="Correo electrónico">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 7l10 7 10-7"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__subscribe">
          <strong>SUSCRÍBETE</strong>
          <form>
            <input type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" />
            <button type="button">Enviar</button>
          </form>
        </div>
      </footer>
    </main>
  );
}