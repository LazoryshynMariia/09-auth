import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 Not-found",
    description: "This page not found",
    openGraph: {
    title: "404 Not-found",
    description: "This page not found",
    url: process.env.OG_URL || "https://08-zustand-eey9cajz8-lazoryshynmariias-projects.vercel.app",
    images: [
      {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
    ]
  },
}

export default function NotFound() {
    return (
        <div>
            <h1 className={css.title}>
                404 - Page not found
            </h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    );
};
