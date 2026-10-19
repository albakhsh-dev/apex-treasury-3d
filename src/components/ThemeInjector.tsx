"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site.config";

export function ThemeInjector() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const { theme } = siteConfig;

    root.style.setProperty("--brand-primary", theme.primary);
    root.style.setProperty("--brand-primary-hover", theme.primaryHover);
    root.style.setProperty("--brand-primary-glow", theme.primaryGlow);
    root.style.setProperty("--brand-secondary", theme.secondary);
    root.style.setProperty("--brand-accent", theme.accent);
    root.style.setProperty("--brand-accent-glow", theme.accentGlow);
    root.style.setProperty("--brand-bg", theme.background);
    root.style.setProperty("--brand-surface", theme.backgroundElevated);
    root.style.setProperty("--brand-glass", theme.backgroundGlass);
    root.style.setProperty("--brand-border", theme.border);
    root.style.setProperty("--brand-border-hover", theme.borderHover);
    root.style.setProperty("--brand-text", theme.textPrimary);
    root.style.setProperty("--brand-muted", theme.textSecondary);
  }, []);

  // Server-rendered inline style to prevent flash of default theme colors
  const cssVariables = `
    :root {
      --brand-primary: ${siteConfig.theme.primary};
      --brand-primary-hover: ${siteConfig.theme.primaryHover};
      --brand-primary-glow: ${siteConfig.theme.primaryGlow};
      --brand-secondary: ${siteConfig.theme.secondary};
      --brand-accent: ${siteConfig.theme.accent};
      --brand-accent-glow: ${siteConfig.theme.accentGlow};
      --brand-bg: ${siteConfig.theme.background};
      --brand-surface: ${siteConfig.theme.backgroundElevated};
      --brand-glass: ${siteConfig.theme.backgroundGlass};
      --brand-border: ${siteConfig.theme.border};
      --brand-border-hover: ${siteConfig.theme.borderHover};
      --brand-text: ${siteConfig.theme.textPrimary};
      --brand-muted: ${siteConfig.theme.textSecondary};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssVariables }} />;
}
