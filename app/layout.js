
import Navbar from './components/Navbar';
import ClientNavWrapper from './components/ClientNavWrapper';
import Footer from './components/Footer';
import './globals.css';
import Head from 'next/head';

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ClientNavWrapper>
          <Navbar />
        </ClientNavWrapper>
        <main className="min-h-screen pt-16">
          {children}
        </main>
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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
        <meta property="og:image" content="https://the-website-url.com/og-image.jpg" />
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      </body>
    </html>
  );
}





