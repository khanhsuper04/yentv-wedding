// ===== CREATE PAGE =====
let selectedTemplate = TEMPLATES[0];

function init() {
  const params = new URLSearchParams(window.location.search);
  const tid = parseInt(params.get('template'));
  if (tid) selectedTemplate = TEMPLATES.find(t => t.id === tid) || TEMPLATES[0];

  renderMiniTemplates();
  updatePreview();

  const d = new Date(); d.setDate(d.getDate() + 30);
  document.getElementById('weddingDate').value = d.toISOString().split('T')[0];
  document.getElementById('weddingTime').value = '18:00';
  updatePreview();
}

function renderMiniTemplates() {
  const container = document.getElementById('miniTemplates');
  TEMPLATES.forEach(t => {
    const div = document.createElement('div');
    div.className = 'mini-tpl' + (t.id === selectedTemplate.id ? ' selected' : '');
    div.style.background = t.preview_bg;
    div.style.border = `2px solid ${t.id === selectedTemplate.id ? t.preview_color : 'rgba(255,255,255,.1)'}`;
    div.innerHTML = `<span style="font-size:1.6rem">${t.emoji}</span><p style="color:${t.preview_color}">${t.name}</p>`;
    div.onclick = () => {
      selectedTemplate = t;
      document.querySelectorAll('.mini-tpl').forEach(el => {
        el.classList.remove('selected');
        el.style.border = '2px solid rgba(255,255,255,.1)';
      });
      div.classList.add('selected');
      div.style.border = `2px solid ${t.preview_color}`;
      updatePreview();
    };
    container.appendChild(div);
  });
}

function updatePreview() {
  const groom = document.getElementById('groomName')?.value || 'Chú Rể';
  const bride = document.getElementById('brideName')?.value || 'Cô Dâu';
  const dateVal = document.getElementById('weddingDate')?.value;
  const timeVal = document.getElementById('weddingTime')?.value || '18:00';
  const venue = document.getElementById('venue')?.value || 'Địa điểm tổ chức';

  const dateStr = dateVal
    ? new Date(dateVal).toLocaleDateString('vi-VN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : 'Ngày cưới';

  const t = selectedTemplate;
  const card = document.getElementById('cardPreview');
  card.style.background = t.preview_bg;
  card.style.border = `1px solid ${t.preview_color}33`;
  card.style.boxShadow = `0 20px 60px rgba(0,0,0,.5)`;
  card.innerHTML = `
    <div style="font-size:.9rem;letter-spacing:6px;color:${t.preview_color}44;margin-bottom:1rem">${t.emoji} ✦ ${t.emoji}</div>
    <p style="font-size:.62rem;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:.6rem">Trân trọng kính mời</p>
    <div style="font-family:'Playfair Display',serif;font-size:1.4rem;color:#fff;line-height:1.2;margin-bottom:.4rem">${groom}</div>
    <div style="font-size:.8rem;color:${t.preview_color}55;margin:.2rem 0;letter-spacing:3px">— & —</div>
    <div style="font-family:'Playfair Display',serif;font-size:1.4rem;color:${t.preview_color};font-style:italic;line-height:1.2;margin-bottom:.8rem">${bride}</div>
    <div style="height:1px;background:linear-gradient(90deg,transparent,${t.preview_color}44,transparent);margin:.8rem 0"></div>
    <div style="font-size:.78rem;color:rgba(255,255,255,.45);line-height:1.9">
      📅 ${dateStr}<br/>🕐 ${timeVal}<br/>📍 ${venue}
    </div>
    <div style="margin-top:1rem;font-size:.7rem;color:${t.preview_color}33;letter-spacing:4px">${t.emoji} ✦ ${t.emoji}</div>`;
}

function generateCard() {
  const groom = document.getElementById('groomName').value.trim() || 'Chú Rể';
  const bride = document.getElementById('brideName').value.trim() || 'Cô Dâu';
  const dateVal = document.getElementById('weddingDate').value;
  const timeVal = document.getElementById('weddingTime').value;
  const venue = document.getElementById('venue').value.trim() || 'Địa điểm tổ chức';
  const msg = document.getElementById('message').value.trim() || 'Sự hiện diện của bạn là món quà quý giá nhất với chúng tôi.';
  const dateStr = dateVal
    ? new Date(dateVal).toLocaleDateString('vi-VN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : 'Ngày cưới';

  const cardData = {
    groom, bride,
    date: dateStr,
    dateISO: dateVal ? `${dateVal}T${timeVal||'18:00'}:00` : '',
    time: timeVal,
    venue, msg,
    templateId: selectedTemplate.id,
    templateFile: selectedTemplate.file,
    emoji: selectedTemplate.emoji,
    previewBg: selectedTemplate.preview_bg,
    previewColor: selectedTemplate.preview_color,
  };
  const id = 'card_' + Date.now();
  localStorage.setItem(id, JSON.stringify(cardData));

  if (typeof saveCardToUser === 'function') saveCardToUser(id);

  // Build view URL pointing to the animated template
  const viewUrl = `${selectedTemplate.file}?id=${id}`;
  window._cardId = id;
  window._viewUrl = viewUrl;

  // Show modal
  const modal = document.getElementById('cardModal');
  document.getElementById('modalTemplateName').textContent = selectedTemplate.name;
  document.getElementById('modalNames').textContent = `${groom} & ${bride}`;
  document.getElementById('modalDate').textContent = dateStr;
  document.getElementById('modalEmoji').textContent = selectedTemplate.emoji;
  modal.style.display = 'flex';
}

function copyLink() {
  const url = `${window.location.origin}/${window._viewUrl}`;
  navigator.clipboard.writeText(url)
    .then(() => alert('✅ Đã sao chép link!\n\n' + url))
    .catch(() => prompt('Sao chép link:', url));
}
function openCard() {
  window.open(window._viewUrl, '_blank');
}
function shareZalo() {
  const url = encodeURIComponent(`${window.location.origin}/${window._viewUrl}`);
  window.open(`https://zalo.me/share?url=${url}`, '_blank');
}
function shareFacebook() {
  const url = encodeURIComponent(`${window.location.origin}/${window._viewUrl}`);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}
function closeModal() {
  document.getElementById('cardModal').style.display = 'none';
}

init();
