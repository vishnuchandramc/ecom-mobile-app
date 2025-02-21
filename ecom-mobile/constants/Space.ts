/**
 * Spacing constants for consistent layout throughout the app
 * Uses a scale-based system where each value is generally 2x the previous
 */
export const Space = {
  $0: 2,
  $1: 4,
  $2: 8,
  $3: 16,
  $4: 20,
  $5: 32,
  $6: 48,
  $7: 64,
  $8: 96,
} as const;

export type SpaceValue = keyof typeof Space;

/**
 * Border radius constants for consistent corner rounding
 */
export const BorderRadius = {
  /** Standard border radius - 8px */
  standard: 8,
  /** Fully rounded corners - 50px */
  rounded: 50,
} as const;

export type BorderRadiusValue = keyof typeof BorderRadius;
