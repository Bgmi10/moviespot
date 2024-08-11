import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaAngleLeft, FaAngleRight, FaArrowLeft } from 'react-icons/fa';

// Animation Variants
const headingVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const sliderVariants = {
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const Project = ({projects , title}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to the first image
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProject.imageUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProject.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="p-10 bg-slate-900" id="projects">
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="text-4xl font-extrabold text-center text-white mb-12"
      >
        {title}
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => handleCardClick(project)}
            className="relative w-80 h-52 bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 ease-in-out"
          >
            <img
              src={project.imageUrl[0]}
              alt={project.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-lg max-w-4xl w-full max-h-[90%] overflow-auto relative"
              style={{ boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.3)' }}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white text-xl font-bold"
              >
                ×
              </button>

              {/* Slider Controls */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4  top-[160px]  transform -translate-y-1/2 text-white text-2xl"
              >
               <FaAngleLeft />
              </button>

              <AnimatePresence>
                <motion.div
                  className="relative w-full h-64 overflow-hidden rounded-lg"
                  key={currentImageIndex}
                  variants={sliderVariants}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <img
                    src={selectedProject.imageUrl[currentImageIndex]}
                    alt={`Slide ${currentImageIndex}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-[160px]  transform -translate-y-1/2 text-white text-2xl"
              >
                <FaAngleRight />
              </button>

              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-white">{selectedProject.description}</p>
              <button className='text-blue-400 mt-2' onClick={() => window.location.href = selectedProject.link}>Link</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
