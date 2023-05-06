"use client";

import { api } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import React from "react";
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { Button } from "../ui/buttons/Button";
import { toast } from "../ui/use-toast";

export default function DeleteDialog({ paletteId }: { paletteId: string }) {
  const router = useRouter();
  const ctx = api.useContext();
  const { mutate } = api.palettes.delete.useMutation({
    onSuccess: async () => {
      await ctx.palettes.list.refetch();
      setShowDeleteDialog(false);
      router.push("/app");
      await ctx.palettes.byId.invalidate({ id: paletteId });
      toast({
        description: "Palette has been deleted.",
      });
    }
  });
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <div>
      <Button variant={"destructive"} onClick={() => setShowDeleteDialog(true)}>Delete</Button>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                mutate({ id: paletteId });
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
