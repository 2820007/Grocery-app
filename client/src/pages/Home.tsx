import AppPromo from "../components/home/AppPromo"
import Features from "../components/home/Features"
import Hero from "../components/home/Hero"
import HomeCategories from "../components/home/HomeCategories"
import NewsLetter from "../components/home/NewsLetter"
import PopularProduct from "../components/home/PopularProduct"


const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-12">
      <Hero/>
      <Features/>
      <HomeCategories/>
      <PopularProduct/>
      <AppPromo/>
      <NewsLetter/>
    </div>
  )
}

export default Home