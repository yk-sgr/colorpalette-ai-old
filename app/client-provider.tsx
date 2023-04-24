"use client";

import {api} from "@/lib/api/client";
import {ClerkProvider} from "@clerk/nextjs/app-beta/client";
import {PropsWithChildren} from 'react';
import * as process from 'process';

export function ClientProviders({children}: PropsWithChildren) {
  return (
    <ClerkProvider appearance={{
      variables: {
        colorPrimary: "hsl(283 56% 45%)",
      }
    }} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
      <api.Provider>{children}</api.Provider>
    </ClerkProvider>
  );
}
