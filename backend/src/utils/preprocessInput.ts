/**
 * preprocessInput
 * - trims whitespace
 * - normalizes repeated filler word "야야" at the start
 */
export function preprocessInput(input: string): string {
  const trimmed = input.trim();

  // If command starts with one or more "야야", remove them and normalize spacing.
  const withoutWakeWord = trimmed.replace(/^(야야\s*)+/u, "").trim();

  // If there is no command after wake word, return a normalized wake word only.
  if (!withoutWakeWord && /^(야야\s*)+/u.test(trimmed)) {
    return "야야";
  }

  return withoutWakeWord || trimmed;
}
