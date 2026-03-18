import { BaseEmail } from "./_components/base-email";

interface NewsletterBroadcastEmailProps {
  subject: string;
  previewText?: string;
  title: string;
  intro: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function NewsletterBroadcastEmail({
  subject = "Newsletter",
  previewText,
  title = "Newsletter",
  intro = "",
  body = "",
  ctaLabel,
  ctaUrl,
}: NewsletterBroadcastEmailProps) {
  const paragraphs = body
    .split(/\r?\n\s*\r?\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <BaseEmail
      previewText={previewText || intro}
      title={title}
      intro={intro}
      actionLabel={ctaLabel}
      actionUrl={ctaUrl}
      footerNote={`Campaign: ${subject}`}
    >
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          style={{
            margin: "0 0 16px",
            fontSize: "15px",
            lineHeight: "24px",
            color: "#33443a",
          }}
        >
          {paragraph}
        </p>
      ))}
    </BaseEmail>
  );
}

export default NewsletterBroadcastEmail;
