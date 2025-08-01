/**
 * Converts an enum-like string (e.g., MODERATELY_HIGH) to a label-safe value (e.g., Moderately High)
 */
export function enumToLabel(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
