import React, { useState, useEffect } from 'react';
import { 
  Book, PenTool, Youtube, Mail, Menu, X, Heart, Coffee, Globe, FileText, 
  ChevronLeft, Download, ExternalLink, Filter, ArrowRight, ChevronDown, 
  Camera, Mic, PlayCircle, Search, Share2, Calendar, User, Printer, 
  Facebook, Twitter, Linkedin, Home, ChevronRight
} from 'lucide-react';

// --- Mock Data (Preserved & Expanded) ---
const BOOKS_DATA = [
  {
    id: 1,
    title: "صحرائي في عيوني",
    category: "كتب وطنية",
    year: "2024",
    pages: 240,
    publisher: "دار النشر المغربية",
    isbn: "978-3-16-148410-0",
    description: "رحلة سردية توثق الروابط التاريخية والوجدانية مع الصحراء المغربية، بأسلوب يجمع بين التوثيق والأدب. يسرد الكاتب مشاهداته الحية وذكرياته التي تمتزج بعبق التاريخ.",
    color: "bg-amber-100",
    coverColor: "bg-amber-700"
  },
  {
    id: 2,
    title: "فلسطين قصة مأساتي",
    category: "كتب فكرية",
    year: "2012",
    pages: 180,
    publisher: "مطبعة النجاح",
    isbn: "978-1-23-456789-0",
    description: "رؤية عميقة وتحليلية للقضية الفلسطينية، تمتزج فيها المشاعر الإنسانية بالحقائق التاريخية. الكتاب يطرح تساؤلات وجودية حول العدالة والذاكرة.",
    color: "bg-red-50",
    coverColor: "bg-red-800"
  },
  {
    id: 3,
    title: "تأملات للفتيان و الفتيات",
    category: "تربية وتوجيه",
    year: "2018",
    pages: 150,
    publisher: "الرسالة للنشر",
    isbn: "978-9-87-654321-0",
    description: "خواطر وتوجيهات تربوية تهدف إلى بناء شخصية متوازنة للجيل الصاعد، نابعة من خبرة طويلة في الميدان التربوي. دليل عملي للآباء والمربين.",
    color: "bg-blue-50",
    coverColor: "bg-blue-700"
  },
  {
    id: 4,
    title: "رفعهم العلم",
    category: "سير وتراجم",
    year: "2020",
    pages: 300,
    publisher: "دار القلم",
    isbn: "978-0-12-345678-9",
    description: "كتاب يسلط الضوء على قيمة العلم والعلماء، وكيف ترفع المعرفة من شأن الأمم والأفراد، مع استعراض لنماذج مشرقة من تاريخنا.",
    color: "bg-emerald-50",
    coverColor: "bg-emerald-700"
  },
  {
    id: 5,
    title: "الألعاب الإلكترونية: خطر إدمانها",
    category: "دراسات اجتماعية",
    year: "2021",
    pages: 120,
    publisher: "المركز الثقافي",
    isbn: "978-5-43-210987-6",
    description: "دراسة تحذيرية للآباء والمربين حول مخاطر الإدمان الإلكتروني على الأطفال وسبل الوقاية، مدعومة بإحصائيات وحلول عملية.",
    color: "bg-slate-100",
    coverColor: "bg-slate-700"
  },
  {
    id: 6,
    title: "نساء في ذاكرة الإبداع",
    category: "نقد أدبي",
    year: "2024",
    pages: 210,
    publisher: "دار الحكمة",
    isbn: "978-6-78-901234-5",
    description: "إضاءات على مساهمات المرأة في المشهد الإبداعي والثقافي، وتوثيق لمسارات ملهمة لنساء تركن بصمة في الأدب والفن.",
    color: "bg-rose-50",
    coverColor: "bg-rose-700"
  }
];

