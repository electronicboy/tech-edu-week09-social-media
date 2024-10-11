/**
 * Generic util class for misc utility functions
 */

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
