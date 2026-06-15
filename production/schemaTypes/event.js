export default {
  name: 'event',
  title: 'الأنشطة واللقاءات',
  type: 'document',
  fields: [
    { name: 'title', title: 'عنوان النشاط أو اللقاء', type: 'string' },
    { name: 'date', title: 'تاريخ النشاط', type: 'date' },
    { name: 'description', title: 'وصف مختصر', type: 'text' },
    { name: 'coverImage', title: 'صورة النشاط الرئيسية', type: 'image', options: { hotspot: true } },
  ]
}