export default {
  name: 'book',
  title: 'المؤلفات والكتب',
  type: 'document',
  fields: [
    { name: 'title', title: 'عنوان الكتاب', type: 'string' },
    { name: 'category', title: 'التصنيف (مثل: تعليم وتربية، روايات)', type: 'string' },
    { name: 'year', title: 'سنة الإصدار', type: 'string' },
    { name: 'pages', title: 'عدد الصفحات', type: 'number' },
    { name: 'publisher', title: 'دار النشر', type: 'string' },
    { name: 'isbn', title: 'رقم ISBN', type: 'string' },
    { name: 'description', title: 'وصف الكتاب', type: 'text' },
    { name: 'coverImage', title: 'صورة الغلاف', type: 'image', options: { hotspot: true } },
    { name: 'pdfFile', title: 'ملف الـ PDF', type: 'file' },
    { name: 'videoUrl', title: 'رابط فيديو يوتيوب التعريفي (إن وجد)', type: 'url' },
  ]
}