document.querySelector('.menu-button').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('active');
});

document.querySelector('.close-menu').addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('active');
});
