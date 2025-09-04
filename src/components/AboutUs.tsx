"use client";

export default function JourneySection() {
  return (
    <section className="relative w-full bg-green-50  px-6 md:px-24 flex justify-center items-center min-h-screen mb-20 h-[100vh]">
      {/* Decorative background leaf */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/branding/Images/decor/leaf-bg.png"
          alt="Leaf background"
          className="w-full h-full object-contain opacity-10"
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        {/* Video Player */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
          <video
            src="/branding/Videos/video.mp4" // 👈 replace with your actual video path
            controls
            poster="/branding/Images/video-thumbnail.png"
            className="w-full rounded-lg"
          />

          {/* Caption Overlay */}
          <div className="absolute bottom-0 w-full bg-black/50 text-white text-lg md:text-xl py-3 px-6">
            Abimbola Adegbite
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full mt-1">
          <h2 className="text-2xl md:text-4xl font-bold text-green-900 leading-snug">
            Join us on a journey to food sovereignty;{" "}
            <br className="hidden sm:block" />
            Fresh and Culturally meaningful.
          </h2>

          <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
            We grow West African & Caribbean greens where our community lives,
            so your food travels less and tastes better. Sustainable, traceable,
            and always fresh.{" "}
            <em className="italic">
              Our goal is to reconnect people with nostalgic flavors nurtured
              under Canadian skies yet rooted in heritage.
            </em>
          </p>

          {/* Button */}
          <div className="mt-8">
            <a
              href="#learn-more"
              className="inline-block px-8 py-3 bg-green-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-800 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
