import { getNotes } from '@/lib/notes';
import PersonalPage from '@/app/personal-page';

export default function Home() {
  const notes = getNotes();

  return <PersonalPage notes={notes} />;
}
