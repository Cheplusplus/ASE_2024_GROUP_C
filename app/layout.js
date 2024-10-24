
import Navbar from './components/Navbar';
import ClientNavWrapper from './components/ClientNavWrapper';
import Footer from './components/Footer';
import './globals.css';

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
      </body>
    </html>
  );
}




