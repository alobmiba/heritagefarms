import Link from "next/link";

export function ContactInformationOne() {
  return (
    <section className="contact-information-one p-r z-1 pt-215 pb-130">
      <div className="information-img_one wow fadeInRight">
        <div 
          className="w-full h-full bg-cover bg-center rounded-l-full"
          style={{
            backgroundImage: "url('/branding/Images/products/callaloo-amaranth.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="row">
          <div className="col-xl-9 col-lg-12 mx-auto">
            <div className="contact-two_information-box">
              <div className="section-title section-title-left mb-16 text-center md:text-left wow fadeInUp">
                <span className="sub-title inline-block px-4 py-2 bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold text-sm rounded-full mb-4">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-5xl font-gilroy-extrabold text-[#404A3D] mb-6">
                  We&apos;re Ready to Help You! Need Any Heritage Greens or Consultations?
                </h2>
              </div>
              
              <div className="row grid md:grid-cols-3 gap-8 mb-12">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="information-item-two info-one mb-8 text-center group hover:transform hover:scale-105 transition-all duration-300 wow fadeInDown">
                    <div className="icon w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="info">
                      <h5 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3">Locations</h5>
                      <p className="text-gray-600 font-gilroy mb-3">
                        16 Twin Sisters Lake Road<br />
                        Marmora, Ontario, Canada
                      </p>
                      <Link 
                        href="https://www.google.com/maps/search/?api=1&query=16%20Twin%20Sisters%20Lake%20Road%2C%20Marmora%2C%20Ontario%2C%20Canada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5B8C51] hover:text-[#3A7817] font-gilroy font-semibold transition-colors"
                      >
                        View on Google Maps →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="information-item-two mb-8 info-two text-center group hover:transform hover:scale-105 transition-all duration-300 wow fadeInUp">
                    <div className="icon w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="info">
                      <h5 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3">Email Address</h5>
                      <div className="space-y-2">
                        <p className="text-gray-600 font-gilroy">
                          <a 
                            href="mailto:info@heritagefarms.ca" 
                            className="text-[#5B8C51] hover:text-[#3A7817] transition-colors"
                          >
                            info@heritagefarms.ca
                          </a>
                        </p>
                        <p className="text-gray-600 font-gilroy">
                          <a 
                            href="mailto:sales@heritagefarms.ca" 
                            className="text-[#5B8C51] hover:text-[#3A7817] transition-colors"
                          >
                            sales@heritagefarms.ca
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="information-item-two mb-8 info-three text-center group hover:transform hover:scale-105 transition-all duration-300 wow fadeInDown">
                    <div className="icon w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="info">
                      <h5 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3">Phone Number</h5>
                      <div className="space-y-2">
                        <p className="text-gray-600 font-gilroy">
                          <a 
                            href="tel:+11234567890" 
                            className="text-[#5B8C51] hover:text-[#3A7817] transition-colors"
                          >
                            +1 (123) 456-7890
                          </a>
                        </p>
                        <p className="text-gray-600 font-gilroy">
                          <a 
                            href="tel:+11234567891" 
                            className="text-[#5B8C51] hover:text-[#3A7817] transition-colors"
                          >
                            +1 (123) 456-7891
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                  <p className="text-lg text-gray-600 font-gilroy font-medium">
                    We&apos;re passionate about bringing authentic African heritage greens to your table. 
                    Whether you&apos;re a restaurant looking for fresh ingredients or a home cook wanting to explore new flavors, 
                    we&apos;re here to help you discover the rich culinary traditions of Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
