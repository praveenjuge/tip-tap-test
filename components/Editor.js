import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorLink from "@tiptap/extension-link";
import EditorImage from "@tiptap/extension-image";
import ExternalVideo from "./external-video";
import {
  Eraser,
  Image,
  Link,
  LinkBreak,
  ListBullets,
  TextBolder,
  TextHOne,
  TextHTwo,
  TextItalic,
  VideoCamera,
} from "phosphor-react";

const iconClass = "h-4 w-4";
const buttonClass =
  "rounded p-1 bg-white hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:pointer-events-none";
const activeclass = "rounded p-1 text-white bg-black";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-1 p-1.5">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? activeclass : buttonClass}
      >
        <TextBolder weight="bold" className={iconClass} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? activeclass : buttonClass}
      >
        <TextItalic weight="bold" className={iconClass} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? activeclass : buttonClass
        }
      >
        <TextHOne weight="bold" className={iconClass} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? activeclass : buttonClass
        }
      >
        <TextHTwo weight="bold" className={iconClass} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? activeclass : buttonClass}
      >
        <ListBullets weight="bold" className={iconClass} />
      </button>
      <button className={buttonClass} onClick={() => setLink(editor)}>
        <Link weight="bold" className={iconClass} />
      </button>
      {editor.isActive("link") && (
        <button
          className={buttonClass}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <LinkBreak weight="bold" className={iconClass} />
        </button>
      )}
      <button className={buttonClass} onClick={() => addImage(editor)}>
        <Image weight="bold" className={iconClass} />
      </button>
      <button className={buttonClass} onClick={() => addVideo(editor)}>
        <VideoCamera weight="bold" className={iconClass} />
      </button>
      <button
        className={buttonClass}
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
      >
        <Eraser weight="bold" className={iconClass} />
      </button>
    </div>
  );
};

const addImage = (editor) => {
  const url = window.prompt(
    "URL",
    "https://praveenjuge.com/images/praveen-juge-photo.jpg"
  );

  if (url) {
    editor.chain().focus().setImage({ src: url }).run();
  }
};

const addVideo = (editor) => {
  const url = window.prompt(
    "YouTube, Loom or Vimeo URL",
    "https://www.youtube.com/embed/iyd8dY8rRtA"
  );
  if (url) {
    editor.chain().focus().setExternalVideo({ src: url }).run();
  }
};

const CustomLink = EditorLink.extend({
  addKeyboardShortcuts() {
    return {
      "Mod-k": () => setLink(this.editor),
    };
  },
});

const setLink = (editor) => {
  const url = window.prompt(
    "URL",
    "https://praveenjuge.com/images/praveen-juge-photo.jpg"
  );

  if (url) {
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }
};

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      EditorImage,
      CustomLink,
      ExternalVideo,
      Placeholder.configure({
        placeholder: "Remember, the more you tell, the more we know.",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm p-3 focus:outline-none max-w-none min-h-[200px]",
      },
    },
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <p>
        Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
      </p>
      <p>
        By default every link will get a \`rel="noopener noreferrer nofollow"\` attribute. It’s configurable though.
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
  });

  return (
    <>
      <span className="text-sm text-gray-600 block mb-1">Your Thoughts:</span>
      <div className="flex flex-col bg-white border rounded shadow-sm focus-within:border-gray-400 hover:border-gray-400">
        <EditorContent editor={editor} />
        <MenuBar editor={editor} />
      </div>
    </>
  );
};

export default Editor;
