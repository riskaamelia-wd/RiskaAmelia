import type { Project } from "./types/project";
import { SITE } from "@/config/site";
// Verified against the public LinkedIn profile on 2026-11-08.
// CMS OPENDATA identity and contributions were supplied directly by the owner.
// Live website URLs were supplied directly by the portfolio owner.
// Gallery paintings are illustrative covers, not software screenshots.
export const PROJECTS: readonly Project[] = [
  {
    slug: "pringwulung",
    title: "Pringwulung",
    summary:
      "A village website bringing public-service information, community activities, news, and local tourism together.",
    liveUrl: "https://pringwulung.id/",
    artwork: {
      src: "/images/pringwulung.jpeg",
      alt: "An impressionist aerial view of Pringwulung’s colorful courtyard and village lane, based on the project reference.",
    },
    technologies: [],
    sections: [
      {
        heading: "A digital home for the village",
        body: "I built Pringwulung, a village website that brings public-service information and community updates into one place. Its public navigation connects village information, resident services, community groups, and local activities.",
      },
      {
        heading: "Public services and community information",
        body: "The homepage provides entry points for online administrative letters, resident complaints, emergency information, and service schedules. News, agendas, tourism, and cultural information sit alongside these service links.",
      },
    ],
  },
  {
    slug: "cms-opendata",
    title: "CMS OPENDATA",
    summary:
      "KPU Open Data CMS: user and role management, DataHub-connected datasets, provincial homepage content, and publication approvals.",
    artwork: {
      src: "/images/cms-opendata.png",
      alt: "An impressionist water-lily pond, illustrating CMS OPENDATA.",
    },
    technologies: ["Next.js", "TypeScript", "DataHub", "Kong"],
    sections: [
      {
        heading: "Project overview",
        body: "CMS OPENDATA is a content management system for Open Data, Komisi Pemilihan Umum (KPU).",
      },
      {
        heading: "User and role management",
        body: "I worked on user and role management for the CMS, supporting the administration of users and their roles within the platform.",
      },
      {
        heading: "Datasets and DataHub integration",
        body: "I built dataset creation features that connect datasets to DataHub. The project uses Next.js and TypeScript, alongside DataHub and Kong.",
      },
      {
        heading: "Homepage management across provinces",
        body: "I worked on homepage management with data covering every province in Indonesia, bringing provincial information into the CMS’s homepage content workflows.",
      },
      {
        heading: "Review before publication",
        body: "I implemented an approval workflow for reviewing supporting evidence before a dataset can be published. This makes evidence review and approval part of the dataset publication process.",
      },
    ],
  },
  {
    slug: "simdiklat",
    liveUrl: "https://simdiklat-bpsdm.jakarta.go.id/next",
    artwork: {
      src: "/images/simdiklat.png",
      alt: "A painted study of blue-green water and water lilies, illustrating SIMDIKLAT.",
    },
    title: "SIMDIKLAT",
    summary:
      "Training-management redevelopment: planning, participants, attendance, certificates, scoring, and evaluation.",
    technologies: ["Next.js", "TypeORM", "Oracle SQL"],
    role: "Software Engineer",
    sourceUrl: SITE.linkedin,
    sections: [
      {
        heading: "Understanding the legacy system",
        body: "I led SIMDIKLAT’s migration from Laravel to Next.js, starting with workflow mapping, database review, and architecture planning.\n\nI prepared flows, wireframes, journey maps, and prototypes, then refined them with the design team.",
      },
      {
        heading: "Implementation and integrations",
        body: "My contribution spanned frontend and backend: training plans, participants, attendance, certificates, scoring, and evaluation.\n\nIntegrations with SIJULE, PINTAR, SIMPEG, and BSrE connected training-hour synchronization, personnel retrieval, and digital verification.",
      },
      {
        heading: "Data and performance",
        body: "Oracle SQL query improvements, index tuning, and TypeORM configuration supported faster processing and reporting.",
      },
    ],
  },
  {
    slug: "simfoni",
    liveUrl:
      "https://simdiklat-bpsdm.jakarta.go.id/sim-diklat/auth/login/simfoni",
    artwork: {
      src: "/images/simfoni.png",
      alt: "An impressionist garden bridge, illustrating SIMFONI.",
    },
    title: "SIMFONI",
    summary:
      "Legacy Laravel application rebuilt with new interfaces, APIs, and database structures.",
    technologies: ["Next.js", "Node.js"],
    role: "Software Engineer",
    sourceUrl: SITE.linkedin,
    sections: [
      {
        heading: "From analysis to redevelopment",
        body: "I analyzed the legacy Laravel application and redesigned its data model before rebuilding it with Next.js and Node.js.",
      },
      {
        heading: "End-to-end contribution",
        body: "My work included database structures, backend logic, APIs, and interfaces aligned with updated workflows.",
      },
    ],
  },
  {
    slug: "musrenbangkom",
    liveUrl: "https://simdiklat-bpsdm.jakarta.go.id/musren-bangkom/",
    artwork: {
      src: "/images/musrenbangkom.png",
      alt: "A painted close study of water lilies, illustrating MUSRENBANGKOM.",
    },
    title: "MUSRENBANGKOM",
    summary:
      "Responsive frontend with tables, approval flows, and API-driven interactions.",
    technologies: ["Next.js", "Tailwind CSS"],
    role: "Software Engineer",
    sourceUrl: SITE.linkedin,
    sections: [
      {
        heading: "Frontend contribution",
        body: "I developed responsive tables, approval workflows, and API-driven interaction components using Next.js and Tailwind CSS.",
      },
    ],
  },
  {
    slug: "classy",
    artwork: {
      src: "/images/classy.png",
      alt: "An impressionist flower garden, illustrating Classy.",
    },
    title: "Classy",
    summary: "B2C e-commerce mini-project at Alterra Academy.",
    technologies: ["React", "GraphQL", "Hasura"],
    sourceUrl: SITE.linkedin,
    sections: [
      {
        heading: "Training project",
        body: "I built this B2C e-commerce mini-project at Alterra Academy using React, GraphQL, and Hasura.",
      },
    ],
  },
  {
    slug: "gofit",
    artwork: {
      src: "/images/gofit.png",
      alt: "An impressionist sunlit garden path, illustrating GoFit.",
    },
    title: "GoFit",
    summary:
      "Collaborative gym-management capstone with design, mobile, backend, and QA teams.",
    technologies: [],
    sourceUrl: SITE.linkedin,
    sections: [
      {
        heading: "Collaborative capstone",
        body: "I completed this gym-management capstone through agile collaboration with UI/UX, mobile, backend, and QA teams.",
      },
    ],
  },
];
export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
export function getProjectStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}
