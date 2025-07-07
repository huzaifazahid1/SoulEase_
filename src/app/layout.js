import "./globals.css";
import ThemeSwitcher from '../components/ThemeSwitcher';
export const metadata = {
  title: "Resume Builder - Create Professional Resumes Online",
  description:
    "Build, customize and download professional resumes with our modern, responsive resume builder. Choose from multiple templates and export as PDF or JPG.",
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
