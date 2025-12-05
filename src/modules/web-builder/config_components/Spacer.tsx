export interface SpacerProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  showDivider: boolean;
  dividerColor: "light" | "medium" | "dark";
}

export const Spacer: React.FC<SpacerProps> = ({
  size = "md",
  showDivider = false,
  dividerColor = "light",
}) => {
  const sizeClasses = {
    xs: "h-4",
    sm: "h-8",
    md: "h-12",
    lg: "h-20",
    xl: "h-32",
    "2xl": "h-48",
  };

  const dividerColorClasses = {
    light: "border-slate-200",
    medium: "border-slate-300",
    dark: "border-slate-500",
  };

  if (showDivider) {
    return (
      <div className={`${sizeClasses[size]} flex items-center`}>
        <div
          className={`w-full border-t ${dividerColorClasses[dividerColor]}`}
        />
      </div>
    );
  }

  return <div className={sizeClasses[size]} />;
};
