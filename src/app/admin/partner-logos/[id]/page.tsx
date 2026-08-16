import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePartnerLogo } from "@/actions/partnerLogos";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function EditPartnerLogoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const logo = await prisma.partnerLogo.findUnique({ where: { id } });
  if (!logo) notFound();

  const updateWithId = updatePartnerLogo.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Partner Logo</h1>
      <form action={updateWithId} className="flex max-w-md flex-col gap-4">
        <div>
          <Label>Name</Label>
          <Input name="name" required defaultValue={logo.name} />
        </div>
        <div>
          <Label>Section</Label>
          <Select name="section" defaultValue={logo.section}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trusted">Trusted By (Home)</SelectItem>
              <SelectItem value="experience_checkerboard">Experience Grid (About)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Link URL</Label>
          <Input name="linkUrl" defaultValue={logo.linkUrl ?? ""} />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={logo.order} />
        </div>
        <ImageUploader name="logoUrl" entity="logos" label="Logo" defaultValue={logo.logoUrl} />
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
