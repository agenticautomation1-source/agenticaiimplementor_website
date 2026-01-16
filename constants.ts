
import { Course, Feature } from './types';

export const COURSES: Course[] = [
  {
    id: 'arch',
    title: 'Autonomous Agent Architectures',
    description: 'Deep dive into memory management, planning loops, and state persistence for long-running agents.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5R8xgsuX4-xcW2OOO6Ga3paUXFND4WSXiqA3LF4piWLPDxczmBeEAhXv-USzHHZQl9Br_1BwdlCOs1i_6UQcKB51JZxdUA6X4rAAMfHE9ZKhUT81yZj3UBT_O8Utfspa3Lb6usjXzE6IkgVCzxI2gnd8VVFkba9SrkcNIj_GxRwrz4liqGqAObt2ZUsE4CRs3p7ONyNF6HCq1P6gOzRWlgGBZM6UblHFVrQUMX8-DYrYvxRSpgYJ9jZy4utDPra01Ykx9I8UFdpU',
    level: 'Advanced',
    modules: 12
  },
  {
    id: 'cog',
    title: 'Cognitive Reasoning Systems',
    description: 'Implementing advanced reasoning protocols to minimize hallucination and maximize logic in agent decision-making.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2AHY7HY4GJxJkASDc3jzDmNpe0qvm9IRfy7s1qKsxwnpOpTqyfBJ6WhGjyFAO4BP8JvTCu5gmCw4mgCZa4NnHI0Iz7MyWAwwSbcCBKP6EsuxUejvXjiU0wKXyjG-iRO945_nUbXNnkBJ3HvX5BJJuwIke4aoOnIgLAJ05kAd_pjc0RqZJ287uSYOQXo5uKfXJB28G987o3JPOr-kkxfHZ4CvVFSRF_4V_95VYlX6AWNnepqmzdCd3hb_TCKVhxohnEvCvea4dUg4',
    level: 'Mastery',
    modules: 8
  },
  {
    id: 'orch',
    title: 'Multi-Agent Orchestration',
    description: 'Scale your AI infrastructure with hierarchical agent teams and collaborative task decomposition.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDvzdqhMpgtLuwUebS4GpPp5diFeUEWtfRa75gCyjnL6tjLEb5pToiP4t_iagr87cADPY82KdZ0DuRa_L9W_jYFUZaXP3ep0XiNTbZaA_KS__e2td59zRr7H1sJQmjtPqeOu1cUWQded4co60JVuOd8leV9EtcU0Md_pF-7hn_7tMucEKboRinvwj_k3DeGmBYrjBXKQHSGMz1znd7Uu0_ld_plXYnfsbyzH8KmfoQhKcR_v7sf1fgt4NMWWwcqCk2UXaVZrLdKE8',
    level: 'Enterprise',
    modules: 15
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Cognitive Reasoning',
    description: 'Implement Chain-of-Thought, ReAct, and Tree-of-Thought architectures to allow agents to "think" before acting.',
    icon: 'psychology'
  },
  {
    title: 'Multi-Agent Swarms',
    description: 'Orchestrate complex workflows where specialized agents collaborate, review, and refine outputs autonomously.',
    icon: 'hub'
  },
  {
    title: 'Tool Integration',
    description: 'Connect LLMs to real-world APIs, databases, and code interpreters with secure, sandboxed execution environments.',
    icon: 'construction'
  }
];

export const LOGOS = ['NVIDIA', 'MICROSOFT', 'ANTHROPIC', 'OPENAI', 'GOOGLE', 'DATABRICKS'];
