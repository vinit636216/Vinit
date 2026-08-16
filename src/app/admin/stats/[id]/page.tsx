import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateStat } from "@/actions/stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stat = await prisma.stat.findUnique({ where: { id } });
  if (!stat) notFound();

  const updateWithId = updateStat.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Stat</h1>
      <form action={updateWithId} className="flex max-w-md flex-col gap-4">
        <div>
          <Label>Label</Label>
          <Input name="label" required defaultValue={stat.label} />
        </div>
        <div>
          <Label>Value</Label>
          <Input name="value" type="number" required defaultValue={stat.value} />
        </div>
        <div>
          <Label>Suffix</Label>
          <Input name="suffix" defaultValue={stat.suffix ?? ""} />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={stat.order} />
        </div>
        <Button type="submit" className="justify-center">Save</Button>
      </form>
    </div>
  );
}
