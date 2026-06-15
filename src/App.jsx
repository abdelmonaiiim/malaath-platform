import React, { useState, useEffect } from 'react';
import { 
  Book, PenTool, Youtube, Mail, Menu, X, Heart, Globe, FileText, 
  ChevronLeft, Download, ExternalLink, ArrowRight, ChevronDown, 
  Mic, PlayCircle, Search, Share2, Calendar, User, Printer, 
  Facebook, Twitter, Linkedin, ChevronRight, Video, Loader
} from 'lucide-react';

// ==========================================
// 1. الاستيراد من ملفاتك المحلية و Sanity
// ==========================================
import { client, urlFor } from './client';
import Logo from './components/Logo';

// ==========================================
// 2. مكونات الواجهة (Header & Footer)
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
    { id: 'about', label: 'السيرة الذاتية' },
    { id: 'contact', label: 'تواصل' },
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
// 3. منطق الصفحات الداخلي (محدث لاستقبال البيانات)
// ==========================================

const HomePage = ({ setPage, setBook, books }) => {
  const latestBook = books && books.length > 0 ? books[0] : null;
  return (
    <div className="animate-fade-in pt-32 pb-20 max-w-7xl mx-auto px-4 text-right">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl lg:text-6xl font-bold text-stone-900 font-serif mb-6 leading-tight">حينما يُصبح القلم <span className="text-amber-800">وطناً وذاكرة</span></h1>
          <p className="text-lg text-stone-600 mb-8 max-w-xl">الموقع الرسمي للأديب والناقد بوسلهام عميمر. نافذة تطل على عالم من السرد والنقد التربوي.</p>
          <div className="flex gap-4">
            <button onClick={() => setPage('books')} className="px-8 py-4 bg-stone-900 text-white rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"><Book size={20} /> تصفح المكتبة</button>
            <button onClick={() => setPage('articles')} className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-xl transition-colors hover:bg-stone-50">أحدث المقالات</button>
          </div>
        </div>
        {latestBook && (
          <div className="hidden lg:block bg-white p-8 rounded-3xl shadow-xl border border-stone-100 relative">
             <div className="flex gap-6">
                {latestBook.coverImage ? <img src={urlFor(latestBook.coverImage).url()} className="w-32 h-48 rounded shadow-md object-cover" alt={latestBook.title} /> : <div className="w-32 h-48 bg-stone-800 rounded shadow-md flex items-center justify-center text-white text-center text-xs p-2">{latestBook.title}</div>}
                <div>
                   <span className="text-xs font-bold text-amber-600">أحدث الإصدارات</span>
                   <h3 className="text-2xl font-bold text-stone-900 font-serif mb-2">{latestBook.title}</h3>
                   <button onClick={() => { setBook(latestBook); setPage('book-detail'); }} className="text-sm font-bold text-stone-900 border-b-2 border-stone-900 hover:text-amber-700 hover:border-amber-700 transition-colors">اقرأ المزيد</button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BooksPage = ({ setPage, setBook, books }) => (
  <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-right">
    <h2 className="text-4xl font-bold text-stone-900 font-serif text-center mb-16 underline decoration-amber-200 underline-offset-8">المكتبة الرقمية</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {(books || []).map((book) => (
        <div key={book._id || book.id} className="group bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all">
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

const BookDetailView = ({ book, setPage }) => (
  <div className="pt-32 pb-20 max-w-6xl mx-auto px-4 animate-fade-in text-right">
    <button onClick={() => setPage('books')} className="flex items-center gap-2 text-stone-500 mb-8 hover:text-stone-900 transition-colors"><ChevronRight size={20} /> العودة للمكتبة</button>
    <div className="grid lg:grid-cols-12 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
      <div className="lg:col-span-4 flex justify-center">
        {book.coverImage ? <img src={urlFor(book.coverImage).url()} className="w-full max-w-xs rounded-lg shadow-2xl" alt={book.title} /> : <div className="w-full aspect-[2/3] bg-stone-800 rounded-lg shadow-2xl"></div>}
      </div>
      <div className="lg:col-span-8">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block">{book.category}</span>
        <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 font-serif mb-6 leading-tight">{book.title}</h1>
        <p className="text-stone-700 mb-10 leading-relaxed whitespace-pre-line text-lg">{book.description || "لا يوجد وصف متوفر حالياً لهذا الكتاب."}</p>
        <div className="flex flex-col gap-8">
          {book.pdfUrl && <a href={book.pdfUrl} target="_blank" rel="noreferrer" className="w-full md:w-1/2 bg-amber-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-amber-800 transition-colors"><Download size={20} /> تحميل نسخة PDF</a>}
          {book.videoUrl && (
            <div className="w-full">
              <h3 className="text-xl font-bold mb-4 font-serif flex items-center gap-2">فيديو تعريفي <Video size={20}/></h3>
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl bg-black border border-stone-200">
                <iframe className="w-full h-full" src={book.videoUrl} title="book video" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const ArticlesPage = ({ setPage, setArticle, searchQuery, articles }) => {
  const filtered = (articles || []).filter(a => a.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-right">
      <h2 className="text-4xl font-bold text-stone-900 font-serif text-center mb-12 underline decoration-amber-200 underline-offset-8">أرشيف المقالات</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {filtered.map(article => (
          <div key={article._id || article.id} onClick={() => { setArticle(article); setPage('article-detail'); }} className="bg-white border border-stone-200 rounded-xl p-6 cursor-pointer hover:border-amber-300 transition-all flex flex-col h-full hover:shadow-md group">
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

// دالة مساعدة بسيطة لتحويل نصوص Sanity إلى نص عادي للقراءة
const renderSanityText = (blocks) => {
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return "المحتوى الكامل غير متوفر حالياً.";
  return blocks.map(block => block.children ? block.children.map(child => child.text).join('') : '').join('\n\n');
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
// 4. المكون الرئيسي (App Logic) وجلب البيانات
// ==========================================

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // حالات البيانات الحية
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // جلب البيانات من Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        // نستجلب الكتب مع رابط مباشر لملف الـ PDF إن وجد
        const booksData = await client.fetch(`*[_type == "book"] | order(year desc) {
          ...,
          "pdfUrl": pdfFile.asset->url
        }`);
        const articlesData = await client.fetch('*[_type == "article"] | order(date desc)');
        
        setBooks(booksData);
        setArticles(articlesData);
        setIsLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // التحكم بالروابط
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

  // شاشة التحميل
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
      case 'home': return <HomePage setPage={navigateTo} setBook={setSelectedBook} books={books} />;
      case 'books': return <BooksPage setPage={navigateTo} setBook={setSelectedBook} books={books} />;
      case 'book-detail': return selectedBook ? <BookDetailView book={selectedBook} setPage={navigateTo} /> : <BooksPage setPage={navigateTo} setBook={setSelectedBook} books={books} />;
      case 'articles': return <ArticlesPage setPage={navigateTo} setArticle={setSelectedArticle} searchQuery={searchQuery} articles={articles} />;
      case 'article-detail': return selectedArticle ? <ArticleReader article={selectedArticle} setPage={navigateTo} /> : <ArticlesPage setPage={navigateTo} setArticle={setSelectedArticle} searchQuery={searchQuery} articles={articles} />;
      case 'activities': return <div className="pt-40 text-center text-2xl font-serif">قسم الأنشطة واللقاءات الثقافية قيد التحديث...</div>;
      case 'about': return (
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 animate-fade-in text-right font-sans">
          <h2 className="text-4xl font-bold text-stone-900 font-serif text-center mb-12 underline decoration-amber-200 underline-offset-8">الأديب بوسلهام عميمر: سيرة ومسيرة</h2>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100 space-y-10 leading-loose text-stone-800 text-lg">
            
            <div className="border-r-4 border-amber-700 pr-4">
              <p className="font-serif text-xl text-stone-900 font-medium">
                بوسلهام عميمر، كاتب ومربٍّ مغربي، كرس حياته لخدمة الفكر، الأدب، وقضايا التربية والتعليم. تميزت مسيرته بالعطاء المستمر والبحث الدؤوب عن الكلمة الصادقة والأثر البناء.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-700"></span> المسار المهني والتربوي
              </h3>
              <p>
                اشتغل لسنوات طويلة في ميدان التربية والتكوين، حيث تخرجت على يديه أجيال من الطلبة والأساتذة. لم يكن التعليم بالنسبة إليه مجرد وظيفة، بل رسالة وجودية تجلت في كتاباته النقدية التي تشرح واقع المنظومة التعليمية وتقترح حلولاً عملية للنهوض بها.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-700"></span> العالم الأدبي والإبداعي
              </h3>
              <p>
                تتنوع كتاباته بين الرواية السردية، النقد الأدبي، والتدوينات الفكرية. يُعرف بأسلوبه الرصين الذي يجمع بين جمالية اللغة العربية الكلاسيكية وقوة التحليل الواقعي. أصدر عدة مؤلفات بارزة لقيت احتفاءً في الأوساط الثقافية المغربية والعربية، من بينها روايته الأخيرة "بنت البواب" وكتابه "صحرائي في عيوني".
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-700"></span> النشاط الثقافي والمجتمعي
              </h3>
              <p>
                حضور وازن في الملتقيات الثقافية، الندوات الفكرية، والمعارض الوطنية للكتاب. يُسهم بانتظام في إغناء النقاش العمومي حول قضايا الهوية والتعليم من خلال مقالاته الرصينة في كبريات الصحف والمجلات الرقمية والورقية (مثل منصة هسبريس)، مؤمناً بأن المثقف يجب أن يكون مرآة لمجتمعه.
              </p>
            </div>

          </div>
        </div>
      );
      case 'contact': return <div className="pt-40 text-center font-mono text-xl">contact@malaath.ma</div>;
      default: return <HomePage setPage={navigateTo} books={books} />;
    }
  };

  return (
    <div dir="rtl" className="font-sans text-stone-800 bg-[#fdfbf7] min-h-screen selection:bg-amber-200">
      <Header activePage={page} setPage={navigateTo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="min-h-screen">
        {renderContent()}
      </main>
      <Footer setPage={navigateTo} />
    </div>
  );
};

export default App;