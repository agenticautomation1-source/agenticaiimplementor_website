import { useParams } from "react-router-dom";

type Article = {
  title: string;
  description: string;
  content: React.ReactNode;
};

const articles: Record<string, Article>
 = {
  "what-is-agentic-ai-architecture": {
    title: "What Is Agentic AI Architecture?",
    description:
      "Agentic AI architecture refers to the structural design of autonomous AI systems capable of planning, tool usage, and coordinated execution.",
    content: (
      <>
        <h2 className="text-2xl font-semibold mt-10 mb-4">Introduction</h2>
        <p className="text-slate-300 mb-6">
          Agentic AI architecture defines how autonomous AI systems plan,
          decide, execute tasks, and use external tools without continuous
          human supervision.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Core Components</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>Memory Systems</li>
          <li>Planning Modules</li>
          <li>Tool Interfaces</li>
          <li>Orchestration Layers</li>
          <li>Feedback Loops</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why It Matters</h2>
        <p className="text-slate-300 mb-6">
          Production-grade agentic systems require structured architecture to
          ensure reliability, safety, and scalability.
        </p>
      </>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams();

  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
      <p className="text-slate-400 mb-8">{article.description}</p>

      <div className="prose prose-invert max-w-none">
        {article.content}
      </div>
    </div>
  );
};

export default BlogPost;
