import { useState } from "react";
import { PAGE_SIZE } from "../services/pokemonApi";

interface PageOffsetControls {
  offset: number;
  prev: () => void;
  next: () => void;
}

/**
 * Manages a page offset that resets automatically when the key changes.
 * Uses the React "derived state during render" pattern to avoid useEffect.
 */
export function usePageOffset<K>(key: K): PageOffsetControls {
  const [state, setState] = useState({ offset: 0, key });

  if (state.key !== key) setState({ offset: 0, key });

  return {
    offset: state.offset,
    prev: () => setState((s) => ({ ...s, offset: Math.max(0, s.offset - PAGE_SIZE) })),
    next: () => setState((s) => ({ ...s, offset: s.offset + PAGE_SIZE })),
  };
}
