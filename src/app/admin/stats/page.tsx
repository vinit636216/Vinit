import { prisma } from "@/lib/prisma";
import { createStat, deleteStat } from "@/actions/stats";
import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminStatsPage() {
  const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Stats</h1>

      <form action={createStat} className="mb-10 grid grid-cols-2 gap-4 rounded-lg border border-white/10 bg-surface p-5 md:grid-cols-5 md:items-end">
        <div>
          <Label>Label</Label>
          <Input name="label" required placeholder="Projects Completed" />
        </div>
        <div>
          <Label>Value</Label>
          <Input name="value" type="number" required placeholder="24" />
        </div>
        <div>
          <Label>Suffix</Label>
          <Input name="suffix" placeholder="+" />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={stats.length} />
        </div>
        <Button type="submit">Add Stat</Button>
      </form>

      <DataTable
        rows={stats}
        editHref={(row) => `/admin/stats/${row.id}`}
        deleteAction={deleteStat}
        columns={[
          { label: "Label", render: (r) => r.label },
          { label: "Value", render: (r) => `${r.value}${r.suffix ?? ""}` },
          { label: "Order", render: (r) => r.order },
        ]}
      />
    </div>
  );
}
