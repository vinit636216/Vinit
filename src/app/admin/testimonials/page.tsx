import { prisma } from "@/lib/prisma";
import { createTestimonial, deleteTestimonial } from "@/actions/testimonials";
import DataTable from "@/components/admin/DataTable";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Testimonials</h1>

      <form action={createTestimonial} className="mb-10 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface p-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <Label>Name</Label>
            <Input name="name" required />
          </div>
          <div>
            <Label>Role</Label>
            <Input name="role" required />
          </div>
          <div>
            <Label>Rating (1-5)</Label>
            <Input name="rating" type="number" min={1} max={5} defaultValue={5} />
          </div>
          <div>
            <Label>Order</Label>
            <Input name="order" type="number" defaultValue={testimonials.length} />
          </div>
        </div>
        <div>
          <Label>Quote</Label>
          <Textarea name="quote" required rows={3} />
        </div>
        <ImageUploader name="avatarUrl" entity="testimonials" label="Avatar" />
        <Button type="submit" className="w-fit">Add Testimonial</Button>
      </form>

      <DataTable
        rows={testimonials}
        editHref={(row) => `/admin/testimonials/${row.id}`}
        deleteAction={deleteTestimonial}
        columns={[
          { label: "Name", render: (r) => r.name },
          { label: "Role", render: (r) => r.role },
          { label: "Rating", render: (r) => r.rating },
          { label: "Order", render: (r) => r.order },
        ]}
      />
    </div>
  );
}
