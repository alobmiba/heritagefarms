import Link from "next/link";

interface PageBannerProps {
  pageName: string;
}

export function PageBanner({ pageName }: PageBannerProps) {
  return (
    <section 
      className="page-banner bg_cover position-relative z-1 pt-32 pb-20"
      style={{
        backgroundImage: "url('/branding/Images/banner/homebanner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Brand Card */}
      <div className="brand-card text-center absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="w-12 h-12 mx-auto mb-2 bg-[#EDDD5E] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-[#404A3D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="text-white font-gilroy-extrabold text-lg">Heritage Farms</h3>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="page-title text-center">
              <h1 className="text-4xl md:text-6xl font-gilroy-extrabold text-white mb-6">
                {pageName}
              </h1>
              <ul className="breadcrumbs-link flex justify-center items-center space-x-2 text-sm">
                <li>
                  <Link 
                    href="/" 
                    className="text-white/80 hover:text-[#EDDD5E] transition-colors font-gilroy font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-white/60">/</li>
                <li className="text-[#EDDD5E] font-gilroy font-semibold">{pageName}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
