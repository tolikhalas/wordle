import React from "react";
import { cn } from "../lib/utils";

export default function Letter({ letter, className }) {
  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-sm border border-gray-200",
        className,
      )}
    >
      {letter}
    </div>
  );
}
