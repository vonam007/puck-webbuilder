import type { ComponentConfig } from "@measured/puck";

export interface HeadingProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4";
  alignment: "left" | "center" | "right";
  color: "default" | "muted" | "primary" | "white" | "gradient";
}

export const Heading: React.FC<HeadingProps> = ({
  text,
  level = "h2",
  alignment = "left",
  color = "default",
}) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const colorClasses = {
    default: "text-slate-900",
    muted: "text-slate-600",
    primary: "text-purple-600",
    white: "text-white",
    gradient:
      "bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent",
  };

  const levelClasses = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h2: "text-3xl md:text-4xl font-bold",
    h3: "text-2xl md:text-3xl font-semibold",
    h4: "text-xl md:text-2xl font-semibold",
  };

  const Tag = level;

  return (
    <Tag
      className={`${levelClasses[level]} ${alignClasses[alignment]} ${colorClasses[color]}`}
    >
      {text}
    </Tag>
  );
};

export const headingConfig: ComponentConfig<HeadingProps> = {
  label: "Heading",
  fields: {
    text: {
      type: "text",
      label: "Text",
    },
    level: {
      type: "radio",
      label: "Heading Level",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
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
    color: {
      type: "select",
      label: "Color",
      options: [
        { label: "Default (Dark)", value: "default" },
        { label: "Muted (Gray)", value: "muted" },
        { label: "Primary (Purple)", value: "primary" },
        { label: "White", value: "white" },
        { label: "Gradient", value: "gradient" },
      ],
    },
  },
  defaultProps: {
    text: "Your Heading Here",
    level: "h2",
    alignment: "left",
    color: "default",
  },
  render: (props) => <Heading {...props} />,
};
