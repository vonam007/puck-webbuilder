import type { ComponentConfig } from "@measured/puck";
import { ArrowRight, Star } from "lucide-react";

export interface HeroProps {
  title: string;
  description: string;
  image: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  alignment: "left" | "center" | "right";
  showBadge: boolean;
  badgeText: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  description,
  image,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  alignment = "center",
  showBadge = true,
  badgeText,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Image with Overlay */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Hero background"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col gap-6 ${
            alignmentClasses[alignment]
          } max-w-3xl ${
            alignment === "center"
              ? "mx-auto"
              : alignment === "right"
              ? "ml-auto"
              : ""
          }`}
        >
          {/* Badge */}
          {showBadge && badgeText && (
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-sm ${
                alignment === "center"
                  ? "mx-auto"
                  : alignment === "right"
                  ? "ml-auto"
                  : ""
              }`}
            >
              <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
              {badgeText}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            {description}
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap gap-4 pt-4 ${
              alignment === "center"
                ? "justify-center"
                : alignment === "right"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <a
              href={primaryButtonLink}
              className="group inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500 hover:shadow-purple-500/50"
            >
              {primaryButtonText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {secondaryButtonText && (
              <a
                href={secondaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition-all hover:border-slate-500 hover:bg-slate-800/50"
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
    </section>
  );
};

export const heroConfig: ComponentConfig<HeroProps> = {
  label: "Hero Section",
  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    image: {
      type: "text",
      label: "Background Image URL",
    },
    primaryButtonText: {
      type: "text",
      label: "Primary Button Text",
    },
    primaryButtonLink: {
      type: "text",
      label: "Primary Button Link",
    },
    secondaryButtonText: {
      type: "text",
      label: "Secondary Button Text",
    },
    secondaryButtonLink: {
      type: "text",
      label: "Secondary Button Link",
    },
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
    badgeText: {
      type: "text",
      label: "Badge Text",
    },
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
