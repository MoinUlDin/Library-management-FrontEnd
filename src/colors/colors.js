// src/colors.js

export const lightPalette = {
  primary: "#1E3A8A",
  secondary: "#9333EA",
  accent: "#F59E0B",
  background: "#FFFFFF",
  text: "#111827",
  // …and so on
};

export const darkPalette = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  accent: "#FBBF24",
  background: "#1F2937",
  text: "#F9FAFB",
  // …and so on
};

/**
 * Return the palette object for the given mode.
 * @param {"light"|"dark"} mode
 */
export function getPalette(mode) {
  return mode === "dark" ? darkPalette : lightPalette;
}
