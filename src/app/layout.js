// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { ResumeContextProvider } from "../context/ResumeContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resume Builder - Create Professional Resumes Online",
  description:
    "Build, customize and download professional resumes with our modern, responsive resume builder. Choose from multiple templates and export as PDF or JPG.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${inter.variable} ${mono.variable} antialiased`}
      >
        <AuthContextProvider>
          <ResumeContextProvider>{children}</ResumeContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
