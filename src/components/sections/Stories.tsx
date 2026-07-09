import { Play } from "lucide-react";
import talaPortrait from "@/assets/tala-portrait.jpg";
import mediaThumb from "@/assets/media-thumb.jpg";

const Stories = () => {
  return (
    <section id="stories" className="bg-background py-14 px-6 md:py-16 md:px-8 scroll-mt-20">
      <div className="container-narrow">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-8 xl:gap-10 items-start">
          {/* Stories */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-[180px_1fr] md:items-center">
            <div>
              <p className="eyebrow">Stories</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-brand-grey leading-tight">
                Real Stories. Real Change.
              </h2>
              <p className="mt-5 text-sm text-brand-grey/85 leading-relaxed">
                Meet the learners, teachers, and communities whose lives are being transformed through education.
              </p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-magenta hover:underline underline-offset-4"
              >
                Read Their Stories <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="rounded-2xl bg-brand-soft/45 p-3 flex gap-5 items-stretch">
              <img
                src={talaPortrait}
                alt="Tala, a student supported by LAL"
                width={768}
                height={768}
                loading="lazy"
                className="w-28 md:w-32 rounded-xl object-cover shrink-0"
              />
              <div className="py-3 pr-2">
                <p className="text-base md:text-lg font-extrabold text-brand-grey leading-snug">
                  “I Never Gave Up on Learning.”
                </p>
                <p className="mt-3 text-xs md:text-sm text-brand-grey/80 leading-relaxed">
                  Tala, 13, returned to school through LAL's programs after years of disruption.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-magenta hover:underline underline-offset-4"
                >
                  Read Tala's Story <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="hidden lg:block h-full min-h-[210px] w-px bg-brand-grey/20" />

          {/* Media */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-[190px_1fr] md:items-center">
            <div>
              <p className="eyebrow">Media</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-brand-grey leading-tight">
                See Our Work in Action.
              </h2>
              <p className="mt-5 text-sm text-brand-grey/85 leading-relaxed">
                Watch videos and photos from our learning spaces across Lebanon.
              </p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-magenta hover:underline underline-offset-4"
              >
                Watch Videos <span aria-hidden="true">→</span>
              </a>
            </div>

            <a href="#" className="relative block rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
              <img
                src={mediaThumb}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
