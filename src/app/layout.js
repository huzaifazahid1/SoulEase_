import "./globals.css";
import ThemeSwitcher from '../components/ThemeSwitcher';

export const metadata = {
  title: "DualPixel | Developer & Designer Portfolio + Creative Web Services",
  description:
    "DualPixel is the creative studio of a full-stack developer and UI/UX designer duo. Explore our portfolio and hire us for custom websites, modern web apps, branding, and design solutions tailored to your business.",
  icons: {
    icon: "/favicon.ico", // This line alone handles it
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ThemeSwitcher />

	{children}
      </body>
    </html>
  );
}
