import { randomUUID } from 'node:crypto';
import { PostEditor } from '@/components/admin/post-editor';

export default function NewPostPage() {
  return (
    <PostEditor
      isNew
      initialValues={{
        // El id se crea ya para que las imágenes que se suban antes de guardar vayan a su carpeta.
        id: randomUUID(),
        slug: '',
        title: '',
        description: '',
        content: '',
        author: '',
        coverImage: '',
        tags: [],
        date: new Date().toISOString().slice(0, 10),
        status: 'draft',
      }}
    />
  );
}
