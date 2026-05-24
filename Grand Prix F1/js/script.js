function toggleInfo(el) {
    const escondido = el.parentElement.querySelector('.escondido');
    const isopen = escondido.classList.toggle('open')
    el.innerHTML = isopen ? 'Ler menos' : 'Ler mais';
}
    