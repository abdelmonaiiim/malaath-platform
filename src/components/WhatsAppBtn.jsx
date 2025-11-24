import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppBtn = () => {
  // استبدل الرقم برقم الهاتف الحقيقي (مع رمز الدولة)
  // مثال: 212600000000
  const phoneNumber = "212666326562"; 
  const message = "السلام عليكم، تواصلت معكم عبر منصة ملاذ.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute left-full ml-3 bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        راسلنا مباشرة
      </span>
    </a>
  );
};

export default WhatsAppBtn;