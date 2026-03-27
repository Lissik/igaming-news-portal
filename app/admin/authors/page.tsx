import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AUTHORS, ARTICLES } from "@/lib/data";
import Image from "next/image";

export default function AdminAuthorsPage() {
  const authorsWithCounts = AUTHORS.map((author) => ({
    ...author,
    articleCount: ARTICLES.filter((a) => a.author.id === author.id).length,
    totalLikes: ARTICLES.filter((a) => a.author.id === author.id).reduce(
      (sum, a) => sum + a.likes,
      0
    ),
  }));

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-border px-8 py-4 sticky top-0 z-30">
          <h1 className="font-serif text-xl font-bold text-navy">Authors</h1>
          <p className="text-xs text-muted-foreground font-sans">{AUTHORS.length} editorial team members</p>
        </div>

        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {authorsWithCounts.map((author) => (
              <div key={author.id} className="bg-white border border-border rounded-sm p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative shrink-0 w-[52px] h-[52px] rounded-full overflow-hidden">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      sizes="52px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-navy text-lg leading-tight">{author.name}</p>
                    <p className="text-xs text-amber font-sans font-semibold mt-0.5">{author.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="font-serif text-2xl font-bold text-navy">{author.articleCount}</p>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5">Articles</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-2xl font-bold text-navy">{author.totalLikes}</p>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5">Total likes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
