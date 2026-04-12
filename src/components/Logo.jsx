import React, { useState, useEffect } from 'react';
import { 
  Book, PenTool, Youtube, Mail, Menu, X, Heart, Globe, FileText, 
  ChevronLeft, Download, ExternalLink, ArrowRight, ChevronDown, 
  Mic, PlayCircle, Search, Share2, Calendar, User, Printer, 
  Facebook, Twitter, Linkedin, ChevronRight, Video
} from 'lucide-react';

// ==========================================
// 1. الاستيراد من المجلدات (Structured Imports)
// ==========================================
import BOOKS_DATA from './data/books';
import ARTICLES_DATA from './data/articles';
import ACTIVITIES_DATA from './data/activities';

import Logo from './components/Logo';
// إذا أردت إضافة زر الواتساب لاحقاً قم بإزالة التعليق أدناه:
// import WhatsAppBtn from './components/WhatsAppBtn';

// ==========================================
// 2. مكونات الواجهة (UI Components)
// ==========================================

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
    { id: 'books', label: 'المؤلفات' },
    { id: 'articles', label: 'المقالات' },
    { id: 'activities', label: 'أنشطة ولقاءات' },
    { id: 'about', label: 'عن الكاتب' },
    { id: 'contact', label: 'تواصل' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-stone-200 py-2' : 'bg-white border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setPage('home')}>
            <Logo size="10" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-stone-900 font-serif leading-none">بوسلهام عميمر</h1>
              <p className="text-[10px] text-stone-500 tracking-wider mt-1">كاتب • ناقد • مربي</p>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="ابحث في المكتبة أو المقالات..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
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

