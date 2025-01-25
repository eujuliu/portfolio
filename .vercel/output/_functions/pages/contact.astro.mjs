import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_Cm85lidq.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_prlYwbXc.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const contacts = [
    {
      type: "mail",
      values: [
        {
          label: "contact.juliomartins@gmail.com",
          link: "mailto:contact.juliomartins@gmail.com"
        }
      ]
    },
    {
      type: "socialMedia",
      values: [
        { label: "linkedin", link: "https://www.linkedin.com/in/ojuliomartins/" }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="contact-content"> ${renderComponent($$result2, "Text", null, { "className": "title", "size": "5xl", "weight": "bold", "translation": "contact.label", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} <div class="contacts"> ${contacts.map((contact) => renderTemplate`<div class="contact"> <div class="type"> ${renderComponent($$result2, "Text", null, { "size": "base", "translation": `contact.${contact.type}`, "weight": "bold", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} </div> <div class="values"> ${contact.values.map((val) => renderTemplate`<div class="redirect"> <i class="bx bx-up-arrow-alt bx-md"></i> <a class="link"${addAttribute(val.link, "href")}> ${val.label} </a> </div>`)} </div> </div>`)} </div> </div> ` })} `;
}, "/home/julio/Data/www/website/src/pages/contact.astro", undefined);

const $$file = "/home/julio/Data/www/website/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contact,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
