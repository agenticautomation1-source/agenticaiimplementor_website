import systemsImg from "../assets/courses/agentic-systems-engineer.webP";
import platformImg from "../assets/courses/genai-platform-architect.webP";
import governanceImg from "../assets/courses/ai-validation-governance.webP";

export const MASTERSTROKE_COURSES = {
  systemsEngineer: {
    id: "systems-engineer",
    slug: "agentic-ai-systems-engineer",
    title: "MASTERSTROKE – Agentic AI Systems Engineer",
    description:
      "Production-grade agentic AI systems built with hybrid architectures",
    duration: "12 Weeks | ~96 Hours",
    level: "Intermediate → Advanced",
    image: systemsImg,

    // EXTERNAL LMS / WOOCOMMERCE
    enrollUrl:
      "https://agenticaiimplementors.com/lms/courses/masterstroke-agentic-ai-systems-engineer/",
  },

  platformArchitect: {
    id: "platform-architect",
    slug: "genai-platform-architect",
    title: "MASTERSTROKE – GenAI Platform Architect",
    description:
      "Design the enterprise GenAI platforms others build on",
    duration: "10–12 Weeks",
    level: "Advanced",
    image: platformImg,

    // EXTERNAL LMS / WOOCOMMERCE
    enrollUrl:
      "https://agenticaiimplementors.com/lms/courses/masterstroke-genai-platform-architect/",
  },

  governanceEngineer: {
    id: "governance-engineer",
    slug: "ai-validation-governance-engineer",
    title: "MASTERSTROKE – AI Validation & Governance Engineer",
    description:
      "Validation, auditability, and compliance for production AI",
    duration: "8–10 Weeks",
    level: "Advanced",
    image: governanceImg,

    // EXTERNAL LMS / WOOCOMMERCE
    enrollUrl:
      "https://agenticaiimplementors.com/lms/courses/masterstroke-ai-validation-governance-engineer/",
  },
};
