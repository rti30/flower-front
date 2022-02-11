export default function (animate) {
    console.log("скролл загрузка");
    //* обеспечиваем короссбраузерноть для использования встроенного
    //* в браузеры API requestAnimationFrame
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    let items = document.querySelectorAll('.scrll'),

        // коллекция объектов DIV, до которых прокручивается страница
        containers = document.querySelectorAll('.to');
    let fixedNavHeight = 60;
    items = Array.prototype.slice.call(items); // Поддержка IE11
    containers = Array.prototype.slice.call(containers); // Поддержка IE11
    if (containers.length > 0 && items.length > 0) {
        items.forEach((item) => item.addEventListener('click', selectContainer))
    }
    function selectContainer(e) {
        for (let i = 0; i < containers.length; i++) {
            // Y-координата верхней границы выбранного элемента относительно
            // верхнего края окна браузера с учётом высоты шапки
            if (containers[i].dataset.scrll === e.target.dataset.scrll) {
                scrollGo(containers[i]);
                break;
            }
        }
    }
    function scrollGo(el) {
        // длительность прокручивания страницы
        let duration = 700;
        // старт анимации прокручивания страницы
        // let deferentScroll = Math.abs(pageHeight - el.getBoundingClientRect().top);
        // let result = el.getBoundingClientRect().top + fixedNavHeight;

        animate({
            duration: duration,
            timing: makeEaseOut(quad),
            draw(progress) {
                // if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
                window.scrollBy(0, (el.getBoundingClientRect().top - fixedNavHeight) * progress);
                // }
            }
        });
    }
}

function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}
function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}
//*==================================