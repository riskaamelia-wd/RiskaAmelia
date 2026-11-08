export interface TechnologyDefinition {
  name: string;
  category: string;
  definition: string;
  purpose: string;
  documentation: string;
}
export interface TechnologyEntry extends TechnologyDefinition {
  projects: readonly { title: string; href: string }[];
}
