
const cursor = document.querySelector('.cursor-circle');
const targets = document.querySelectorAll('.hover-target');

// حركة الماوس بسلاسة باستخدام transform بدلاً من top/left
document.addEventListener('mousemove', e => {
  requestAnimationFrame(() => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
});

// تأثير hover على العناصر المحددة
targets.forEach(target => {
  target.addEventListener('mouseenter', () => {
    cursor.style.width = "70px";
    cursor.style.height = "70px";
    cursor.textContent = "More";
  });

  target.addEventListener('mouseleave', () => {
    cursor.style.width = "30px";
    cursor.style.height = "30px";
    cursor.textContent = "";
  });
});
