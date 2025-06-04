export const metadata = {
  title: "Resume Builder",
  description: "Build your professional resume with our easy-to-use builder",
};

export default function BuilderPageLayout({ children }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
