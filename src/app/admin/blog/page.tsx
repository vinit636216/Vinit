import { prisma } from "@/lib/prisma";
import { createBlogPost, deleteBlogPost } from "@/actions/blog";
import DataTable from "@/components/admin/DataTable";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Blog</h1>

      <form action={createBlogPost} className="mb-10 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface p-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div>
            <Label>Title</Label>
            <Input name="title" required />
          </div>
          <div>
            <Label>Category</Label>
            <Input name="category" required />
          </div>
          <div>
            <Label>Author</Label>
            <Input name="author" defaultValue="Vinit V Balgum" />
          </div>
        </div>
        <div>
          <Label>Excerpt</Label>
          <Textarea name="excerpt" rows={2} />
        </div>
        <div>
          <Label>Content (Markdown)</Label>
          <Textarea name="content" required rows={8} className="font-mono" />
        </div>
        <ImageUploader name="coverImageUrl" entity="blog" label="Cover Image" />
        <div className="flex items-center gap-2">
          <Checkbox id="published" name="published" />
          <Label htmlFor="published" className="font-normal">Published</Label>
        </div>
        <Button type="submit" className="w-fit">Add Post</Button>
      </form>

      <DataTable
        rows={posts}
        editHref={(row) => `/admin/blog/${row.id}`}
        deleteAction={deleteBlogPost}
        columns={[
          { label: "Title", render: (r) => r.title },
          { label: "Category", render: (r) => r.category },
          { label: "Published", render: (r) => (r.published ? "Yes" : "Draft") },
        ]}
      />
    </div>
  );
}
