"use client";

import { api } from "@/lib/api/client";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function Favorite({ id, isFavorite }: { id: string, isFavorite: boolean }) {
  const ctx = api.useContext();
  const { mutate: favorize } = api.palettes.favorize.useMutation({
    onMutate: () => {
      setFavorite(true);
      ctx.palettes.list.refetch();
    },
    onError: () => {
      setFavorite(false);
    }
  });
  const { mutate: unfavorize } = api.palettes.unfavorize.useMutation({
    onMutate: () => {
      setFavorite(false);
    },
    onError: () => {
      setFavorite(true);
    }
  });

  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  function handleFavorite() {
    if (favorite) {
      unfavorize({
        id
      });
      setFavorite(false);
    } else {
      favorize({
        id
      });
      setFavorite(true);
    }
  }

  return (
    <button onClick={() => handleFavorite()}>
      <Heart className={favorite ? "fill-destructive/80 text-destructive transition duration-100 ease-in hover:fill-destructive/60 hover:text-destructive/80 hover:transition hover:duration-75 hover:ease-out active:fill-destructive/70 active:text-destructive/90" : "transition duration-100 ease-in hover:text-foreground/60 hover:transition hover:duration-75 hover:ease-out active:text-foreground/90"} />
    </button>
  )
}
