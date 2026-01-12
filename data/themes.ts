export const THEMES = {
    AURORA_INK: {
        background: "#0b1020",
        foreground: "#f4f6ff",

        card: "#121a33",
        cardForeground: "#f4f6ff",

        popover: "#121a33",
        popoverForeground: "#f4f6ff",

        primary: "#7c5cff",
        primaryRgb: "124, 92, 255",
        primaryForeground: "#0b1020",

        secondary: "#1a2547",
        secondaryForeground: "#a8b6ff",

        muted: "#141d3a",
        mutedForeground: "#a9b2d6",

        accent: "#2f6ec7",
        accentForeground: "#0b1020",

        destructive: "#ff4d6d",

        border: "#202c56",
        input: "#202c56",
        ring: "#7c5cff",
        radius: "0.9rem",

        chart: ["#7c5cff", "#2f6ec7", "#ff8fab", "#ff4d6d", "#6a8dff"],
    },

    DUSTY_ORCHID: {
        background: "#fbf7fb",
        foreground: "#221827",

        card: "#ffffff",
        cardForeground: "#221827",

        popover: "#ffffff",
        popoverForeground: "#221827",

        primary: "#b24c7c",
        primaryRgb: "178, 76, 124",
        primaryForeground: "#ffffff",

        secondary: "#f1e6f0",
        secondaryForeground: "#221827",

        muted: "#efe2ed",
        mutedForeground: "#6b5871",

        accent: "#3aa6a6",
        accentForeground: "#0f172a",

        destructive: "#e23a53",

        border: "#e4d6e2",
        input: "#ffffff",
        ring: "#b24c7c",
        radius: "0.75rem",

        chart: ["#b24c7c", "#3aa6a6", "#f0a24f", "#6a4fb3", "#2f6fdf"],
    },

    CITRUS_SLATE: {
        background: "#0f141a",
        foreground: "#f5f7fb",

        card: "#151c24",
        cardForeground: "#f5f7fb",

        popover: "#151c24",
        popoverForeground: "#f5f7fb",

        primary: "#ff7a2f",
        primaryRgb: "255, 122, 47",
        primaryForeground: "#0f141a",

        secondary: "#1f2a36",
        secondaryForeground: "#f5f7fb",

        muted: "#18212c",
        mutedForeground: "#aab5c3",

        accent: "#7dd3ff",
        accentForeground: "#0f141a",

        destructive: "#ff3b5c",

        border: "#2a394a",
        input: "#2a394a",
        ring: "#ff7a2f",
        radius: "0.6rem",

        chart: ["#ff7a2f", "#7dd3ff", "#2bc8b0", "#8a4fff", "#ff3b5c"],
    },

    MOSS_PARCHMENT: {
        background: "#f7f5ef",
        foreground: "#1d261f",

        card: "#ffffff",
        cardForeground: "#1d261f",

        popover: "#ffffff",
        popoverForeground: "#1d261f",

        primary: "#2f7d4a",
        primaryRgb: "47, 125, 74",
        primaryForeground: "#ffffff",

        secondary: "#e7efe5",
        secondaryForeground: "#1d261f",

        muted: "#e3eadf",
        mutedForeground: "#5f6f63",

        accent: "#b26d2d",
        accentForeground: "#ffffff",

        destructive: "#d94444",

        border: "#d6e0d4",
        input: "#ffffff",
        ring: "#2f7d4a",
        radius: "1rem",

        chart: ["#2f7d4a", "#b26d2d", "#2b6cb0", "#8a4fff", "#d94444"],
    },

    POLAR_MINT: {
        background: "#f2fbff",
        foreground: "#0d1b2a",

        card: "#ffffff",
        cardForeground: "#0d1b2a",

        popover: "#ffffff",
        popoverForeground: "#0d1b2a",

        primary: "#00a6a6",
        primaryRgb: "0, 166, 166",
        primaryForeground: "#ffffff",

        secondary: "#e3f6f8",
        secondaryForeground: "#0d1b2a",

        muted: "#d7f0f4",
        mutedForeground: "#3e6470",

        accent: "#5b7cfa",
        accentForeground: "#ffffff",

        destructive: "#ff4b4b",

        border: "#cfe6ee",
        input: "#ffffff",
        ring: "#00a6a6",
        radius: "0.85rem",

        chart: ["#00a6a6", "#5b7cfa", "#ffb020", "#ff4b4b", "#7a52cc"],
    },

    OBSIDIAN_BLOOM: {
        background: "#090a0f",
        foreground: "#f5f6fa",

        card: "#12131a",
        cardForeground: "#f5f6fa",

        popover: "#12131a",
        popoverForeground: "#f5f6fa",

        primary: "#c084fc",
        primaryRgb: "192, 132, 252",
        primaryForeground: "#090a0f",

        secondary: "#1a1b24",
        secondaryForeground: "#f5f6fa",

        muted: "#151620",
        mutedForeground: "#a1a1c2",

        accent: "#38bdf8",
        accentForeground: "#090a0f",

        destructive: "#ff4b6b",

        border: "#26283a",
        input: "#26283a",
        ring: "#c084fc",
        radius: "0.9rem",

        chart: ["#c084fc", "#38bdf8", "#22c55e", "#ff4b6b", "#facc15"],
    },
} as const;

export const THEME_NAME_LIST = [
    "AURORA_INK",
    "DUSTY_ORCHID",
    "CITRUS_SLATE",
    "MOSS_PARCHMENT",
    "POLAR_MINT",
    "OBSIDIAN_BLOOM",
] as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];



export function themeToCssVars(theme: any) {
    return `
:root {
    --background: ${theme.background};
    --foreground: ${theme.foreground};

    --card: ${theme.card};
    --card-foreground: ${theme.cardForeground};

    --popover: ${theme.popover};
    --popover-foreground: ${theme.popoverForeground};

    --primary: ${theme.primary};
    --primary-rgb: ${theme.primaryRgb};
    --primary-foreground: ${theme.primaryForeground};

    --secondary: ${theme.secondary};
    --secondary-foreground: ${theme.secondaryForeground};

    --muted: ${theme.muted};
    --muted-foreground: ${theme.mutedForeground};

    --accent: ${theme.accent};
    --accent-foreground: ${theme.accentForeground};

    --destructive: ${theme.destructive};

    --border: ${theme.border};
    --input: ${theme.input};
    --ring: ${theme.ring};

    --radius: ${theme.radius};

    /* charts */
    --chart-1: ${theme.chart?.[0]};
    --chart-2: ${theme.chart?.[1]};
    --chart-3: ${theme.chart?.[2]};
    --chart-4: ${theme.chart?.[3]};
    --chart-5: ${theme.chart?.[4]};
}
`;
}
