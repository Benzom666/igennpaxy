"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    id: 1,
    title: "The Future of AI in Digital Marketing: 2026 Predictions",
    excerpt:
      "Explore how artificial intelligence is reshaping marketing strategies and what businesses need to prepare for.",
    category: "Trends",
    date: "Jan 28, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "SEO Best Practices That Actually Work in 2026",
    excerpt:
      "Cut through the noise with proven SEO strategies that drive real organic growth.",
    category: "SEO",
    date: "Jan 22, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Building Brand Loyalty Through Social Media",
    excerpt:
      "Learn how to create authentic connections that turn followers into brand advocates.",
    category: "Social Media",
    date: "Jan 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    featured: false,
  },
];

export function InsightsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.05,
  });

  const featuredPost = insights.find((post) => post.featured);
  const regularPosts = insights.filter((post) => !post.featured);

  return (
    <section id="insights" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-widest mb-4 block">
              Insights & News
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Fresh Perspectives on{" "}
              <span className="text-primary">Digital Marketing</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" className="group self-start md:self-auto bg-transparent">
            View All Articles
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        {/* Insights Grid */}
        <div
          ref={gridRef}
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 ${
            gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Featured Post */}
          {featuredPost && (
            <div className="group cursor-pointer lg:row-span-2">
              <div className="relative rounded-3xl overflow-hidden h-full">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-xs font-medium w-fit mb-4">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-primary-foreground/80 mb-4 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="flex flex-col gap-8">
            {regularPosts.map((post, index) => (
              <div
                key={post.id}
                className="group cursor-pointer bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
                style={{
                  transitionDelay: gridVisible ? `${(index + 1) * 150}ms` : "0ms",
                }}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
