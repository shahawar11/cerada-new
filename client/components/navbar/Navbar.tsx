"use client";
import { useState } from "react";
import Container from "../global/Container";
import { Button } from "../ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full z-50 bg-blue-950 border-b px-5 sm:px-10 md:px-12 lg:px-5">
      <Container className="flex items-center justify-between h-20">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/crud"
            className="text-white hover:text-blue-300 transition-colors"
          >
            CRUD
          </a>
          <a
            href="/form"
            className="text-white hover:text-blue-300 transition-colors"
          >
            Form
          </a>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Register Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1 p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-950 border-t border-blue-800 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Container className="py-4">
          <div className="flex flex-col space-y-4">
            <a
              href="/crud"
              className="text-white hover:text-blue-300 transition-colors py-2 border-b border-blue-800/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CRUD
            </a>
            <a
              href="/form"
              className="text-white hover:text-blue-300 transition-colors py-2 border-b border-blue-800/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Form
            </a>

            <div className="pt-2">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register Now
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
