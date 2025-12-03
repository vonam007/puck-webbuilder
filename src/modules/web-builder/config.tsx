import type { Config } from "@measured/puck";

// Import all component configs
import {
  heroConfig,
  featuresConfig,
  gridConfig,
  cardConfig,
  textConfig,
  headingConfig,
  buttonConfig,
  spacerConfig,
} from "./config_components";

// Define the Props types for type safety
import type {
  HeroProps,
  FeaturesProps,
  GridProps,
  CardProps,
  TextProps,
  HeadingProps,
  ButtonProps,
  SpacerProps,
} from "./config_components";

// Define the component props type map
export type ComponentProps = {
  Hero: HeroProps;
  Features: FeaturesProps;
  Grid: GridProps;
  Card: CardProps;
  Text: TextProps;
  Heading: HeadingProps;
  Button: ButtonProps;
  Spacer: SpacerProps;
};

// Root configuration for the page
type RootProps = {
  title: string;
};

// The main Puck configuration
export const config: Config<ComponentProps, RootProps> = {
  // Root configuration for page-level settings
  root: {
    fields: {
      title: {
        type: "text",
        label: "Page Title",
      },
    },
    defaultProps: {
      title: "My Page",
    },
    render: ({ children }) => {
      return <main className="min-h-screen bg-white">{children}</main>;
    },
  },

  // Categories for organizing components in the sidebar
  categories: {
    layout: {
      title: "Layout",
      components: ["Grid", "Spacer"],
    },
    sections: {
      title: "Sections",
      components: ["Hero", "Features"],
    },
    content: {
      title: "Content",
      components: ["Heading", "Text", "Card"],
    },
    interactive: {
      title: "Interactive",
      components: ["Button"],
    },
  },

  // Register all components
  components: {
    Hero: heroConfig,
    Features: featuresConfig,
    Grid: gridConfig,
    Card: cardConfig,
    Text: textConfig,
    Heading: headingConfig,
    Button: buttonConfig,
    Spacer: spacerConfig,
  },
};

export default config;
