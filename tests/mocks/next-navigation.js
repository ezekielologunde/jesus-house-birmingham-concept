import { vi } from "vitest";

export const push = vi.fn();
export const replace = vi.fn();
export const mockPathname = { current: "/" };

export function useRouter() {
  return { push, replace };
}

export function usePathname() {
  return mockPathname.current;
}
