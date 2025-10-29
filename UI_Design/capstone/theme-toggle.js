const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});
