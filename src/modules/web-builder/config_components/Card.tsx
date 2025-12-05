import { ArrowRight } from "lucide-react";

export interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  variant: "default" | "horizontal" | "overlay";
  imageAspect: "square" | "video" | "wide";
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  buttonText,
  buttonLink,
  variant = "default",
  imageAspect = "video",
}) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
  };

  if (variant === "overlay") {
    return (
      <div className="group relative overflow-hidden rounded-2xl">
        <div className={aspectClasses[imageAspect]}>
          {image && (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="mb-4 text-slate-300">{description}</p>
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300"
            >
              {buttonText}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg md:flex-row">
        <div className="md:w-2/5">
          {image && (
            <img
              src={image}
              alt={title}
              className="h-48 w-full object-cover md:h-full"
            />
          )}
        </div>
        <div className="flex flex-col justify-center p-6 md:w-3/5">
          <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
          <p className="mb-4 text-slate-600">{description}</p>
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-flex items-center gap-2 font-medium text-purple-600 transition-colors hover:text-purple-500"
            >
              {buttonText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {image && (
        <div className={aspectClasses[imageAspect]}>
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
        <p className="mb-4 text-slate-600">{description}</p>
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-flex items-center gap-2 font-medium text-purple-600 transition-colors hover:text-purple-500"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </div>
  );
};
