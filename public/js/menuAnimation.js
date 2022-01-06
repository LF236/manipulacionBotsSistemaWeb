document.addEventListener('DOMContentLoaded', () => {
    const iconMenuOpen = document.getElementById('icon-menu-open');
    const iconMenuClose = document.getElementById('icon-menu-close');
    const menu = document.getElementById('menu');
    iconMenuOpen.addEventListener('click', () => {
        menu.classList.add('openMenu');
    })

    iconMenuClose.addEventListener('click', ()=> {
        menu.classList.remove('openMenu');
    })
})