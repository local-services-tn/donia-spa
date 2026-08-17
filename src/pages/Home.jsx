import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import Team from '../components/home/Team'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Gallery from '../components/home/Gallery'
import Testimonials from '../components/home/Testimonials'
import Videos from '../components/home/Videos'
import Reservation from '../components/home/Reservation'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Team />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <Videos />
      <Reservation />
    </>
  )
}
