import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({ duration: 1000, delay: 100 });

import "./swipper.js";



const pageConfig = {
  "/about.html": {
    title: "About Us",
    breadcrumb: "About",
    herf: "/about.html"
  },
  "/services.html": {
    title: "Services",
    breadcrumb: "Services",
    herf: "/services.html"
  },
  "/project.html": {
    title: "Project",
    breadcrumb: "Project",
    herf: "/project.html"
  },
  "/contact.html": {
    title: "Contact",
    breadcrumb: "Contact",
    herf: "/contact.html"
  }
};

async function loadComponent(id, file, callback) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(`/components/${file}`);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const html = await res.text();
    el.innerHTML = html;
    AOS.refresh();
    if (typeof callback === "function") callback(el);
  } catch (err) {
    console.error(err);
  }
}

// ✅ تحميل الهيدر
loadComponent("header", "header.html", (headerEl) => {
  const toggle = headerEl.querySelector('#menu-toggle');
  const menu = headerEl.querySelector('#menu');
  
  // لو لقيت التوتجل والميون، أضف الحدث
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('hidden'));
  }

  const themeToggles = headerEl.querySelectorAll('.theme-toggle');
  const htmlElement = document.documentElement;

  // لو الـ localStorage فيه theme مُعين
  if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  themeToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      const isDark = htmlElement.classList.toggle('dark');
      
      // حفظ حالة الـ theme في localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // تغيير الأيقونات حسب الوضع
      if (icon) {
        icon.classList.toggle('ri-moon-line', !isDark);
        icon.classList.toggle('ri-sun-line', isDark);
      }
    });
  });
});


// ✅ Hero + Footer
loadComponent("hero_section", "hero_section.html", (section) => {
  const config = pageConfig[window.location.pathname];
  if (config) {
    section.querySelector(".hero-title").textContent = config.title;
    section.querySelector(".hero-crumb").textContent = config.breadcrumb;
    section.querySelector(".hero-crumb").href = config.herf;
  }
  AOS.refresh();
});
loadComponent("footer", "footer.html", () => AOS.refresh());

// ✅ بعد تحميل الصفحة كلها
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("opacity-0");

  // بعد ما البريلود يختفي تمامًا (بعد 2 ثانية)
  setTimeout(() => {
    preloader.style.display = "none";

    // ✅ هنا يبدأ الأنيميشن بتاع GSAP
    import("gsap").then(({ default: gsap }) => {
  const titles = document.querySelectorAll(".hero-title");

  titles.forEach((title, index) => {
    const text = title.textContent.trim();

    // نحول النص لحروف منفصلة داخل span
    title.innerHTML = text
      .split("")
      .map(
        (char) =>
          `<span class="inline-block opacity-0 translate-y-[20px]">${char === " " ? "&nbsp;" : char}</span>`
      )
      .join("");

    const letters = title.querySelectorAll("span");

    // نعمل الأنيميشن
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.3 + index * 0.5, // ← تأخير بسيط بين كل عنوان والتاني
    });
  });
});

  }, 1500); // ← نفس مدة البريلودر
});
