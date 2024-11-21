import Navbar from "./components/Navbar";
import ClientNavWrapper from "./components/ClientNavWrapper";
import Footer from "./components/Footer";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import MobileBar from "./components/MobileBar";

// metadata for the RootLayout
export const metadata = {
  title: "Recipe Rush - The Source for Culinary Inspiration",
  description: "Discover delicious recipes and cooking tips to elevate your culinary skills.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://metatags.io/",
    title: "Recipe Rush - The Source for Culinary Inspiration",
    description: "Discover delicious recipes and cooking tips to elevate your culinary skills.",
    images: [
      {
        url: "https://metatags.io/images/meta-tags.png",
        width: 800,
        height: 600,
        alt: "Recipe Rush Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://metatags.io/",
    title: "Recipe Rush - The Source for Culinary Inspiration",
    description: "Discover delicious recipes and cooking tips to elevate your culinary skills.",
    images: ["https://metatags.io/images/meta-tags.png"],
  },
  icons: {
    icon: "/favicon-96x96.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className="bg-background text-foreground transition-colors duration-300">
       <SessionProvider>
        <ThemeProvider >
          <ClientNavWrapper>
            <Navbar />
          </ClientNavWrapper>
          <main className="min-h-screen ">{children}</main>
          <Footer />
          <MobileBar/>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
