import { prisma } from "@/lib/prisma";
import { deleteSubscriber } from "@/actions/messages";
import DeleteForm from "@/components/admin/DeleteForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Newsletter Subscribers</h1>

      {subscribers.length === 0 ? (
        <p className="text-sm text-muted">No subscribers yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-white/10">
          <Table>
            <TableHeader>
              <TableRow className="bg-surface hover:bg-surface">
                <TableHead>Email</TableHead>
                <TableHead>Subscribed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-foreground/85">{s.email}</TableCell>
                  <TableCell className="text-muted">
                    {new Date(s.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteForm id={s.id} action={deleteSubscriber} confirmText="Remove this subscriber?" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
