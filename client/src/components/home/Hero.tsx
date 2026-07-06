import { ArrowRightIcon, LeafIcon } from "lucide-react"
import { heroSectionData } from "../../assets/assets"
import { Link } from "react-router-dom"


const Hero = () => {
  return (
   <section className="relative overflow-hidden min-h-[550px] rounded-3xl mb-10 flex items-center">
  {/* Background Image */}
  <img
    src={heroSectionData.hero_image}
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-app-green via-app-green/70 to-transparent"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
    <div className="max-w-2xl">
      {/* Badge */}
      <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-300 bg-orange-300/10 border border-orange-300/20 rounded-full mb-6">
        <LeafIcon className="w-4 h-4" />
        Farm-Fresh & Organic
      </span>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
        Nourish your home with{" "}
        <span className="text-orange-300">
          Earth's finest
        </span>
      </h1>

      {/* Description */}
      <p className="text-lg text-white/80 leading-relaxed max-w-lg mb-8">
        {heroSectionData.description}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/products"
          className="px-7 py-3 bg-orange-400 text-white font-semibold rounded-full flex items-center gap-2 hover:bg-orange-500 transition-all duration-300 shadow-lg active:scale-95"
        >
          Shop Now
          <ArrowRightIcon className="w-4 h-4" />
        </Link>

        <Link
          to="/products"
          className="px-7 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero