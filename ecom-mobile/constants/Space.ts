/**
 * Spacing constants for consistent layout throughout the app
 * Uses a scale-based system where each value is generally 2x the previous
 */
export const Space = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 20,
  lg: 32,
  xl: 48,
  xxl: 64,
  xxxl: 96,
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
