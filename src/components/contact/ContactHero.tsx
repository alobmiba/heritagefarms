

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#5B8C51] via-[#4A7A3F] to-[#3A7817] py-8 md:py-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#EDDD5E] rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-[#EDDD5E] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#EDDD5E] rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-[#EDDD5E] rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-[#EDDD5E] rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-8 left-8 w-2 h-2 bg-[#EDDD5E] rounded-full animate-bounce"></div>
        <div className="absolute top-16 right-12 w-1 h-1 bg-[#EDDD5E] rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-[#EDDD5E] rounded-full animate-bounce delay-700"></div>
      </div>
    </section>
  );
}
