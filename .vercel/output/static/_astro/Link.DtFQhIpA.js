import{u as i,j as p}from"./index.B5r8R7Qw.js";import{l as m}from"./i18n.DKZOi3CA.js";import{u}from"./utils.ToKmxi8g.js";import"./index.BL7xzsR_.js";function x({name:r,to:o,translation:a,children:l},s=!0){const e=i(m),f=u(e),n={};if(typeof o=="string"&&(s=!!o.match(/http/g)),typeof o=="object"){const t=o[e];n.download=t.type==="download"?t.name:void 0,o=t.href,s=!1}return p.jsx("a",{className:`link ${r}`,href:o,target:s?"_blank":"_self",...n,children:a?f(a):l})}export{x as default};
