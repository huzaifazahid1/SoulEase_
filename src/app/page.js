
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import ServicesSection from "../components/ServicesSection"
import PricingSection from "../components/PricingSection"
import PortfolioSection from "../components/PortfolioSection"
import TestimonialsSection from "../components/TestimonialsSection"
import ContactSection from "../components/ContactSection"
import AboutSection from "@/components/AboutSection"
import AssistantBot from "@/components/AssistantBot"
import BlogSection from "@/components/BlogSection"
import FAQs from "@/components/FAQs"
import Footer from "@/components/Footer"
export default function Home() {
  return (
    <>
    <Header/>
    <HeroSection />
    <AboutSection />
    <ServicesSection/>
    <PricingSection/>
    <PortfolioSection/>
      <TestimonialsSection />
      <FAQs />
      
    <ContactSection/> 
    <BlogSection/> 
      <AssistantBot /> 
      <Footer /> 
      
    </>
  );
}
