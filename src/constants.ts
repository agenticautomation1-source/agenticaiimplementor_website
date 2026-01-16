import { Course, Feature } from './types';

export const COURSES: Course[] = [
  {
    id: 'stitch-orchestration',
    title: 'Neural Stitch: Enterprise Orchestration',
    description: 'Master the core protocols for stitching multi-agent cognitive loops. Learn to build unified autonomous systems that cross-reference memory and tools.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200',
    level: 'Enterprise',
    modules: 22
  },
  {
    id: 'arch',
    title: 'Autonomous Agent Architectures',
    description: 'Deep dive into memory management, planning loops, and state persistence for long-running agents.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    level: 'Advanced',
    modules: 12
  },
  {
    id: 'cog',
    title: 'Cognitive Reasoning Systems',
    description: 'Implementing advanced reasoning protocols to minimize hallucination and maximize logic in agent decision-making.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=1200',
    level: 'Mastery',
    modules: 8
  },
  {
    id: 'orch',
    title: 'Multi-Agent Orchestration',
    description: 'Scale your AI infrastructure with hierarchical agent teams and collaborative task decomposition.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    level: 'Mastery',
    modules: 15
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Cognitive Stitching',
    description: 'The premier methodology for connecting multi-provider agents (Gemini, GPT, Claude) into a single logical execution unit.',
    icon: 'hub'
  },
  {
    title: 'Enterprise Swarms',
    description: 'Orchestrate complex workflows where specialized agents collaborate, review, and refine outputs autonomously across departments.',
    icon: 'groups'
  },
  {
    title: 'Secure Integrations',
    description: 'Connect LLMs to enterprise-grade APIs and legacy systems using sandboxed execution and real-time monitoring.',
    icon: 'shield_with_heart'
  }
];

export const LOGOS = ['GOOGLE', 'NVIDIA', 'MICROSOFT', 'ANTHROPIC', 'OPENAI', 'DATABRICKS'];