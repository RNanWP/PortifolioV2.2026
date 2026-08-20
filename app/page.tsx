"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Contato", href: "#contato" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    const email = "renan92011contato@outlook.com";

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const temporary = document.createElement("textarea");
        temporary.value = email;
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        document.execCommand("copy");
        temporary.remove();
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir para o início">
          R<span>N</span>.
        </a>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              <small>0{index + 1}</small>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-status" href="mailto:renan92011contato@outlook.com">
          <span /> disponível para oportunidades
        </a>

        <button
          className="menu-button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-copy">
          <div className="eyebrow hero-enter hero-enter-1">
            <span>Full Stack Developer</span>
            <span>Embu das Artes · SP</span>
          </div>

          <h1 className="hero-title hero-enter hero-enter-2">
            <span>Renan</span>
            <span className="title-outline">Oliveira</span>
          </h1>

          <div className="hero-bottom hero-enter hero-enter-3">
            <p>
              Eu construo software com <strong>cabeça de operação</strong>,
              precisão técnica e olhar para quem está do outro lado da tela.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                Explorar projetos <span>↘</span>
              </a>
              <a className="text-link" href="/docs/curriculo-renan-oliveira.pdf" download>
                Baixar currículo <span>↓</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-portrait hero-enter hero-enter-2">
          <div className="portrait-frame">
            <img src="/images/renan-portrait-bw.webp" alt="Retrato profissional de Renan Oliveira" />
            <div className="portrait-noise" />
            <div className="portrait-label">01 — Quem sou</div>
          </div>
          <div className="portrait-caption">
            <span>Desenvolvimento web</span>
            <span>React · TypeScript · Node.js</span>
          </div>
        </div>

      </section>

      <section className="statement section-shell" id="sobre">
        <div className="section-index reveal">02 / SOBRE</div>
        <div className="statement-content">
          <p className="statement-kicker reveal">Antes do código, veio a execução.</p>
          <h2 className="reveal">
            Aprendi no chão da operação que um bom sistema precisa ser mais do que bonito:
            ele precisa <em>funcionar de verdade.</em>
          </h2>
          <div className="statement-columns reveal">
            <p>
              Sou Renan, desenvolvedor Full Stack formado em Análise e Desenvolvimento de
              Sistemas e pós-graduado pela FIAP. Minha entrada na tecnologia não apaga a
              trajetória anterior — ela dá contexto a tudo o que construo hoje.
            </p>
            <p>
              Anos trabalhando com processos, prazos e equipes me ensinaram a observar o
              problema inteiro. No código, transformo essa experiência em interfaces claras,
              APIs organizadas e soluções que não perdem de vista o usuário.
            </p>
          </div>
        </div>
      </section>

      <section className="numbers-strip" aria-label="Resumo profissional">
        <div className="number-item reveal">
          <strong>6</strong>
          <span>projetos práticos apresentados abaixo</span>
        </div>
        <div className="number-item reveal">
          <strong>2</strong>
          <span>formações: ADS + Pós-Tech FIAP</span>
        </div>
        <div className="number-item reveal">
          <strong>3</strong>
          <span>certificações profissionais</span>
        </div>
        <div className="number-item reveal">
          <strong>∞</strong>
          <span>curiosidade para aprender</span>
        </div>
      </section>

      <section className="projects-preview section-shell" id="projetos">
        <div className="section-heading reveal">
          <div className="section-index">03 / PROJETOS</div>
          <h2>Projetos reais, disponíveis para explorar.</h2>
          <p>Conheça as aplicações funcionando e, se quiser ir além, veja também como cada uma foi construída.</p>
        </div>

        <div className="project-grid">
          <article className="project-card project-card-featured reveal">
            <div className="project-topline">
              <span>IA / EDUCAÇÃO INCLUSIVA</span>
              <span className="project-live"><i /> Projeto online</span>
            </div>
            <div className="project-visual visual-inklue" aria-hidden="true">
              <div className="inklue-orbit"><i /><i /><i /></div>
              <div className="inklue-panel">
                <div className="inklue-panel-head">
                  <strong>INKLUE</strong>
                  <span>PLANO INCLUSIVO</span>
                </div>
                <div className="inklue-metrics"><i /><i /><i /></div>
                <div className="inklue-lines"><i /><i /><i /></div>
                <small>IA + EDUCAÇÃO</small>
              </div>
            </div>
            <div className="project-copy">
              <div>
                <h3>Inklue</h3>
                <p>
                  Plataforma criada no Hackathon FIAP 2026 para gerar planos de aula
                  inclusivos, atividades adaptadas, PDFs e QR Codes com inteligência artificial.
                </p>
              </div>
              <ul className="tech-list" aria-label="Tecnologias usadas">
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Node.js</li>
                <li>AWS</li>
              </ul>
            </div>
            <div className="project-links">
              <a className="project-link project-link-primary" href="https://inklue-hackaton26.vercel.app/dashboard" target="_blank" rel="noreferrer">
                Ver projeto <span>↗</span>
              </a>
              <a className="project-link" href="https://github.com/RNanWP/Inklue-Hackaton26" target="_blank" rel="noreferrer">
                Ver código <span>↗</span>
              </a>
            </div>
          </article>

          <article className="project-card project-card-featured reveal">
            <div className="project-topline">
              <span>MOBILE + WEB / EDUCAÇÃO</span>
              <span className="project-live"><i /> Projeto online</span>
            </div>
            <div className="project-visual visual-learnify" aria-hidden="true">
              <div className="learnify-browser">
                <div className="learnify-browser-top"><i /><i /><i /></div>
                <div className="learnify-feed"><i /><i /><i /></div>
              </div>
              <div className="learnify-phone">
                <span />
                <strong>L</strong>
                <i /><i /><i />
              </div>
              <span className="learnify-label">Mobile + Web</span>
            </div>
            <div className="project-copy">
              <div>
                <h3>Learnify</h3>
                <p>
                  Rede social educacional mobile e web que conecta alunos e professores
                  por meio de publicações, comentários e compartilhamento de conhecimento.
                </p>
              </div>
              <ul className="tech-list" aria-label="Tecnologias usadas">
                <li>React Native</li>
                <li>Expo</li>
                <li>Node.js</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="project-links">
              <a className="project-link project-link-primary" href="https://tcc-4-learnify-rn-mobile-full-stack.vercel.app/" target="_blank" rel="noreferrer">
                Ver projeto <span>↗</span>
              </a>
              <a className="project-link" href="https://github.com/RNanWP/TCC4-Learnify-RnMobile-FullStack" target="_blank" rel="noreferrer">
                Ver código <span>↗</span>
              </a>
            </div>
          </article>

          <article
            className="project-card project-card-featured reveal"
          >
            <div className="project-topline">
              <span>API / EDUCAÇÃO</span>
              <span className="project-live"><i /> Projeto online</span>
            </div>
            <div className="project-visual visual-lingroom" aria-hidden="true">
              <span className="visual-code">POST /auth/login</span>
              <div className="visual-window">
                <span />
                <span />
                <span />
              </div>
              <strong>Lingroom</strong>
            </div>
            <div className="project-copy">
              <div>
                <h3>LingroomTC</h3>
                <p>
                  API completa para uma plataforma educacional, com autenticação JWT,
                  diferentes níveis de acesso e documentação interativa.
                </p>
              </div>
              <ul className="tech-list" aria-label="Tecnologias usadas">
                <li>Node.js</li>
                <li>TypeScript</li>
                <li>MongoDB</li>
                <li>Docker</li>
              </ul>
            </div>
            <div className="project-links">
              <a className="project-link project-link-primary" href="https://lingroom-tc.vercel.app/" target="_blank" rel="noreferrer">
                Ver projeto <span>↗</span>
              </a>
              <a className="project-link" href="https://github.com/RNanWP/LingroomTC" target="_blank" rel="noreferrer">
                Ver código <span>↗</span>
              </a>
            </div>
          </article>

          <article
            className="project-card reveal"
          >
            <div className="project-topline">
              <span>FULL STACK / MÚSICA</span>
              <span className="project-live"><i /> Projeto online</span>
            </div>
            <div className="project-visual visual-music" aria-hidden="true">
              <div className="record" />
              <div className="equalizer"><i /><i /><i /><i /><i /></div>
            </div>
            <div className="project-copy">
              <div>
                <h3>Music Streaming</h3>
                <p>Experiência fluida entre artistas e faixas, conectada a uma API REST.</p>
              </div>
              <ul className="tech-list">
                <li>React</li>
                <li>Express</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="project-links">
              <a className="project-link project-link-primary" href="https://fullstack-spotify.netlify.app/" target="_blank" rel="noreferrer">
                Ver projeto <span>↗</span>
              </a>
              <a className="project-link" href="https://github.com/RNanWP/Full-Stack-SPOTIFY" target="_blank" rel="noreferrer">
                Ver código <span>↗</span>
              </a>
            </div>
          </article>

          <article
            className="project-card reveal"
          >
            <div className="project-topline">
              <span>IA / EXPERIÊNCIA CRIATIVA</span>
              <span className="project-live"><i /> Projeto online</span>
            </div>
            <div className="project-visual visual-story" aria-hidden="true">
              <span className="story-star">✦</span>
              <p>Era uma vez uma ideia esperando para ganhar uma história.</p>
              <div className="story-lines"><i /><i /><i /></div>
            </div>
            <div className="project-copy">
              <div>
                <h3>StoryTales RN</h3>
                <p>Histórias infantis personalizadas com IA, pensadas para uma experiência criativa e envolvente.</p>
              </div>
              <ul className="tech-list">
                <li>IA</li>
                <li>Web App</li>
                <li>UX</li>
              </ul>
            </div>
            <div className="project-links">
              <a className="project-link project-link-primary" href="https://storytalesrn.netlify.app/" target="_blank" rel="noreferrer">
                Ver projeto <span>↗</span>
              </a>
              <a className="project-link" href="https://github.com/RNanWP/FullStack-IA.Story-Uni9" target="_blank" rel="noreferrer">
                Ver código <span>↗</span>
              </a>
            </div>
          </article>

          <article
            className="project-card reveal"
          >
            <div className="project-topline">
              <span>E-COMMERCE / VAREJO</span>
              <span className="project-live"><i /> Projeto online</span>
            </div>
            <div className="project-visual visual-drink" aria-hidden="true">
              <span className="drink-logo">my<strong>DRINK</strong></span>
              <div className="drink-bottles">
                <i /><i /><i /><i />
              </div>
              <span className="drink-tag">Escolha sua ocasião</span>
            </div>
            <div className="project-copy">
              <div>
                <h3>MyDrink</h3>
                <p>Interface responsiva de e-commerce para bebidas, com categorias, ofertas e produtos em destaque.</p>
              </div>
              <ul className="tech-list">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Swiper</li>
              </ul>
            </div>
            <div className="project-links">
              <a className="project-link project-link-primary" href="https://mydrinkretail.netlify.app/" target="_blank" rel="noreferrer">
                Ver projeto <span>↗</span>
              </a>
              <a className="project-link" href="https://github.com/RNanWP/MyDrink" target="_blank" rel="noreferrer">
                Ver código <span>↗</span>
              </a>
            </div>
          </article>
        </div>

        <a className="projects-more reveal" href="https://github.com/RNanWP" target="_blank" rel="noreferrer">
          github.com/RNanWP <span>↗</span>
        </a>
      </section>

      <section className="toolkit" aria-label="Competências técnicas">
        <div className="toolkit-marquee" aria-hidden="true">
          <div>
            <span>React</span><i>✦</i><span>TypeScript</span><i>✦</i><span>Node.js</span><i>✦</i>
            <span>Next.js</span><i>✦</i><span>MongoDB</span><i>✦</i><span>Docker</span><i>✦</i>
            <span>React</span><i>✦</i><span>TypeScript</span><i>✦</i><span>Node.js</span><i>✦</i>
            <span>Next.js</span><i>✦</i><span>MongoDB</span><i>✦</i><span>Docker</span><i>✦</i>
          </div>
        </div>
        <div className="toolkit-body section-shell">
          <div className="section-index reveal">04 / FERRAMENTAS</div>
          <div className="toolkit-heading reveal">
            <h2>Ferramentas que uso para transformar ideias em aplicações.</h2>
            <p>
              Estas são as tecnologias que já utilizei em projetos práticos, da construção
              das interfaces até APIs, bancos de dados e publicação.
            </p>
          </div>
          <div className="toolkit-grid reveal">
            <article>
              <span>01</span>
              <h3>Interfaces</h3>
              <p>React, Next.js, HTML5, CSS3 e Tailwind CSS</p>
            </article>
            <article>
              <span>02</span>
              <h3>Aplicações & APIs</h3>
              <p>Node.js, Express, REST, JWT, RBAC e Swagger</p>
            </article>
            <article>
              <span>03</span>
              <h3>Dados</h3>
              <p>MongoDB, Mongoose e MySQL</p>
            </article>
            <article>
              <span>04</span>
              <h3>Entrega</h3>
              <p>Git, GitHub Actions, Docker, CI/CD e Scrum</p>
            </article>
          </div>
        </div>
      </section>

      <section className="journey section-shell" id="trajetoria">
        <div className="journey-intro reveal">
          <div className="section-index">05 / TRAJETÓRIA</div>
          <h2>Uma carreira construída em camadas.</h2>
          <p>
            Não cheguei à tecnologia por um atalho. Vim acumulando repertório, disciplina e
            vontade de entender como as coisas funcionam.
          </p>
          <div className="journey-photo">
            <img src="/images/renan-portrait.webp" alt="Renan Oliveira em retrato profissional colorido" />
            <span>presente / próximo capítulo</span>
          </div>
        </div>

        <div className="timeline">
          <article className="timeline-item reveal">
            <div className="timeline-year">2025—26</div>
            <div>
              <span className="timeline-type">Formação</span>
              <h3>Pós-Tech em Full Stack Development</h3>
              <strong>FIAP</strong>
              <p>
                Aprofundamento em desenvolvimento moderno, arquitetura, APIs e construção de
                aplicações completas — do front-end à entrega.
              </p>
            </div>
          </article>

          <article className="timeline-item reveal">
            <div className="timeline-year">2022—24</div>
            <div>
              <span className="timeline-type">Formação</span>
              <h3>Análise e Desenvolvimento de Sistemas</h3>
              <strong>UNINOVE</strong>
              <p>
                Onde a curiosidade por sistemas virou base técnica: lógica, programação,
                bancos de dados e desenvolvimento de software.
              </p>
            </div>
          </article>

          <article className="timeline-item reveal">
            <div className="timeline-year">2022—25</div>
            <div>
              <span className="timeline-type">Experiência</span>
              <h3>Auxiliar de Logística</h3>
              <strong>RD Saúde</strong>
              <p>
                Rotinas de operação em escala, organização, gestão de tempo e colaboração.
                Uma escola prática sobre processos e responsabilidade.
              </p>
            </div>
          </article>

          <article className="timeline-item reveal">
            <div className="timeline-year">2021</div>
            <div>
              <span className="timeline-type">Experiência</span>
              <h3>Primeiros passos profissionais</h3>
              <strong>CINPAL · PETZ</strong>
              <p>
                Experiências que fortaleceram ritmo de trabalho, adaptabilidade e convivência
                com equipes diferentes.
              </p>
            </div>
          </article>

          <div className="certifications reveal">
            <span>Certificações</span>
            <ul>
              <li>Scrum Foundation Professional Certificate — CertiProf</li>
              <li>Git e GitHub — Alura</li>
              <li>Python Essentials 1 — Cisco Networking Academy</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="beyond section-shell">
        <div className="beyond-heading reveal">
          <div className="section-index">06 / ALÉM DO CÓDIGO</div>
          <h2>Existe vida além do terminal.</h2>
          <p>
            Academia, games, viagens, hardware e criação de conteúdo também fazem parte de
            quem eu sou. É desse repertório real que vêm muitas das minhas melhores ideias.
          </p>
        </div>

        <div className="photo-rail">
          <figure className="photo-card photo-card-tall reveal">
            <img src="/images/renan-mountain.webp" alt="Renan em uma trilha com montanhas ao fundo" />
            <figcaption><span>01</span> Sair da zona de conforto</figcaption>
          </figure>
          <figure className="photo-card reveal">
            <img src="/images/renan-snow.webp" alt="Renan praticando snowboard em uma montanha nevada" />
            <figcaption><span>02</span> Colecionar primeiras vezes</figcaption>
          </figure>
          <figure className="photo-card photo-card-tall reveal">
            <img src="/images/renan-trail.webp" alt="Renan observando uma paisagem de montanha" />
            <figcaption><span>03</span> Mudar a perspectiva</figcaption>
          </figure>
          <figure className="photo-card reveal">
            <img src="/images/renan-origin.webp" alt="Registro pessoal de Renan em uma festa junina" />
            <figcaption><span>04</span> Levar a curiosidade comigo</figcaption>
          </figure>
        </div>
      </section>

      <section className="contact section-shell" id="contato">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="section-index reveal">07 / CONTATO</div>
        <div className="contact-main reveal">
          <p>Tem um desafio, uma vaga ou uma boa ideia?</p>
          <h2>Vamos construir<br /><em>algo que funcione.</em></h2>
        </div>
        <div className="contact-footer">
          <div className="contact-actions">
            <a className="button button-dark" href="mailto:renan92011contato@outlook.com">
              Iniciar conversa <span>↗</span>
            </a>
            <button className="copy-button" type="button" onClick={copyEmail} aria-live="polite">
              {copied ? "E-mail copiado ✓" : "Copiar e-mail"}
            </button>
          </div>
          <div className="footer-base">
            <span>Base</span>
            <p>Embu das Artes · São Paulo · Brasil</p>
          </div>
          <div className="footer-social">
            <span>Social</span>
            <a href="https://www.linkedin.com/in/renanodev/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/RNanWP" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <div className="footer-signature">
            <strong>RN.</strong>
            <p>Desenhado e construído com intenção.<br />© 2026 Renan Oliveira.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
