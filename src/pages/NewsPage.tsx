import React from "react";
import { useI18n } from "../lib/i18nContext";
import { PageHeader } from "../ui/PageHeader";
import { EmptyState, ErrorState, Skeleton } from "../ui/States";

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

function NewsMedia({ item }: { item: NewsItem }) {
  if (!item.mediaUrl || item.mediaType === "none") return null;

  if (item.mediaType === "image") {
    return (
      <img
        src={item.mediaUrl}
        alt=""
        loading="lazy"
        width={1200}
        height={630}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="mt-4 aspect-[16/9] w-full rounded-md border border-divider object-cover"
      />
    );
  }

  if (item.mediaType === "video") {
    const match = item.mediaUrl.match(YT);
    if (match && match[1]) {
      return (
        <div className="mt-4 aspect-video w-full overflow-hidden rounded-md border border-divider">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${match[1]}`}
            title={item.title}
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <video
        src={item.mediaUrl}
        controls
        className="mt-4 aspect-video w-full rounded-md border border-divider bg-black object-cover"
      />
    );
  }
  return null;
}

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

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("news_title")} />

      {error ? (
        <ErrorState
          title={t("error_generic")}
          message={t("error_network")}
          retryLabel={t("retry")}
          onRetry={onRetry}
        />
      ) : loading ? (
        <div className="space-y-10" aria-busy="true">
          {[0, 1].map((i) => (
            <div key={i}>
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="mt-2 h-7 w-3/4" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-1.5 h-4 w-5/6" />
            </div>
          ))}
        </div>
      ) : news.length === 0 ? (
        <EmptyState title={t("empty_news")} message={t("coming_soon_msg")} />
      ) : (
        <div className="divide-y divide-divider">
          {news.map((item) => (
            <article key={item.id} className="py-8 first:pt-0 last:pb-0">
              <p className="nums text-micro uppercase tracking-wide text-faint">
                {item.date}
              </p>
              <h2 className="mt-1.5 text-h2 text-ink">{item.title}</h2>
              <NewsMedia item={item} />
              <p className="mt-4 max-w-prose whitespace-pre-line text-body text-muted">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
