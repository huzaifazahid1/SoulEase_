import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const Header = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <motion.div
              className="text-primary-500 font-bold text-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ResumeCraft
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/" label="Home" pathname={pathname} />
            <NavLink href="/templates" label="Templates" pathname={pathname} />
            {user ? (
              <>
                <NavLink
                  href="/dashboard"
                  label="Dashboard"
                  pathname={pathname}
                />
                <button
                  onClick={logout}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Logout
                </button>
                <Link href="/builder" className="btn-primary rounded-full">
                  Create Resume
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Login
                </Link>
                <Link href="/signup" className="btn-primary rounded-full">
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-background shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-1">
            <MobileNavLink
              href="/"
              label="Home"
              pathname={pathname}
              onClick={closeMobileMenu}
            />
            <MobileNavLink
              href="/templates"
              label="Templates"
              pathname={pathname}
              onClick={closeMobileMenu}
            />

            {user ? (
              <>
                <MobileNavLink
                  href="/dashboard"
                  label="Dashboard"
                  pathname={pathname}
                  onClick={closeMobileMenu}
                />
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="py-3 text-left text-foreground hover:text-primary-500 transition-colors"
                >
                  Logout
                </button>
                <Link
                  href="/builder"
                  className="btn-primary text-center py-3 mt-2"
                  onClick={closeMobileMenu}
                >
                  Create Resume
                </Link>
              </>
            ) : (
              <>
                <MobileNavLink
                  href="/login"
                  label="Login"
                  pathname={pathname}
                  onClick={closeMobileMenu}
                />
                <Link
                  href="/signup"
                  className="btn-primary text-center py-3 mt-2"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

const NavLink = ({ href, label, pathname }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm transition-colors relative ${
        isActive ? "text-primary-500" : "hover:text-primary-500"
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
          layoutId="navbar-indicator"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </Link>
  );
};

const MobileNavLink = ({ href, label, pathname, onClick }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`py-3 block ${
        isActive ? "text-primary-500" : "text-foreground hover:text-primary-500"
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;