const ARTICLES_DATA = [
    { id: 1, title: "إصلاح التعليم والجراثيم المعيقة له", source: "هسبريس", category: "تعليم وتربية", date: "19 نونبر 2019", views: 1240, content: "نص افتراضي للمقال يعبر عن محتوى تعليمي..." },
    { id: 2, title: "سجون الأحداث.. إصلاحيات بأية مواصفات؟", source: "هسبريس", category: "تعليم وتربية", date: "13 فبراير 2020", views: 980, content: "نص افتراضي..." },
    { id: 3, title: "جوهر الفلسفة للابتدائي .. لم لا؟", source: "هسبريس", category: "تعليم وتربية", date: "16 مارس 2024", views: 2100, content: "نص افتراضي..." },
    { id: 19, title: "بعيدا عن الهلوسات، الشعر بلوازمه قضية ومسؤولية", source: "رأي اليوم", category: "نقد أدبي وفني", date: "20 مارس 2024", views: 1500, content: "نص افتراضي..." },
    { id: 29, title: "الدراما المغربية.. ما الذي ينقصها؟", source: "هسبريس", category: "نقد أدبي وفني", date: "18 يناير 2019", views: 3400, content: "نص افتراضي..." },
    { id: 6, title: "بنية الإرهاب.. محاولة للفهم", source: "هسبريس", category: "قضايا المجتمع والسياسة", date: "5 يناير 2019", views: 4500, content: "نص افتراضي..." },
    { id: 36, title: "الأمازيغية هوية وثقافة وأدبا.. مخاض الانبعاث", source: "هسبريس", category: "فكر وثقافة", date: "30 يناير 2024", views: 1100, content: "نص افتراضي..." },
    { id: 37, title: "ماذا تعرف عن سوق الأربعاء؟", source: "هسبريس", category: "قضايا المجتمع والسياسة", date: "16 أبريل 2024", views: 5600, content: "نص افتراضي..." },
    { id: 38, title: "قراءة في ديوان 'صويحبات الجامعة'", source: "رأي اليوم", category: "نقد أدبي وفني", date: "28 مارس 2025", views: 890, content: "نص افتراضي..." },
    { id: 39, title: "رواية 'شمس بحجم الكف'.. دراما واقعية", source: "رأي اليوم", category: "نقد أدبي وفني", date: "14 يونيو 2024", views: 1200, content: "نص افتراضي..." },
];

const ACTIVITIES_DATA = [
  {
    id: 1,
    type: "video",
    title: "حوار خاص: قراءة في المشهد الثقافي والأدبي",
    date: "أكتوبر 2022",
    location: "قناة 2M - برنامج الناقد",
    description: "لقاء تلفزيوني يتناول فيه الكاتب قضايا الأدب النسائي وأدب الطفل، مع إضاءات حول إصداراته الأخيرة.",
    thumbnail: "https://img.youtube.com/vi/bWhuRXWKk88/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/bWhuRXWKk88" 
  },
  {
    id: 2,
    type: "image",
    title: "ندوة فكرية بالثانوية التأهيلية",
    date: "ماي 2023",
    location: "القنيطرة",
    description: "لقاء مفتوح مع تلاميذ المؤسسة لمناقشة كتاب 'تأملات للفتيان والفتيات' وتشجيع القراءة.",
    imageUrl: "https://placehold.co/800x600/e7e5e4/78716c?text=ندوة+مدرسية"
  },
  {
    id: 3,
    type: "image",
    title: "توقيع كتاب في المعرض الدولي",
    date: "يونيو 2023",
    location: "الرباط",
    description: "حفل توقيع الإصدار الجديد بحضور ثلة من المثقفين والقراء المهتمين.",
    imageUrl: "https://placehold.co/800x600/e7e5e4/78716c?text=توقيع+كتاب"
  },
  {
    id: 4,
    type: "image",
    title: "محاضرة جامعية: تحديات التعليم",
    date: "دجنبر 2019",
    location: "جامعة ابن طفيل",
    description: "مداخلة في ندوة جامعية حول واقع التعليم وسبل الإصلاح التربوي.",
    imageUrl: "https://placehold.co/800x600/e7e5e4/78716c?text=لقاء+جامعي"
  }
];

