import Editor from "../components/Editor";

export default function Home() {
  return (
    <div className="px-4 py-14 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-14">
        <Editor />
        <Editor
          content='<h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <p>
        What do you all think about the new <span data-mention data-id="Winona Ryder"></span> <span data-mention data-id="Praveen Juge"></span> movie?
      </p>
      <p>
        Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
      </p>
      <p>
        By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It’s configurable though.
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
      </blockquote>'
        />
      </div>
    </div>
  );
}
