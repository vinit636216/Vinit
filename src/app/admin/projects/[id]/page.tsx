import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/actions/projects";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const updateWithId = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Project</h1>
      <form action={updateWithId} className="flex max-w-2xl flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input name="title" required defaultValue={project.title} />
          </div>
          <div>
            <Label>Category</Label>
            <Input name="category" required defaultValue={project.category} />
          </div>
          <div>
            <Label>Type</Label>
            <Input name="type" defaultValue={project.type ?? ""} />
          </div>
          <div>
            <Label>Order</Label>
            <Input name="order" type="number" defaultValue={project.order} />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" rows={3} defaultValue={project.description ?? ""} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input name="tags" defaultValue={project.tags.join(", ")} />
          </div>
          <div>
            <Label>External URL</Label>
            <Input name="externalUrl" defaultValue={project.externalUrl ?? ""} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="featured" name="featured" defaultChecked={project.featured} />
          <Label htmlFor="featured" className="font-normal">Featured (used in Hero)</Label>
        </div>
        <ImageUploader name="coverImageUrl" entity="projects" label="Cover Image" defaultValue={project.coverImageUrl} />
        <div>
          <Label className="mb-1">Gallery / Mockups (up to 6, shown on the project page)</Label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ImageUploader
                key={i}
                name={`gallery${i}`}
                entity="projects"
                defaultValue={project.galleryUrls[i - 1]}
              />
            ))}
          </div>
        </div>
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
