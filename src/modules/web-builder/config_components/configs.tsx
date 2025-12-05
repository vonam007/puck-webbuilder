import type { ComponentConfig } from "@measured/puck";
import type { ButtonProps } from "./Button";
import type { CardProps } from "./Card";
import type { FeaturesProps } from "./Features";
import type { GridProps } from "./Grid";
import type { HeadingProps } from "./Heading";
import type { HeroProps } from "./Hero";
import type { SpacerProps } from "./Spacer";
import type { TextProps } from "./Text";
import { Button } from "./Button";
import { Card } from "./Card";
import { Features } from "./Features";
import { Grid } from "./Grid";
import { Heading } from "./Heading";
import { Hero } from "./Hero";
import { Spacer } from "./Spacer";
import { Text } from "./Text";

export const buttonConfig: ComponentConfig<ButtonProps> = {
  label: "Button",
  fields: {
    text: { type: "text", label: "Button Text" },
    href: { type: "text", label: "Link URL" },
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

export const cardConfig: ComponentConfig<CardProps> = {
  label: "Card",
  fields: {
    image: { type: "text", label: "Image URL" },
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    buttonText: { type: "text", label: "Button Text" },
    buttonLink: { type: "text", label: "Button Link" },
    variant: {
      type: "radio",
      label: "Card Variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Horizontal", value: "horizontal" },
        { label: "Overlay", value: "overlay" },
      ],
    },
    imageAspect: {
      type: "radio",
      label: "Image Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Video (16:9)", value: "video" },
        { label: "Wide (21:9)", value: "wide" },
      ],
    },
  },
  defaultProps: {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    title: "Card Title",
    description: "This is a description for the card. Add your content here.",
    buttonText: "Learn More",
    buttonLink: "#",
    variant: "default",
    imageAspect: "video",
  },
  render: (props) => <Card {...props} />,
};

export const featuresConfig: ComponentConfig<FeaturesProps> = {
  label: "Features",
  fields: {
    sectionTitle: { type: "text", label: "Section Title" },
    sectionSubtitle: { type: "textarea", label: "Section Subtitle" },
    variant: {
      type: "radio",
      label: "Display Variant",
      options: [
        { label: "Cards", value: "cards" },
        { label: "Simple", value: "simple" },
        { label: "Icons Left", value: "icons-left" },
      ],
    },
    columns: {
      type: "radio",
      label: "Columns",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
    features: {
      type: "array",
      label: "Features",
      arrayFields: {
        icon: {
          type: "select",
          label: "Icon",
          options: [
            { label: "Zap (Lightning)", value: "zap" },
            { label: "Shield (Security)", value: "shield" },
            { label: "Palette (Design)", value: "palette" },
            { label: "Code (Development)", value: "code" },
            { label: "Smartphone (Mobile)", value: "smartphone" },
            { label: "Rocket (Launch)", value: "rocket" },
          ],
        },
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
      },
      defaultItemProps: {
        icon: "zap",
        title: "Feature Title",
        description: "Feature description goes here.",
      },
    },
  },
  defaultProps: {
    sectionTitle: "Everything You Need to Build",
    sectionSubtitle:
      "Our platform provides all the tools and features you need to create stunning websites.",
    variant: "cards",
    columns: 3,
    features: [
      {
        icon: "zap",
        title: "Lightning Fast",
        description:
          "Optimized for speed and performance. Your sites load instantly.",
      },
      {
        icon: "shield",
        title: "Secure by Default",
        description:
          "Built-in security features to protect your site and visitors.",
      },
      {
        icon: "palette",
        title: "Beautiful Design",
        description:
          "Stunning templates and components designed by professionals.",
      },
      {
        icon: "code",
        title: "No Code Required",
        description:
          "Build complex layouts without writing a single line of code.",
      },
      {
        icon: "smartphone",
        title: "Mobile Responsive",
        description: "Every component is optimized for all screen sizes.",
      },
      {
        icon: "rocket",
        title: "Easy Deployment",
        description: "Publish your site with one click to any platform.",
      },
    ],
  },
  render: (props) => <Features {...props} />,
};

export const gridConfig: ComponentConfig<GridProps> = {
  label: "Grid Layout",
  fields: {
    columns: {
      type: "radio",
      label: "Columns",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "6", value: 6 },
      ],
    },
    gap: {
      type: "radio",
      label: "Gap",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    padding: {
      type: "radio",
      label: "Vertical Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    backgroundColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "Transparent", value: "transparent" },
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Dark", value: "dark" },
      ],
    },
    maxWidth: {
      type: "radio",
      label: "Max Width",
      options: [
        { label: "Full Width", value: "full" },
        { label: "Container", value: "container" },
        { label: "Narrow", value: "narrow" },
      ],
    },
    verticalAlign: {
      type: "radio",
      label: "Vertical Alignment",
      options: [
        { label: "Top", value: "top" },
        { label: "Center", value: "center" },
        { label: "Bottom", value: "bottom" },
        { label: "Stretch", value: "stretch" },
      ],
    },
  },
  defaultProps: {
    columns: 2,
    gap: "medium",
    padding: "medium",
    backgroundColor: "transparent",
    maxWidth: "container",
    verticalAlign: "stretch",
  },
  render: (props) => <Grid {...props} />,
};

export const headingConfig: ComponentConfig<HeadingProps> = {
  label: "Heading",
  fields: {
    text: { type: "text", label: "Text" },
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

export const heroConfig: ComponentConfig<HeroProps> = {
  label: "Hero Section",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    image: { type: "text", label: "Background Image URL" },
    primaryButtonText: { type: "text", label: "Primary Button Text" },
    primaryButtonLink: { type: "text", label: "Primary Button Link" },
    secondaryButtonText: { type: "text", label: "Secondary Button Text" },
    secondaryButtonLink: { type: "text", label: "Secondary Button Link" },
    alignment: {
      type: "radio",
      label: "Content Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    showBadge: {
      type: "radio",
      label: "Show Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    badgeText: { type: "text", label: "Badge Text" },
  },
  defaultProps: {
    title: "Build Amazing Websites Without Code",
    description:
      "Create stunning, responsive websites in minutes with our intuitive drag-and-drop builder. No coding skills required.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920",
    primaryButtonText: "Get Started Free",
    primaryButtonLink: "#",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "#",
    alignment: "center",
    showBadge: true,
    badgeText: "New Feature Available",
  },
  render: (props) => <Hero {...props} />,
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

export const textConfig: ComponentConfig<TextProps> = {
  label: "Text",
  fields: {
    content: { type: "textarea", label: "Content" },
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
