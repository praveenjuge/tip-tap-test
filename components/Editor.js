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
import tippy from "tippy.js";
import { useEditor, EditorContent, ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorLink from "@tiptap/extension-link";
import EditorImage from "@tiptap/extension-image";
import ExternalVideo from "./external-video";
import Mention from "@tiptap/extension-mention";
import { MentionList } from "./MentionList";

const iconClass = "h-4 w-4";
const defaultButtonClass =
  "rounded p-1 focus:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
const buttonClass =
  defaultButtonClass + ` bg-white hover:bg-gray-100 text-gray-600`;
const activeclass = defaultButtonClass + ` text-white bg-black`;

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-1 sticky bottom-0 p-1.5 bg-white rounded-b">
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

export default function Editor({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      EditorImage,
      CustomLink,
      ExternalVideo,
      Placeholder.configure({
        placeholder: "Remember, the more you tell, the more we know.",
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "p-0.5 bg-blue-100 text-blue-700 rounded",
        },
        suggestion: {
          items: (query) => {
            return [
              "Praveen Juge",
              "Lea Thompson",
              "Cyndi Lauper",
              "Tom Cruise",
              "Madonna",
              "Jerry Hall",
              "Joan Collins",
              "Winona Ryder",
              "Christina Applegate",
              "Alyssa Milano",
              "Molly Ringwald",
              "Ally Sheedy",
              "Debbie Harry",
              "Olivia Newton-John",
              "Elton John",
              "Michael J. Fox",
              "Axl Rose",
              "Emilio Estevez",
              "Ralph Macchio",
              "Rob Lowe",
              "Jennifer Grey",
              "Mickey Rourke",
              "John Cusack",
              "Matthew Broderick",
              "Justine Bateman",
              "Lisa Bonet",
            ]
              .filter((item) =>
                item.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 5);
          },
          render: () => {
            let reactRenderer;
            let popup;
            return {
              onStart: (props) => {
                reactRenderer = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });
              },
              onUpdate(props) {
                reactRenderer.updateProps(props);

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown(props) {
                return reactRenderer.ref?.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                reactRenderer.destroy();
              },
            };
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm p-3 focus:outline-none max-w-none min-h-[150px]",
      },
    },
    content: content,
  });

  return (
    <div>
      <span className="text-sm text-gray-600 block mb-1">Your Thoughts:</span>
      <div className="transition flex flex-col bg-white border rounded shadow-sm focus-within:border-gray-400 hover:border-gray-400 min-h-[188px]">
        <EditorContent editor={editor} />
        <MenuBar editor={editor} />
      </div>
    </div>
  );
}
