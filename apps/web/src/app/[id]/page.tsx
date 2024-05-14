'use client';

import Markdown from '@/components/Markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useGetBlog from '@/hooks/api/blog/useGetBlog';
import { format } from 'date-fns/format';
import { Edit, Share2 } from 'lucide-react';
import Image from 'next/image';
import SkeletonBlogDetail from './components/SkeletonBlogDetail';
import { appConfig } from '@/utils/config';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter();
  const { blog, isLoading } = useGetBlog(Number(params.id));
  if (isLoading) {
    return (
      <div className="conteiner mx-auto px-4">
        <SkeletonBlogDetail />
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <main className="container mx-auto px-4">
      <section className="mb-4">
        <div className="mb-4 space-y-1.5">
          <Badge variant="outline" className="rounded-sm bg-green-100">
            {blog.category}
          </Badge>
          <h1 className=" text-4xl font-semibold">{blog.title}</h1>
          <div className=" flex mb-2 items-center justify-between">
            <p className=" text-base font-light italic">
              {format(new Date(blog.createdAt), 'dd MMMM yyy')} -{' '}
              {blog.user.fullName}
            </p>
            {id === blog.userId && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/${params.id}/edit`)}
              >
                <Edit size="20px" />
              </Button>
            )}
          </div>
        </div>

        <div className=" relative h-[400px]">
          <Image
            src={`${appConfig.baseUrl}/assets${blog.thumbnail}`}
            fill
            alt="thumbnail image"
            className="object-cover bg-slate-200"
          />
        </div>

        <section>
          {/*RENDER MARKDOWN*/}
          <Markdown content={blog.content} />
        </section>
      </section>
    </main>
  );
};

export default BlogDetail;
