import { Zap, Shield, Palette, Code, Smartphone, Rocket } from "lucide-react";

const iconMap = {
  zap: Zap,
  shield: Shield,
  palette: Palette,
  code: Code,
  smartphone: Smartphone,
  rocket: Rocket,
};

export interface FeatureItem {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
}

export interface FeaturesProps {
  sectionTitle: string;
  sectionSubtitle: string;
  features: FeatureItem[];
  columns: 2 | 3 | 4;
  variant: "cards" | "simple" | "icons-left";
}

export const Features: React.FC<FeaturesProps> = ({
  sectionTitle,
  sectionSubtitle,
  features,
  columns = 3,
  variant = "cards",
}) => {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const renderFeature = (feature: FeatureItem, index: number) => {
    const IconComponent = iconMap[feature.icon] || Zap;

    if (variant === "simple") {
      return (
        <div key={index} className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
            <IconComponent className="h-7 w-7 text-purple-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            {feature.title}
          </h3>
          <p className="text-slate-600">{feature.description}</p>
        </div>
      );
    }

    if (variant === "icons-left") {
      return (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <IconComponent className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="text-slate-600">{feature.description}</p>
          </div>
        </div>
      );
    }

    // Default: cards
    return (
      <div
        key={index}
        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-purple-200 hover:shadow-lg"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-110">
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-slate-900">
          {feature.title}
        </h3>
        <p className="leading-relaxed text-slate-600">{feature.description}</p>
      </div>
    );
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            {sectionTitle}
          </h2>
          <p className="text-lg text-slate-600">{sectionSubtitle}</p>
        </div>

        {/* Features Grid */}
        <div className={`grid gap-8 ${columnClasses[columns]}`}>
          {features.map((feature, index) => renderFeature(feature, index))}
        </div>
      </div>
    </section>
  );
};
