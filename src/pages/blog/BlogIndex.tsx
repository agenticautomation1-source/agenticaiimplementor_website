import { Link } from "react-router-dom";

const posts = [
  {
    title: "What Is Agentic AI Architecture?",
    slug: "what-is-agentic-ai-architecture",
    description:
      "Understanding the structural design of autonomous agent systems."
  }
];

const Blog = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="border-b border-white/10 pb-6">
            <Link
              to={`/blog/${post.slug}`}
              className="text-2xl font-semibold hover:text-primary transition"
            >
              {post.title}
            </Link>

            <p className="text-slate-400 mt-2">
              {post.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
