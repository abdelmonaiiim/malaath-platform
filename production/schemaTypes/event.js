export default {
  name: 'event',
  title: 'الأنشطة واللقاءات',
  type: 'document',
  fields: [
    { name: 'title', title: 'عنوان النشاط أو اللقاء', type: 'string' },
    { name: 'date', title: 'تاريخ النشاط', type: 'date' },
    { name: 'time', title: 'التوقيت (مثل: 16:00 مساءً)', type: 'string' },
    { name: 'location', title: 'مكان اللقاء (مثل: المكتبة الوطنية، الرباط)', type: 'string' },
    { name: 'description', title: 'وصف مختصر أو محاور اللقاء', type: 'text' },
    { name: 'coverImage', title: 'صورة النشاط (أو ملصق الإعلان)', type: 'image', options: { hotspot: true } },
  ]
}