import { prisma } from "@/lib/prisma";
import { createProject, deleteProject } from "@/actions/projects";
import DataTable from "@/components/admin/DataTable";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Projects</h1>

      <form action={createProject} className="mb-10 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface p-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <Label>Title</Label>
            <Input name="title" required placeholder="Lumio" />
          </div>
          <div>
            <Label>Category</Label>
            <Input name="category" required placeholder="Design" />
          </div>
          <div>
            <Label>Type</Label>
            <Input name="type" placeholder="UI/UX" />
          </div>
          <div>
            <Label>Order</Label>
            <Input name="order" type="number" defaultValue={projects.length} />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" rows={2} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input name="tags" placeholder="SaaS, Dashboard" />
          </div>
          <div>
            <Label>External URL</Label>
            <Input name="externalUrl" placeholder="https://..." />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="featured" name="featured" />
          <Label htmlFor="featured" className="font-normal">Featured (used in Hero)</Label>
        </div>
        <ImageUploader name="coverImageUrl" entity="projects" label="Cover Image" />
        <div>
          <Label className="mb-1">Gallery / Mockups (up to 6, shown on the project page)</Label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ImageUploader key={i} name={`gallery${i}`} entity="projects" />
            ))}
          </div>
        </div>
        <Button type="submit" className="w-fit">Add Project</Button>
      </form>

      <DataTable
        rows={projects}
        editHref={(row) => `/admin/projects/${row.id}`}
        deleteAction={deleteProject}
        columns={[
          { label: "Title", render: (r) => r.title },
          { label: "Category", render: (r) => r.category },
          { label: "Featured", render: (r) => (r.featured ? "Yes" : "") },
          { label: "Order", render: (r) => r.order },
        ]}
      />
    </div>
  );
}
