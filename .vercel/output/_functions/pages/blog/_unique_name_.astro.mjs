import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_Cm85lidq.mjs';
import { g as getCollection } from '../../chunks/_astro_content_DhosqLp-.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_prlYwbXc.mjs';
/* empty css                                            */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$uniqueName = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$uniqueName;
  const { unique_name } = Astro2.params;
  const posts = await getCollection("blog", ({ data: { unique_name: name } }) => {
    return name === unique_name;
  });
  if (posts.length < 1) return Astro2.redirect("/404/");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="blog-post-content"> ${renderComponent($$result2, "PostHeader", null, { "posts": posts, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/PostHeader", "client:component-export": "default" })} ${renderComponent($$result2, "MarkdownContent", null, { "posts": posts, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/MarkdownContent", "client:component-export": "default" })} </div> ` })} `;
}, "/home/julio/Data/www/website/src/pages/blog/[unique_name].astro", undefined);

const $$file = "/home/julio/Data/www/website/src/pages/blog/[unique_name].astro";
const $$url = "/blog/[unique_name]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$uniqueName,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
