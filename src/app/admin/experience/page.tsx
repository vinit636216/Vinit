import { prisma } from "@/lib/prisma";
import { createExperience, deleteExperience } from "@/actions/experience";
import DataTable from "@/components/admin/DataTable";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminExperiencePage() {
  const entries = await prisma.experienceEntry.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Experience</h1>

      <form action={createExperience} className="mb-10 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface p-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <Label>Company</Label>
            <Input name="company" required />
          </div>
          <div>
            <Label>Role</Label>
            <Input name="role" required />
          </div>
          <div>
            <Label>Start Date</Label>
            <Input name="startDate" type="date" required />
          </div>
          <div>
            <Label>End Date (blank = Present)</Label>
            <Input name="endDate" type="date" />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" rows={2} />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={entries.length} />
        </div>
        <ImageUploader name="photoUrl" entity="experience" label="Photo" />
        <Button type="submit" className="w-fit">Add Entry</Button>
      </form>

      <DataTable
        rows={entries}
        editHref={(row) => `/admin/experience/${row.id}`}
        deleteAction={deleteExperience}
        columns={[
          { label: "Company", render: (r) => r.company },
          { label: "Role", render: (r) => r.role },
          {
            label: "Dates",
            render: (r) =>
              `${new Date(r.startDate).getFullYear()}–${r.endDate ? new Date(r.endDate).getFullYear() : "Present"}`,
          },
          { label: "Order", render: (r) => r.order },
        ]}
      />
    </div>
  );
}
