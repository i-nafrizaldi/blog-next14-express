'use client';

import { Formik } from 'formik';
import BlogEditForm from './components/BlogEditForm';
import useGetBlog from '@/hooks/api/blog/useGetBlog';

const EditBlog = ({ params }: { params: { id: string } }) => {
  const { blog } = useGetBlog(Number(params.id));

  return (
    <main className="container mx-auto px-4">
      <Formik
        initialValues={{
          title: blog?.title || '',
          category: blog?.category || '',
          thumbnail: [],
          description: blog?.description || '',
          content: blog?.content || '',
        }}
        onSubmit={() => {}}
        enableReinitialize
      >
        <BlogEditForm />
      </Formik>
    </main>
  );
};

export default EditBlog;
