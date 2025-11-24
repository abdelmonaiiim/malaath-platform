import React, { useState, useEffect } from 'react';
import { 
  Book, PenTool, Youtube, Mail, Menu, X, Heart, Coffee, Globe, FileText, 
  ChevronLeft, Download, ExternalLink, Filter, ArrowRight, ChevronDown, 
  Camera, Mic, PlayCircle, Search, Share2, Calendar, User, Printer, 
  Facebook, Twitter, Linkedin, Home, ChevronRight, Video, Feather, Users,
  BookOpen, Eye, Copy, Check, Lock
} from 'lucide-react';

import Logo from './components/Logo';
import WhatsAppBtn from './components/WhatsAppBtn';
// استيراد المولد الجديد
import CodeGenerator from './components/CodeGenerator'; 

// استيراد البيانات الثابتة فقط
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

// --- مكون الرأس (Header) ---
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

// --- مكون الفوتر مع الزر السري ---
const Footer = ({ setPage }) => (
  <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ... نفس محتوى الفوتر السابق ... */}
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
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} منصة ملاذ الثقافية.</p>
        <div className="flex items-center gap-4">
            <p>برعاية وتأسيس الأديب <span className="text-amber-500 font-bold">بوسلهام عميمر</span></p>
            {/* الزر السري للوحة التحكم */}
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

// ... (HomePage, BooksPage, BookDetailView, ArticlesPage, ArticleReader, etc. remain exactly same as before) ...
// سأضع هنا فقط التغيير في المكون الرئيسي App لربط صفحة الأدمن الجديدة

const HomePage = ({ setPage, setArticle, setBook }) => (
    <div className="animate-fade-in">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fdfbf7]">
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
            {/* Featured Book */}
            <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-stone-900 rounded-2xl -rotate-3 opacity-5 scale-105"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-100 group">
                <div className="bg-stone-900 p-6 flex justify-between items-center text-white">
                    <div><span className="text-xs text-amber-500 font-bold uppercase">مؤسس المنصة</span><h3 className="text-2xl font-serif font-bold mt-1">بوسلهام عميمر</h3></div>
                    <PenTool className="text-stone-700 w-12 h-12" />
                </div>
                <div className="p-8">
                    <div className="flex gap-4 mb-6">
                    <div className="w-24 h-32 bg-stone-200 rounded shadow-lg flex-shrink-0 overflow-hidden">
                        <img src={BOOKS_DATA[0].coverImage} alt={BOOKS_DATA[0].title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2">أحدث الإصدارات: {BOOKS_DATA[0].title}</h4>
                        <p className="text-sm text-stone-500 line-clamp-3">{BOOKS_DATA[0].description}</p>
                    </div>
                    </div>
                    <button onClick={() => { setBook(BOOKS_DATA[0]); setPage('book-detail'); }} className="w-full py-3 bg-stone-100 text-stone-800 font-bold rounded-lg hover:bg-amber-500 hover:text-white transition-colors">قراءة المزيد</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>
      {/* ... Rest of HomePage sections (Timeline, etc) ... */}
    </div>
);

const BooksPage = ({ setPage, setBook, searchQuery }) => {
    const filteredBooks = BOOKS_DATA.filter(book => 
      book.title.includes(searchQuery) || 
      book.description.includes(searchQuery)
    );
  
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-900 font-serif mb-4">المكتبة الرقمية</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">مجموعة الأعمال الكاملة للمؤسس.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBooks.map((book) => (
            <div key={book.id} className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
              <div className={`h-80 bg-stone-100 flex items-center justify-center p-4 relative overflow-hidden`}>
                 <img src={book.coverImage} alt={book.title} className="h-64 w-auto shadow-2xl transform group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 object-cover rounded-sm" />
                 {book.videoUrl && (<div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white animate-pulse z-10"><PlayCircle size={20} /></div>)}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-stone-900 font-serif mb-3">{book.title}</h3>
                <button onClick={() => { setBook(book); setPage('book-detail'); }} className="w-full py-3 bg-stone-900 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                  <Book size={18} /> عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

const BookDetailView = ({ book, setPage }) => {
    const [isReading, setIsReading] = useState(false);
    const shareBook = () => handleShare(`كتاب: ${book.title}`, `أدعوك لقراءة كتاب "${book.title}"`);

    return (
        <div className="pt-24 pb-20 bg-white animate-fade-in relative">
            {isReading && (
                <div className="fixed inset-0 z-[60] bg-stone-900/95 backdrop-blur-sm flex flex-col animate-fade-in">
                     <div className="flex justify-between items-center p-4 bg-stone-900 border-b border-stone-800 text-white">
                        <button onClick={() => setIsReading(false)}><X size={24} /></button>
                     </div>
                     <div className="flex-1 w-full h-full bg-stone-800 flex items-center justify-center p-4">
                        <iframe src={book.pdfUrl} className="w-full h-full max-w-5xl bg-white rounded shadow-2xl"></iframe>
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
                        <div className="flex gap-4">
                            {book.pdfUrl && <button onClick={() => setIsReading(true)} className="flex-1 bg-stone-900 text-white py-3 rounded flex justify-center gap-2"><Eye /> قراءة</button>}
                            <button onClick={shareBook} className="px-6 border rounded flex justify-center gap-2 items-center"><Share2 /> مشاركة</button>
                        </div>
                        {book.videoUrl && (
                            <div className="mt-8 aspect-video w-full bg-black rounded overflow-hidden">
                                <iframe className="w-full h-full" src={`${book.videoUrl}?rel=0&modestbranding=1`} frameBorder="0" allowFullScreen></iframe>
                            </div>
                        )}
                    </div>
                 </div>
             </div>
        </div>
    );
};

const ArticlesPage = ({ setPage, setArticle, searchQuery }) => {
    const filtered = ARTICLES_DATA.filter(a => a.title.includes(searchQuery));
    return (
        <div className="pt-24 pb-20 max-w-7xl mx-auto px-4">
             <div className="grid lg:grid-cols-3 gap-8">
                {filtered.map(article => (
                    <div key={article.id} onClick={() => {
                        if(article.url) window.open(article.url, '_blank');
                        else { setArticle(article); setPage('article-detail'); }
                    }} className="bg-white border rounded-xl p-6 cursor-pointer hover:shadow-lg">
                        <h3 className="text-xl font-bold font-serif mb-2">{article.title}</h3>
                        <div className="flex justify-between text-xs text-stone-400 mt-4">
                            <span>{article.date}</span>
                            {article.url && <ExternalLink size={14} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ArticleReader = ({ article, setPage }) => {
    return (
        <div className="pt-24 pb-20 max-w-3xl mx-auto px-4">
            <button onClick={() => setPage('articles')} className="mb-8">عودة</button>
            <h1 className="text-3xl font-bold font-serif mb-6">{article.title}</h1>
            <div className="prose prose-lg">{article.content}</div>
        </div>
    );
};

const ActivitiesPage = () => (<div className="pt-32 text-center">صفحة الأنشطة (قيد التطوير)</div>);
const AboutPage = () => (<div className="pt-32 text-center">صفحة المؤسس (قيد التطوير)</div>);
const ContactPage = () => (<div className="pt-32 text-center">صفحة التواصل (قيد التطوير)</div>);


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
      case 'admin-gen': return <CodeGenerator />; // صفحة الأدمن السرية
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