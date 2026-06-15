export default {
  name: 'article',
  title: 'المقالات والتدوينات',
  type: 'document',
  fields: [
    { name: 'title', title: 'عنوان المقال', type: 'string' },
    { name: 'source', title: 'مصدر النشر (مثل: هسبريس)', type: 'string' },
    { name: 'category', title: 'التصنيف', type: 'string' },
    { name: 'date', title: 'تاريخ النشر', type: 'date' },
    { name: 'excerpt', title: 'ملخص قصير للمقال', type: 'text' },
    { name: 'content', title: 'محتوى المقال الكامل', type: 'array', of: [{type: 'block'}] },
  ]
}