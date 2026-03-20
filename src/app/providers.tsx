"use client";

import { I18nProvider } from "@/i18n/context";
import CustomCursor from "@/components/CustomCursor";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <CustomCursor />
      {children}
    </I18nProvider>
  );
}
