import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateService } from "@/actions/services";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const updateWithId = updateService.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Service</h1>
      <form action={updateWithId} className="flex max-w-xl flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Number</Label>
            <Input name="number" type="number" required defaultValue={service.number} />
          </div>
          <div className="col-span-2">
            <Label>Title</Label>
            <Input name="title" required defaultValue={service.title} />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" required rows={3} defaultValue={service.description} />
        </div>
        <div>
          <Label>Tags (comma-separated)</Label>
          <Input name="tags" defaultValue={service.tags.join(", ")} />
        </div>
        <div>
          <Label>Project URL</Label>
          <Input name="projectUrl" defaultValue={service.projectUrl ?? ""} />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={service.order} />
        </div>
        <ImageUploader name="imageUrl" entity="services" label="Image" defaultValue={service.imageUrl} />
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
