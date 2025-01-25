import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, d as addAttribute, e as renderHead, f as renderSlot, g as renderScript, b as createAstro } from './astro/server_Cm85lidq.mjs';
/* empty css                           */

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header> <a href="/" class="logo">JM</a> <div class="group"> ${renderComponent($$result, "LanguagePicker", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/LanguagePicker", "client:component-export": "default" })} ${renderComponent($$result, "DarkThemeButton", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/DarkThemeButton", "client:component-export": "default" })} ${renderComponent($$result, "Menu", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Menu", "client:component-export": "default" })} </div> </header> `;
}, "/home/julio/Data/www/website/src/components/base/Header.astro", undefined);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  function transformPathName(str) {
    if (str === "/") return "Home";
    if (str.match(/blog/g)) return "Blog";
    str = str.replaceAll("/", "");
    const upperword = str.match(/[A-Z]/g);
    if (!upperword) return str[0].toUpperCase() + str.slice(1);
    str = str[0].toUpperCase() + str.slice(1).split(upperword[0]).join(` ${upperword[0]}`);
    return str;
  }
  const title = `JM | ${transformPathName(Astro2.originPathname)}`;
  return renderTemplate`<html> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/styles/variables.css"><link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <div class="base-layout-content"> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} </div> ${renderScript($$result, "/home/julio/Data/www/website/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")} </body></html>`;
}, "/home/julio/Data/www/website/src/layouts/BaseLayout.astro", undefined);

export { $$BaseLayout as $ };
