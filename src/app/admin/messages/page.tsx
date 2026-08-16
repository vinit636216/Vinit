import { prisma } from "@/lib/prisma";
import { markMessageRead, deleteMessage } from "@/actions/messages";
import DeleteForm from "@/components/admin/DeleteForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Messages</h1>

      {messages.length === 0 ? (
        <p className="text-sm text-muted">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-lg border p-4 ${
                m.read ? "border-white/10 bg-surface" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{m.name}</p>
                    <a href={`mailto:${m.email}`} className="text-xs text-muted underline">
                      {m.email}
                    </a>
                  </div>
                  {!m.read && <Badge variant="destructive">New</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {new Date(m.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {!m.read && (
                    <form action={markMessageRead}>
                      <input type="hidden" name="id" value={m.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        Mark read
                      </Button>
                    </form>
                  )}
                  <DeleteForm id={m.id} action={deleteMessage} confirmText="Delete this message?" />
                </div>
              </div>
              <p className="text-sm text-foreground/80">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
