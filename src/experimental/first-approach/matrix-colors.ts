/**
 * Gibt eine Tailwind-Background-Farbklasse basierend auf einer Zahl im Bereich von -0.9 bis 0.9 zurück.
 * @param value Eine Zahl zwischen -0.9 und 0.9.
 * @returns Eine Tailwind-Background-Farbklasse.
 */
export function getTailwindBgClass(value: number): string {
  if (value < -0.9 || value > 0.9) {
    throw new Error("Value must be between -0.9 and 0.9. Value is: " + value);
  }

  // Skalieren: Zahl in den Bereich 1 bis 5 umwandeln
  const scale = Math.round(Math.abs(value) * 10);

  if (value > 0) {
    return `bg-green-${scale * 100}`;
  } else if (value < 0) {
    return `bg-red-${scale * 100}`;
  } else {
    return "";
  }
}
