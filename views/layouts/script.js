const themeButton = document.getElementById('theme')

if (localStorage.getItem('theme') === 'dark')
    themeButton.checked = true
else
    themeButton.checked = false;

themeButton.addEventListener('click', () => {
    if (!themeButton.checked) {
        localStorage.setItem('theme', 'light')
    } else {
        localStorage.setItem('theme', 'dark')
    }
})