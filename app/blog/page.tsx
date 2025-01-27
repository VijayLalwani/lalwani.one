import Link from "next/link"
import { memo } from "react"

interface BlogPost {
  title: string
  date: string
  slug: string
  description: string
  tags: string[]
}

const posts: readonly BlogPost[] = [
  {
    title: "Github Cheatsheet",
    date: "Wednesday, May 29, 2024",
    slug: "github-cheatsheet",
    description: "A comprehensive guide to using GitHub effectively.",
    tags: ["GitHub", "Version Control"],
  },
  {
    title: "The Future of AI in Web Development",
    date: "Monday, June 3, 2024",
    slug: "ai-in-web-development",
    description: "Exploring the impact of AI on web development.",
    tags: ["AI", "Web Development"],
  },
  {
    title: "Optimizing React Performance: Advanced Techniques",
    date: "Friday, June 7, 2024",
    slug: "react-performance-optimization",
    description: "Advanced techniques to optimize React performance.",
    tags: ["React", "Performance Optimization"],
  },
  {
    title: "Exploring the New Features in TypeScript 5.0",
    date: "Tuesday, June 11, 2024",
    slug: "typescript-5-features",
    description: "What's new in TypeScript 5.0 and how it can benefit your projects.",
    tags: ["TypeScript", "JavaScript"],
  },
  {
    title: "Building Accessible Web Applications: Best Practices",
    date: "Saturday, June 15, 2024",
    slug: "web-accessibility-best-practices",
    description: "Best practices for building accessible web applications.",
    tags: ["Accessibility", "Web Development"],
  },
] as const

const BlogPost = memo(({ post }: { post: BlogPost }) => (
  <Link
    key={post.slug}
    href={`/blog/${post.slug}`}
    className="group relative overflow-hidden rounded-xl border border-black/5 hover:border-black/10 dark:border-white/5 dark:hover:border-white/10 p-4 shadow-doing hover:shadow-lg dark:hover:shadow-white/10 transition-all duration-200"
  >
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-mauve-50/90 dark:text-evuam-50/90">
            {post.date}
          </span>
        </div>
        <h4 className="font-medium text-mauve-50 dark:text-evuam-50">
          {post.title}
        </h4>
        <p className="text-mauve-50/90 dark:text-evuam-50/90">
          {post.description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <div
              key={tag}
              className="rounded-full bg-black/5 dark:bg-white/5 px-2 py-0.5 text-mauve-50/90 dark:text-evuam-50/90"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  </Link>
));

BlogPost.displayName = 'BlogPost';

export default function Blog() {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="my-6 text-2xl font-bold text-[#333] dark:text-[#DADADA]">
        Blog
      </h3>
      <p className="text-lg leading-snug text-mauve-50/90 dark:text-evuam-50/90">
        Thoughts, mental models, and tutorials about software.
      </p>
      <div className="my-4 grid gap-3 grid-cols-1">
        {posts.map((post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

