"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./credentials.module.css";

type Category = "formacao" | "certificacoes" | "cursos" | "documentos";
type Relevance = "essencial" | "profissional" | "complementar";

type Credential = {
  id: string;
  title: string;
  institution: string;
  year: string;
  category: Category;
  relevance: Relevance;
  description: string;
  images: Array<{ src: string; label: string }>;
  detail?: string;
};

const credentials: Credential[] = [
  {
    id: "pos-tech-fiap",
    title: "Pós-Tech em Full Stack Development",
    institution: "FIAP",
    year: "2026",
    category: "formacao",
    relevance: "essencial",
    detail: "Pós-graduação lato sensu · 360 horas",
    description:
      "Especialização em desenvolvimento Full Stack, arquitetura, APIs e construção de aplicações modernas.",
    images: [{ src: "/credentials/pos-tech-fiap.webp", label: "Certificado da Pós-Tech FIAP" }],
  },
  {
    id: "diploma-ads",
    title: "Análise e Desenvolvimento de Sistemas",
    institution: "UNINOVE",
    year: "2025",
    category: "formacao",
    relevance: "essencial",
    detail: "Diploma de graduação · Tecnólogo",
    description:
      "Formação superior que consolidou a base em programação, bancos de dados, sistemas e engenharia de software.",
    images: [{ src: "/credentials/diploma-ads.webp", label: "Diploma de ADS" }],
  },
  {
    id: "scrum-foundation",
    title: "Scrum Foundation Professional Certificate",
    institution: "CertiProf",
    year: "2023",
    category: "certificacoes",
    relevance: "profissional",
    detail: "Certificação profissional · SFPC™",
    description:
      "Fundamentos do framework Scrum, trabalho iterativo, papéis, eventos e entrega contínua de valor.",
    images: [{ src: "/credentials/scrum-foundation.webp", label: "Certificação Scrum Foundation" }],
  },
  {
    id: "python-essentials",
    title: "Python Essentials 1",
    institution: "Cisco Networking Academy",
    year: "2024",
    category: "certificacoes",
    relevance: "profissional",
    detail: "Fundamentos de Python",
    description:
      "Conceitos essenciais da linguagem Python, lógica, estruturas de controle, funções e organização de código.",
    images: [{ src: "/credentials/python-essentials.webp", label: "Certificado Python Essentials 1" }],
  },
  {
    id: "trilha-git-github",
    title: "Trilha Git e GitHub",
    institution: "Alura · FIAP",
    year: "2025—26",
    category: "cursos",
    relevance: "profissional",
    detail: "Série · 2 certificados · 16 horas",
    description:
      "Controle de versão, colaboração em projetos, branches, commits e fluxos de trabalho com repositórios remotos.",
    images: [
      { src: "/credentials/git-github-colaborando.webp", label: "Parte 1 · Compartilhando e colaborando" },
      { src: "/credentials/git-github-controle-versao.webp", label: "Parte 2 · Dominando controle de versão" },
    ],
  },
  {
    id: "trilha-excel",
    title: "Trilha Microsoft Excel 2016",
    institution: "Fundação Bradesco",
    year: "2020",
    category: "cursos",
    relevance: "complementar",
    detail: "Série · Básico + Intermediário · 35 horas",
    description:
      "Formação progressiva em planilhas, fórmulas, organização de dados e recursos intermediários do Excel.",
    images: [
      { src: "/credentials/excel-basico.webp", label: "Parte 1 · Excel Básico" },
      { src: "/credentials/excel-intermediario.webp", label: "Parte 2 · Excel Intermediário" },
    ],
  },
  {
    id: "ingles-alura",
    title: "Inglês — Conhecendo novas pessoas",
    institution: "Alura Língua",
    year: "2026",
    category: "cursos",
    relevance: "complementar",
    detail: "Trilha de inglês · Curso 1",
    description:
      "Primeiro módulo de uma trilha progressiva de inglês voltada à comunicação em situações cotidianas.",
    images: [{ src: "/credentials/ingles-conhecendo-pessoas.webp", label: "Curso 1 · Conhecendo novas pessoas" }],
  },
  {
    id: "jornada-fullstack",
    title: "Jornada Full Stack",
    institution: "Hashtag Treinamentos",
    year: "2025",
    category: "cursos",
    relevance: "complementar",
    detail: "Formação intensiva · 8 horas",
    description:
      "Jornada prática de desenvolvimento que deu origem ao projeto de streaming musical apresentado no portfólio.",
    images: [{ src: "/credentials/jornada-fullstack.webp", label: "Certificado Jornada Full Stack" }],
  },
  {
    id: "dio-bootcamp",
    title: "Bootcamps DIO: Educação e Empregabilidade",
    institution: "DIO",
    year: "2023",
    category: "cursos",
    relevance: "complementar",
    detail: "Curso complementar · 1 hora",
    description:
      "Conteúdo introdutório sobre aprendizado por bootcamps, desenvolvimento profissional e empregabilidade.",
    images: [{ src: "/credentials/dio-bootcamp.webp", label: "Certificado DIO" }],
  },
  {
    id: "colacao-grau",
    title: "Certificado de Colação de Grau",
    institution: "UNINOVE",
    year: "2025",
    category: "documentos",
    relevance: "profissional",
    detail: "Documento acadêmico",
    description:
      "Registro institucional da conclusão e colação de grau em Análise e Desenvolvimento de Sistemas.",
    images: [{ src: "/credentials/colacao-grau.webp", label: "Certificado de colação de grau" }],
  },
  {
    id: "historico-ads",
    title: "Histórico e conclusão de ADS",
    institution: "UNINOVE",
    year: "2025",
    category: "documentos",
    relevance: "profissional",
    detail: "Documento acadêmico · 2 páginas",
    description:
      "Histórico acadêmico do curso superior, com disciplinas, cargas horárias e registro de conclusão.",
    images: [{ src: "/credentials/historico-ads.webp", label: "Histórico acadêmico de ADS" }],
  },
];

