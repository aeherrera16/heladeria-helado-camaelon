import { ContactForm } from '@/components/contact-form';
import { ShareholderManager } from '@/components/shareholder-manager';
import {
  contactHighlights,
  featureCards,
  managementRoles,
  targetAudience,
  productStats
} from '@/data/site-content';

import { useEffect, useMemo, useState } from 'react';

const heroTiles = [
  {
    title: 'HELADO CAMALEÓN',
    image: '/helado-camaleon-chameleon.svg'
  },
  {
    title: 'CAMBIA DE COLOR',
    image: '/helado-camaleon-color.svg'
  },
  {
    title: 'ACTIVACIÓN CON LIMÓN',
    image: '/helado-camaleon-lemon.svg'
  },
  {
    title: 'EXPERIENCIA VIRAL',
    image: '/helado-camaleon-viral.svg'
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
      'Me encantó que no es solo “un helado”, es un show. Los colores quedan increíbles en fotos.',
    author: 'Daniel Zambrano'
  }
];

export default function App() {
  const [isActivated, setIsActivated] = useState(false);

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

  const metricsFormatted = useMemo(
    () =>
      metrics.map((metric) => ({
        ...metric,
        valueText: String(metric.value)
      })),
    []
  );

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

  return (
    <main className="page-shell camaleon-style">
      <a className="floating-contact" href="#contact" aria-label="Ir a contacto">
        CHAT
      </a>

      <header className="site-header" data-reveal>
        <a className="site-brand" href="#inicio" aria-label="Helado Camaleón">
          <img className="site-brand__image site-brand__image--wide" src="/helado-camaleon-logo.jpeg" alt="Helado Camaleón" />
        </a>

        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#inicio" className="is-active">INICIO</a>
          <a href="#concepto">CONCEPTO</a>
          <a href="#experiencia">EXPERIENCIA</a>
          <a href="#shareholders">ACCIONISTAS</a>
          <a href="#contact">CONTACTO</a>
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

      <section className="section section--domicilios" id="concepto" data-reveal>
        <div className="domicilios-grid">
          <img
            className="domicilios-grid__image"
            src="/helado-camaleon-scene.svg"
            alt="Helado Camaleón cambia de color"
          />

          <div className="domicilios-grid__content">
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
                onClick={() => setIsActivated((current) => !current)}
              >
                {isActivated ? 'Quitar limón' : 'Agregar limón'}
              </button>
              <a className="button button--ghost" href="#contact">
                Cotizar para evento
              </a>
            </div>

            <div className={isActivated ? 'chameleon-demo is-activated' : 'chameleon-demo'} aria-label="Demo de cambio de color">
              <img
                className="chameleon-demo__scoop"
                src={isActivated ? '/helado-camaleon-chameleon-activated.svg' : '/helado-camaleon-chameleon.svg'}
                alt="Helado Camaleón"
              />
              <div className="chameleon-demo__meta">
                {productStats.map((stat) => (
                  <div key={stat.label} className="chameleon-demo__stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gallery" aria-label="Galería" data-reveal>
        <div className="section__heading section__heading--center">
          <span className="eyebrow">Galería</span>
          <h2>Imágenes del concepto</h2>
        </div>

        <div className="gallery-grid">
          <figure className="gallery-card">
            <img src="/helado-camaleon-logo.jpeg" alt="Logo Helado Camaleón" />
            <figcaption>Identidad de marca</figcaption>
          </figure>
          <figure className="gallery-card">
            <img src="/helado-camaleon-scene.svg" alt="Helado Camaleón y limón" />
            <figcaption>Activación con limón</figcaption>
          </figure>
          <figure className="gallery-card">
            <img src="/helado-camaleon-chameleon.svg" alt="Helado Camaleón" />
            <figcaption>Helado Camaleón</figcaption>
          </figure>
          <figure className="gallery-card">
            <img src="/helado-camaleon-chameleon-activated.svg" alt="Helado Camaleón (activado)" />
            <figcaption>Cambio de color</figcaption>
          </figure>
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
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.author} className="testimonial-card">
              <div className="testimonial-card__brand">Helado Camaleón</div>
              <p>“{testimonial.quote}”</p>
              <strong>{testimonial.author}</strong>
              <span>Cliente {index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--accent" id="shareholders" data-reveal>
        <div className="section__heading">
          <span className="eyebrow">Accionistas</span>
          <h2>Sección editable para socios y fundadores</h2>
        </div>
        <ShareholderManager />
      </section>

      <section className="section split-section split-section--contact" id="contact" data-reveal>
        <article className="panel-card panel-card--soft">
          <span className="eyebrow">Contacto</span>
          <h2>Una web tipo marca, atractiva y con movimiento.</h2>
          <p>
            Mantengo el panel editable de accionistas, y la portada está pensada para
            que el producto se sienta vivo: cambio de color, microinteracciones y secciones
            comerciales.
          </p>
          <ul className="contact-highlights">
            {contactHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="panel-subgrid" aria-label="Equipo y público objetivo">
            <div className="panel-subgrid__card">
              <h3>Equipo</h3>
              <ul className="role-list">
                {managementRoles.map((role) => (
                  <li key={role.role}>
                    <strong>{role.role}</strong>
                    <span>{role.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel-subgrid__card">
              <h3>Público</h3>
              <ul className="target-list">
                {targetAudience.map((audience) => (
                  <li key={audience.title}>
                    <strong>{audience.title}</strong>
                    <span>{audience.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <ContactForm />
      </section>

      <footer className="footer footer--camaleon" data-reveal>
        <div className="footer__brand">
          <img src="/helado-camaleon-logo.jpeg" alt="Helado Camaleón" />
          <p>Cada mordida es una nueva sorpresa. Helado Camaleón: una experiencia que cambia de color.</p>
        </div>

        <div className="footer__links">
          <a href="#inicio">INICIO</a>
          <a href="#concepto">CONCEPTO</a>
          <a href="#experiencia">EXPERIENCIA</a>
          <a href="#shareholders">ACCIONISTAS</a>
          <a href="#contact">CONTACTO</a>
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