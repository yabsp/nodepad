import React from "react"

/**
 * UI_TOKENS
 * Set the style for the whole webapp
 */
export const UI_TOKENS = {
    colors: {
        border: "#AAAAAA",
        textOnLight: "#111111",
        textOnDark: "#FFFFFF",
        mutedTextLight: "rgba(0, 0, 0, 0.6)",
        mutedTextDark: "rgba(255, 255, 255, 0.7)",
        bgLight: "#F6F6F6",
        bgDark: "#1A1A1A",
        surfaceLight: "#FFFFFF",
        surfaceDark: "#2B2B2B",
        buttonBgLight: "#EDEDED",
        buttonBgDark: "#2B2B2B",
        buttonActiveBgLight: "rgba(0, 0, 0, 0.22)",  // light, soft grey
        buttonActiveBgDark: "rgba(255, 255, 255, 0.35)", // dark, subtle highlight

    },
    radii: {
        sm: 8,
    },
    spacing: {
        xs: 6,
        sm: 8,
        md: 12,
        lg: 16,
    },
    sizes: {
        sidebarWidth: 240,
        editorMaxWidth: 900,
        borderWidth: 1.5,
    },
} as const

/**
 * Detect whether the user prefers dark mode.
 * Uses the browser's prefers-color-scheme media query.
 */
export const prefersDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

/**
 * Shared app-level styles to avoid duplication across components.
 */
export const uiStyles = {
    appShell: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: prefersDarkMode
            ? UI_TOKENS.colors.bgDark
            : UI_TOKENS.colors.bgLight,
        color: prefersDarkMode
            ? UI_TOKENS.colors.textOnDark
            : UI_TOKENS.colors.textOnLight,
    } as const,

    sidebar: {
        width: UI_TOKENS.sizes.sidebarWidth,
        borderRight: `${UI_TOKENS.sizes.borderWidth}px solid ${UI_TOKENS.colors.border}`,
        padding: UI_TOKENS.spacing.md,
        fontSize: 14,
    } as const,

    sidebarHeader: {
        marginBottom: UI_TOKENS.spacing.md,
    } as const,

    mutedLabel: {
        fontSize: 14,
        opacity: 0.7,
    } as const,

    strongText: {
        fontWeight: 600,
    } as const,

    fileList: {
        display: "flex",
        flexDirection: "column",
        gap: UI_TOKENS.spacing.xs,
        marginTop: 12
    } as const,

    editorPanel: {
        flex: 1,
        padding: UI_TOKENS.spacing.lg,
    } as const,

    editorContainer: {
        maxWidth: UI_TOKENS.sizes.editorMaxWidth,
        height: "100%",
    } as const,

    toolbarRow: {
        display: "flex",
        gap: UI_TOKENS.spacing.sm,
        marginBottom: UI_TOKENS.spacing.md,
    } as const,
} as const

/**
 * Styles for the start / join page.
 * Kept separate from editor styles to avoid coupling UI states.
 */
export const startPageStyles = {
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        background: prefersDarkMode
            ? UI_TOKENS.colors.bgDark
            : UI_TOKENS.colors.bgLight,
        color: prefersDarkMode
            ? UI_TOKENS.colors.textOnDark
            : UI_TOKENS.colors.textOnLight,
    } as const,

    card: {
        width: 360,
        padding: UI_TOKENS.spacing.lg,
        borderRadius: UI_TOKENS.radii.sm,
        border: `1px solid ${UI_TOKENS.colors.border}`,
        background: prefersDarkMode
            ? UI_TOKENS.colors.surfaceDark
            : UI_TOKENS.colors.surfaceLight,
        display: "flex",
        flexDirection: "column",
        gap: UI_TOKENS.spacing.md,
    } as const,

    title: {
        fontSize: 28,
        fontWeight: 700,
    } as const,

    sectionLabel: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        opacity: 0.6,
        marginTop: UI_TOKENS.spacing.sm,
    } as const,

    input: {
        padding: "8px 10px",
        borderRadius: UI_TOKENS.radii.sm,
        border: `1px solid ${UI_TOKENS.colors.border}`,
        background: prefersDarkMode
            ? UI_TOKENS.colors.bgDark
            : UI_TOKENS.colors.surfaceLight,
        color: prefersDarkMode
            ? UI_TOKENS.colors.textOnDark
            : UI_TOKENS.colors.textOnLight,
    } as const,

    buttonRow: {
        display: "flex",
        gap: UI_TOKENS.spacing.sm,
        marginTop: UI_TOKENS.spacing.md,
    } as const,
}

/**
 * Builds a consistent button style.
 *
 * @param options - Button appearance options
 * @param options.active - Whether the button is in an "active/toggled" state
 * @param options.fullWidth - Whether the button should stretch to 100% width
 * @returns Inline style object suitable for <button style={...} />
 */
export function buttonStyle(options?: { active?: boolean; fullWidth?: boolean }): React.CSSProperties {
    const active = Boolean(options?.active)
    const fullWidth = Boolean(options?.fullWidth)

    return {
        width: fullWidth ? "100%" : undefined,
        padding: "6px 10px",
        borderRadius: UI_TOKENS.radii.sm,
        border: `1px solid ${UI_TOKENS.colors.border}`,
        background: active
            ? prefersDarkMode
                ? UI_TOKENS.colors.buttonActiveBgDark
                : UI_TOKENS.colors.buttonActiveBgLight
            : prefersDarkMode
                ? UI_TOKENS.colors.buttonBgDark
                : UI_TOKENS.colors.buttonBgLight,
        cursor: "pointer",
        color: prefersDarkMode
            ? UI_TOKENS.colors.textOnDark
            : UI_TOKENS.colors.textOnLight,
    }
}

/**
 * Style for file list item buttons in the sidebar.
 *
 * @param active - Whether the file is currently selected
 * @returns Inline style object for the sidebar file item button
 */
export function sidebarFileButtonStyle(active: boolean): React.CSSProperties {
    return {
        textAlign: "left",
        padding: "8px 10px",
        borderRadius: UI_TOKENS.radii.sm,
        background: active
            ? prefersDarkMode
                ? UI_TOKENS.colors.buttonActiveBgDark
                : UI_TOKENS.colors.buttonActiveBgLight
            : prefersDarkMode
                ? UI_TOKENS.colors.buttonBgDark
                : UI_TOKENS.colors.buttonBgLight,
        cursor: "pointer",
        border: `1px solid ${UI_TOKENS.colors.border}`,
        color: prefersDarkMode
            ? UI_TOKENS.colors.textOnDark
            : UI_TOKENS.colors.textOnLight,
    }
}

/**
 * Consistent divider style (<hr>).
 *
 * @returns Inline style object for <hr style={...} />
 */
export function dividerStyle(): React.CSSProperties {
    return {
        border: "none",
        borderTop: `1px solid ${UI_TOKENS.colors.border}`,
        margin: `${UI_TOKENS.spacing.md}px 0`,
    }
}