const filters: Array<{ value: "todos" | Category; label: string }> = [
  { value: "todos", label: "Todos" },
  { value: "formacao", label: "Formação" },
  { value: "certificacoes", label: "Certificações" },
  { value: "cursos", label: "Cursos e trilhas" },
  { value: "documentos", label: "Documentos" },
];

const relevanceLabel: Record<Relevance, string> = {
  essencial: "Essencial",
  profissional: "Profissional",
  complementar: "Complementar",
};

export default function CredentialsGallery() {
  const [filter, setFilter] = useState<"todos" | Category>("todos");
  const [selected, setSelected] = useState<{ id: string; image: number } | null>(null);

  const visibleCredentials = useMemo(
    () => credentials.filter((credential) => filter === "todos" || credential.category === filter),
    [filter],
  );

  const activeCredential = selected
    ? credentials.find((credential) => credential.id === selected.id) ?? null
    : null;

  const closePreview = () => setSelected(null);

  const changePreview = (direction: number) => {
    if (!selected || !activeCredential || activeCredential.images.length < 2) return;
    setSelected({
      ...selected,
      image:
        (selected.image + direction + activeCredential.images.length) % activeCredential.images.length,
    });
  };

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowRight") changePreview(1);
      if (event.key === "ArrowLeft") changePreview(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [selected, activeCredential]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Voltar ao portfólio">
          R<span>N</span>.
        </Link>
        <nav className={styles.nav} aria-label="Navegação das credenciais">
          <Link href="/#projetos">Projetos</Link>
          <Link href="/#trajetoria">Trajetória</Link>
          <span>Credenciais</span>
        </nav>
        <Link className={styles.back} href="/">
          Voltar ao portfólio <span>↗</span>
        </Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroTopline}>
          <span>08 / CREDENCIAIS</span>
          <span>2020—2026</span>
        </div>
        <h1>
          Formação que<br />
          <em>sustenta a prática.</em>
        </h1>
        <div className={styles.heroBottom}>
          <p>
            Diplomas, certificações e cursos organizados por impacto profissional — sem transformar
            o portfólio em uma lista massiva de arquivos.
          </p>
          <div className={styles.heroStats} aria-label="Resumo das credenciais">
            <div><strong>13</strong><span>documentos</span></div>
            <div><strong>08</strong><span>instituições</span></div>
            <div><strong>03</strong><span>níveis de relevância</span></div>
          </div>
        </div>
      </section>

      <section className={styles.gallery} aria-labelledby="gallery-title">
        <div className={styles.galleryHead}>
          <div>
            <span className={styles.index}>01 / ARQUIVO</span>
            <h2 id="gallery-title">Credenciais verificáveis, organizadas com contexto.</h2>
          </div>
          <p>
            Os destaques acadêmicos aparecem primeiro. Cursos sequenciais são reunidos em trilhas
            para manter a leitura limpa.
          </p>
        </div>

        <div className={styles.toolbar} aria-label="Filtrar credenciais">
          {filters.map((item) => {
            const count = item.value === "todos"
              ? credentials.length
              : credentials.filter((credential) => credential.category === item.value).length;
            return (
              <button
                key={item.value}
                type="button"
                className={filter === item.value ? styles.filterActive : ""}
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label} <span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.grid} aria-live="polite">
          {visibleCredentials.map((credential) => (
            <article
              className={`${styles.card} ${credential.relevance === "essencial" ? styles.featured : ""}`}
              key={credential.id}
            >
              <button
                className={styles.preview}
                type="button"
                onClick={() => setSelected({ id: credential.id, image: 0 })}
                aria-label={`Ver amostra de ${credential.title}`}
              >
                <Image
                  src={credential.images[0].src}
                  alt={credential.images[0].label}
                  fill
                  sizes={credential.relevance === "essencial" ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 33vw"}
                />
                <span className={styles.previewAction}>Ampliar <i>↗</i></span>
                {credential.images.length > 1 && (
                  <span className={styles.seriesCount}>+{credential.images.length - 1} na série</span>
                )}
              </button>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span>{credential.institution}</span>
                  <span>{credential.year}</span>
                </div>
                <h3>{credential.title}</h3>
                <p>{credential.description}</p>
                <span className={styles.detail}>{credential.detail}</span>
                <div className={styles.relevance}>
                  <span>Relevância</span>
                  <div aria-label={`Relevância ${relevanceLabel[credential.relevance]}`}>
                    {[1, 2, 3].map((level) => {
                      const active = credential.relevance === "essencial"
                        ? level <= 3
                        : credential.relevance === "profissional"
                          ? level <= 2
                          : level <= 1;
                      return <i className={active ? styles.levelActive : ""} key={level} />;
                    })}
                  </div>
                  <strong>{relevanceLabel[credential.relevance]}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <span>PRÓXIMO PASSO</span>
          <h2>Conhecimento documentado.<br />Prática em evolução.</h2>
        </div>
        <Link href="/#contato">Iniciar conversa <span>↗</span></Link>
      </footer>

      {selected && activeCredential && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label={`Amostra de ${activeCredential.title}`}>
          <button className={styles.modalBackdrop} type="button" onClick={closePreview} aria-label="Fechar amostra" />
          <div className={styles.modalPanel}>
            <div className={styles.modalHead}>
              <div>
                <span>{activeCredential.institution} · {activeCredential.year}</span>
                <strong>{activeCredential.title}</strong>
              </div>
              <button type="button" onClick={closePreview} aria-label="Fechar amostra">Fechar ×</button>
            </div>
            <div className={styles.modalImage}>
              <Image
                src={activeCredential.images[selected.image].src}
                alt={activeCredential.images[selected.image].label}
                fill
                sizes="(max-width: 760px) 94vw, 82vw"
                priority
              />
            </div>
            <div className={styles.modalFooter}>
              <span>{activeCredential.images[selected.image].label}</span>
              <span>Dados pessoais sensíveis ocultos nesta amostra</span>
              {activeCredential.images.length > 1 && (
                <div className={styles.modalControls}>
                  <button type="button" onClick={() => changePreview(-1)} aria-label="Amostra anterior">←</button>
                  <span>{selected.image + 1} / {activeCredential.images.length}</span>
                  <button type="button" onClick={() => changePreview(1)} aria-label="Próxima amostra">→</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
