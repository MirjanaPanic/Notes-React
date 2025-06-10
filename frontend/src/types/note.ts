export interface NoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: string; // ili Date
  updatedAt: string; // אili Date
}
