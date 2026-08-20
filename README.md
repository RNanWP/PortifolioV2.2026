# Portfólio — Renan Oliveira

Portfólio profissional de **Renan Santos de Oliveira**, desenvolvido para apresentar minha trajetória, formação, competências e projetos em uma experiência responsiva e interativa.

## Site publicado

[renan-oliveira-dev.vercel.app](https://renan-oliveira-dev.vercel.app/)

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel

## Funcionalidades

- Apresentação profissional e trajetória
- Cards com acesso aos repositórios dos projetos
- Download do currículo em PDF
- Layout responsivo para desktop e dispositivos móveis
- Animações de entrada e indicador de progresso de rolagem
- Contato por e-mail, LinkedIn e GitHub
- Metadados para compartilhamento e mecanismos de busca
- `robots.txt` e `sitemap.xml` gerados pelo Next.js
- Verificação do Google Search Console
- Integração com Google Tag Manager

## Executar localmente

```bash
git clone https://github.com/RNanWP/PortifolioV2.2026.git
cd PortifolioV2.2026
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run dev        # servidor local
npm run typecheck  # validação do TypeScript
npm run build      # build de produção
npm run check      # typecheck + build
npm run start      # executa o build de produção
```

## Estrutura principal

```text
app/
├── globals.css    # estilos e responsividade
├── layout.tsx     # metadados, SEO e integrações globais
├── page.tsx       # conteúdo do portfólio
├── robots.ts      # regras para rastreadores
└── sitemap.ts     # mapa do site
public/
├── docs/          # currículo
└── images/        # imagens do portfólio
```

## Publicação

O repositório está conectado à Vercel. Alterações enviadas para a branch `main` geram uma nova implantação de produção automaticamente.

## Autor

**Renan Santos de Oliveira**

- [LinkedIn](https://www.linkedin.com/in/renanodev/)
- [GitHub](https://github.com/RNanWP)

---

Este é um projeto de portfólio pessoal. O conteúdo, as fotografias e os dados pessoais não são licenciados para reutilização.
