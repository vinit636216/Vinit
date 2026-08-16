import { prisma } from "@/lib/prisma";
import { createPartnerLogo, deletePartnerLogo } from "@/actions/partnerLogos";
import DataTable from "@/components/admin/DataTable";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function AdminPartnerLogosPage() {
  const logos = await prisma.partnerLogo.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Partner Logos</h1>

      <form action={createPartnerLogo} className="mb-10 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface p-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <Label>Name</Label>
            <Input name="name" required />
          </div>
          <div>
            <Label>Section</Label>
            <Select name="section" defaultValue="trusted">
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
            <Input name="linkUrl" placeholder="https://..." />
          </div>
          <div>
            <Label>Order</Label>
            <Input name="order" type="number" defaultValue={logos.length} />
          </div>
        </div>
        <ImageUploader name="logoUrl" entity="logos" label="Logo" />
        <Button type="submit" className="w-fit">Add Logo</Button>
      </form>

      <DataTable
        rows={logos}
        editHref={(row) => `/admin/partner-logos/${row.id}`}
        deleteAction={deletePartnerLogo}
        columns={[
          { label: "Name", render: (r) => r.name },
          { label: "Section", render: (r) => r.section },
          { label: "Order", render: (r) => r.order },
        ]}
      />
    </div>
  );
}
