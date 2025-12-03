import type { ComponentConfig } from "@measured/puck";

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

export const textConfig: ComponentConfig<TextProps> = {
  label: "Text",
  fields: {
    content: {
      type: "textarea",
      label: "Content",
    },
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "XLarge", value: "xlarge" },
      ],
    },
    weight: {
      type: "radio",
      label: "Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
        { label: "Bold", value: "bold" },
      ],
    },
    color: {
      type: "select",
      label: "Color",
      options: [
        { label: "Default (Dark)", value: "default" },
        { label: "Muted (Gray)", value: "muted" },
        { label: "Primary (Purple)", value: "primary" },
        { label: "White", value: "white" },
      ],
    },
    alignment: {
      type: "radio",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    maxWidth: {
      type: "radio",
      label: "Max Width",
      options: [
        { label: "Full", value: "full" },
        { label: "Prose", value: "prose" },
        { label: "Narrow", value: "narrow" },
      ],
    },
  },
  defaultProps: {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    size: "medium",
    weight: "normal",
    color: "default",
    alignment: "left",
    maxWidth: "full",
  },
  render: (props) => <Text {...props} />,
};
