import { Play } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { resolve, isYouTubeUrl, extractYouTubeId } from "@/utils/dataLoader";

const defaultMediaThumb = "@/assets/media-thumb.jpg";

const Media = () => {
  const data = useSiteData();
  const mediaImageUrl = resolve(data, "stories-media-image", defaultMediaThumb);
  const isYouTube = isYouTubeUrl(mediaImageUrl);
  const youtubeId = isYouTube ? extractYouTubeId(mediaImageUrl) : null;

  return (
    <section id="media" className="bg-background py-14 px-6 md:py-16 md:px-8 scroll-mt-20">
      <div className="container-narrow">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-[240px_1fr] md:items-center">
          <div>
            <p className="eyebrow">{resolve(data, "stories-media-eyebrow", "Media")}</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-brand-grey leading-tight">
              {resolve(data, "stories-media-title", "See Our Work in Action.")}
            </h2>
            <p className="mt-5 text-sm text-brand-grey/85 leading-relaxed">
              {resolve(data, "stories-media-subtitle", "Watch videos and photos from our learning spaces across Lebanon.")}
            </p>
            <a
              href={isYouTube ? mediaImageUrl : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-magenta hover:underline underline-offset-4"
            >
              {resolve(data, "stories-media-cta", "Watch Videos")} <span aria-hidden="true">→</span>
            </a>
          </div>

          {isYouTube && youtubeId ? (
            <div className="relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="LAL media video"
                className="w-full aspect-[16/9]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <a href="#" className="relative block rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
              <img
                src={mediaImageUrl}
                alt="Students in a LAL learning space"
                width={1024}
                height={768}
                loading="lazy"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Play className="h-6 w-6 text-brand-magenta ml-0.5" fill="currentColor" aria-hidden="true" />
                </span>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Media;
