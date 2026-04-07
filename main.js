// ===== HOME PAGE =====

const TESTIMONIALS = [
  { name: 'Minh Anh & Bảo Châu', avatar: 'M', text: 'Thiệp đẹp quá, khách mời ai cũng khen. Hiệu ứng hoa rơi lãng mạn vô cùng, tạo xong trong 5 phút!', date: '15/06/2025', stars: 5 },
  { name: 'Hùng & Phương', avatar: 'H', text: 'Mẫu Đêm Sao quá đỉnh, sao băng bay liên tục. Chia sẻ qua Zalo cho cả họ hàng, ai cũng trầm trồ.', date: '09/12/2025', stars: 5 },
  { name: 'Khánh Linh & Anh Thắng', avatar: 'K', text: 'Mẫu Hoàng Kim sang trọng như thiệp in thật. Đặc biệt là có đếm ngược đến ngày cưới, rất ý nghĩa!', date: '13/12/2025', stars: 5 },
];

function renderTemplates() {
  const grid = document.getElementById('templatesGrid');
  if (!grid) return;
  TEMPLATES.forEach(t => {
    grid.innerHTML += `
      <div class="template-card" onclick="window.location='create.html?template=${t.id}'">
        <div class="template-thumb" style="background:${t.preview_bg}">
          <span class="template-badge badge-premium">Premium</span>
          <div class="template-thumb-inner">
            <span class="t-emoji">${t.emoji}</span>
            <span class="t-name" style="color:${t.preview_color}">${t.name}</span>
            <span class="t-names" style="color:rgba(255,255,255,.4)">Cô Dâu & Chú Rể</span>
          </div>
        </div>
        <div class="template-info">
          <h4>${t.name}</h4>
          <p style="font-size:.78rem;color:#aaa;margin:.2rem 0 .4rem;line-height:1.4">${t.desc}</p>
          <div class="template-stats"><span>❤️ ${t.likes}</span><span>👁 ${t.views.toLocaleString()}</span></div>
        </div>
        <div class="template-overlay">
          <span>Dùng mẫu này</span>
          <small>Tạo thiệp ngay →</small>
        </div>
      </div>`;
  });
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  TESTIMONIALS.forEach(t => {
    grid.innerHTML += `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.avatar}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-date">📅 ${t.date}</div>
          </div>
        </div>
      </div>`;
  });
}

function renderShowcase() {
  const grid = document.getElementById('showcaseGrid');
  if (!grid) return;
  SHOWCASES.forEach(s => {
    grid.innerHTML += `
      <div class="showcase-item">
        <div class="showcase-thumb" style="background:${s.bg}">${s.emoji}</div>
        <h4>${s.name}</h4>
        <p>📅 ${s.date}</p>
      </div>`;
  });
}

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('open'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}

renderTemplates();
renderTestimonials();
renderShowcase();
