import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTestimonial } from "@/actions/testimonials";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const updateWithId = updateTestimonial.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Testimonial</h1>
      <form action={updateWithId} className="flex max-w-xl flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Name</Label>
            <Input name="name" required defaultValue={testimonial.name} />
          </div>
          <div>
            <Label>Role</Label>
            <Input name="role" required defaultValue={testimonial.role} />
          </div>
          <div>
            <Label>Rating (1-5)</Label>
            <Input name="rating" type="number" min={1} max={5} defaultValue={testimonial.rating} />
          </div>
        </div>
        <div>
          <Label>Quote</Label>
          <Textarea name="quote" required rows={3} defaultValue={testimonial.quote} />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={testimonial.order} />
        </div>
        <ImageUploader name="avatarUrl" entity="testimonials" label="Avatar" defaultValue={testimonial.avatarUrl} />
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
