import { prisma } from "@/lib/prisma";
import { createAchievement, deleteAchievement } from "@/actions/achievements";
import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminAchievementsPage() {
  const achievements = await prisma.achievement.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Achievements</h1>

      <form action={createAchievement} className="mb-10 grid grid-cols-2 gap-4 rounded-lg border border-white/10 bg-surface p-5 md:grid-cols-5 md:items-end">
        <div className="col-span-2">
          <Label>Title</Label>
          <Input name="title" required />
        </div>
        <div>
          <Label>Issuer</Label>
          <Input name="issuer" />
        </div>
        <div>
          <Label>Year</Label>
          <Input name="year" type="number" />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={achievements.length} />
        </div>
        <Button type="submit" className="col-span-2 md:col-span-5 w-fit">Add Achievement</Button>
      </form>

      <DataTable
        rows={achievements}
        editHref={(row) => `/admin/achievements/${row.id}`}
        deleteAction={deleteAchievement}
        columns={[
          { label: "Title", render: (r) => r.title },
          { label: "Issuer", render: (r) => r.issuer ?? "" },
          { label: "Year", render: (r) => r.year ?? "" },
          { label: "Order", render: (r) => r.order },
        ]}
      />
    </div>
  );
}
