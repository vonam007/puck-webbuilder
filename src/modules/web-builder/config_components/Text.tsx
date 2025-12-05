export interface TextProps {
  content: string;
  size: "small" | "medium" | "large" | "xlarge";
  weight: "normal" | "medium" | "semibold" | "bold";
  color: "default" | "muted" | "primary" | "white";
  alignment: "left" | "center" | "right";
  maxWidth: "full" | "prose" | "narrow";
}

export const Text: React.FC<TextProps> = ({
  content,
  size = "medium",
  weight = "normal",
  color = "default",
  alignment = "left",
  maxWidth = "full",
}) => {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    default: "text-slate-900",
    muted: "text-slate-600",
    primary: "text-purple-600",
    white: "text-white",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  const maxWidthClasses = {
    full: "max-w-full",
    prose: "max-w-prose",
    narrow: "max-w-2xl",
  };

  return (
    <p
      className={`leading-relaxed ${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${alignClasses[alignment]} ${maxWidthClasses[maxWidth]}`}
    >
      {content}
    </p>
  );
};
