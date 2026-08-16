"use client";

import { useActionState } from "react";
import { changePassword, type ChangePasswordState } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ChangePasswordState = { status: "idle" };

export default function ChangePasswordPage() {
  const [state, formAction, pending] = useActionState(changePassword, initialState);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Change Password</h1>

      <form action={formAction} className="flex max-w-sm flex-col gap-4">
        <div>
          <Label>Current Password</Label>
          <Input name="currentPassword" type="password" required />
        </div>
        <div>
          <Label>New Password</Label>
          <Input name="newPassword" type="password" required minLength={8} />
        </div>
        <div>
          <Label>Confirm New Password</Label>
          <Input name="confirmPassword" type="password" required minLength={8} />
        </div>

        {state.status !== "idle" && (
          <p className={`text-sm ${state.status === "success" ? "text-foreground" : "text-primary"}`}>
            {state.message}
          </p>
        )}

        <Button type="submit" disabled={pending} className="w-fit">
          {pending ? "Saving..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
