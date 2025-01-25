import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_Cm85lidq.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_prlYwbXc.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const links = [
    { to: "/aboutMe", name: "aboutMe", translation: "home.links.aboutMe" },
    { to: "/blog", name: "blog", translation: "home.links.blog" }
  ];
  const socialMedias = [
    { to: "https://github.com/eujuliu", name: "github", icon: "bxl-github" },
    {
      to: "https://www.linkedin.com/in/ojuliomartins/",
      name: "linkedin",
      icon: "bxl-linkedin"
    },
    { to: "", name: "tiktok", icon: "bxl-tiktok" },
    { to: "", name: "youtube", icon: "bxl-youtube" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="home-content"> ${renderComponent($$result2, "Text", null, { "className": "greetings", "size": "5xl", "weight": "bolder", "translation": "home.greetings", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} ${renderComponent($$result2, "Text", null, { "className": "subject", "size": "base", "weight": "normal", "translation": "home.subject", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} <div class="links"> ${links.map(({ name, to, translation }) => renderTemplate`${renderComponent($$result2, "Link", null, { "name": name, "to": to, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Link", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <i class="bx bx-right-arrow-alt"></i> ${renderComponent($$result3, "Text", null, { "size": "base", "weight": "bold", "translation": translation, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} ` })}`)} </div> <div class="social-medias"> ${socialMedias.map(({ name, to, icon }) => renderTemplate`${renderComponent($$result2, "Link", null, { "name": name, "to": to, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Link", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <i${addAttribute(`bx ${icon} bx-lg`, "class")}></i> ` })}`)} </div> </div> ` })} `;
}, "/home/julio/Data/www/website/src/pages/index.astro", undefined);

const $$file = "/home/julio/Data/www/website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
