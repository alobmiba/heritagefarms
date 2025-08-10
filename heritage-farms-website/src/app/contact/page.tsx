import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactPageMap } from "@/components/contact/ContactPageMap";

export const metadata: Metadata = {
  title: "Contact Us | Heritage Farms",
  description: "Get in touch with Heritage Farms for authentic African heritage greens. Located in Marmora, Ontario. Contact us for consultations, orders, or questions about our products.",
  keywords: "contact, heritage farms, African vegetables, organic greens, Marmora Ontario, consultation",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <ContactHero />
        
        {/* Contact Information & Form Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-gilroy-extrabold text-[#404A3D] mb-6">
                  Let&apos;s Connect
                </h2>
                <p className="text-xl text-gray-600 font-gilroy font-medium max-w-3xl mx-auto">
                  Whether you&apos;re a restaurant looking for fresh ingredients, a home cook wanting to explore new flavors, 
                  or just curious about our heritage crops, we&apos;d love to hear from you.
                </p>
              </div>

              {/* Contact Grid */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-gilroy-extrabold text-[#404A3D] mb-6">
                      Contact Information
                    </h3>
                    <p className="text-gray-600 font-gilroy mb-8">
                      Reach out to us through any of these channels. We&apos;re here to help you discover 
                      the authentic flavors of African heritage greens.
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-6">
                    {/* Email */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Email Us</h4>
                          <div className="space-y-2">
                            <a 
                              href="mailto:heritagefieldsandacreage@gmail.com" 
                              className="block text-gray-600 font-gilroy hover:text-[#5B8C51] transition-colors"
                            >
                              heritagefieldsandacreage@gmail.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Call Us</h4>
                          <div className="space-y-2">
                            <a 
                              href="tel:+16476162833" 
                              className="block text-gray-600 font-gilroy hover:text-[#5B8C51] transition-colors"
                            >
                              +1 (647) 616-2833
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Business Hours</h4>
                          <div className="space-y-1 text-gray-600 font-gilroy">
                            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                            <p>Saturday: 9:00 AM - 4:00 PM</p>
                            <p>Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:pl-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <ContactPageMap />

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold text-sm rounded-full mb-4">
                  FAQ
                </span>
                <h2 className="text-4xl md:text-5xl font-gilroy-extrabold text-[#404A3D] mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600 font-gilroy font-medium">
                  Common questions about our heritage greens and services
                </p>
              </div>

              <div className="space-y-6">
                {/* FAQ Item 1 */}
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3">
                    What heritage greens do you grow?
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    We specialize in authentic West African and Caribbean greens including callaloo (amaranth), 
                    fluted pumpkin leaves, jute leaves, waterleaf, and other traditional heritage crops.
                  </p>
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3">
                    Do you deliver to restaurants and individuals?
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    Yes! We supply fresh heritage greens to restaurants, grocery stores, and individual customers. 
                    We offer both regular delivery schedules and on-demand orders.
                  </p>
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3">
                    Can I visit the farm?
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    Absolutely! We welcome visitors to our farm in Marmora, Ontario. Please contact us in advance 
                    to schedule a visit and learn about our sustainable farming practices.
                  </p>
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3">
                    Are your greens organic?
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    We use sustainable greenhouse technology and eco-friendly farming methods. While we&apos;re not 
                    certified organic, we prioritize natural growing practices and avoid harmful chemicals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
} 