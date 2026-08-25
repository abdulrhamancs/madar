import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useI18n } from "../lib/i18nContext";
import { cx } from "../lib/cx";
import { Field, TextField } from "./Field";
import { Button } from "./Button";

/**
 * Media picker for the admin composer.
 *
 * Uploads to the `media` bucket and hands back the public URL, written into the
 * same `media_url` the form already used — so nothing downstream changes: the
 * news and event cards keep rendering from a plain URL and do not know or care
 * whether it was uploaded or pasted.
 *
 * The manual URL input stays alongside it, because not every medium is a file:
 * a YouTube link is a URL and nothing else, and the video renderer already
 * special-cases it.
 */

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];

/** The bucket ceiling is 50MB; images are held well under it. */
const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const VIDEO_MAX_BYTES = 50 * 1024 * 1024;

const BUCKET = "media";

/** `image/jpeg` -> `jpg`, so the stored object keeps a sensible extension. */
function extensionFor(file: File) {
  const fromName = file.name.split(".").pop();
  if (fromName && /^[A-Za-z0-9]{1,5}$/.test(fromName)) return fromName.toLowerCase();
  return file.type.split("/")[1]?.replace("jpeg", "jpg") || "bin";
}

/**
 * Object keys are generated rather than taken from the filename. Arabic and
 * spaced filenames are common here and would need escaping in a URL, and two
 * uploads called `poster.jpg` must not collide.
 */
function objectKeyFor(file: File) {
  const random = Math.random().toString(36).slice(2, 10);
  return `${Date.now()}-${random}.${extensionFor(file)}`;
}

export function MediaField({
  mediaType,
  value,
  onChange,
  disabled = false,
}: {
  /** Which kinds are accepted — mirrors the form's media type select. */
  mediaType: "image" | "video";
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isImage = mediaType === "image";
  const accepted = isImage ? IMAGE_TYPES : VIDEO_TYPES;
  const maxBytes = isImage ? IMAGE_MAX_BYTES : VIDEO_MAX_BYTES;
  const maxLabel = isImage ? "5MB" : "50MB";

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");

    if (!accepted.includes(file.type)) {
      setError(`${t("upload_bad_type")} ${accepted.join(", ")}`);
      return;
    }
    if (file.size > maxBytes) {
      setError(`${t("upload_too_large")} ${maxLabel}`);
      return;
    }

    setUploading(true);
    try {
      const key = objectKeyFor(file);
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(key, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        // Most likely cause is the admin check on the bucket policy, so say
        // something more useful than the raw storage error.
        setError(uploadError.message || t("upload_failed"));
        return;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
      if (!data?.publicUrl) {
        setError(t("upload_failed"));
        return;
      }
      onChange(data.publicUrl);
    } catch (e) {
      console.error(e);
      setError(t("upload_failed"));
    } finally {
      setUploading(false);
      // Let the same file be chosen again after a failure.
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <Field label={t("upload_media")} error={error || undefined}>
        {({ id, describedBy }) => (
          <div className="space-y-3">
            <input
              ref={inputRef}
              id={id}
              type="file"
              accept={accepted.join(",")}
              aria-describedby={describedBy}
              disabled={disabled || uploading}
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="sr-only"
            />
            <Button
              type="button"
              variant="secondary"
              block
              pending={uploading}
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
            >
              {!uploading && <Upload className="h-4 w-4" aria-hidden="true" />}
              {uploading ? t("uploading") : t("choose_file")}
            </Button>
            <p className="text-micro text-faint">
              {isImage ? t("upload_hint_image") : t("upload_hint_video")} ·{" "}
              <span className="latin nums" dir="ltr">
                {maxLabel}
              </span>
            </p>
          </div>
        )}
      </Field>

      {/* Preview doubles as confirmation that the stored URL actually resolves. */}
      {value && !uploading && (
        <div className="relative overflow-hidden rounded-card border border-divider bg-raised">
          {isImage ? (
            <img
              src={value}
              alt={t("upload_preview")}
              className="max-h-56 w-full object-cover"
            />
          ) : (
            <video
              src={value}
              controls
              className="max-h-56 w-full bg-espresso object-cover"
            />
          )}
          <button
            type="button"
            onClick={() => {
              onChange("");
              setError("");
            }}
            aria-label={t("remove_media")}
            className={cx(
              "absolute end-2 top-2 flex h-9 w-9 items-center justify-center rounded-full",
              "bg-canvas/90 text-ink transition-colors duration-quick hover:bg-canvas"
            )}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Secondary path: an external link, which upload cannot express. */}
      <TextField
        label={t("news_media_url")}
        type="url"
        dir="ltr"
        placeholder="https://…"
        disabled={disabled || uploading}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
