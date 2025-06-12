import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ImageCompare({ before, after, title }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleStart = (e) => {
    e.preventDefault();
    isDragging.current = true;
    updateSliderPosition(e);
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    updateSliderPosition(e);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const updateSliderPosition = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Touch events
    container.addEventListener('touchstart', handleStart, { passive: false });
    container.addEventListener('touchmove', handleMove, { passive: false });
    container.addEventListener('touchend', handleEnd);
    container.addEventListener('touchcancel', handleEnd);

    // Mouse events
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('mouseleave', handleEnd);

    return () => {
      // Clean up touch events
      container.removeEventListener('touchstart', handleStart);
      container.removeEventListener('touchmove', handleMove);
      container.removeEventListener('touchend', handleEnd);
      container.removeEventListener('touchcancel', handleEnd);

      // Clean up mouse events
      container.removeEventListener('mousedown', handleStart);
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseup', handleEnd);
      container.removeEventListener('mouseleave', handleEnd);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <h3 className="text-xl font-bold p-4 bg-[#d72638] text-white">{title}</h3>
      <div className="p-2 sm:p-4">
        <div 
          ref={containerRef}
          className="relative cursor-ew-resize select-none touch-none
            h-[300px] xs:h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px]"
          style={{ userSelect: 'none', touchAction: 'none' }}
        >
          {/* Container for both images */}
          <div className="absolute inset-0">
            {/* Before Image (Fixed) */}
            <div className="absolute inset-0">
              <img 
                src={before} 
                alt="Before"
                className="w-full h-full object-cover pointer-events-none"
                draggable="false"
                loading="lazy"
              />
            </div>
            
            {/* After Image (Fixed with clip-path) */}
            <div className="absolute inset-0">
              <img 
                src={after} 
                alt="After"
                className="w-full h-full object-cover pointer-events-none"
                draggable="false"
                loading="lazy"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                }}
              />
            </div>
          </div>

          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Slider Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
              <FaChevronLeft className="text-[#d72638] w-3 h-3 sm:w-4 sm:h-4" />
              <FaChevronRight className="text-[#d72638] w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded text-sm sm:text-base pointer-events-none z-10">
            Before
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded text-sm sm:text-base pointer-events-none z-10">
            After
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCompare; 