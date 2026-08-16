import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateAchievement } from "@/actions/achievements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const achievement = await prisma.achievement.findUnique({ where: { id } });
  if (!achievement) notFound();

  const updateWithId = updateAchievement.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Edit Achievement</h1>
      <form action={updateWithId} className="flex max-w-md flex-col gap-4">
        <div>
          <Label>Title</Label>
          <Input name="title" required defaultValue={achievement.title} />
        </div>
        <div>
          <Label>Issuer</Label>
          <Input name="issuer" defaultValue={achievement.issuer ?? ""} />
        </div>
        <div>
          <Label>Year</Label>
          <Input name="year" type="number" defaultValue={achievement.year ?? ""} />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" rows={2} defaultValue={achievement.description ?? ""} />
        </div>
        <div>
          <Label>Order</Label>
          <Input name="order" type="number" defaultValue={achievement.order} />
        </div>
        <Button type="submit" className="w-fit">Save</Button>
      </form>
    </div>
  );
}
