import { prisma } from "@/lib/prisma";
import { createFaqItem, deleteFaqItem } from "@/actions/faq";
import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">FAQ</h1>

      <form action={createFaqItem} className="mb-10 flex flex-col gap-4 rounded-lg border border-white/10 bg-surface p-5">
        <div>
          <Label>Question</Label>
          <Input name="question" required />
        </div>
        <div>
          <Label>Answer</Label>
          <Textarea name="answer" required rows={3} />
        </div>
        <div className="w-32">
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={items.length} />
        </div>
        <Button type="submit" className="w-fit">Add FAQ</Button>
      </form>

      <DataTable
        rows={items}
        editHref={(row) => `/admin/faq/${row.id}`}
        deleteAction={deleteFaqItem}
        columns={[{ label: "Question", render: (r) => r.question }, { label: "Order", render: (r) => r.order }]}
      />
    </div>
  );
}
