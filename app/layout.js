'server only'
import Navbar from "./components/Navbar";
import ClientNavWrapper from "./components/ClientNavWrapper";
import Footer from "./components/Footer";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import MobileBar from "./components/MobileBar";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import { NotificationProvider } from "./components/NotificationContext";
import { MyContextProvider2 } from "./components/favCountContext";
import { MyContextProvider3 } from "./components/PageNumberReset";
import OnlineStatusNotifier from "./components/IsOnline";
// metadata for the RootLayout
export const metadata = {
  metadataBase: new URL('https://ase-2024-group-c.vercel.app/'),
  title: "Recipe Rush - The Source for Culinary Inspiration",
  description: "Discover delicious recipes and cooking tips to elevate your culinary skills.",
  category: "website",
  generator: "Next.js",
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

/**
 * The root layout component for the entire app.
 *
 * This root layout component wraps the entire app in a `<html>` and `<body>` element, and
 * provides the global layout structure for the app. It includes the main
 * navigation bar, the main content area, the footer, and the mobile navigation
 * bar.
 *
 * @param {{ children: React.ReactNode }} props The props object containing the
 * children to be rendered as the main content of the app.
 *
 * @returns {React.ReactElement} The RootLayout component.
 */

/**
 * The root layout component for the entire app. This component is
 * responsible for setting up the overall layout structure and
 * providing the necessary context providers for the app to function
 * properly. It also renders the main content area for the app.
 *
 * @param {{ children: React.ReactNode }} props The props object containing the
 * children to be rendered as the main content of the app.
 *
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className="bg-background text-foreground transition-colors duration-300">
       <SessionProvider>
       <MyContextProvider2>
       <MyContextProvider3>
        <ThemeProvider >
          <ClientNavWrapper>
            <Navbar />
          </ClientNavWrapper>
          <NotificationProvider>
          <main className="min-h-screen pt-16">
            {children}
            <OnlineStatusNotifier />
          </main>
          </NotificationProvider>
          <Footer />
          <MobileBar/>
          <ServiceWorkerRegistration/>
          </ThemeProvider>
          </MyContextProvider3>
          </MyContextProvider2>
        </SessionProvider>
      </body>
    </html>
  );
}
