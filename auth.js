// ===== AUTH SYSTEM (localStorage-based) =====
// In production, replace with real API calls

const DB_USERS = 'yentv_users';
const DB_SESSION = 'yentv_session';

// ---- Helpers ----
function getUsers() {
  return JSON.parse(localStorage.getItem(DB_USERS) || '[]');
}
function saveUsers(users) {
  localStorage.setItem(DB_USERS, JSON.stringify(users));
}
function getCurrentUser() {
  const id = localStorage.getItem(DB_SESSION);
  if (!id) return null;
  return getUsers().find(u => u.id === id) || null;
}
function setSession(userId) {
  localStorage.setItem(DB_SESSION, userId);
}
function clearSession() {
  localStorage.removeItem(DB_SESSION);
}

// ---- Register ----
function register({ name, email, phone, password }) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { error: 'Email này đã được đăng ký. Vui lòng đăng nhập.' };
  }
  const user = {
    id: 'u_' + Date.now(),
    name, email, phone,
    password: btoa(password), // basic encoding (not real hashing)
    createdAt: new Date().toISOString(),
    cards: []
  };
  users.push(user);
  saveUsers(users);
  setSession(user.id);
  return { success: true, user };
}

// ---- Login ----
function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return { error: 'Email không tồn tại.' };
  if (user.password !== btoa(password)) return { error: 'Mật khẩu không đúng.' };
  setSession(user.id);
  return { success: true, user };
}

// ---- Logout ----
function logout() {
  clearSession();
  window.location.href = 'index.html';
}

// ---- Update profile ----
function updateProfile({ name, phone, newPassword }) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === localStorage.getItem(DB_SESSION));
  if (idx === -1) return { error: 'Không tìm thấy tài khoản.' };
  users[idx].name = name;
  users[idx].phone = phone;
  if (newPassword && newPassword.length >= 6) {
    users[idx].password = btoa(newPassword);
  }
  saveUsers(users);
  return { success: true };
}

// ---- Save card to user ----
function saveCardToUser(cardId) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === localStorage.getItem(DB_SESSION));
  if (idx === -1) return;
  if (!users[idx].cards) users[idx].cards = [];
  if (!users[idx].cards.includes(cardId)) {
    users[idx].cards.push(cardId);
    saveUsers(users);
  }
}

// ---- Delete card ----
function deleteCard(cardId) {
  // Remove from user's card list
  const users = getUsers();
  const idx = users.findIndex(u => u.id === localStorage.getItem(DB_SESSION));
  if (idx !== -1) {
    users[idx].cards = (users[idx].cards || []).filter(id => id !== cardId);
    saveUsers(users);
  }
  // Remove card data
  localStorage.removeItem(cardId);
}

// ---- UI Helpers ----
function showError(msg) {
  const el = document.getElementById('authError');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}
function showSuccess(msg) {
  const el = document.getElementById('authSuccess');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}
function togglePwd(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁'; }
}

// ---- Auto update navbar ----
(function initNav() {
  const user = getCurrentUser();
  const navGuest = document.getElementById('navGuest');
  const navUser = document.getElementById('navUser');
  const navUsername = document.getElementById('navUsername');
  if (user) {
    if (navGuest) navGuest.style.display = 'none';
    if (navUser) navUser.style.display = 'flex';
    if (navUsername) navUsername.textContent = user.name.split(' ').pop();
  } else {
    if (navGuest) navGuest.style.display = 'flex';
    if (navUser) navUser.style.display = 'none';
  }
})();
