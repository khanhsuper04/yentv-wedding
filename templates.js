// ===== TEMPLATES PAGE =====
function renderAllTemplates(filter) {
  const grid = document.getElementById('allTemplatesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = filter === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.tier === filter);
  filtered.forEach(t => {
    grid.innerHTML += `
      <div class="template-card" onclick="window.location='create.html?template=${t.id}'">
        <div class="template-thumb" style="background:${t.preview_bg};height:300px">
          <span class="template-badge badge-premium">Premium</span>
          <div class="template-thumb-inner">
            <span class="t-emoji" style="font-size:3.5rem">${t.emoji}</span>
            <span class="t-name" style="color:${t.preview_color};font-size:1rem">${t.name}</span>
            <span class="t-names" style="color:rgba(255,255,255,.35);font-size:.75rem">${t.desc}</span>
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

function filterTemplates(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAllTemplates(filter);
}

renderAllTemplates('all');
