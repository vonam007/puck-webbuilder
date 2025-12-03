import type { ComponentConfig } from "@measured/puck";

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

export const spacerConfig: ComponentConfig<SpacerProps> = {
  label: "Spacer",
  fields: {
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "XS (16px)", value: "xs" },
        { label: "SM (32px)", value: "sm" },
        { label: "MD (48px)", value: "md" },
        { label: "LG (80px)", value: "lg" },
        { label: "XL (128px)", value: "xl" },
        { label: "2XL (192px)", value: "2xl" },
      ],
    },
    showDivider: {
      type: "radio",
      label: "Show Divider",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    dividerColor: {
      type: "radio",
      label: "Divider Color",
      options: [
        { label: "Light", value: "light" },
        { label: "Medium", value: "medium" },
        { label: "Dark", value: "dark" },
      ],
    },
  },
  defaultProps: {
    size: "md",
    showDivider: false,
    dividerColor: "light",
  },
  render: (props) => <Spacer {...props} />,
};
