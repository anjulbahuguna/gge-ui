"use client";

import * as React from "react";
import { useState, useActionState } from "react";
import { cn } from "./lib/cn";
import { SectionHeader } from "./section-header";
import { Button } from "./button";

// The workhorse: a section that toggles read ↔ edit IN PLACE. Read shows
// `children`; "Edit" swaps to a form of `editFields` submitting the server
// `action` (which should revalidate/redirect on success and return
// { error } on failure — incl. 403 / 409 optimistic-lock). Non-editable
// sections omit `action` and may pass a `headerAction` (e.g. a "+ Add" link).
export interface EditableSectionState {
  error?: string;
}
const noop = async (): Promise<EditableSectionState> => ({});

export function EditableSection({
  title,
  action,
  editFields,
  headerAction,
  children,
  className,
}: {
  title: string;
  action?: (prev: EditableSectionState, fd: FormData) => Promise<EditableSectionState>;
  editFields?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState<EditableSectionState, FormData>(
    action ?? noop,
    {},
  );
  const canEdit = !!action && !!editFields;

  return (
    <section data-slot="editable-section" className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <SectionHeader>{title}</SectionHeader>
        {!editing &&
          (canEdit ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm font-medium text-primary hover:underline"
            >
              Edit
            </button>
          ) : (
            headerAction
          ))}
      </div>

      {editing ? (
        <form action={formAction} className="space-y-4 rounded-2xl bg-card p-4 ring-1 ring-border">
          {editFields}
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? "Saving…" : "Save"}
            </Button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-sm text-muted-foreground hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">{children}</div>
      )}
    </section>
  );
}
