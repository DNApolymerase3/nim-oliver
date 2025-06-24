import { getNotes } from '@/lib/notes'
import { NotesList } from './notes-list'

export default function NotesIndexPage() {
  const allNotes = getNotes()

  return <NotesList notes={allNotes} />
}