// --- Components ---

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

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-stone-200 py-2' : 'bg-white border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setPage('home')}>
            <div className="w-10 h-10 bg-stone-900 text-amber-50 rounded-lg flex items-center justify-center font-bold text-xl font-serif group-hover:bg-amber-700 transition-colors">
              ب
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-stone-900 font-serif leading-none">بوسلهام عميمر</h1>
              <p className="text-[10px] text-stone-500 tracking-wider mt-1">كاتب • ناقد • مربي</p>
            </div>
          </div>

          {/* Search Bar */}
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

          {/* Desktop Nav */}
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

          {/* Mobile Menu Button */}
          <button className="md:hidden text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
        {/* Col 1: Brand */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-stone-800 text-white rounded-lg flex items-center justify-center font-bold text-2xl font-serif">
              ب
            </div>
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

        {/* Col 2: Quick Links */}
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

        {/* Col 3: Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg">القائمة البريدية</h4>
          <p className="text-sm mb-4">اشترك لتصلك أحدث المقالات والإصدارات الجديدة مباشرة إلى بريدك.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني" 
              className="flex-1 bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-600 text-white"
            />
            <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
              اشتراك
            </button>
          </form>
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

// --- Page Components ---

const HomePage = ({ setPage, setArticle, setBook }) => (
  <div className="animate-fade-in">
    {/* Hero */}
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

          {/* Featured Book Card (Visual) */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-amber-600 rounded-2xl rotate-6 opacity-10 scale-95 transform translate-x-4 translate-y-4"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-stone-100">
              <div className="flex gap-6">
                <div className="w-32 h-48 bg-stone-800 rounded shadow-md flex items-center justify-center text-amber-50 text-center p-2 shrink-0">
                  <span className="font-serif font-bold">صحرائي في عيوني</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wider">أحدث الإصدارات</div>
                  <h3 className="text-2xl font-bold text-stone-900 font-serif mb-3">صحرائي في عيوني</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    إصدار جديد يجمع بين السرد الذاتي والتوثيق التاريخي، رحلة في عمق الذاكرة المغربية...
                  </p>
                  <button onClick={() => { setBook(BOOKS_DATA[0]); setPage('book-detail'); }} className="text-sm font-bold text-stone-900 border-b-2 border-stone-900 hover:text-amber-700 hover:border-amber-700 transition-colors pb-1">
                    اقرأ المزيد
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Latest Articles Preview */}
    <section className="py-20 bg-white">
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
          {ARTICLES_DATA.slice(0, 3).map((article) => (
            <div 
              key={article.id} 
              onClick={() => { setArticle(article); setPage('article-detail'); }}
              className="group cursor-pointer"
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
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span>{article.date}</span>
                <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                <span>{article.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quote Section */}
    <section className="py-24 bg-stone-900 text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <span className="text-6xl text-amber-700 font-serif opacity-50">"</span>
        <p className="text-2xl md:text-4xl text-stone-200 font-serif leading-relaxed mb-8">
          لا يزال الشعر عاطلاً حتى تزينه الحكمة، ولا تزال الحكمة شاردة حتى يؤويها بيت من الشعر.
        </p>
        <cite className="text-amber-500 font-medium not-italic tracking-widest text-sm uppercase">
          - من مقالات الكاتب
        </cite>
      </div>
    </section>
  </div>
);

const BooksPage = ({ setPage, setBook }) => (
  <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-stone-900 font-serif mb-4">المكتبة الرقمية</h2>
      <p className="text-stone-600 max-w-2xl mx-auto">
        مجموعة الأعمال الكاملة، متاحة للاطلاع، تغطي مواضيع التربية، الأدب، النقد، والقضايا الوطنية.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {BOOKS_DATA.map((book) => (
        <div key={book.id} className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
          <div className={`h-64 ${book.color} flex items-center justify-center p-8 relative`}>
             <div className={`w-40 h-56 ${book.coverColor} rounded-r-md rounded-l-sm shadow-2xl transform group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 flex flex-col items-center justify-center text-center p-4 border-l-4 border-white/10 relative z-10`}>
                <div className="absolute inset-0 border border-white/20 m-1 rounded-sm"></div>
                <h3 className="text-white text-sm font-serif font-bold leading-snug line-clamp-3">{book.title}</h3>
                <p className="text-white/70 text-[10px] mt-2">بوسلهام عميمر</p>
             </div>
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

const BookDetailView = ({ book, setPage }) => (
  <div className="pt-24 pb-20 bg-white animate-fade-in">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={() => setPage('books')} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ChevronRight size={20} /> العودة للمكتبة
      </button>
      
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Cover Column */}
        <div className="lg:col-span-4">
          <div className={`aspect-[2/3] ${book.coverColor} rounded-lg shadow-2xl flex items-center justify-center p-8 text-center text-white relative overflow-hidden`}>
            <div className="absolute inset-0 border-[1px] border-white/20 m-3"></div>
            <div>
               <h1 className="text-3xl font-bold font-serif mb-4">{book.title}</h1>
               <p className="text-lg opacity-80">بوسلهام عميمر</p>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">{book.category}</span>
            <span className="text-stone-400 text-sm">{book.year}</span>
          </div>
          <h1 className="text-4xl font-bold text-stone-900 font-serif mb-6">{book.title}</h1>
          
          <div className="prose prose-stone prose-lg max-w-none mb-8">
             <p>{book.description}</p>
             <p>هذا النص هو وصف افتراضي تفصيلي للكتاب. يتناول الكتاب موضوعات متعددة بعمق وتحليل، مستنداً إلى مراجع ومصادر موثوقة، ومقدماً رؤية نقدية جديدة.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-stone-100 mb-8">
            <div>
               <p className="text-xs text-stone-500 mb-1">الناشر</p>
               <p className="font-semibold text-stone-900">{book.publisher}</p>
            </div>
            <div>
               <p className="text-xs text-stone-500 mb-1">عدد الصفحات</p>
               <p className="font-semibold text-stone-900">{book.pages} صفحة</p>
            </div>
            <div>
               <p className="text-xs text-stone-500 mb-1">ISBN</p>
               <p className="font-mono font-semibold text-stone-900">{book.isbn}</p>
            </div>
            <div>
               <p className="text-xs text-stone-500 mb-1">اللغة</p>
               <p className="font-semibold text-stone-900">العربية</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-amber-700 text-white py-4 rounded-xl font-bold hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-700/20">
              <Download size={20} /> تحميل نسخة PDF
            </button>
            <button className="px-6 py-4 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
              <Share2 size={20} className="text-stone-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ArticlesPage = ({ setPage, setArticle, searchQuery }) => {
  const [category, setCategory] = useState('الكل');
  
  const filtered = ARTICLES_DATA.filter(a => 
    (category === 'الكل' || a.category === category) &&
    (a.title.includes(searchQuery) || a.category.includes(searchQuery))
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
                <ExternalLink size={14} className="text-stone-300 group-hover:text-amber-500" />
             </div>
             <h3 className="text-xl font-bold text-stone-900 font-serif mb-3 leading-snug group-hover:text-amber-800 transition-colors flex-grow">
               {article.title}
             </h3>
             <p className="text-stone-500 text-sm line-clamp-2 mb-6">
               مقتطف افتراضي للمقال يوضح الفكرة العامة للنص ويشجع القارئ على المتابعة...
             </p>
             <div className="pt-4 border-t border-stone-50 flex justify-between text-xs text-stone-400 font-mono mt-auto">
                <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                <span>{article.source}</span>
             </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <FileText size={48} className="mx-auto text-stone-200 mb-4" />
          <p className="text-stone-500">لا توجد نتائج مطابقة لبحثك.</p>
        </div>
      )}
    </div>
  );
};

const ArticleReader = ({ article, setPage }) => (
  <div className="bg-stone-50 min-h-screen animate-fade-in">
    {/* Reading Progress Bar (Mock) */}
    <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
      <div className="h-full bg-amber-600 w-1/3"></div>
    </div>

    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <button onClick={() => setPage('articles')} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 transition-colors">
          <ChevronRight size={20} /> العودة للأرشيف
        </button>

        {/* Article Header */}
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

        {/* Main Content */}
        <article className="prose prose-stone prose-lg max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">
          <p className="lead text-xl text-stone-600 font-serif">
            هنا توجد مقدمة المقال الافتراضية. هذا النص هو مثال يستبدل بالنص الحقيقي للمقال. يهدف إلى إظهار تنسيق الخطوط والمسافات.
          </p>
          <hr className="my-8 border-stone-200 w-1/2 mx-auto" />
          <p>
            يمكننا هنا وضع نص المقال الكامل. بما أننا نملك العناوين فقط، فهذا النص هو "لوريم إيبسوم" عربي.
            لكن التصميم جاهز لاستقبال آلاف الكلمات. يتميز الخط بكونه مريحاً للقراءة (Serif للعناوين و Sans للنصوص الطويلة)، مع تباين لوني مدروس لعدم إجهاد العين.
          </p>
          <h3>عنوان فرعي داخل المقال</h3>
          <p>
            استعراض للأفكار الرئيسية:
          </p>
          <ul>
            <li>الفكرة الأولى حول التعليم وإصلاحه.</li>
            <li>الفكرة الثانية حول دور المثقف في المجتمع.</li>
            <li>رؤية تحليلية للواقع المعاش.</li>
          </ul>
          <blockquote>
            "الاقتباسات تظهر بهذا الشكل المميز، مع خط جانبي ملون يميزها عن باقي النص."
          </blockquote>
          <p>
            خاتمة المقال تأتي هنا، مع تلخيص لأهم النقاط. التصميم يدعم الصور المضمنة والفيديوهات إذا توفرت في المحتوى الأصلي.
          </p>
        </article>

        {/* Article Footer */}
        <div className="mt-12 flex justify-between items-center border-t border-stone-200 pt-8">
          <div className="flex gap-2">
             <button className="p-2 rounded-full bg-stone-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"><Facebook size={20} /></button>
             <button className="p-2 rounded-full bg-stone-100 hover:bg-sky-50 hover:text-sky-500 transition-colors"><Twitter size={20} /></button>
             <button className="p-2 rounded-full bg-stone-100 hover:bg-green-50 hover:text-green-600 transition-colors"><Share2 size={20} /></button>
             <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"><Printer size={20} /></button>
          </div>
          <div className="text-stone-400 text-sm">
            عدد القراءات: {article.views}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ActivitiesPage = () => (
  <div className="pt-24 pb-20 bg-stone-900 min-h-screen text-stone-100 animate-fade-in">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Mic className="text-amber-500 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white font-serif mb-4">أرشيف الأنشطة واللقاءات</h2>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg">
          توثيق للمشاركات الإعلامية، الندوات الفكرية، واللقاءات المفتوحة مع القراء والطلبة.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Featured Video */}
        <div className="col-span-full lg:col-span-2 bg-black rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
           <div className="aspect-video w-full">
             <iframe 
               className="w-full h-full"
               src={ACTIVITIES_DATA[0].videoUrl}
               title="Featured Video"
               allowFullScreen
               frameBorder="0"
             ></iframe>
           </div>
           <div className="p-8 bg-stone-800">
              <div className="flex items-center gap-4 text-xs font-bold text-amber-500 mb-2">
                <span className="flex items-center gap-1"><PlayCircle size={14} /> فيديو مميز</span>
                <span className="w-1 h-1 bg-stone-600 rounded-full"></span>
                <span>{ACTIVITIES_DATA[0].location}</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-serif mb-2">{ACTIVITIES_DATA[0].title}</h3>
              <p className="text-stone-400">{ACTIVITIES_DATA[0].description}</p>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ACTIVITIES_DATA.slice(1).map((item) => (
          <div key={item.id} className="bg-stone-800 rounded-xl overflow-hidden border border-stone-700 group hover:border-stone-600 transition-all">
             <div className="aspect-[4/3] overflow-hidden">
               <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
               />
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

const AboutPage = () => (
  <div className="pt-24 pb-20 bg-white animate-fade-in">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-xl">
          <div className="w-full h-full flex items-center justify-center bg-stone-800 text-amber-50 text-4xl font-serif">ب</div>
        </div>
        <h2 className="text-4xl font-bold text-stone-900 font-serif mb-4">بوسلهام عميمر</h2>
        <p className="text-xl text-stone-500 font-serif">كاتب • ناقد • باحث في قضايا التربية</p>
      </div>

      <div className="prose prose-stone prose-lg mx-auto">
        <p>
          بوسلهام عميمر، صوت مغربي أصيل، جمع بين دقة المربي، ورؤية الناقد، وحساسية الأديب. كرس حياته المهنية والإبداعية للدفاع عن قيم المدرسة العمومية، وتفكيك قضايا المجتمع، وتوثيق الذاكرة الوطنية.
        </p>
        <h3>المسار المهني</h3>
        <p>
          عمل في قطاع التربية والتكوين لسنوات طوال، مما منحه نظرة ثاقبة حول إشكاليات التعليم في المغرب. لم يكتفِ بالدور الوظيفي، بل تجاوزه إلى الدور التنويري عبر الكتابة المستمرة في المنابر الوطنية والدولية.
        </p>
        <h3>الرؤية الأدبية</h3>
        <p>
          يؤمن بأن الكتابة ليست ترفاً، بل هي اشتباك حقيقي مع قضايا الواقع. في رواياته، تجد الإنسان البسيط هو البطل، وفي مقالاته، تجد الجرأة في الطرح والموضوعية في التحليل.
        </p>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-24 pb-20 bg-stone-50 animate-fade-in min-h-[80vh] flex items-center">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        <div className="bg-stone-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-amber-600/10 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-serif mb-6">لنتواصل</h2>
            <p className="text-stone-300 mb-12 leading-relaxed">
              نرحب بآرائكم، استفساراتكم، ودعواتكم للمشاركة في الفعاليات الثقافية. 
              مكتب الكاتب يحرص على الاطلاع على جميع الرسائل.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase">البريد الإلكتروني</p>
                  <p className="font-mono">contact@malaath.ma</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-400">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase">وسائل التواصل</p>
                  <p className="text-sm">متوفر على فيسبوك وتويتر</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-12">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">الاسم الكامل</label>
              <input type="text" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" placeholder="الاسم الكريم" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">البريد الإلكتروني</label>
              <input type="email" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">الرسالة</label>
              <textarea rows="4" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" placeholder="اكتب رسالتك هنا..."></textarea>
            </div>
            <button className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-amber-700 transition-colors shadow-lg">
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Layout Component ---

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Hash Routing Logic (Fixes the Back Button issue)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setPage(hash);
      window.scrollTo(0, 0);
    };

    // Initial check
    handleHashChange();

    // Listen for browser back/forward buttons
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
    </div>
  );
};

export default App;