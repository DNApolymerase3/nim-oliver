import { getBlogPosts } from '@/lib/posts';
import PersonalPage from '@/app/personal-page';

export default function Home() {
  const blogPosts = getBlogPosts();

  return <PersonalPage blogPosts={blogPosts} />;
}
