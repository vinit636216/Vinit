import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBlogPost } from "@/actions/blog";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const updateWithId = updateBlogPost.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Post</h1>
      <form action={updateWithId} className="flex max-w-2xl flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div>
            <Label>Title</Label>
            <Input name="title" required defaultValue={post.title} />
          </div>
          <div>
            <Label>Category</Label>
            <Input name="category" required defaultValue={post.category} />
          </div>
          <div>
            <Label>Author</Label>
            <Input name="author" defaultValue={post.author} />
          </div>
        </div>
        <div>
          <Label>Excerpt</Label>
          <Textarea name="excerpt" rows={2} defaultValue={post.excerpt ?? ""} />
        </div>
        <div>
          <Label>Content (Markdown)</Label>
          <Textarea name="content" required rows={12} defaultValue={post.content} className="font-mono" />
        </div>
        <ImageUploader name="coverImageUrl" entity="blog" label="Cover Image" defaultValue={post.coverImageUrl} />
        <div className="flex items-center gap-2">
          <Checkbox id="published" name="published" defaultChecked={post.published} />
          <Label htmlFor="published" className="font-normal">Published</Label>
        </div>
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
