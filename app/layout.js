import Navbar from "./components/Navbar";
import ClientNavWrapper from "./components/ClientNavWrapper";
import Footer from "./components/Footer";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ClientNavWrapper>
          <Navbar />
        </ClientNavWrapper>
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Head>
          {/* Meta Tags for SEO and Mobile Responsiveness */}
          <meta
            name="description"
            content="Discover delicious recipes, cooking tips, and culinary inspiration. Perfect for home chefs and food lovers!"
          />
          <meta
            name="keywords"
            content="recipes, cooking, food, meals, home chefs, culinary, inspiration"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          {/* Canonical Tag for Better SEO */}
          <link rel="canonical" href="https://the-website-url.com/" />

          {/* Open Graph Meta Tags (for social media sharing) */}
          <meta
            property="og:title"
            content="Recipe Rush - the Source for Culinary Inspiration"
          />
          <meta
            property="og:description"
            content="Discover delicious recipes and cooking tips to elevate your culinary skills."
          />
          <meta
            property="og:image"
            content="https://the-website-url.com/og-image.jpg"
          />
          <meta property="og:url" content="https://the-website-url.com" />
          <meta property="og:type" content="website" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Recipe Hub - The Source for Culinary Inspiration"
          />
          <meta
            name="twitter:description"
            content="Explore our collection of recipes and cooking tips for food lovers everywhere."
          />
          <meta
            name="twitter:image"
            content="https://the-website-url.com/twitter-image.jpg"
          />

          {/* Title and Favicon */}
          <title>Recipe Rush - Your Source for Culinary Inspiration</title>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="Recipe Rush" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
      </body>
    </html>
  );
}
