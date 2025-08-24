// hooks/useHorizontalScroll.ts
import { useRef } from "react";

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };

  return { scrollRef, scroll };
}
