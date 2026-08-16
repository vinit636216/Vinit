import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/actions/experience";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function toDateInput(date: Date | null) {
  return date ? new Date(date).toISOString().slice(0, 10) : "";
}

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await prisma.experienceEntry.findUnique({ where: { id } });
  if (!entry) notFound();

  const updateWithId = updateExperience.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Experience</h1>
      <form action={updateWithId} className="flex max-w-xl flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company</Label>
            <Input name="company" required defaultValue={entry.company} />
          </div>
          <div>
            <Label>Role</Label>
            <Input name="role" required defaultValue={entry.role} />
          </div>
          <div>
            <Label>Start Date</Label>
            <Input name="startDate" type="date" required defaultValue={toDateInput(entry.startDate)} />
          </div>
          <div>
            <Label>End Date (blank = Present)</Label>
            <Input name="endDate" type="date" defaultValue={toDateInput(entry.endDate)} />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" rows={3} defaultValue={entry.description ?? ""} />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={entry.order} />
        </div>
        <ImageUploader name="photoUrl" entity="experience" label="Photo" defaultValue={entry.photoUrl} />
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
