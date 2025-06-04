import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-primary-500 font-bold text-xl mb-4">
              ResumeCraft
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Create professional resumes with our easy-to-use builder. Choose
              from multiple templates, customize with your details, and download
              as PDF or JPG.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-foreground font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/templates" label="Templates" />
              <FooterLink href="/builder" label="Builder" />
              <FooterLink href="/dashboard" label="Dashboard" />
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-foreground font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <FooterLink href="/blog" label="Resume Tips" />
              <FooterLink href="/faq" label="FAQ" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h4 className="text-foreground font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <FooterLink href="https://twitter.com" label="Twitter" external />
              <FooterLink
                href="https://linkedin.com"
                label="LinkedIn"
                external
              />
              <FooterLink
                href="https://instagram.com"
                label="Instagram"
                external
              />
              <FooterLink
                href="mailto:contact@resumecraft.com"
                label="Contact Us"
                external
              />
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            &copy; {currentYear} ResumeCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label, external = false }) => {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <li>
      <Link
        href={href}
        className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors"
        {...linkProps}
      >
        {label}
      </Link>
    </li>
  );
};

export default Footer;
