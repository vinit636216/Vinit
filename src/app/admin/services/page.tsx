import { prisma } from "@/lib/prisma";
import { createService, deleteService } from "@/actions/services";
import DataTable from "@/components/admin/DataTable";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Services</h1>

      <form action={createService} className="mb-10 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface p-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <Label>Number</Label>
            <Input name="number" type="number" required defaultValue={services.length + 1} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label>Title</Label>
            <Input name="title" required placeholder="Product Design" />
          </div>
          <div>
            <Label>Order</Label>
            <Input name="order" type="number" defaultValue={services.length} />
          </div>
          <div>
            <Label>Project URL</Label>
            <Input name="projectUrl" placeholder="https://..." />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" required rows={2} />
        </div>
        <div>
          <Label>Tags (comma-separated)</Label>
          <Input name="tags" placeholder="Design Systems, Motion Design" />
        </div>
        <ImageUploader name="imageUrl" entity="services" label="Image" />
        <Button type="submit" className="w-fit">Add Service</Button>
      </form>

      <DataTable
        rows={services}
        editHref={(row) => `/admin/services/${row.id}`}
        deleteAction={deleteService}
        columns={[
          { label: "#", render: (r) => String(r.number).padStart(3, "0") },
          { label: "Title", render: (r) => r.title },
          { label: "Order", render: (r) => r.order },
        ]}
      />
    </div>
  );
}
