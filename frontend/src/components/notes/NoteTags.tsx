import { TAG_LENGTH_NOTE } from "../../lib/constants";

export default function NoteTags({ tags }: { tags: string[] }) {
  return tags.map((tag) => {
    const displaytag =
      tag.length <= TAG_LENGTH_NOTE
        ? tag
        : `${tag.slice(0, TAG_LENGTH_NOTE)}...`;
    return (
      <span
        key={tag}
        style={{
          color: "#B4D8B2",
          fontSize: "0.85rem",
          whiteSpace: "nowrap",
        }}
        //onMouseEnter={() => console.log("Hovered!")}
      >
        {displaytag}
      </span>
    );
  });
}