const Footer = ({ setPage }) => (
  <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Logo size="12" />
            <div>
              <h3 className="text-xl font-bold text-white font-serif">بوسلهام عميمر</h3>
              <p className="text-xs text-stone-500">الموقع الرسمي للأعمال الكاملة</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            ملاذ أدبي يوثق مسيرة كاتب آمن بأن الكلمة أمانة، وأن الأدب رسالة لتهذيب النفوس وبناء العقول. هنا تجدون خلاصة الفكر والروح.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 hover:text-white transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg">روابط سريعة</h4>
          <ul className="space-y-3 text-sm">
            {[
              { l: 'أحدث المقالات', page: 'articles' },
              { l: 'المكتبة الرقمية', page: 'books' },
              { l: 'عن الكاتب', page: 'about' },
              { l: 'المشاركات الإعلامية', page: 'activities' }
            ].map((link, i) => (
              <li key={i}>
                <button onClick={() => setPage(link.page)} className="hover:text-amber-500 transition-colors flex items-center gap-2">
                  <ChevronLeft size={12} /> {link.l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg">تواصل معنا</h4>
          <p className="text-sm mb-4">لأي استفسارات أو دعوات للمشاركة.</p>
          <p className="text-white font-mono bg-stone-800 p-3 rounded-lg border border-stone-700">contact@malaath.ma</p>
        </div>
      </div>

      <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} جميع الحقوق محفوظة للكاتب بوسلهام عميمر.</p>
        <p className="flex items-center gap-1">
          صمم وتطوير <Heart size={10} className="text-red-500 fill-current" /> هدية من الابن للوالد
        </p>
      </div>
    </div>
  </footer>
);

const HomePage = ({ setPage, setArticle, setBook }) => {
  const latestBooks = BOOKS_DATA || [];
  const latestArticles = ARTICLES_DATA || [];

  return (
    <div className="animate-fade-in">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-stone-50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-stone-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-bold mb-6">
                <PenTool size={12} /> الملاذ الأدبي
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-stone-900 leading-tight font-serif mb-6">
                حينما يُصبح القلم <br/>
                <span className="relative inline-block">
                  <span className="relative z-10 text-amber-800">وطناً وذاكرة</span>
                  <span className="absolute bottom-2 right-0 w-full h-3 bg-amber-200 -z-0 opacity-50"></span>
                </span>
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                مرحباً بكم في الموقع الرسمي للأديب والناقد <strong>بوسلهام عميمر</strong>. 
                نافذة تطل على عالم من السرد، النقد، والفكر التربوي، حيث الكلمة مسؤولية وشغف.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => setPage('books')} className="px-8 py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Book size={20} /> تصفح المكتبة
                </button>
                <button onClick={() => setPage('articles')} className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-xl font-medium hover:bg-stone-50 transition-all flex items-center justify-center gap-2">
                  <FileText size={20} /> أحدث المقالات
                </button>
              </div>
            </div>

            {latestBooks.length > 0 && (
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-amber-600 rounded-2xl rotate-6 opacity-10 scale-95 transform translate-x-4 translate-y-4"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-stone-100">
                  <div className="flex gap-6">
                    {latestBooks[0].coverImage ? (
                      <img src={latestBooks[0].coverImage} alt={latestBooks[0].title} className="w-32 h-48 rounded shadow-md object-cover shrink-0" />
                    ) : (
                      <div className="w-32 h-48 bg-stone-800 rounded shadow-md flex items-center justify-center text-amber-50 text-center p-2 shrink-0">
                        <span className="font-serif font-bold text-sm leading-snug p-1">{latestBooks[0].title}</span>
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wider">أحدث الإصدارات</div>
                      <h3 className="text-2xl font-bold text-stone-900 font-serif mb-3">{latestBooks[0].title}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {latestBooks[0].description}
                      </p>
                      <button onClick={() => { setBook(latestBooks[0]); setPage('book-detail'); }} className="text-sm font-bold text-stone-900 border-b-2 border-stone-900 hover:text-amber-700 hover:border-amber-700 transition-colors pb-1">
                        اقرأ المزيد
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 font-serif mb-2">من وحي اللحظة</h2>
              <p className="text-stone-500">أحدث المقالات والتدوينات المنشورة</p>
            </div>
            <button onClick={() => setPage('articles')} className="hidden md:flex items-center gap-2 text-amber-700 font-medium hover:underline">
              الأرشيف الكامل <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestArticles.slice(0, 3).map((article) => (
              <div 
                key={article.id} 
                onClick={() => { setArticle(article); setPage('article-detail'); }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-video bg-stone-100 rounded-xl mb-4 overflow-hidden relative">
                   <div className={`absolute inset-0 bg-gradient-to-br ${['from-amber-100 to-orange-50', 'from-blue-100 to-indigo-50', 'from-green-100 to-emerald-50'][article.id % 3]} opacity-50 group-hover:scale-105 transition-transform duration-500`}></div>
                   <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-stone-700 shadow-sm">
                     {article.category}
                   </div>
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-serif mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-stone-500 text-sm line-clamp-2 mb-4">
                  {article.excerpt || (article.content ? article.content.substring(0, 100) + '...' : '')}
                </p>
                <div className="flex items-center gap-3 text-xs text-stone-400 mt-auto pt-2">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                  <span>{article.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const BooksPage = ({ setPage, setBook }) => {
  const books = BOOKS_DATA || [];
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-900 font-serif mb-4">المكتبة الرقمية</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          مجموعة الأعمال الكاملة، متاحة للاطلاع، تغطي مواضيع التربية، الأدب، النقد، والقضايا الوطنية.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {books.map((book) => (
          <div key={book.id} className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
            <div className={`h-64 ${book.color || 'bg-stone-100'} flex items-center justify-center p-8 relative`}>
               {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="w-40 h-56 rounded-r-md rounded-l-sm shadow-2xl transform group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 object-cover relative z-10" />
               ) : (
                  <div className={`w-40 h-56 ${book.coverColor || 'bg-stone-800'} rounded-r-md rounded-l-sm shadow-2xl transform group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 flex flex-col items-center justify-center text-center p-4 border-l-4 border-white/10 relative z-10`}>
                    <div className="absolute inset-0 border border-white/20 m-1 rounded-sm"></div>
                    <h3 className="text-white text-sm font-serif font-bold leading-snug line-clamp-3">{book.title}</h3>
                  </div>
               )}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-1 rounded">{book.category}</span>
                 <span className="text-xs text-stone-400 font-mono">{book.year}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif mb-3">{book.title}</h3>
              <p className="text-stone-500 text-sm line-clamp-3 mb-6 flex-grow">{book.description}</p>
              <button 
                onClick={() => { setBook(book); setPage('book-detail'); }}
                className="w-full py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <Book size={18} /> عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookDetailView = ({ book, setPage }) => (
  <div className="pt-24 pb-20 bg-stone-50 animate-fade-in min-h-screen">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={() => setPage('books')} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ChevronRight size={20} /> العودة للمكتبة
      </button>
      
      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-0">
          <div className="lg:col-span-4 bg-stone-100 p-12 flex items-center justify-center">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="w-full max-w-sm rounded-lg shadow-2xl object-cover" />
            ) : (
              <div className={`w-full max-w-sm aspect-[2/3] ${book.coverColor || 'bg-stone-800'} rounded-lg shadow-2xl flex items-center justify-center p-8 text-center text-white relative overflow-hidden`}>
                <div className="absolute inset-0 border-[1px] border-white/20 m-3"></div>
                <div><h1 className="text-3xl font-bold font-serif mb-4">{book.title}</h1></div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 p-12 lg:p-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full">{book.category}</span>
              <span className="text-stone-400 text-sm font-mono">{book.year}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 font-serif mb-6 leading-tight">{book.title}</h1>
            
            <div className="prose prose-stone prose-lg max-w-none mb-10 text-stone-600 leading-relaxed whitespace-pre-line">
               {book.description}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-stone-100 mb-10">
              <div><p className="text-xs text-stone-500 mb-1">الناشر</p><p className="font-bold text-stone-900">{book.publisher}</p></div>
              <div><p className="text-xs text-stone-500 mb-1">عدد الصفحات</p><p className="font-bold text-stone-900">{book.pages ? `${book.pages} صفحة` : '-'}</p></div>
              <div><p className="text-xs text-stone-500 mb-1">ISBN</p><p className="font-mono font-bold text-stone-900">{book.isbn || '-'}</p></div>
              <div><p className="text-xs text-stone-500 mb-1">اللغة</p><p className="font-bold text-stone-900">العربية</p></div>
            </div>

            <div className="flex flex-wrap gap-4">
              {book.pdfUrl && (
                <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px] bg-amber-700 text-white py-4 rounded-xl font-bold hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-700/20">
                  <Download size={20} /> تحميل نسخة PDF
                </a>
              )}
              {book.videoLink && !book.videoUrl && (
                <a href={book.videoLink} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px] bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
                  <Youtube size={20} className="text-red-500" /> مشاهدة شرح الكتاب
                </a>
              )}
            </div>
          </div>
        </div>

        {book.videoUrl && (
          <div className="border-t border-stone-100 bg-stone-50 p-12 lg:p-16">
             <div className="max-w-4xl mx-auto">
               <div className="flex items-center gap-3 mb-8">
                 <Video className="text-amber-600" size={28} />
                 <h3 className="text-2xl font-bold text-stone-900 font-serif">فيديو تعريفي</h3>
               </div>
               <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-black">
                 <iframe className="w-full h-full" src={book.videoUrl} title={`فيديو عن كتاب ${book.title}`} allowFullScreen frameBorder="0"></iframe>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ArticlesPage = ({ setPage, setArticle, searchQuery }) => {
  const [category, setCategory] = useState('الكل');
  const articles = ARTICLES_DATA || [];
  
  const filtered = articles.filter(a => 
    (category === 'الكل' || a.category === category) &&
    (a.title.includes(searchQuery) || a.category?.includes(searchQuery))
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-200 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-stone-900 font-serif mb-3">أرشيف المقالات</h2>
          <p className="text-stone-500">كتابات في الفكر، النقد، والمجتمع.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {['الكل', 'تعليم وتربية', 'قضايا المجتمع والسياسة', 'نقد أدبي وفني', 'فكر وثقافة'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {filtered.map((article) => (
          <div 
            key={article.id}
            onClick={() => { setArticle(article); setPage('article-detail'); }}
            className="bg-white border border-stone-200 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:border-amber-300 transition-all duration-300 group flex flex-col h-full"
          >
             <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-stone-50 text-stone-600 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors`}>
                  {article.category}
                </span>
             </div>
             <h3 className="text-xl font-bold text-stone-900 font-serif mb-3 leading-snug group-hover:text-amber-800 transition-colors flex-grow">
               {article.title}
             </h3>
             <p className="text-stone-500 text-sm line-clamp-2 mb-6">
               {article.excerpt || (article.content ? article.content.substring(0, 100) + '...' : '')}
             </p>
             <div className="pt-4 border-t border-stone-50 flex justify-between text-xs text-stone-400 font-mono mt-auto">
                <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                <span>{article.source}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArticleReader = ({ article, setPage }) => (
  <div className="bg-stone-50 min-h-screen animate-fade-in">
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button onClick={() => setPage('articles')} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 transition-colors">
          <ChevronRight size={20} /> العودة للأرشيف
        </button>

        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-amber-700 font-bold text-xs tracking-wider uppercase mb-4">
            <span className="w-8 h-[1px] bg-amber-700"></span>
            {article.category}
            <span className="w-8 h-[1px] bg-amber-700"></span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 font-serif leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-stone-500 text-sm font-mono">
            <span className="flex items-center gap-1"><User size={14} /> بوسلهام عميمر</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
            <span className="flex items-center gap-1 bg-stone-200 px-2 py-0.5 rounded text-stone-700">{article.source}</span>
          </div>
        </header>

        <article className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100 text-lg text-stone-800 leading-loose whitespace-pre-line font-serif">
          {article.content ? article.content : "لم يتم إضافة محتوى المقال بعد."}
        </article>
      </div>
    </div>
  </div>
);

const ActivitiesPage = () => {
  const activities = ACTIVITIES_DATA || [];
  return (
    <div className="pt-24 pb-20 bg-stone-900 min-h-screen text-stone-100 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Mic className="text-amber-500 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white font-serif mb-4">أرشيف الأنشطة واللقاءات</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {activities.filter(a => a.type === 'video').map(video => (
            <div key={video.id} className="col-span-full lg:col-span-2 bg-black rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
               <div className="aspect-video w-full">
                 <iframe className="w-full h-full" src={video.videoUrl} title={video.title} allowFullScreen frameBorder="0"></iframe>
               </div>
               <div className="p-8 bg-stone-800">
                  <h3 className="text-2xl font-bold text-white font-serif mb-2">{video.title}</h3>
                  <p className="text-stone-400">{video.description}</p>
               </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.filter(a => a.type === 'image' || !a.type).map((item) => (
            <div key={item.id} className="bg-stone-800 rounded-xl overflow-hidden border border-stone-700 group hover:border-stone-600 transition-all">
               <div className="aspect-[4/3] overflow-hidden">
                 <img src={item.imageUrl || item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
               </div>
               <div className="p-6">
                 <div className="flex justify-between text-xs text-stone-500 mb-3 font-mono">
                    <span>{item.date}</span>
                    <span>{item.location}</span>
                 </div>
                 <h4 className="text-lg font-bold text-white font-serif mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h4>
                 <p className="text-stone-400 text-sm leading-relaxed">{item.description}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-24 pb-20 bg-white animate-fade-in min-h-screen">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Logo size="32" />
        <h2 className="text-4xl font-bold text-stone-900 font-serif mt-6 mb-4">بوسلهام عميمر</h2>
        <p className="text-xl text-stone-500 font-serif">كاتب • ناقد • باحث في قضايا التربية</p>
      </div>

      <div className="prose prose-stone prose-lg mx-auto">
        <p>بوسلهام عميمر، صوت مغربي أصيل، جمع بين دقة المربي، ورؤية الناقد، وحساسية الأديب. كرس حياته المهنية والإبداعية للدفاع عن قيم المدرسة العمومية، وتفكيك قضايا المجتمع، وتوثيق الذاكرة الوطنية.</p>
        <h3>المسار المهني</h3>
        <p>عمل في قطاع التربية والتكوين لسنوات طوال، مما منحه نظرة ثاقبة حول إشكاليات التعليم في المغرب. لم يكتفِ بالدور الوظيفي، بل تجاوزه إلى الدور التنويري عبر الكتابة المستمرة في المنابر الوطنية والدولية.</p>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-24 pb-20 bg-stone-50 animate-fade-in min-h-[80vh] flex items-center">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
      <h2 className="text-3xl font-bold font-serif mb-6">لنتواصل</h2>
      <p className="text-stone-600 mb-12">نرحب بآرائكم، استفساراتكم، ودعواتكم للمشاركة في الفعاليات الثقافية.</p>
      <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-md">
        <Mail size={24} className="text-amber-600" />
        <span className="font-mono text-lg text-stone-800">contact@malaath.ma</span>
      </div>
    </div>
  </div>
);

// ==========================================
// 3. المكون الرئيسي (Router Logic)
// ==========================================

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Hash Routing Logic (السر وراء عمل زر الرجوع)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setPage(hash);
      window.scrollTo(0, 0);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newPage) => {
    window.location.hash = newPage;
  };

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={navigateTo} setArticle={setSelectedArticle} setBook={setSelectedBook} />;
      case 'books':
        return <BooksPage setPage={navigateTo} setBook={setSelectedBook} />;
      case 'book-detail':
        return selectedBook ? <BookDetailView book={selectedBook} setPage={navigateTo} /> : <BooksPage setPage={navigateTo} setBook={setSelectedBook} />;
      case 'articles':
        return <ArticlesPage setPage={navigateTo} setArticle={setSelectedArticle} searchQuery={searchQuery} />;
      case 'article-detail':
        return selectedArticle ? <ArticleReader article={selectedArticle} setPage={navigateTo} /> : <ArticlesPage setPage={navigateTo} setArticle={setSelectedArticle} searchQuery={searchQuery} />;
      case 'activities':
        return <ActivitiesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setPage={navigateTo} />;
    }
  };

  return (
    <div dir="rtl" className="font-sans text-stone-800 bg-stone-50 min-h-screen selection:bg-amber-200 selection:text-amber-900">
      <Header activePage={page} setPage={navigateTo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="min-h-screen">
        {renderContent()}
      </main>
      <Footer setPage={navigateTo} />
      
      {/* إذا كان لديك مكون WhatsAppBtn، قم بفك التعليق أدناه */}
      {/* <WhatsAppBtn /> */}
    </div>
  );
};

export default App;