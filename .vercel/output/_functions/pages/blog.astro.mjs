import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_Cm85lidq.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_prlYwbXc.mjs';
import { g as getCollection } from '../chunks/_astro_content_DhosqLp-.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="blog-content"> ${renderComponent($$result2, "Text", null, { "size": "5xl", "weight": "bold", "translation": "blog.label", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} ${renderComponent($$result2, "BlogList", null, { "items": posts, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/BlogList", "client:component-export": "default" })} </div> ` })} `;
}, "/home/julio/Data/www/website/src/pages/blog.astro", undefined);

const $$file = "/home/julio/Data/www/website/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Blog,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
