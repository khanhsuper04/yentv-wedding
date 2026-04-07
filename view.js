// ===== VIEW PAGE =====
function buildCardHTML(d) {
  return `
    <div class="wc-decor top">${d.emoji || '🌸'} ✦ ${d.emoji || '🌸'}</div>
    <p class="wc-invite">Trân trọng kính mời</p>
    <h1 class="wc-names">${d.groom} & ${d.bride}</h1>
    <div class="wc-divider">— ♥ —</div>
    <p class="wc-date">📅 ${d.date}</p>
    <p class="wc-time">🕐 ${d.time}</p>
    <p class="wc-venue">📍 ${d.venue}</p>
    <p class="wc-message">${d.msg}</p>
    <div class="wc-decor bottom">🌺 ✦ 🌺</div>`;
}

function loadCard() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  setTimeout(() => {
    document.getElementById('viewLoading').style.display = 'none';
    const viewCard = document.getElementById('viewCard');

    if (!id) {
      viewCard.style.display = 'block';
      viewCard.innerHTML = `<div class="wedding-card theme-rose" style="max-width:420px;margin:0 auto;text-align:center">
        <p style="color:#999;padding:2rem">Không tìm thấy thiệp. <a href="create.html" style="color:#c0392b">Tạo thiệp mới →</a></p>
      </div>`;
      return;
    }

    const data = localStorage.getItem(id);
    if (!data) {
      viewCard.style.display = 'block';
      viewCard.innerHTML = `<div class="wedding-card theme-rose" style="max-width:420px;margin:0 auto;text-align:center">
        <p style="color:#999;padding:2rem">Thiệp không còn tồn tại hoặc đã hết hạn. <a href="create.html" style="color:#c0392b">Tạo thiệp mới →</a></p>
      </div>`;
      return;
    }

    const cardData = JSON.parse(data);
    viewCard.style.display = 'block';
    viewCard.innerHTML = `<div class="wedding-card ${cardData.theme || 'theme-rose'}" style="max-width:420px;margin:0 auto">${buildCardHTML(cardData)}</div>`;

    // Update page title
    document.title = `Thiệp cưới ${cardData.groom} & ${cardData.bride} - LoveCard`;
  }, 1200);
}

loadCard();
