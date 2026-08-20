import type { Metadata } from "next";
import Link from "next/link";
import "~/styles/global.css";

export const metadata: Metadata = {
  title: "Page not found | Obriym",
  robots: { index: false, follow: false },
};

/**
 * Fallback for requests that never reach a locale segment (the localized 404
 * lives in `app/[locale]/not-found.tsx`). It renders its own document because
 * the root layout is scoped to `[locale]`.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main>
          <section style={{ padding: "8rem 0 5rem" }}>
            <div className="container">
              <h1 className="H1_extra_light">404</h1>
              <p className="body_big grey" style={{ marginTop: "1rem" }}>
                The page you are looking for doesn&apos;t exist or has been moved.
              </p>
              <Link
                href="/"
                className="btn_body black"
                style={{
                  display: "inline-flex",
                  marginTop: "1.75rem",
                  padding: "0.8rem 1.1rem",
                  borderRadius: "999px",
                  backgroundColor: "var(--pink)",
                }}
              >
                Back to home
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
