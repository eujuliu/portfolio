import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_Cm85lidq.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_prlYwbXc.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$AboutMe = createComponent(($$result, $$props, $$slots) => {
  const resumes = {
    en: {
      name: "Julio's Resume",
      href: "/public/curriculum-en.docx",
      type: "download"
    },
    "pt-br": {
      name: "Curr\xEDculo do Julio",
      href: "/public/curriculum-pt-br.docx",
      type: "download"
    }
  };
  const sections = [
    {
      titleTranslation: "aboutMe.experience.label",
      items: [
        {
          title: "Software Engineer",
          company: "HEADER Interactive",
          period: "Jan 2023 - Dec 2024",
          local: "Curitiba, Paran\xE1, Brazil",
          tools: [
            "Vue.js",
            "Node.js",
            "Typescript",
            "Git",
            "Docker",
            "Docker Compose",
            "JavaScript",
            "IBM DB2",
            "MongoDB",
            "RabbitMQ",
            "BullMQ",
            "AWS"
          ],
          translation: {
            "pt-br": {
              title: "Engenheiro de Software",
              period: "Jan 2023 - Dez 2024",
              local: "Curitiba, Paran\xE1, Brasil"
            },
            es: {
              title: "Ingeniero de Software",
              period: "Ene 2023 - Dic 2024",
              local: "Curitiba, Paran\xE1, Brasil"
            }
          }
        }
      ]
    },
    {
      titleTranslation: "aboutMe.projects.label",
      items: [
        {
          title: "Chat realtime",
          description: "I developed a real-time chat API using Node.js and TypeScript, leveraging Domain-Driven Design (DDD) to ensure scalability and maintainability. I integrated Nginx as a reverse proxy and Docker for consistent deployments while implementing secure user authentication with MySQL. I enabled real-time global chat functionality with MongoDB for efficient message storage and used Terraform to automate infrastructure provisioning, reducing deployment time by 50% and enhancing system performance.",
          link: "https://github.com/eujuliu/chatrealtime-backend",
          tools: [
            "TypeScript",
            "Node.js",
            "WebSocket",
            "Terraform",
            "Docker",
            "Unit Testing",
            "CI/CD",
            "Nginx",
            "Reverse Proxy"
          ],
          translation: {
            "pt-br": {
              description: "Desenvolvi uma API de chat em tempo real usando Node.js e TypeScript, aproveitando o Domain-Driven Design (DDD) para garantir escalabilidade e manutenibilidade. Integrei o Nginx como um proxy reverso e o Docker para implanta\xE7\xF5es consistentes enquanto implementava autentica\xE7\xE3o segura de usu\xE1rio com MySQL. Habilitei a funcionalidade de chat global em tempo real com o MongoDB para armazenamento eficiente de mensagens e usei o Terraform para automatizar o provisionamento de infraestrutura, reduzindo o tempo de implanta\xE7\xE3o em 50% e melhorando o desempenho do sistema."
            },
            es: {
              description: "Desarroll\xE9 una API de chat en tiempo real utilizando Node.js y TypeScript, aprovechando el dise\xF1o impulsado por el dominio (DDD) para garantizar la escalabilidad y la capacidad de mantenimiento. Integr\xE9 Nginx como proxy inverso y Docker para implementaciones consistentes mientras implementaba la autenticaci\xF3n segura de usuarios con MySQL. Habilit\xE9 la funcionalidad de chat global en tiempo real con MongoDB para un almacenamiento eficiente de mensajes y utilic\xE9 Terraform para automatizar el aprovisionamiento de infraestructura, lo que redujo el tiempo de implementaci\xF3n en un 50% y mejor\xF3 el rendimiento del sistema."
            }
          }
        },
        {
          title: "Restaurant API",
          description: "I engineered a robust restaurant API using Node.js, TypeScript, and Prisma (PostgreSQL) to enable user registration, order processing, and payment completion. I adhered to SOLID and Domain-Driven Design (DDD) principles for a modular and scalable architecture. By conducting thorough unit and integration testing with Jest and Docker, I enhanced code reliability and reduced bugs by 30%. I streamlined order and payment processes, boosting transaction efficiency by 25%, and optimized database interactions with Prisma, reducing response times by 20%.",
          tools: ["SOLID", "DDD", "Node.js", "Docker", "PostgreSQL"],
          link: "https://github.com/eujuliu/restaurant-api",
          translation: {
            "pt-br": {
              title: "API de Restaurante",
              description: "Eu projetei uma API de restaurante robusta usando Node.js, TypeScript e Prisma (PostgreSQL) para habilitar o registro do usu\xE1rio, processamento de pedidos e conclus\xE3o de pagamento. Eu aderi aos princ\xEDpios SOLID e Domain-Driven Design (DDD) para uma arquitetura modular e escal\xE1vel. Ao conduzir testes completos de unidade e integra\xE7\xE3o com Jest e Docker, eu melhorei a confiabilidade do c\xF3digo e reduzi os bugs em 30%. Eu simplifiquei os processos de pedidos e pagamentos, aumentando a efici\xEAncia das transa\xE7\xF5es em 25%, e otimizei as intera\xE7\xF5es do banco de dados com Prisma, reduzindo os tempos de resposta em 20%."
            },
            es: {
              title: "API de restaurante",
              description: "Dise\xF1\xE9 una API robusta para restaurantes utilizando Node.js, TypeScript y Prisma (PostgreSQL) para permitir el registro de usuarios, el procesamiento de pedidos y la finalizaci\xF3n de pagos. Segu\xED los principios de SOLID y Domain-Driven Design (DDD) para lograr una arquitectura modular y escalable. Al realizar pruebas unitarias y de integraci\xF3n exhaustivas con Jest y Docker, mejor\xE9 la confiabilidad del c\xF3digo y reduje los errores en un 30 %. Agilic\xE9 los procesos de pedidos y pagos, lo que aument\xF3 la eficiencia de las transacciones en un 25 %, y optimic\xE9 las interacciones con la base de datos con Prisma, lo que redujo los tiempos de respuesta en un 20 %."
            }
          }
        },
        {
          title: "Discord App Clone",
          description: "I developed a user interface clone of the Discord mobile app using Expo, React Native, and TypeScript, replicating chat and video chat functionalities. I utilized styled-components for dynamic styling, ensuring a responsive and consistent user experience across devices. By closely mirroring Discord\u2019s design, I created a seamless and intuitive interface. Leveraging React Native\u2019s cross-platform capabilities, I optimized the app for both iOS and Android, showcasing my expertise in modern mobile UI development.",
          tools: ["React Native", "TypeScript", "styled-components", "Expo"],
          link: "https://github.com/eujuliu/discord-expo",
          translation: {
            "pt-br": {
              title: "Clone do App do Discord",
              description: "Desenvolvi um clone de interface de usu\xE1rio do aplicativo m\xF3vel Discord usando Expo, React Native e TypeScript, replicando funcionalidades de chat e chat de v\xEDdeo. Utilizei styled-components para estilo din\xE2mico, garantindo uma experi\xEAncia de usu\xE1rio responsiva e consistente em todos os dispositivos. Ao espelhar de perto o design do Discord, criei uma interface perfeita e intuitiva. Aproveitando os recursos multiplataforma do React Native, otimizei o aplicativo para iOS e Android, mostrando minha experi\xEAncia em desenvolvimento de UI m\xF3vel moderno."
            },
            es: {
              title: "Clone do aplicativo Discord",
              description: "Desarroll\xE9 una interfaz de usuario clonada de la aplicaci\xF3n m\xF3vil Discord usando Expo, React Native y TypeScript, replicando las funcionalidades de chat y video chat. Utilic\xE9 componentes con estilo para crear un estilo din\xE1mico, asegurando una experiencia de usuario responsiva y consistente en todos los dispositivos. Al reflejar fielmente el dise\xF1o de Discord, cre\xE9 una interfaz fluida e intuitiva. Aprovechando las capacidades multiplataforma de React Native, optimic\xE9 la aplicaci\xF3n tanto para iOS como para Android, mostrando mi experiencia en el desarrollo de UI m\xF3viles modernas."
            }
          }
        }
      ]
    },
    {
      titleTranslation: "aboutMe.education.label",
      items: [
        {
          title: "UNINTER International University Center",
          company: "Associate's degree, Computer Systems Analysis/Analyst",
          tools: [""],
          period: "Sep 2022 - Dec 2024",
          translation: {
            "pt-br": {
              title: "Centro Universit\xE1rio Internacional UNINTER",
              company: "Tecn\xF3logo em Analise e Desenvolvimento de Sistemas",
              period: "Set 2022 - Dez 2024"
            },
            es: {
              title: "Centro Universitario Internacional UNINTER",
              company: "Tecn\xF3logo en An\xE1lisis y Desarrollo de Sistemas",
              period: "Sep 2022 - Dic 2024"
            }
          }
        }
      ]
    }
  ];
  const languages = ["pt-br", "en", "es"];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="about-me-content"> <div class="wrapper"> <img src="/images/profile-picture.jpg" alt="A picture of Julio Martins"> <div class="group"> ${renderComponent($$result2, "Text", null, { "className": "about-me title", "size": "5xl", "translation": "aboutMe.label", "weight": "bold", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} ${renderComponent($$result2, "Text", null, { "size": "base", "className": "about-me text", "translation": "aboutMe.text", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} </div> </div> ${sections.map((section) => renderTemplate`${renderComponent($$result2, "List", null, { "titleTranslation": section.titleTranslation, "items": section.items, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/List", "client:component-export": "default" })}`)} ${renderComponent($$result2, "Text", null, { "size": "5xl", "weight": "bold", "translation": "aboutMe.languages.label", "className": "languages-title", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} <div class="languages"> ${languages.map((language) => renderTemplate`<div class="language"> ${renderComponent($$result2, "Text", null, { "size": "lg", "translation": `languages.${language}`, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} ${renderComponent($$result2, "Text", null, { "size": "base", "translation": `aboutMe.languages.levels.${language}`, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} </div>`)} </div> ${renderComponent($$result2, "Link", null, { "name": "download-curriculum", "to": resumes, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Link", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <i class="bx bx-down-arrow-alt"></i> ${renderComponent($$result3, "Text", null, { "size": "base", "translation": "aboutMe.curriculum", "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/julio/Data/www/website/src/components/Text", "client:component-export": "default" })} ` })} </div> ` })} `;
}, "/home/julio/Data/www/website/src/pages/aboutMe.astro", undefined);

const $$file = "/home/julio/Data/www/website/src/pages/aboutMe.astro";
const $$url = "/aboutMe";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$AboutMe,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
