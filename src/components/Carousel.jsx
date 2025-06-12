import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Carousel({ items, renderItem }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previous = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={previous}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <FaChevronLeft className="text-[#d72638] w-6 h-6" />
      </button>
      
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <FaChevronRight className="text-[#d72638] w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-300 ease-in-out">
          {renderItem(items[currentIndex], currentIndex)}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#d72638]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel; 