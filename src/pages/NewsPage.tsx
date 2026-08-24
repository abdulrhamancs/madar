import React from "react";
import { useI18n } from "../lib/i18nContext";
import { PageHeader } from "../ui/Section";
import { EmptyState, ErrorState, Skeleton } from "../ui/States";
import { Reveal } from "../ui/Reveal";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: string;
  date: string;
}

// Preserved from the original implementation — same YouTube id extraction.
const YT = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;

function NewsMedia({ item, lead }: { item: NewsItem; lead?: boolean }) {
  if (!item.mediaUrl || item.mediaType === "none") return null;

  if (item.mediaType === "image") {
    return (
      // The frame is clipped open on scroll while the picture holds still —
      // the image is uncovered rather than slid into place.
      <Reveal
        variant="clip"
        className="mt-8 overflow-hidden rounded-card border border-divider bg-raised"
      >
        <img
          src={item.mediaUrl}
          alt=""
          loading="lazy"
          width={1600}
          height={900}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className={
            lead
              ? "aspect-[16/9] w-full object-cover"
              : "aspect-[16/10] w-full object-cover"
          }
        />
      </Reveal>
    );
  }

  if (item.mediaType === "video") {
    const match = item.mediaUrl.match(YT);
    if (match && match[1]) {
      return (
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-card border border-divider">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${match[1]}`}
            title={item.title}
            loading="lazy"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <video
        src={item.mediaUrl}
        controls
        preload="none"
        className="mt-8 aspect-video w-full rounded-card border border-divider bg-espresso object-cover"
      />
    );
  }
  return null;
}

/**
 * News is a magazine: the newest story runs at display size across the full
 * measure, and everything after it steps down to a two-column stack. A
 * repeating three-up card grid would flatten that hierarchy.
 */
export function NewsPage({
  news,
  loading,
  error,
  onRetry,
}: {
  news: NewsItem[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  const { t } = useI18n();
  const [lead, ...rest] = news;

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("news_title")} />

      <div className="mt-16">
        {error ? (
          <ErrorState
            title={t("error_generic")}
            message={t("error_network")}
            retryLabel={t("retry")}
            onRetry={onRetry}
          />
        ) : loading ? (
          <div className="space-y-14" aria-busy="true">
            <div>
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="mt-4 h-11 w-3/4" />
              <Skeleton className="mt-6 h-64 w-full" />
            </div>
            {[0, 1].map((i) => (
              <div key={i}>
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="mt-3 h-7 w-2/3" />
                <Skeleton className="mt-3 h-4 w-full" />
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <EmptyState title={t("empty_news")} message={t("coming_soon_msg")} />
        ) : (
          <>
            {/* --- lead story --- */}
            <Reveal variant="up" as="article" className="pb-16">
              <p className="nums latin text-micro uppercase tracking-[0.14em] text-faint">
                {lead.date}
              </p>
              <h2 className="mt-4 max-w-4xl text-display text-ink">{lead.title}</h2>
              <NewsMedia item={lead} lead />
              <p className="mt-8 max-w-measure whitespace-pre-line text-lead text-muted">
                {lead.content}
              </p>
            </Reveal>

            {/* --- the rest --- */}
            {rest.length > 0 && (
              <div className="grid gap-x-16 gap-y-14 border-t border-divider pt-16 md:grid-cols-2">
                {rest.map((item, index) => (
                  <Reveal
                    as="article"
                    key={item.id}
                    variant="up"
                    delay={Math.min(index, 4) * 70}
                    className="min-w-0"
                  >
                    <p className="nums latin text-micro uppercase tracking-[0.14em] text-faint">
                      {item.date}
                    </p>
                    <h2 className="mt-3 text-h2 text-ink">{item.title}</h2>
                    <NewsMedia item={item} />
                    <p className="mt-5 whitespace-pre-line text-body text-muted">
                      {item.content}
                    </p>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
