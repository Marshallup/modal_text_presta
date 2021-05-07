if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

    console.log('mobile');



    $(document).ready(function () {

        initActionModalText('.block', 'Текст модального окна1', 50, 1000, 400);
    });
    
    // Коориданты картинок
    function getCoordsElem($elem) {
    
        const arrCoords = [];
        $elem.each(function(_,item) {
    
            const $itm = $(item);
            const top = Math.round($itm.position().top);
            const left = Math.round($itm.position().left);
            const bot = Math.round($itm.position().top + $itm.outerHeight());
            arrCoords.push(
                {
                    top: top,
                    left: left,
                    bot: bot,
                    el: $itm
                }
            );
        });
    
        return arrCoords;
    };
    
    // Показ текста или удаление
    function textImgModalAction($text, el, idx, arr) {
    
        let modalImgDesc = $('.modal-img-desc');
        if ($text) {
            if(modalImgDesc.length < 1) {
                $('body').append('<div data-idx="' + idx + '" class="modal-img-desc">' + $text + '</div>');
                modalImgDescApp = $('.modal-img-desc');
                const posModal = {
                    top: el.top + Math.round(el.el.outerHeight() / 2) - Math.round(modalImgDescApp.outerHeight() / 2),
                    left: el.left + Math.round(el.el.outerWidth() / 2) - Math.round(modalImgDescApp.outerWidth() / 2)
                };
                modalImgDescApp.css('top', posModal.top);
                modalImgDescApp.css('left', posModal.left);
            }
        } else {
            modalImgDesc.remove();
        }
    };
    
    // Установить положение модального окна
    function setPosModal(selector, arr) {
        const elModal = $(selector);
        const idxEl = elModal.data('idx');
        const el = arr[idxEl];
    
        const posModal = {
            top: el.top + Math.round(el.el.outerHeight() / 2) - Math.round(elModal.outerHeight() / 2),
            left: el.left + Math.round(el.el.outerWidth() / 2) - Math.round(elModal.outerWidth() / 2)
        };
    
        elModal.css('top', posModal.top);
        elModal.css('left', posModal.left);
    };
    
    // Функция инициализатор
    
    function initActionModalText(selector, text, paddingTop = 0, time = 1000, dur = 400)
    {
        const windowEl = $(window);
        let arrImgCoords = getCoordsElem($(selector));
        let timer;
        let event = false;
    
        function action() {
            const windowTop = window.pageYOffset;
            const countElems = arrImgCoords.length;
            clearTimeout(timer);
    
            textImgModalAction();
    
            $.each(arrImgCoords, function(idx, itm) {
    
                if (itm.top <= windowTop + paddingTop && itm.bot >= windowTop) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
    
                        $('html,body').animate({
                            scrollTop: itm.top - paddingTop
                        }, dur, function () {
                            textImgModalAction(text, itm, idx, arrImgCoords);
                        })
                    }, time)
    
                    // const partElem = itm.el.outerHeight() / 2;
                    // if (partElem + windowTop > itm.bot ) {
    
                    //     const nextElemIdx = idx + 1;
                    //     if (countElems > nextElemIdx) {
                    //         const nextEl = arrImgCoords[nextElemIdx];
    
                    //         clearTimeout(timer);
                    //         textImgModalAction();
                    //         timer = setTimeout(function () {
                    //             $('html,body').animate({
                    //                 scrollTop: nextEl.top
                    //             }, 400, function () {
                    //                 console.log('1')
                    //                 textImgModalAction('Текст модального окна1 sad asd as da sd a', nextEl, nextElemIdx, arrImgCoords);
                    //             })
                    //         }, 1000)
                    //     }
    
                    // }
                }
    
            })
        };
    
        checkSizeWindow();
    
        windowEl.resize(function() {
            checkSizeWindow();
        })
    
    
        // Размер окна
        function checkSizeWindow() {
            textImgModalAction();
            if (windowEl.width() <= 479) {
                arrImgCoords = getCoordsElem($(selector));
                action();
                if (!event) {
                    windowEl.scroll(action);
                }
                event = true;
            } else {
                if (event) {
                    windowEl.unbind('scroll', action);
                }
                clearTimeout(timer);
                textImgModalAction();
                event = false;
            }
        };
    }


}