"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardBody, Image } from "@heroui/react"
import { motion } from "framer-motion"
// import { EyeIcon, FlagIcon, StarIcon } from "@heroicons/react/24/outline"

import HorizontalTimeline from "./timeline"
import { EyeIcon, FlagIcon, StarIcon } from "lucide-react"

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.disconnect()
    }
  }, [])

  const vmgData = [
    {
      title: "Vision",
      icon: <EyeIcon className="h-8 w-8 text-logo-blue" />,
      content:
        "To be the premier scuba diving destination in the Philippines, recognized globally for excellence in diving education, marine conservation, and sustainable tourism practices.",
    },
    {
      title: "Mission",
      icon: <FlagIcon className="h-8 w-8 text-logo-blue" />,
      content:
        "To provide world-class diving experiences while promoting marine conservation, offering professional training, and fostering a deep appreciation for ocean life through safe and sustainable diving practices.",
    },
    {
      title: "Goals",
      icon: <StarIcon className="h-8 w-8 text-logo-blue" />,
      content:
        "To achieve excellence in diving education, promote marine conservation, and create unforgettable underwater experiences for our guests while maintaining the highest safety standards.",
    },
  ]

  return (
    <div ref={sectionRef} className="py-16 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-logo-blue dark:text-blue-100">About Anilao Scuba Dive Center</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Discover the underwater wonders of the Philippines</p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/img/hero-section/crab.jpg"
              alt="Scuba diving in Anilao"
              width={1000}
              height={400}
              className="hidden md:block rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 min-h-[400px]">
              <CardBody>
                <h3 className="mb-4 text-2xl font-semibold text-logo-blue dark:text-blue-100">
                  Our Passion for the Ocean
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  At <strong>Anilao Scuba Diving</strong>, we are passionate about unveiling the breathtaking wonders of the underwater world.
                  Located in the heart of the Philippines' premier diving destination, Anilao, we offer an unparalleled opportunity to explore vibrant coral reefs, diverse marine life, and stunning underwater landscapes.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Our team of <strong>PADI-certified instructors</strong> ensures a <strong>safe, educational, and unforgettable</strong> diving experience.
                  Whether you're a first-time diver eager to take the plunge or a seasoned adventurer seeking new depths, we provide expertly guided dives tailored to your skill level.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  From <strong>beginner courses</strong> to <strong>advanced certifications and specialty dives</strong>, our programs help enhance your skills and deepen your appreciation for the ocean.
                  Every dive is a <strong>new adventure</strong>, filled with wonder beneath the waves.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Join us at Anilao Scuba Diving and experience the magic of the deep!</strong>
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* VMG Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-logo-blue dark:text-blue-100 mb-12">
            Our Vision, Mission & Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vmgData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * (index + 4) }}
              >
                <Card className="h-full bg-white/90 dark:bg-gray-800/90 hover:shadow-lg transition-shadow duration-300">
                  <CardBody className="text-center p-6">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h4 className="text-xl font-semibold text-logo-blue dark:text-blue-100 mb-3">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <HorizontalTimeline />
      </div>
    </div>
  )
}

