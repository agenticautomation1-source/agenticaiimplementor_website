import { Course, Feature } from './types';

import systemsImg from './assets/courses/agentic-systems-engineer.webp';
import platformImg from './assets/courses/genai-platform-architect.webp';
import governanceImg from './assets/courses/ai-validation-governance.webp';

export const COURSES: Course[] = [
  {
    id: 'agentic-ai-systems-engineer',
    title: 'MASTERSTROKE – Agentic AI Systems Engineer',
    description:
      'Build production-grade agentic AI systems with orchestration, memory, hybrid architectures, and governance baked in.',
    image: systemsImg,
    level: 'Intermediate → Advanced',
    modules: 12
  },
  {
    id: 'genai-platform-architect',
    title: 'MASTERSTROKE – GenAI Platform Architect',
    description:
      'Design enterprise GenAI platforms with multi-tenancy, cost controls, security, and observability.',
    image: platformImg,
    level: 'Advanced',
    modules: 10
  },
  {
    id: 'ai-validation-governance-engineer',
    title: 'MASTERSTROKE – AI Validation & Governance Engineer',
    description:
      'Validate, audit, and govern production AI systems with testing, monitoring, compliance alignment, and HITL workflows.',
    image: governanceImg,
    level: 'Advanced',
    modules: 8
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Cognitive Stitching',
    description:
      'The premier methodology for connecting multi-provider agents (Gemini, GPT, Claude) into a single logical execution unit.',
    icon: 'hub'
  },
  {
    title: 'Enterprise Swarms',
    description:
      'Orchestrate complex workflows where specialized agents collaborate, review, and refine outputs autonomously across departments.',
    icon: 'groups'
  },
  {
    title: 'Secure Integrations',
    description:
      'Connect LLMs to enterprise-grade APIs and legacy systems using sandboxed execution and real-time monitoring.',
    icon: 'shield_with_heart'
  }
];

export const LOGOS = [
  'IBM',
  'DELOITTE',
  'ACCENTURE',
  'MARSH MCLENNAN',
  'HP',
  'CGI',
  'SHARP',
  'LG SOFT',
  'MPHASIS',
  'KYNDRYL',
  'VIRTUSA',
  'MERCER',
  'REVITAS',
  'CAPGEMINI',
  'IGATE'
];

