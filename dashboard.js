// ===== DASHBOARD =====

function initDashboard() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Fill user info
  document.getElementById('dashName').textContent = user.name;
  document.getElementById('dashEmail').textContent = user.email;
  document.getElementById('dashAvatar').textContent = user.name.charAt(0).toUpperCase();

  // Profile tab
  document.getElementById('profileName').value = user.name;
  document.getElementById('profileEmail').value = user.email;
  document.getElementById('profilePhone').value = user.phone || '';

  // Stats
  const cards = user.cards || [];
  document.getElementById('statCards').textContent = cards.length;
  document.getElementById('statViews').textContent = cards.length * Math.floor(Math.random() * 20 + 5);
  const days = Math.floor((Date.now() - new Date(user.createdAt)) / 86400000);
  document.getElementById('statDays').textContent = days || 1;

  renderMyCards(user);
}

function renderMyCards(user) {
  const cards = user.cards || [];
  const grid = document.getElementById('myCardsGrid');
  const empty = document.getElementById('noCards');

  if (cards.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  grid.innerHTML = '';
  cards.forEach(cardId => {
    const raw = localStorage.getItem(cardId);
    if (!raw) return;
    const d = JSON.parse(raw);
    const viewUrl = `view.html?id=${cardId}`;
    grid.innerHTML += `
      <div class="my-card-item">
        <div class="my-card-preview wedding-card ${d.theme || 'theme-rose'}">
          <p class="wc-invite" style="font-size:.65rem">Trân trọng kính mời</p>
          <h3 class="wc-names" style="font-size:1rem">${d.groom} & ${d.bride}</h3>
          <p class="wc-date" style="font-size:.75rem">📅 ${d.date}</p>
        </div>
        <div class="my-card-info">
          <h4>${d.groom} & ${d.bride}</h4>
          <p>📅 ${d.date} &nbsp;|&nbsp; 📍 ${d.venue}</p>
          <div class="my-card-actions">
            <a href="${viewUrl}" target="_blank" class="btn-sm">👁 Xem</a>
            <button class="btn-sm" onclick="copyCardLink('${cardId}')">📋 Sao chép link</button>
            <button class="btn-sm btn-danger" onclick="confirmDelete('${cardId}')">🗑 Xoá</button>
          </div>
        </div>
      </div>`;
  });
}

function showTab(name, el) {
  document.querySelectorAll('.dash-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.dash-nav-item').forEach(a => a.classList.remove('active'));
  document.getElementById('tab-' + name).style.display = 'block';
  el.classList.add('active');
  return false;
}

function saveProfile() {
  const name = document.getElementById('profileName').value.trim();
  const phone = document.getElementById('profilePhone').value.trim();
  const newPwd = document.getElementById('profileNewPwd').value;
  const result = updateProfile({ name, phone, newPassword: newPwd });
  const msg = document.getElementById('profileMsg');
  if (result.error) { msg.style.color = '#c0392b'; msg.textContent = result.error; }
  else { msg.style.color = '#2e7d32'; msg.textContent = '✅ Đã lưu thay đổi!'; }
  setTimeout(() => msg.textContent = '', 3000);
}

function copyCardLink(cardId) {
  const url = `${window.location.origin}/view.html?id=${cardId}`;
  navigator.clipboard.writeText(url).then(() => alert('✅ Đã sao chép link!\n' + url))
    .catch(() => prompt('Sao chép link:', url));
}

function confirmDelete(cardId) {
  if (confirm('Bạn có chắc muốn xoá thiệp này không?')) {
    deleteCard(cardId);
    location.reload();
  }
}

initDashboard();
