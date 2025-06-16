export function adjustTextareaHeight(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
) {
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto"; // reset
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // adjust
  }
}
