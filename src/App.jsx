import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, PenTool, Youtube, Mail, Menu, X, Heart, Globe, FileText, 
  ChevronLeft, Download, ExternalLink, ArrowRight, ChevronDown, 
  Mic, PlayCircle, Search, Share2, Calendar, User, Printer, 
  Facebook, Twitter, Linkedin, ChevronRight, Video, Loader, Image as ImageIcon, MapPin, Clock
} from 'lucide-react';

import { client, urlFor } from './client';
import Logo from './components/Logo';

// ==========================================
// مكونات الواجهة (Header & Footer)
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
    { id: 'about', label: 'السيرة الذاتية' },
  ];

  const handleNavClick = (id) => {
    window.location.hash = id;
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-stone-200 py-2' : 'bg-white border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <Logo size="10" />
            <div className="hidden sm:block text-right">
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
              className="w-full bg-stone-50 border border-stone-200 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-right"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>

          <nav className="hidden md:flex items-center space-x-reverse space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activePage === item.id ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100'
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
        <div className="md:hidden bg-white border-b border-stone-200 absolute w-full shadow-xl">
          <div className="p-4 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
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
  <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800 font-sans mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-right">
        <div>
          <div className="flex items-center gap-3 mb-6 justify-start">
            <Logo size="12" />
            <h3 className="text-xl font-bold text-white font-serif">بوسلهام عميمر</h3>
          </div>
          <p className="text-sm leading-relaxed mb-6">ملاذ أدبي يوثق مسيرة كاتب آمن بأن الكلمة أمانة. هنا تجدون خلاصة الفكر والروح.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg">روابط سريعة</h4>
          <ul className="space-y-3 text-sm">
            {['articles', 'books', 'about'].map((p) => (
              <li key={p}>
                <button onClick={() => { window.location.hash = p; }} className="hover:text-amber-500 transition-colors">
                  ← {p === 'articles' ? 'المقالات' : p === 'books' ? 'المكتبة' : 'عن الكاتب'}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg">تواصل معنا</h4>
          <p className="text-white font-mono bg-stone-800 p-3 rounded-lg border border-stone-700">contact@malaath.ma</p>
        </div>
      </div>
      <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-center">
        <p>© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
        <p>صمم بكل حب هدية من ابن لوالده <Heart size={10} className="inline text-red-500 fill-current" /></p>
      </div>
    </div>
  </footer>
);

// ==========================================
// الصفحة الرئيسية (محدثة بصندوق الحدث المرتقب)
// ==========================================

const HomePage = ({ setPage, setBook, books, events }) => {
  const latestBook = books && books.length > 0 ? books[0] : null;
  const scrollContainerRef = useRef(null);

  // المنطق الذكي لفصل الأنشطة القادمة عن السابقة
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = (events || []).filter(e => e.date && e.date >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastEvents = (events || []).filter(e => !e.date || e.date < today);
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in pt-32 pb-20 max-w-7xl mx-auto px-4 text-right">
      
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h1 className="text-4xl lg:text-6xl font-bold text-stone-900 font-serif mb-6 leading-tight">حينما يُصبح القلم <span className="text-amber-800">وطناً وذاكرة</span></h1>
          <p className="text-lg text-stone-600 mb-8 max-w-xl">الموقع الرسمي للأديب والناقد بوسلهام عميمر. نافذة تطل على عالم من السرد والنقد التربوي والتوثيق.</p>
          <div className="flex gap-4">
            <button onClick={() => setPage('books')} className="px-8 py-4 bg-stone-900 text-white rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"><Book size={20} /> تصفح المكتبة</button>
            <button onClick={() => setPage('articles')} className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-xl transition-colors hover:bg-stone-50">أحدث المقالات</button>
          </div>
        </div>
        
        {latestBook && (
          <div className="hidden lg:block bg-white p-8 rounded-3xl shadow-xl border border-stone-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div>
             <div className="flex gap-6">
                {latestBook.coverImage ? (
                  <img src={urlFor(latestBook.coverImage).url()} className="w-36 h-52 rounded-lg shadow-md object-cover" alt={latestBook.title} />
                ) : (
                  <div className="w-36 h-52 bg-stone-800 rounded-lg shadow-md flex items-center justify-center text-white text-center p-4">{latestBook.title}</div>
                )}
                <div className="flex flex-col justify-center">
                   <div className="flex items-center gap-2 mb-3">
                     <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                     <span className="text-sm font-bold text-amber-700 tracking-wider">أحدث الإصدارات</span>
                   </div>
                   <h3 className="text-3xl font-bold text-stone-900 font-serif mb-4 leading-snug">{latestBook.title}</h3>
                   <button onClick={() => { setBook(latestBook); setPage('book-detail'); }} className="flex items-center gap-2 text-stone-900 font-bold hover:text-amber-700 transition-colors self-start border-b-2 border-stone-900 hover:border-amber-700 pb-1">
                     اقرأ المزيد <ChevronLeft size={16} />
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* ============== صندوق الحدث المرتقب ============== */}
      {nextEvent && (
        <div className="mb-24 bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-stone-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-3xl opacity-20 -z-10"></div>
          
          {nextEvent.coverImage ? (
            <img src={urlFor(nextEvent.coverImage).url()} className="w-full md:w-1/3 rounded-xl shadow-lg object-cover aspect-[4/3] z-10 border border-stone-600" alt={nextEvent.title} />
          ) : (
             <div className="w-full md:w-1/3 aspect-[4/3] bg-stone-800 rounded-xl flex items-center justify-center border border-stone-600"><Calendar size={40} className="text-stone-500"/></div>
          )}

          <div className="flex-1 z-10 w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full animate-pulse flex items-center gap-2">
                <Mic size={14}/> حدث مرتقب
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-serif mb-4 leading-tight">{nextEvent.title}</h3>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed line-clamp-3">{nextEvent.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm font-medium text-amber-200 bg-white/5 p-4 rounded-2xl border border-white/10">
              {nextEvent.date && <div className="flex items-center gap-2"><Calendar size={18}/> {nextEvent.date}</div>}
              {nextEvent.time && <div className="flex items-center gap-2"><Clock size={18}/> {nextEvent.time}</div>}
              {nextEvent.location && <div className="flex items-center gap-2"><MapPin size={18}/> {nextEvent.location}</div>}
            </div>
          </div>
        </div>
      )}
      {/* ================================================= */}

      {/* معرض الأنشطة واللقاءات السابقة (أرشيف) */}
      {pastEvents && pastEvents.length > 0 && (
        <div className="relative pt-12 border-t border-stone-200">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 font-serif mb-2">أرشيف اللقاءات والأنشطة</h2>
              <p className="text-stone-500">متابعة للإسهامات الثقافية والحضور الإعلامي</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"><ChevronRight size={20}/></button>
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"><ChevronLeft size={20}/></button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {pastEvents.map((event) => (
              <div key={event._id} className="min-w-[300px] md:min-w-[400px] snap-start bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden group">
                <div className="relative h-60 bg-stone-100 overflow-hidden">
                  {event.coverImage ? (
                    <img src={urlFor(event.coverImage).url()} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={event.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400"><ImageIcon size={40}/></div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-stone-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                    <Calendar size={12}/> {event.date || 'أرشيف'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-900 font-serif mb-2">{event.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// باقي الصفحات
// ==========================================

const BooksPage = ({ setPage, setBook, books }) => (
  <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-right">
    <h2 className="text-4xl font-bold text-stone-900 font-serif text-center mb-16 underline decoration-amber-200 underline-offset-8">المكتبة الرقمية</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {(books || []).map((book) => (
        <div key={book._id} className="group bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all">
          <div className="h-64 bg-stone-100 flex items-center justify-center p-8 relative">
            {book.coverImage ? <img src={urlFor(book.coverImage).url()} className="w-40 h-56 shadow-2xl object-cover relative z-10" alt={book.title} /> : <div className="w-40 h-56 bg-stone-800 flex items-center justify-center text-white text-center p-4">{book.title}</div>}
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded self-start mb-2">{book.category}</span>
            <h3 className="text-xl font-bold text-stone-900 font-serif mb-6 leading-snug">{book.title}</h3>
            <button onClick={() => { setBook(book); setPage('book-detail'); }} className="w-full mt-auto py-3 bg-stone-900 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium">عرض التفاصيل</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BookDetailView = ({ book, setPage }) => {
  // استخدام الدالة لتحضير الرابط الصحيح
  const embedVideoUrl = book.videoUrl ? getYouTubeEmbedUrl(book.videoUrl) : null;

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4 animate-fade-in text-right">
      <button onClick={() => setPage('books')} className="flex items-center gap-2 text-stone-500 mb-8 hover:text-stone-900 transition-colors"><ChevronRight size={20} /> العودة للمكتبة</button>
      <div className="grid lg:grid-cols-12 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
        <div className="lg:col-span-4 flex justify-center">
          {book.coverImage ? <img src={urlFor(book.coverImage).url()} className="w-full max-w-xs rounded-lg shadow-2xl" alt={book.title} /> : <div className="w-full aspect-[2/3] bg-stone-800 rounded-lg shadow-2xl"></div>}
        </div>
        <div className="lg:col-span-8">
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block">{book.category}</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 font-serif mb-6 leading-tight">{book.title}</h1>
          <p className="text-stone-700 mb-10 leading-relaxed whitespace-pre-line text-lg">{book.description || "لا يوجد وصف متوفر حالياً."}</p>
          <div className="flex flex-col gap-8">
            {book.pdfUrl && <a href={book.pdfUrl} target="_blank" rel="noreferrer" className="w-full md:w-1/2 bg-amber-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-amber-800 transition-colors"><Download size={20} /> تحميل نسخة PDF</a>}
            
            {/* عرض الفيديو باستخدام الرابط المعدل */}
            {embedVideoUrl && (
              <div className="w-full">
                <h3 className="text-xl font-bold mb-4 font-serif flex items-center gap-2">فيديو تعريفي <Video size={20}/></h3>
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl bg-black border border-stone-200">
                  <iframe 
                    className="w-full h-full" 
                    src={embedVideoUrl} 
                    title={book.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticlesPage = ({ setPage, setArticle, searchQuery, articles }) => {
  const filtered = (articles || []).filter(a => a.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-right">
      <h2 className="text-4xl font-bold text-stone-900 font-serif text-center mb-12 underline decoration-amber-200 underline-offset-8">أرشيف المقالات</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {filtered.map(article => (
          <div key={article._id} onClick={() => { setArticle(article); setPage('article-detail'); }} className="bg-white border border-stone-200 rounded-xl p-6 cursor-pointer hover:border-amber-300 transition-all flex flex-col h-full hover:shadow-md group">
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-stone-50 text-stone-600 mb-4 self-start">{article.category}</span>
            <h3 className="text-xl font-bold text-stone-900 font-serif mb-4 flex-grow leading-snug group-hover:text-amber-800">{article.title}</h3>
            <div className="pt-4 border-t border-stone-50 flex justify-between text-xs text-stone-400 font-mono">
              <span>{article.date}</span>
              <span>{article.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderSanityText = (blocks) => {
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return "المحتوى الكامل غير متوفر حالياً.";
  return blocks.map(block => block.children ? block.children.map(child => child.text).join('') : '').join('\n\n');
};

// دالة مساعدة لتحويل رابط يوتيوب العادي إلى رابط تضمين (Embed)
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  // البحث عن معرف الفيديو (ID) داخل الرابط سواء كان طويلاً أو قصيراً
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url; 
};

const ArticleReader = ({ article, setPage }) => (
  <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 animate-fade-in text-right">
    <button onClick={() => setPage('articles')} className="flex items-center gap-2 text-stone-500 mb-8 hover:text-stone-900 transition-colors"><ChevronRight size={20} /> العودة للأرشيف</button>
    <header className="mb-12">
      <h1 className="text-3xl md:text-5xl font-bold text-stone-900 font-serif leading-tight mb-4">{article.title}</h1>
      <div className="text-stone-500 text-sm font-mono flex items-center gap-4">
        <span className="flex items-center gap-1"><Calendar size={14}/> {article.date}</span>
        <span className="flex items-center gap-1"><User size={14}/> بوسلهام عميمر</span>
      </div>
    </header>
    <article className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100 text-lg leading-loose whitespace-pre-line font-serif text-stone-800">
      {renderSanityText(article.content)}
    </article>
  </div>
);

// ==========================================
// المكون الرئيسي والمنطق
// ==========================================

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await client.fetch(`*[_type == "book"] | order(year desc) {..., "pdfUrl": pdfFile.asset->url}`);
        const articlesData = await client.fetch('*[_type == "article"] | order(date desc)');
        const eventsData = await client.fetch('*[_type == "event"] | order(date desc)');
        
        setBooks(booksData);
        setArticles(articlesData);
        setEvents(eventsData);
        setIsLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setPage(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newPage) => { window.location.hash = newPage; };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
        <div className="flex flex-col items-center gap-4 text-stone-600">
          <Loader size={40} className="animate-spin text-amber-700" />
          <p className="font-serif">جاري تجهيز المكتبة...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (page) {
      case 'home': return <HomePage setPage={navigateTo} setBook={setSelectedBook} books={books} events={events} />;
      case 'books': return <BooksPage setPage={navigateTo} setBook={setSelectedBook} books={books} />;
      case 'book-detail': return selectedBook ? <BookDetailView book={selectedBook} setPage={navigateTo} /> : <BooksPage setPage={navigateTo} setBook={setSelectedBook} books={books} />;
      case 'articles': return <ArticlesPage setPage={navigateTo} setArticle={setSelectedArticle} searchQuery={searchQuery} articles={articles} />;
      case 'article-detail': return selectedArticle ? <ArticleReader article={selectedArticle} setPage={navigateTo} /> : <ArticlesPage setPage={navigateTo} setArticle={setSelectedArticle} searchQuery={searchQuery} articles={articles} />;
      case 'about': return (
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 animate-fade-in text-right font-sans">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-stone-900 font-serif mb-4">السيرة والمسار</h2>
            <p className="text-xl text-stone-500 font-serif">خريطة طريق الأديب والمربي بوسلهام عميمر</p>
          </div>
          <div className="flex flex-col">
            {[
              { title: "الرؤية والرسالة", icon: <PenTool size={20} className="text-white" />, content: "بوسلهام عميمر، صوت مغربي أصيل، جمع بين دقة المربي، ورؤية الناقد، وحساسية الأديب. كرس حياته المهنية والإبداعية للدفاع عن قيم المدرسة العمومية، وتفكيك قضايا المجتمع، وتوثيق الذاكرة الوطنية." },
              { title: "المسار المهني والتربوي", icon: <Book size={20} className="text-white" />, content: "اشتغل لسنوات طويلة في ميدان التربية والتكوين، حيث تخرجت على يديه أجيال من الطلبة والأساتذة. لم يكن التعليم بالنسبة إليه مجرد وظيفة، بل رسالة وجودية تجلت في كتاباته النقدية التي تشرح واقع المنظومة التعليمية وتقترح حلولاً عملية للنهوض بها." },
              { title: "العالم الأدبي والإبداعي", icon: <FileText size={20} className="text-white" />, content: "تتنوع كتاباته بين الرواية السردية، النقد الأدبي، والتدوينات الفكرية. يُعرف بأسلوبه الرصين الذي يجمع بين جمالية اللغة العربية الكلاسيكية وقوة التحليل الواقعي. أصدر عدة مؤلفات بارزة لقيت احتفاءً في الأوساط الثقافية المغربية والعربية، من بينها روايته الأخيرة «بنت البواب» وكتابه «صحرائي في عيوني»." },
              { title: "الحضور الثقافي والإعلامي", icon: <Mic size={20} className="text-white" />, content: "حضور وازن في الملتقيات الثقافية، الندوات الفكرية، والمعارض الوطنية للكتاب. يُسهم بانتظام في إغناء النقاش العمومي حول قضايا الهوية والتعليم من خلال مقالاته الرصينة في كبريات الصحف والمجلات الرقمية والورقية." }
            ].map((item, index, arr) => (
              <div key={index} className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-amber-700 rounded-full flex items-center justify-center border-4 border-[#fdfbf7] shadow-md z-10 shrink-0">{item.icon}</div>
                  {index !== arr.length - 1 && <div className="w-1.5 bg-amber-200/60 h-full -mt-2"></div>}
                </div>
                <div className="pb-16 pt-2 w-full">
                  <h3 className="text-2xl font-bold text-stone-900 font-serif mb-4">{item.title}</h3>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow duration-300">
                    <p className="text-stone-700 leading-relaxed text-lg">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      default: return <HomePage setPage={navigateTo} books={books} events={events} />;
    }
  };

  return (
    <div dir="rtl" className="font-sans text-stone-800 bg-[#fdfbf7] min-h-screen selection:bg-amber-200">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
      <Header activePage={page} setPage={navigateTo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="min-h-screen">
        {renderContent()}
      </main>
      <Footer setPage={navigateTo} />
    </div>
  );
};

export default App;