import { PROJECTS } from "@/features/projects/content";
import type { TechnologyDefinition, TechnologyEntry } from "./types/technology";
// Plain-language summaries checked against the linked primary documentation.
const TECHNOLOGIES: readonly TechnologyDefinition[] = [
  {
    name: "React",
    category: "UI library",
    definition:
      "A JavaScript library for building interfaces from reusable components.",
    purpose:
      "Useful for screens with forms, filters, and content that changes as people interact.",
    documentation: "https://react.dev/",
  },
  {
    name: "Next.js",
    category: "React framework",
    definition:
      "A framework built on React that adds routing, server rendering, and server-side application features.",
    purpose: "Brings the interface and application routes into one codebase.",
    documentation: "https://nextjs.org/docs",
  },
  {
    name: "TypeScript",
    category: "Programming language",
    definition:
      "JavaScript with a type system that checks code before it runs.",
    purpose:
      "Makes the expected shape of inputs and data clearer while developing.",
    documentation: "https://www.typescriptlang.org/docs/",
  },
  {
    name: "Tailwind CSS",
    category: "CSS framework",
    definition:
      "A CSS framework that composes designs with small utility classes.",
    purpose:
      "Useful for responsive layouts and consistent spacing, typography, and color.",
    documentation: "https://tailwindcss.com/docs/styling-with-utility-classes",
  },
  {
    name: "Node.js",
    category: "JavaScript runtime",
    definition: "A runtime for executing JavaScript outside the browser.",
    purpose: "Often used for API endpoints and server-side application logic.",
    documentation: "https://nodejs.org/en/about",
  },
  {
    name: "GraphQL",
    category: "API query language",
    definition:
      "An API query language that lets clients request specific fields from a typed schema.",
    purpose: "Helps a screen describe the data it needs from the API.",
    documentation: "https://graphql.org/learn/",
  },
  {
    name: "Oracle SQL",
    category: "Database query language",
    definition:
      "SQL statements used to query and manage data in Oracle Database.",
    purpose: "Supports reporting, filtering, and working with related records.",
    documentation:
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Introduction-to-Oracle-SQL.html",
  },
  {
    name: "TypeORM",
    category: "Database mapping",
    definition:
      "An object-relational mapper that connects JavaScript or TypeScript models to database tables.",
    purpose:
      "Provides entities and a query builder for application database access.",
    documentation: "https://typeorm.io/",
  },
  {
    name: "DataHub",
    category: "Data catalog",
    definition:
      "A metadata platform for discovering data and understanding where it comes from.",
    purpose: "Helps people find datasets and understand their context.",
    documentation: "https://docs.datahub.com/",
  },
  {
    name: "Kong",
    category: "API gateway",
    definition:
      "An API gateway that sits in front of services to manage API traffic.",
    purpose: "Provides a place to apply routing and gateway policies.",
    documentation: "https://developer.konghq.com/gateway/",
  },
];
export function getTechnologyEntries(): TechnologyEntry[] {
  return TECHNOLOGIES.map((technology) => ({
    ...technology,
    projects: PROJECTS.filter((project) =>
      project.technologies.includes(technology.name),
    ).map((project) => ({
      title: project.title,
      href: `/projects/${project.slug}`,
    })),
  }));
}
