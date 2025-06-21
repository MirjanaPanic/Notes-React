export async function addNote(note: {
  title: string;
  content: string;
  tags: string[];
  userId: string;
}) {
  const res = await fetch("http://localhost:5000/notes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Server error: ${res.status} - ${errorText}`);
  }
  console.log("izvrsilo se");
}

export async function updateNote(noteForEdit: {
  noteId: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
}) {
  const response = await fetch("http://localhost:5000/notes/editNote", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteForEdit),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Update failed: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  console.log("Updated data", data);
  return data;
}
