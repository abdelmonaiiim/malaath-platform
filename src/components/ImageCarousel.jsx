import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // التحريك التلقائي كل 5 ثوانٍ (يعيد ضبط المؤقت عند كل تغيير)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    // تم تصغير العرض الأقصى إلى max-w-4xl ليكون حجمه متوسطاً وأكثر أناقة
    <div className="relative w-full max-w-4xl mx-auto group shadow-xl rounded-2xl overflow-hidden border-4 border-white bg-stone-100">
      {/* استخدام aspect-video للحفاظ على نسبة عرض إلى ارتفاع مثالية ومتجاوبة */}
      <div className="relative aspect-video w-full overflow-hidden">
        {images.map((image, index) => (
          // يتم عرض كل الصور فوق بعضها، ولكن نتحكم في الشفافية (opacity)
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* الصورة كخلفية */}
            <div
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              {/* طبقة تظليل للنص */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent"></div>
            </div>

            {/* النص التوضيحي (يظهر ويتلاشى مع الصورة) */}
            <div className="absolute bottom-0 right-0 p-6 md:p-8 text-white w-full ltr">
              <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-xs md:text-sm uppercase tracking-wider">
                <Camera size={14} />
                <span>ذاكرة الأنشطة</span>
              </div>
              <h3 className="text-lg md:text-2xl font-serif font-bold leading-tight">{image.caption}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* أزرار التنقل */}
      {/* على الموبايل (الافتراضي): تظهر دائماً (opacity-100) */}
      {/* على الشاشات المتوسطة فما فوق (md:): تختفي (opacity-0) وتظهر عند التحويم (hover) */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-amber-600 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label="الصورة السابقة"
      >
        <ChevronRight size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-amber-600 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label="الصورة التالية"
      >
        <ChevronLeft size={20} />
      </button>

      {/* النقاط السفلية */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
              currentIndex === index ? 'w-6 md:w-8 bg-amber-500' : 'w-1.5 md:w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`الذهاب للصورة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;