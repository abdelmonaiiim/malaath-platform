import { Book, Award, PenTool, Star, GraduationCap, Globe } from 'lucide-react';
export const TIMELINE_DATA = [
  {
    year: "البدايات",
    title: "انطلاق الشغف",
    description: "مرحلة الدراسة واكتشاف حب اللغة العربية والقراءة النهمة لأمهات الكتب.",
    icon: GraduationCap,
  },
  {
    year: "2003",
    title: "تفاحة نيوطن",
    description: "أول إصدار موجه للناشئة، بداية الغيث في عالم أدب الطفل.",
    icon: PenTool,
  },
  {
    year: "2012",
    title: "فلسطين قصة مأساتي",
    description: "نقلة نوعية نحو الكتابة في القضايا القومية الكبرى والهم العربي.",
    icon: Book,
  },
  {
    year: "2018",
    title: "تأملات تربوية",
    description: "عصارة سنوات من العمل في ميدان التربية والتوجيه، دليل للأجيال الصاعدة.",
    icon: Star,
  },
  {
    year: "2024",
    title: "صحرائي في عيوني",
    description: "توثيق الذاكرة الوطنية وسرد الارتباط الوجداني بالأرض.",
    icon: Award,
  },
  {
    year: "2025",
    title: "تأسيس منصة ملاذ",
    description: "إطلاق المشروع الثقافي الرقمي لتوثيق الأعمال ونشر المعرفة.",
    icon: Globe, // أيقونة جديدة سنحتاج استيرادها
  },
];