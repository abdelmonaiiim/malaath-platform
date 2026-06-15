import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'rja5om0k', // ضعه هنا بين علامتي التنصيص
  dataset: 'production',
  useCdn: true, // لتسريع تحميل البيانات للزوار
  apiVersion: '2024-06-15', // تاريخ اليوم
});

const builder = imageUrlBuilder(client);

// هذه الدالة ستحول الصور من Sanity إلى روابط يمكن للموقع قراءتها
export const urlFor = (source) => {
  return builder.image(source);
};