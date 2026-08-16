import Link from "next/link";
import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteForm from "./DeleteForm";

type Column<T> = {
  label: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export default function DataTable<T extends { id: string }>({
  rows,
  columns,
  editHref,
  deleteAction,
  emptyLabel = "Nothing here yet.",
}: {
  rows: T[];
  columns: Column<T>[];
  editHref: (row: T) => string;
  deleteAction: (formData: FormData) => Promise<void>;
  emptyLabel?: string;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface hover:bg-surface">
            {columns.map((col) => (
              <TableHead key={col.label} className={col.className}>
                {col.label}
              </TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={col.label} className={`text-foreground/85 ${col.className ?? ""}`}>
                  {col.render(row)}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={editHref(row)}>Edit</Link>
                  </Button>
                  <DeleteForm id={row.id} action={deleteAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
