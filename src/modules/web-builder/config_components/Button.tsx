import type { ComponentConfig } from "@measured/puck";
import { ArrowRight, ExternalLink, Download, ChevronRight } from "lucide-react";

const iconMap = {
  none: null,
  arrow: ArrowRight,
  external: ExternalLink,
  download: Download,
  chevron: ChevronRight,
};

export interface ButtonProps {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size: "small" | "medium" | "large";
  icon: keyof typeof iconMap;
  iconPosition: "left" | "right";
  fullWidth: boolean;
  alignment: "left" | "center" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  text,
  href,
  variant = "primary",
  size = "medium",
  icon = "none",
  iconPosition = "right",
  fullWidth = false,
  alignment = "left",
}) => {
  const IconComponent = iconMap[icon];

  const variantClasses = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
    secondary:
      "bg-slate-800 text-white hover:bg-slate-700 shadow-lg shadow-slate-800/30",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
    ghost: "text-purple-600 hover:bg-purple-50",
    gradient:
      "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-500 hover:to-blue-400 shadow-lg",
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex ${alignClasses[alignment]}`}>
      <a
        href={href}
        className={`group inline-flex items-center gap-2 rounded-lg font-semibold transition-all ${
          variantClasses[variant]
        } ${sizeClasses[size]} ${fullWidth ? "w-full justify-center" : ""}`}
      >
        {IconComponent && iconPosition === "left" && (
          <IconComponent className="h-4 w-4" />
        )}
        {text}
        {IconComponent && iconPosition === "right" && (
          <IconComponent className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </a>
    </div>
  );
};

export const buttonConfig: ComponentConfig<ButtonProps> = {
  label: "Button",
  fields: {
    text: {
      type: "text",
      label: "Button Text",
    },
    href: {
      type: "text",
      label: "Link URL",
    },
    variant: {
      type: "radio",
      label: "Variant",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Gradient", value: "gradient" },
      ],
    },
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    icon: {
      type: "select",
      label: "Icon",
      options: [
        { label: "None", value: "none" },
        { label: "Arrow", value: "arrow" },
        { label: "External Link", value: "external" },
        { label: "Download", value: "download" },
        { label: "Chevron", value: "chevron" },
      ],
    },
    iconPosition: {
      type: "radio",
      label: "Icon Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    fullWidth: {
      type: "radio",
      label: "Full Width",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
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
  },
  defaultProps: {
    text: "Click Me",
    href: "#",
    variant: "primary",
    size: "medium",
    icon: "arrow",
    iconPosition: "right",
    fullWidth: false,
    alignment: "left",
  },
  render: (props) => <Button {...props} />,
};
