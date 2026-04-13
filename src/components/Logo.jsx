import React from 'react';

const Logo = ({ className = "w-12 h-12", dark = false }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* الخلفية: شكل هندسي إسلامي مبسط */}
      <rect 
        x="10" y="10" width="80" height="80" rx="20" 
        className={dark ? "fill-white" : "fill-stone-900"} 
      />
      
      {/* الرمز: دمج بين كتاب مفتوح وقوس (ملاذ) */}
      <path 
        d="M30 70V45C30 36.7157 36.7157 30 45 30H50V70H30Z" 
        className="fill-amber-500" 
      />
      <path 
        d="M70 70V45C70 36.7157 63.2843 30 55 30H50V70H70Z" 
        className="fill-amber-600" 
      />
      
      {/* ريشة القلم في المنتصف (الفضاء السلبي) */}
      <path 
        d="M50 25L58 35H42L50 25Z" 
        className="fill-amber-200" 
      />
      
      {/* نقطة الحبر/العلم */}
      <circle cx="50" cy="20" r="3" className="fill-amber-500" />
    </svg>
  );
};

export default Logo;