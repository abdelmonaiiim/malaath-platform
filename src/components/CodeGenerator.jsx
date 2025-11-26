import React, { useState } from 'react';
import { Copy, Check, Book, FileText, AlertCircle, Link, PenTool } from 'lucide-react';

const CodeGenerator = () => {
  const [type, setType] = useState('book'); // book or article
  const [articleSource, setArticleSource] = useState('link'); // 'link' (external) or 'text' (internal)
  const [copied, setCopied] = useState(false);

  // Form State
  const [data, setData] = useState({
    title: '',
    category: '',
    year: new Date().getFullYear(),
    publisher: '',
    description: '', // Used for summary (external) or full content (internal)
    imageName: '', 
    link: '' 
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Generate the code string
  const generateCode = () => {
    const id = Math.floor(Math.random() * 100000);
    
    if (type === 'book') {
      return `{
    id: ${id},
    title: "${data.title}",
    category: "${data.category}",
    year: "${data.year}",
    pages: 0,
    publisher: "${data.publisher}",
    description: "${data.description}",
    coverImage: "/images/${data.imageName}",
    pdfUrl: "",
    videoUrl: "${data.link ? data.link.replace('watch?v=', 'embed/') : ''}",
    videoLink: "${data.link}"
  },`;
    } else {
      // للمقالات
      const isInternal = articleSource === 'text';
      // استخدام الـ Backticks (`) للنصوص الطويلة للحفاظ على الأسطر
      const contentValue = isInternal ? `\`${data.description}\`` : `"${data.description}"`;
      
      return `{
    id: ${id},
    title: "${data.title}",
    source: "${isInternal ? 'منصة ملاذ' : data.publisher}", 
    category: "${data.category}",
    date: "${new Date().toLocaleDateString('ar-MA')}",
    views: 0,
    url: "${isInternal ? '' : data.link}",
    content: ${contentValue}
  },`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
        <div className="bg-stone-900 p-6 text-white">
          <h2 className="text-2xl font-bold font-serif mb-1">مساعد الإضافة الذكي</h2>
          <p className="text-stone-400 text-sm">أداة لتوليد كود الكتب والمقالات الجديدة بسهولة.</p>
        </div>

        <div className="p-6 md:p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-stone-200">
            <button 
              onClick={() => setType('book')}
              className={`pb-3 px-4 font-bold flex items-center gap-2 transition-colors ${type === 'book' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-400'}`}
            >
              <Book size={18} /> كتاب جديد
            </button>
            <button 
              onClick={() => setType('article')}
              className={`pb-3 px-4 font-bold flex items-center gap-2 transition-colors ${type === 'article' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-400'}`}
            >
              <FileText size={18} /> مقال جديد
            </button>
          </div>

          {/* Article Sub-Tabs (Only if Article is selected) */}
          {type === 'article' && (
             <div className="flex gap-3 mb-6 bg-stone-100 p-1 rounded-lg w-fit">
               <button 
                 onClick={() => setArticleSource('link')}
                 className={`px-4 py-1.5 text-sm rounded-md transition-all ${articleSource === 'link' ? 'bg-white shadow text-stone-900 font-bold' : 'text-stone-500'}`}
               >
                 <Link size={14} className="inline ml-2"/> رابط خارجي (هسبريس..)
               </button>
               <button 
                 onClick={() => setArticleSource('text')}
                 className={`px-4 py-1.5 text-sm rounded-md transition-all ${articleSource === 'text' ? 'bg-white shadow text-stone-900 font-bold' : 'text-stone-500'}`}
               >
                 <PenTool size={14} className="inline ml-2"/> مقال حصري (كتابة هنا)
               </button>
             </div>
          )}

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-stone-700 mb-2">العنوان</label>
              <input name="title" onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:border-amber-500 focus:outline-none" placeholder="عنوان الكتاب أو المقال" />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">التصنيف</label>
              <input name="category" onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg" placeholder="مثال: روايات، تعليم وتربية..." />
            </div>

            {type === 'book' && (
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">سنة الإصدار</label>
                <input name="year" type="number" onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg" defaultValue={new Date().getFullYear()} />
              </div>
            )}

            {/* حقل المصدر يختفي إذا كان المقال حصرياً (لأن المصدر سيكون تلقائياً "منصة ملاذ") */}
            {(type === 'book' || articleSource === 'link') && (
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">{type === 'book' ? 'دار النشر' : 'المصدر (الجريدة)'}</label>
                <input name="publisher" onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg" />
              </div>
            )}

            <div className="col-span-2">
              <label className="block text-sm font-bold text-stone-700 mb-2">
                {type === 'book' ? 'وصف الكتاب' : (articleSource === 'text' ? 'نص المقال كاملاً' : 'ملخص المقال')}
              </label>
              <textarea 
                name="description" 
                rows={articleSource === 'text' ? 12 : 3} 
                onChange={handleChange} 
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg" 
                placeholder={articleSource === 'text' ? "اكتب نص المقال هنا. يمكنك استخدام زر Enter للأسطر الجديدة..." : "اكتب نبذة مختصرة..."}
              ></textarea>
            </div>

            {type === 'book' && (
              <div className="col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">اسم ملف الصورة</label>
                <div className="flex gap-2">
                  <span className="bg-stone-200 p-3 rounded-l-lg text-stone-500 ltr font-mono text-sm flex items-center">/images/</span>
                  <input name="imageName" onChange={handleChange} className="flex-1 bg-stone-50 border border-stone-200 p-3 rounded-r-lg text-left" placeholder="book.jpg" dir="ltr" />
                </div>
              </div>
            )}

            {/* حقل الرابط يظهر فقط للكتب أو المقالات الخارجية */}
            {(type === 'book' || articleSource === 'link') && (
              <div className="col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">{type === 'book' ? 'رابط فيديو يوتيوب (اختياري)' : 'رابط المقال الأصلي'}</label>
                <input name="link" onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg text-left" placeholder="https://..." dir="ltr" />
              </div>
            )}
          </div>

          {/* Result Area */}
          <div className="bg-stone-900 rounded-xl p-6 relative group border border-stone-800">
            <div className="absolute top-4 left-4">
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-stone-900 hover:bg-amber-400'}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'تم النسخ!' : 'نسخ الكود'}
              </button>
            </div>
            <pre className="text-green-400 font-mono text-sm overflow-x-auto p-4 pt-12 dir-ltr whitespace-pre-wrap" dir="ltr">
              {generateCode()}
            </pre>
          </div>
          
          <p className="text-center text-stone-500 text-sm mt-6 bg-stone-100 p-3 rounded-lg">
            انسخ هذا الكود وأضفه في ملف 
            <code className="bg-white border border-stone-300 px-2 py-0.5 rounded mx-1 font-bold text-stone-800 font-mono">{type === 'book' ? 'src/data/books.js' : 'src/data/articles.js'}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;