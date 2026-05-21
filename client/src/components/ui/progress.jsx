import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  (
    {
      className,
      value,
      showValue = false,
      size = "md",
      color = "indigo",
      animated = true,
      ...props
    },
    ref
  ) => {
    // HEIGHT SIZES
    const sizes = {
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    };

    // COLOR THEMES
    const colors = {
      indigo:
        "bg-gradient-to-r from-indigo-500 to-purple-500",

      green:
        "bg-gradient-to-r from-green-500 to-emerald-500",

      blue:
        "bg-gradient-to-r from-blue-500 to-cyan-500",

      orange:
        "bg-gradient-to-r from-orange-500 to-yellow-500",

      red:
        "bg-gradient-to-r from-red-500 to-pink-500",
    };

    return (
      <div className="w-full space-y-2">

        {/* TOP LABEL */}
        {showValue && (
          <div className="flex items-center justify-between text-sm">

            <span className="text-slate-400">
              Progress
            </span>

            <span className="font-semibold text-white">
              {value || 0}%
            </span>
          </div>
        )}

        {/* PROGRESS ROOT */}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-slate-800 border border-slate-700 shadow-inner",
            sizes[size],
            className
          )}
          {...props}
        >

          {/* GLOW EFFECT */}
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />

          {/* INDICATOR */}
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden",
              colors[color],
              animated &&
                "after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] after:animate-[shimmer_2s_infinite]"
            )}
            style={{
              transform: `translateX(-${
                100 - (value || 0)
              }%)`,
            }}
          >

            {/* INNER GLOW */}
            <div className="absolute inset-0 bg-white/10" />

          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>
      </div>
    );
  }
);

Progress.displayName =
  ProgressPrimitive.Root.displayName;

export { Progress };