import React, { useState, useEffect } from 'react';
import { 
  Book, PenTool, Youtube, Mail, Menu, X, Heart, Coffee, Globe, FileText, 
  ChevronLeft, Download, ExternalLink, Filter, ArrowRight, ChevronDown, 
  Camera, Mic, PlayCircle, Search, Share2, Calendar, User, Printer, 
  Facebook, Twitter, Linkedin, Home, ChevronRight, Video, Feather, Users,
  BookOpen, Eye, Copy, Check, Lock
} from 'lucide-react';

// --- استيراد المكونات والبيانات ---
import Logo from './components/Logo';
import WhatsAppBtn from './components/WhatsAppBtn';
import CodeGenerator from './components/CodeGenerator'; 

import { BOOKS_DATA } from './data/books';
import { ARTICLES_DATA } from './data/articles';
import { ACTIVITIES_DATA } from './data/activities';
import { TIMELINE_DATA } from './data/timeline';

// --- دالة المشاركة ---
const handleShare = async (title, text, url = window.location.href) => {
  if (navigator.share) {
    try { await navigator.share({ title, text, url }); } catch (error) { console.log('Error sharing', error); }
  } else { navigator.clipboard.writeText(url); alert('تم نسخ الرابط للحافظة!'); }
};

// --- 1. مكون الرأس (Header) ---
const Header = ({ activePage, setPage, searchQuery, setSearchQuery }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'books', label: 'المكتبة' },
    { id: 'articles', label: 'المقالات' },
    { id: 'activities', label: 'أنشطة ولقاءات' },
    { id: 'about', label: 'المؤسس' },
    { id: 'contact', label: 'تواصل' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-stone-200 py-2' : 'bg-white border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setPage('home')}>
            <Logo className="w-12 h-12 shadow-sm transition-transform group-hover:scale-105" />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-stone-900 font-serif leading-none tracking-tight">مَلاذ</h1>
              <p className="text-[10px] text-stone-500 tracking-wider mt-1 font-medium">للأدب والفكر • أسسها بوسلهام عميمر</p>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="ابحث في الأرشيف الأدبي..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage === 'home' && e.target.value.length > 0) setPage('books');
              }}
              className="w-full bg-stone-50 border border-stone-200 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>

          <nav className="hidden md:flex items-center space-x-reverse space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activePage === item.id 
                    ? 'bg-stone-900 text-white shadow-sm' 
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 absolute w-full">
          <div className="p-4 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setIsMobileMenuOpen(false); }}
                className={`block w-full text-right px-4 py-3 rounded-lg text-sm font-medium ${
                  activePage === item.id ? 'bg-amber-50 text-amber-800' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// --- 2. Footer ---
const Footer = ({ setPage }) => (
  <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Logo className="w-14 h-14" dark={true} />
            <div>
              <h3 className="text-2xl font-bold text-white font-serif">منصة ملاذ</h3>
              <p className="text-xs text-stone-500">حيث تأوي الكلمات</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6 max-w-md text-stone-300">
            مشروع ثقافي طموح انطلق من الأرشيف الغني للأديب بوسلهام عميمر.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg border-b border-stone-800 pb-2 inline-block">روابط المنصة</h4>
          <ul className="space-y-3 text-sm">
             <li><button onClick={() => setPage('home')}>الرئيسية</button></li>
             <li><button onClick={() => setPage('books')}>المكتبة الرقمية</button></li>
             <li><button onClick={() => setPage('about')}>عن المؤسس</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg border-b border-stone-800 pb-2 inline-block">دعم المنصة</h4>
          <p className="text-sm mb-4 text-stone-400">
            لضمان استمرارية هذا الملاذ الثقافي مجانياً للجميع.
          </p>
          <button className="flex items-center gap-2 bg-stone-800 border border-stone-700 px-4 py-2 rounded-lg hover:bg-amber-700 hover:border-amber-600 hover:text-white transition-all text-xs text-stone-300 w-full justify-center">
            <Heart size={14} className="fill-current" /> مساهمة في المشروع
          </button>
        </div>
      </div>

      <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} منصة ملاذ الثقافية.</p>
        <div className="flex items-center gap-4">
            <p>برعاية وتأسيس الأديب <span className="text-amber-500 font-bold">بوسلهام عميمر</span></p>
            <button 
              onClick={() => setPage('admin-gen')} 
              className="opacity-10 hover:opacity-100 transition-opacity p-2"
              title="لوحة التحكم"
            >
              <Lock size={14} />
            </button>
        </div>
      </div>
    </div>
  </footer>
);

// --- 3. الصفحات (Pages) ---

const HomePage = ({ setPage, setArticle, setBook }) => (
  <div className="animate-fade-in">
    {/* Hero */}
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fdfbf7]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-stone-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 opacity-5 text-9xl font-serif text-stone-900 rotate-12">م</div>
        <div className="absolute bottom-20 right-40 opacity-5 text-9xl font-serif text-stone-900 -rotate-12">ذ</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 text-amber-50 text-xs font-bold mb-6 shadow-md border border-stone-700">
              <Globe size={14} className="animate-pulse" /> انطلاقة جديدة للأدب الهادف
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-stone-900 leading-tight font-serif mb-6">
              مَلاذ<span className="text-amber-600">.</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-light border-r-4 border-amber-500 pr-4 bg-white/50 py-2">
              منصة ثقافية جامعة، انطلقت من الأرشيف الثري للأديب والمربي <strong>بوسلهام عميمر</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => setPage('books')} className="px-8 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-xl flex items-center justify-center gap-3">
                <Book size={20} /> تصفح مكتبة المؤسس
              </button>
            </div>
          </div>

          {/* Founder Spotlight Card - تم تعديل هذا الجزء ليظهر على الموبايل */}
          <div className="relative mt-12 lg:mt-0 block"> 
            <div className="absolute inset-0 bg-stone-900 rounded-2xl -rotate-3 opacity-5 scale-105"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-100 group">
              <div className="bg-stone-900 p-6 flex justify-between items-center text-white">
                <div>
                   <span className="text-xs text-amber-500 font-bold uppercase">مؤسس المنصة</span>
                   <h3 className="text-2xl font-serif font-bold mt-1">بوسلهام عميمر</h3>
                </div>
                <PenTool className="text-stone-700 w-12 h-12" />
              </div>
              <div className="p-8">
                <div className="flex gap-4 mb-6">
                   <div className="w-24 h-32 bg-stone-200 rounded shadow-lg flex-shrink-0 overflow-hidden">
                      <img src={BOOKS_DATA[0].coverImage} alt={BOOKS_DATA[0].title} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">أحدث الإصدارات: {BOOKS_DATA[0].title}</h4>
                      <p className="text-sm text-stone-500 line-clamp-3">
                        {BOOKS_DATA[0].description}
                      </p>
                   </div>
                </div>
                <button onClick={() => { setBook(BOOKS_DATA[0]); setPage('book-detail'); }} className="w-full py-3 bg-stone-100 text-stone-800 font-bold rounded-lg hover:bg-amber-500 hover:text-white transition-colors">
                  قراءة المزيد
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* ... باقي الأقسام ... */}
  </div>
);

// ... BooksPage (كما هي)
const BooksPage = ({ setPage, setBook, searchQuery }) => {
  const filteredBooks = BOOKS_DATA.filter(book => 
    book.title.includes(searchQuery) || 
    book.description.includes(searchQuery) ||
    book.category.includes(searchQuery)
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-900 font-serif mb-4">المكتبة الرقمية</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">مجموعة الأعمال الكاملة للمؤسس.</p>
        {searchQuery && <p className="mt-4 text-amber-600 text-sm bg-amber-50 inline-block px-4 py-1 rounded-full">نتائج البحث عن: "{searchQuery}"</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredBooks.map((book) => (
          <div key={book.id} className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
            <div className={`h-80 bg-stone-100 flex items-center justify-center p-4 relative overflow-hidden`}>
               <img src={book.coverImage} alt={book.title} className="h-64 w-auto shadow-2xl transform group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 object-cover rounded-sm" />
               {book.videoUrl && (<div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white animate-pulse z-10"><PlayCircle size={20} /></div>)}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-1 rounded">{book.category}</span>
                 <span className="text-xs text-stone-400 font-mono">{book.year}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif mb-3">{book.title}</h3>
              <p className="text-stone-500 text-sm line-clamp-3 mb-6 flex-grow">{book.description}</p>
              <button onClick={() => { setBook(book); setPage('book-detail'); }} className="w-full py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                <Book size={18} /> عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ... BookDetailView (كما هي)
const BookDetailView = ({ book, setPage }) => {
  const [isReading, setIsReading] = useState(false);
  const shareBook = () => handleShare(`كتاب: ${book.title}`, `أدعوك لقراءة كتاب "${book.title}"`);

  return (
    <div className="pt-24 pb-20 bg-white animate-fade-in relative">
      {isReading && (
        <div className="fixed inset-0 z-[60] bg-stone-900/95 backdrop-blur-sm flex flex-col animate-fade-in">
          <div className="flex justify-between items-center p-4 bg-stone-900 border-b border-stone-800 text-white">
            <button onClick={() => setIsReading(false)} className="p-2"><X size={24} /></button>
          </div>
          <div className="flex-1 w-full h-full bg-stone-800 flex items-center justify-center p-4">
             {book.pdfUrl ? <iframe src={book.pdfUrl} className="w-full h-full max-w-5xl bg-white rounded shadow-2xl"></iframe> : <p className="text-stone-400">عذراً، النسخة الرقمية غير متوفرة.</p>}
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => setPage('books')} className="flex items-center gap-2 text-stone-500 mb-8"><ChevronRight size={20} /> عودة</button>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4"><img src={book.coverImage} className="w-full rounded shadow-2xl" /></div>
          <div className="lg:col-span-8">
            <h1 className="text-4xl font-bold font-serif mb-6">{book.title}</h1>
            <p className="prose prose-lg mb-8">{book.description}</p>
            <div className="flex gap-4 mb-8">
              {book.pdfUrl && <button onClick={() => setIsReading(true)} className="flex-1 bg-stone-900 text-white py-3 rounded flex justify-center gap-2"><Eye /> طالع الكتاب</button>}
              <button onClick={shareBook} className="px-6 border rounded flex justify-center gap-2 items-center"><Share2 /> مشاركة</button>
            </div>
            {book.videoUrl && <div className="aspect-video w-full bg-black rounded overflow-hidden"><iframe className="w-full h-full" src={`${book.videoUrl}?rel=0&modestbranding=1`} allowFullScreen></iframe></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ... ArticlesPage (كما هي)
// ... (باقي الكود في الأعلى كما هو) ...

// === تحديث جذري لمكون صفحة المقالات ===
const ArticlesPage = ({ setPage, setArticle, searchQuery }) => {
  // حالة جديدة: هل اخترنا تصنيفاً أم لا؟ (null = لا يوجد اختيار، يعني اعرض التصنيفات)
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // التأكد من وجود البيانات
  const safeArticles = ARTICLES_DATA || [];

  // قائمة التصنيفات مع أيقونات وألوان مميزة
  const categories = [
    { id: 'تعليم وتربية', title: 'التعليم والتربية', icon: Users, color: 'bg-blue-50 text-blue-700 border-blue-200', count: safeArticles.filter(a => a.category === 'تعليم وتربية').length },
    { id: 'قضايا المجتمع والسياسة', title: 'المجتمع والسياسة', icon: Globe, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', count: safeArticles.filter(a => a.category === 'قضايا المجتمع والسياسة').length },
    { id: 'نقد أدبي وفني', title: 'النقد الأدبي والفني', icon: PenTool, color: 'bg-rose-50 text-rose-700 border-rose-200', count: safeArticles.filter(a => a.category === 'نقد أدبي وفني').length },
    { id: 'فكر وثقافة', title: 'فكر وثقافة', icon: BookOpen, color: 'bg-amber-50 text-amber-700 border-amber-200', count: safeArticles.filter(a => a.category === 'فكر وثقافة').length },
  ];

  // تصفية المقالات حسب التصنيف المختار (أو البحث)
  const filtered = safeArticles.filter(a => {
    const matchesSearch = (a.title && a.title.includes(searchQuery)) || (a.category && a.category.includes(searchQuery));
    const matchesCategory = selectedCategory ? a.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* العنوان والبحث */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-200 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-stone-900 font-serif mb-3">أرشيف المقالات</h2>
          <p className="text-stone-500">
            {selectedCategory ? `تصفح مقالات: ${selectedCategory}` : 'اختر تصنيفاً لتصفح المقالات'}
          </p>
        </div>
        
        {/* زر العودة للتصنيفات (يظهر فقط عند اختيار تصنيف) */}
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)} 
            className="mt-4 md:mt-0 flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors"
          >
            <ChevronRight size={20} /> عودة للتصنيفات
          </button>
        )}
      </div>

      {/* === عرض التصنيفات (فقط إذا لم نختر تصنيفاً بعد) === */}
      {!selectedCategory && !searchQuery && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-8 rounded-2xl border ${cat.color} cursor-pointer hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center h-48 justify-center`}
              >
                <div className="mb-4 p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
                <span className="text-xs opacity-75 bg-white/50 px-2 py-1 rounded-full">{cat.count} مقال</span>
              </div>
            );
          })}
        </div>
      )}

      {/* === عرض قائمة المقالات (عند اختيار تصنيف أو البحث) === */}
      {(selectedCategory || searchQuery) && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 animate-fade-in">
          {filtered.map((article) => (
            <div 
              key={article.id}
              onClick={() => {
                if (article.url) {
                   window.open(article.url, '_blank', 'noopener,noreferrer');
                } else {
                   setArticle(article); 
                   setPage('article-detail');
                }
              }}
              className="bg-white border border-stone-200 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:border-amber-300 transition-all duration-300 group flex flex-col h-full relative"
            >
               <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded bg-stone-50 text-stone-600 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors`}>
                    {article.category}
                  </span>
                  {article.url && (
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-stone-300 group-hover:text-amber-500 hover:scale-110 transition-transform p-1"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
               </div>
               <h3 className="text-xl font-bold text-stone-900 font-serif mb-3 leading-snug group-hover:text-amber-800 transition-colors flex-grow">
                 {article.title}
               </h3>
               <p className="text-stone-500 text-sm line-clamp-2 mb-6">
                 {article.content}
               </p>
               <div className="pt-4 border-t border-stone-50 flex justify-between text-xs text-stone-400 font-mono mt-auto">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                  <span>{article.source}</span>
               </div>
            </div>
          ))}
        </div>
      )}
      
      {/* رسالة عند عدم وجود نتائج */}
      {(selectedCategory || searchQuery) && filtered.length === 0 && (
        <div className="text-center py-20">
          <FileText size={48} className="mx-auto text-stone-200 mb-4" />
          <p className="text-stone-500">لا توجد مقالات في هذا التصنيف حالياً.</p>
          <button onClick={() => setSelectedCategory(null)} className="mt-4 text-amber-700 underline">عودة للتصنيفات</button>
        </div>
      )}
    </div>
  );
};

// ... (باقي الكود في الأسفل كما هو) ...

// ... ArticleReader (كما هي)
const ArticleReader = ({ article, setPage }) => (
  <div className="pt-24 pb-20 max-w-3xl mx-auto px-4">
    <button onClick={() => setPage('articles')} className="mb-8">عودة</button>
    <h1 className="text-3xl font-bold font-serif mb-6">{article.title}</h1>
    <div className="prose prose-lg">{article.content}</div>
  </div>
);

// ... ActivitiesPage (الكاملة)
const ActivitiesPage = () => (
  <div className="pt-24 pb-20 bg-stone-900 min-h-screen text-stone-100 animate-fade-in">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Mic className="text-amber-500 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white font-serif mb-4">أرشيف الأنشطة واللقاءات</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ACTIVITIES_DATA.map(item => (
           <div key={item.id} className="bg-stone-800 rounded-xl overflow-hidden">
             <div className="aspect-[4/3] overflow-hidden"><img src={item.imageUrl || item.thumbnail} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" /></div>
             <div className="p-6"><h4 className="font-bold mb-2">{item.title}</h4><p className="text-sm text-stone-400">{item.description}</p></div>
           </div>
        ))}
      </div>
    </div>
  </div>
);

// ... AboutPage (الكاملة مع التايم لاين)
const AboutPage = () => (
  <div className="pt-24 pb-20 bg-white animate-fade-in">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-xl relative">
           <div className="w-full h-full flex items-center justify-center bg-stone-800 text-amber-50 text-4xl font-serif">ب</div>
        </div>
        <h2 className="text-4xl font-bold text-stone-900 font-serif mb-3">بوسلهام عميمر</h2>
      </div>
      <div className="prose prose-stone prose-lg mx-auto mb-20 bg-[#fdfbf7] p-8 rounded-2xl">
        <p>صوت مغربي أصيل، كرس حياته المهنية والإبداعية للدفاع عن قيم المدرسة العمومية...</p>
      </div>
      <div className="relative border-r-2 border-stone-200 mr-4 md:mr-0 md:mx-auto max-w-3xl space-y-12">
        {TIMELINE_DATA.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="relative flex items-start gap-6 group">
              <div className="absolute -right-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 border-2 border-white"></div>
              <div className="flex-1 bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2"><span className="text-sm font-bold text-amber-600 font-mono">{item.year}</span></div>
                <h3 className="text-xl font-bold text-stone-900 font-serif mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// ... ContactPage (الكاملة)
const ContactPage = () => (
  <div className="pt-24 pb-20 bg-stone-50 animate-fade-in min-h-[80vh] flex items-center">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        <div className="bg-stone-900 p-12 text-white flex flex-col justify-between">
            <div><h2 className="text-3xl font-bold font-serif mb-6">تواصل مع المؤسس</h2><p className="text-stone-300">نرحب بآرائكم...</p></div>
            <div className="space-y-6"><div className="flex items-center gap-4"><Mail /> contact@malaath.com</div></div>
        </div>
        <div className="p-12">
          <form className="space-y-6">
            <input type="text" className="w-full p-3 border rounded" placeholder="الاسم الكامل" />
            <input type="email" className="w-full p-3 border rounded" placeholder="البريد الإلكتروني" />
            <textarea rows="4" className="w-full p-3 border rounded" placeholder="الرسالة..."></textarea>
            <button className="w-full bg-stone-900 text-white py-4 rounded hover:bg-amber-700">إرسال</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---
const App = () => {
  const [page, setPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const renderContent = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} setArticle={setSelectedArticle} setBook={setSelectedBook} />;
      case 'books': return <BooksPage setPage={setPage} setBook={setSelectedBook} searchQuery={searchQuery} />;
      case 'book-detail': return selectedBook ? <BookDetailView book={selectedBook} setPage={setPage} /> : <BooksPage setPage={setPage} setBook={setSelectedBook} searchQuery={searchQuery} />;
      case 'articles': return <ArticlesPage setPage={setPage} setArticle={setSelectedArticle} searchQuery={searchQuery} />;
      case 'article-detail': return selectedArticle ? <ArticleReader article={selectedArticle} setPage={setPage} /> : <ArticlesPage setPage={setPage} setArticle={setSelectedArticle} searchQuery={searchQuery} />;
      case 'activities': return <ActivitiesPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'admin-gen': return <CodeGenerator />; 
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div dir="rtl" className="font-sans text-stone-800 bg-stone-50 min-h-screen selection:bg-amber-200 selection:text-amber-900">
      <Header activePage={page} setPage={setPage} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="min-h-screen">{renderContent()}</main>
      <Footer setPage={setPage} />
      <WhatsAppBtn />
    </div>
  );
};

export default App;