"use client";

import { DropZone } from "@measured/puck";

export interface GridProps {
  columns: 1 | 2 | 3 | 4 | 6;
  gap: "none" | "small" | "medium" | "large";
  padding: "none" | "small" | "medium" | "large";
  backgroundColor: "transparent" | "white" | "gray" | "dark";
  maxWidth: "full" | "container" | "narrow";
  verticalAlign: "top" | "center" | "bottom" | "stretch";
}

export const Grid: React.FC<GridProps> = ({
  columns = 2,
  gap = "medium",
  padding = "medium",
  backgroundColor = "transparent",
  maxWidth = "container",
  verticalAlign = "stretch",
}) => {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const gapClasses = {
    none: "gap-0",
    small: "gap-2",
    medium: "gap-6",
    large: "gap-10",
  };

  const paddingClasses = {
    none: "py-0",
    small: "py-4",
    medium: "py-12",
    large: "py-20",
  };

  const bgClasses = {
    transparent: "bg-transparent",
    white: "bg-white",
    gray: "bg-slate-100",
    dark: "bg-slate-900",
  };

  const maxWidthClasses = {
    full: "max-w-full",
    container: "max-w-7xl",
    narrow: "max-w-4xl",
  };

  const alignClasses = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
    stretch: "items-stretch",
  };

  return (
    <section
      className={`${bgClasses[backgroundColor]} ${paddingClasses[padding]}`}
    >
      <div
        className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8`}
      >
        <div
          className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${alignClasses[verticalAlign]}`}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="min-h-[100px]">
              <DropZone zone={`column-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
