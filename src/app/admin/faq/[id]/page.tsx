import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateFaqItem } from "@/actions/faq";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.faqItem.findUnique({ where: { id } });
  if (!item) notFound();

  const updateWithId = updateFaqItem.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit FAQ</h1>
      <form action={updateWithId} className="flex max-w-xl flex-col gap-4">
        <div>
          <Label>Question</Label>
          <Input name="question" required defaultValue={item.question} />
        </div>
        <div>
          <Label>Answer</Label>
          <Textarea name="answer" required rows={4} defaultValue={item.answer} />
        </div>
        <div className="w-32">
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={item.order} />
        </div>
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
