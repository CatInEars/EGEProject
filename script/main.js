$(document).ready(function() {

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function isInteger(num) {
  return (num ^ 0) === num;
}

function swipeDetector(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
    if (phase=="end"){
        //сработает через 20 пикселей то число которое выбрали в threshold
        if (direction == 'left') {
            //сработает при движении влево
            return 'left'
        }
        if (direction == 'right') {
            //сработает при движении вправо
            return 'right'
        }
        if (direction == 'up') {
            //сработает при движении вверх
            return 'up'
        }
        if (direction == 'down') {
            //сработает при движении вниз
            return 'down'
        }
    }
}

function formChecker(context) {

    let errorHave = false;

    let name = $('.modal-name').val();
    if (name.length == 0) {
        $('.name-value-error').show();
        $('.name-input').parent('.modal-cool-input').addClass('error-cool');
        errorHave = true;
    }else if(name.length < 3 || name.length >= 30){
        $('.name-error_hider').hide();
        $('.name-length-error').show();
        $('.name-input').parent('.modal-cool-input').addClass('error-cool');
        errorHave = true;
    } else {
        $('.name-value-error').hide();
    }


    let description = $('.modal-description').val();

    if (description.length == 0) {
        $('.description-error-hider').hide();
        $('.description-value-error').show();
        $('.modal-description').parent('.modal-cool-input').addClass('error-cool');
        errorHave = true;
    } else if (description.length < 5 || description.length > 1000) {
        $('.description-error-hider').hide();
        $('.description-value-length-error').show();
        errorHave = true;
    }


    let price = $('.modal-price').val();

    if(isNaN(price)) {
        $('.price-error_hider').hide();
        $('.price-type-error').show();
        $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
        errorHave = true;
    } else {
        if (price.length == 0) {
            $('.price-error_hider').hide();
            $('.price-error').show();
            $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
            errorHave = true;
        } else if (price > 1000000) {
            $('.price-error_hider').hide();
            $('.price-max-error').show();
            $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
            errorHave = true;
        } else if(String(price).length > 7) {
            $('.price-error_hider').hide();
            $('.price-type-error').show();
            $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
            errorHave = true;
        } else if(!isInteger(+price)) {
            $('.price-error_hider').hide();
            $('.price-integer-error').show();
            $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
            errorHave = true;
        }
    }

    console.log(isInteger(+price));

    if ($('.image-file__added').length == 0) {
        $('.image-added-message__error').hide();
        $('.image-added-message__error-submit').show();
        errorHave = true;
        $('.label-global').addClass('error-cool');
        $('.label-global > .far, .label-global > span').css({color: 'red'});
        setTimeout(() => {$('.label-global > .far, .label-global > span').css({color: 'grey'})}, 500);
    }

    if(!!errorHave) {
        setTimeout(() => {$('.modal-cool-input, .label-global').removeClass('error-cool')}, 500);
    } else {
        productAdd()
    }
} // end formChecker

function productAdd() {

    let id = getRandomInt(1, 10000);
    while (productId.indexOf(id) != -1) {
        num = getRandomInt(1, 10000);
    }
    productId.push(id);

    let miniClone  = $('.products-mini > .product-mini-id__228').clone(true);
    let modalClone = $('.modal:first-child').clone();

    miniClone.removeClass('product-mini-id__228').addClass(`product-mini-id__${id}`).attr('id', id);

    $('.products-mini').append(miniClone);

    // image

    let image = $('.image-add > img').clone().removeClass('image-file__added gallery-active');
    let imgSrc = image.attr('src');
    $(`.product-mini-id__${id}`).children('img').attr('src', imgSrc);

    // name
    let name = $('.name-input').val();
    $(`.product-mini-id__${id} .product-mini-name`).text(name);

    // price
    let price = $('.modal-price').val();
    price = price.replace(/^0+/, '');
    $(`.product-mini-id__${id} > .product-mini-price`).text(`${price}$`);


    // modal version

    modalClone.children('.product-modal').removeClass('product-modal-id__228').addClass(`product-modal-id__${id}`).attr('id', id);
    $('.products-modal').append(modalClone);
    $(`product-modal-id__${id}`).append('<div class="add-modal-bg product-modal-bg"></div>');

    // name
    $(`.product-modal-id__${id} > .product-modal-name`).text(name);
    // price
    $(`.product-modal-id__${id} > .product-modal-price`).text(`${price}$`);
    // description
    let description = $('.modal-description').val();
    var lines = description.split("\n");
    $(`.product-modal-id__${id} > .product-modal-description`).html(lines.join("<br/>"));

    // image
    let imageLength = $('.image-add > img').length;
    if (imageLength == 1) {
        $(`.product-modal-id__${id} > .product-img-gallery > img`).remove();
        let thisImgSrc = $('.image-add > img').attr('src');
        $(`.product-modal-id__${id} > .product-img-gallery`).prepend(`<img src="${thisImgSrc}" class="product-modal-img-banner" id="banner">`);
    } else {
        let $thisSrc = [];
        $('.image-add > img').each(function() {
            $thisSrc.push($(this).attr('src'));
        }); // end each

        $(`.product-modal-id__${id} > .product-img-gallery > img`).remove();

        for(let i = 0; i < $thisSrc.length; i++) {
            if(i == 0) {
                $(`.product-modal-id__${id} > .product-img-gallery`).prepend(`<img src="${$thisSrc[i]}" class="product-modal-img-banner" id="banner">`);
            } else if(i == 1){
                $(`.product-modal-id__${id} > .product-img-gallery > img`).after(`<img src="${$thisSrc[i]}" class="product-modal-img-banner" id="banner">`);
            } else {
                $(`.product-modal-id__${id} > .product-img-gallery img:last-of-type`).after(`<img src="${$thisSrc[i]}" class="product-modal-img-banner" id="banner">`);
            }
        }
    }

    // add swipe
    $(`.product-modal-id__${id} .product-img-gallery > img`).swipe(swipeOBj).stop();

    $(`.product-modal-id__${id} .product-img-gallery > .img-count`).html(`<span class="imgNumNow">1</span>/${imageLength}`);

    // modal-add clear
    $('.modal-close').click();
    $('.modal-cool-input__dollar').hide();
    $('.image-add > img, .image-file__added-global > img').remove();
    $('.image-file__added-global').css('border', 'none').addClass('clear');
    $('.delete-image, .image-add .label').hide();
    $('.add-form input, .add-form textarea').val('').removeClass('modal-name_filled');

    $('.form-group').show();
    $('.form-submit').css('background-color', 'grey');

    //push-modal
    $('.product-add__compleate').animate({marginBottom: 0}, 450);
    let line = $('.product-add__compleate > .progress-line');
    let lineAnimate = new Promise(function(resolve, reject) {
        line.animate({
            marginLeft: '-100%'
        }, 3500, () => resolve()); // end animate
    });
    lineAnimate
    .then(() => {
        $('.product-add__compleate').animate({
            marginBottom: '-100px'
        }, 450, () => line.css('margin-left', '0'));
    });

    $('.product-add__compleate > .cancel-button').click(function() {
        $('.product-add__compleate').animate({
            marginBottom: '-100px'
        }, 450);
        $(`.products-modal > .modal:last-child`).fadeOut(250, function() {
            $(this).remove();
        });
        $(`.product-mini:last-child`).fadeOut(250, function() {
            $(this).remove();
        });

        productId.splice(productId.length - 1);
    }); // end click

}

function typeFileCheck(src) {
    let type = src.substr(5, 5);
    if(type == 'image') {
        return true
    }
    return false
}

function imageGallery(input) {
    let reader = new FileReader();

    if($('.image-file__added').length != 6) {

        reader.onload = function(e) {
          let src        = e.target.result;
          let imageCheck = typeFileCheck(src);
          if(imageCheck) {
              if($('.image-file__added-global').hasClass('clear')) {

                  $('.image-file__added-global').removeClass('clear');

                  // добавление глобал версии
                  $('.image-added-message__error').hide();
                  let newimage = `<img src="${src}"></img>`;
                  $('.image-file__added-global').css('border-bottom', '2px solid grey')
                  $('.image-file__added-global').append(newimage);
                  $('.form-group').hide();

                  //добавление мини версии
                  newImage = `<img src="${src}" class="image-file__added gallery-active"></img>`;

                  $('.image-added-message__error-submit').hide();
                  $('.image-added-message__error').hide();
                  $('.image-added-message__error-full').hide();

                  // прячем большую версию кнопки и отображаем мини
                  $('.image-add .label').before(newImage);
                  $('.image-add .label').show();

                  // отображаем кнопку удаления
                  $('.delete-image').show();

                  let descriptionLength = $('.modal-body textarea').val().length;
                  if ($('.image-file__added').length != 0 && $('.modal-body input[type=text]').val().length >= 3 && $('.modal-body input[type=text]').val().length < 30 && $('.modal-body input[type=number]').val().length != 0 && descriptionLength >= 5 && isInteger(+($('.modal-body input[type=number]').val()))) {
                      $('.form-submit').css({backgroundColor: '#1F85DE', transition: '.5s'});
                  } else {
                      $('.form-submit').css('background-color', 'grey');
                  }

              } else{

                  $('.image-added-message__error').hide();
                  let newImage = `<img src="${src}" class="image-file__added"></img>`
                  $('.image-add .label').before(newImage);
                  // прячем большую версию кнопки и отображаем мини
                  $('.form-group').hide();
                  $('.image-add .label').show();

              }
          } else {
              $('.image-error__hider').hide();
              $('.image-added-message__error').show();
          }

          if($('.image-file__added').length == 6) {
              console.log('in if');
              $('.image-add .label').hide();
          }
        }

        reader.readAsDataURL(input.files[0]);



        if($('.image-file__added').length == 5) {
            setTimeout(() => {$('.image-add .label').hide()}, 10);
        }

    }else {
        $('.image-added-message__error-full').show();
        setTimeout(() => {$('.image-added-message__error-full').fadeOut(700)}, 6000);
    }

}

function deleteImage() {
    if($('.image-file__added').length == 1) {

        // прячем всё ненужное
        $('.image-file__added-global img').remove();
        $('.image-file__added-global').css('border', 'none').addClass('clear');
        $('.gallery-active').remove();
        $('.image-add .label').hide();
        $('.delete-image').hide();

        // отображаем нужное)
        $('.form-group').show();

         $('.form-submit').css('background-color', 'grey');

    }else {
        if($('.image-file__added').length == 6) {
            $('.image-add .label').show();
        }

        if(!!($('.gallery-active').next('img').length)) {
            let nextImg = $('.gallery-active').next('img');
            $('.gallery-active').remove();
            $('.image-file__added-global img').attr('src', nextImg.attr('src'))
            nextImg.addClass('gallery-active');
        } else {
            let prevImg = $('.gallery-active').prev('img');
            $('.gallery-active').remove();
            $('.image-file__added-global img').attr('src', prevImg.attr('src'))
            prevImg.addClass('gallery-active');
        }
    }
}


let productId = [
    913, 1337, 228
]; // Я закинул айдишники товаров которые добавил сам



$(document).on('click', '.image-file__added',function() {
    let $src = $(this).attr('src');
    $('.image-file__added-global img').attr('src', $src);
    $('.gallery-active').removeClass('gallery-active');
    $(this).addClass('gallery-active');
}); // end click

$('input, textarea').keyup(function() {
    let descriptionLength = $('.modal-body textarea').val().length;
    if ($('.image-file__added').length != 0 && $('.modal-body input[type=text]').val().length >= 3 && $('.modal-body input[type=text]').val().length < 30 && $('.modal-body input[type=number]').val().length != 0 && descriptionLength >= 5 && isInteger(+($('.modal-body input[type=number]').val()))) {
        $('.form-submit').css({backgroundColor: '#1F85DE', transition: '.5s'});
    } else {
        $('.form-submit').css('background-color', 'grey');
    }
});


let $addModal      = $('.modal > .modal-body, .modal > .add-modal-bg');

$('.add-button').click(function() {
    $addModal.show();

    $('body').css({
        overflow: 'hidden'
    }); // end css

}); // end click

let inBasket = false;

$(document).on('click', '.product-mini',function() {
    let thisId = $(this).attr('id');
    $(`.modal > .product-modal-id__${thisId}`).show();
    if(inBasket) $('.basket-modal').hide();

    $('body').css({
        overflow: 'hidden'
    }); // end css
}); // end click

$(document).on('click', '.modal-close', function() {
    $addModal.hide();
    $('.modal > .basket-modal').hide();
    let $productModal  = $('.modal > .product-modal, .modal > .product-modal-bg');
    $productModal.hide();
    $('.error-message-hider').hide();

    if(inBasket) {
        $('.basket-modal').show();
    }

    $('body').css({
        overflow: 'auto'
    }); // end css

}); // end click

$('.add-modal-bg').click(function() {
    $addModal.hide();
}); // end click

$('.modal-name, .modal-description').on('input', function(){
    var $this = $(this);
    if ($this.val() == '') {
        $this.removeClass('modal-name_filled');
    } else {
        $this.addClass('modal-name_filled');
    }
}); // end on

$('.modal-price').focus(function() {
    $('.modal-cool-input__dollar').show();
}); // end focus

$('.modal-price').blur(function() {
    if($(this).val() == '') {
        $('.modal-cool-input__dollar').hide();
    }else {
        $('.modal-cool-input__dollar').show();
    }
}); // end blur

$('.modal-price').keydown(function(e){
    if (e.key === "." || e.key === "," || e.key === "-") e.preventDefault();
}); // end keydown

$('.file-input').change(function(event) {
    try{
        imageGallery(this);
    }catch (e){

    }
}); // end change


$('.form-submit').click(function(e) {
    e.preventDefault();
    formChecker($(this));
}); // end submit

$('.modal-name').change(function() {
    $('.name-value-error').hide();
});

$('.modal-description').change(function() {
    $('.description-error-hider').hide();
});

$('.modal-price').change(function() {
    $('.price-error_hider').hide();
});

$('.delete-image').click(deleteImage);

let swipeOBj = {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {


        let imgNumNow       = +($(this).parent('.product-img-gallery').children('.img-count').children('.imgNumNow').text());
        let imgCount        = $(this).parent('.product-img-gallery').children('img').length;
        let imgCountElement = $(this).parent('.product-img-gallery').children('.img-count').children('.imgNumNow');

        if(imgCount == 1) {
            if(direction == 'left') {
                $(this).addClass('clicked').animate({
                    marginLeft: '-1.2em'
                }, 100);

                $(this).animate({
                    marginLeft: 0
                }, 100, function() {
                    $(this).removeClass('clicked');
                });
            } else if (direction == 'right') {
                $(this).addClass('clicked').animate({
                    marginLeft: '1.2em'
                }, 100);

                $(this).animate({
                    marginLeft: 0
                }, 100, function() {
                    $(this).removeClass('clicked');
                });
            }

            return
        }

        if(direction == 'left') {

            if($(this).hasClass('clicked')) {
                return
            } else {
                $(this).addClass('clicked');
            }

            if(imgNumNow == imgCount) {
                $(this).animate({
                    marginLeft: '-1.2em'
                }, 100);

                $(this).animate({
                    marginLeft: 0
                }, 100, function() {
                    $(this).removeClass('clicked');
                });

            }else if(imgNumNow < imgCount) {

                imgNumNow++;
                //анимирую уход картинки
                $(this).animate({
                    left: '-110%'
                }, 250, function() {
                    $(this).removeClass('clicked');
                }); // end animate

                //анимирую "приход" картинки
                $(this).next('img').addClass('clicked').animate({
                    left: 0,
                    marginLeft: 0
                }, 250, function() {
                    $(this).removeClass('clicked');
                }); // end animate

                imgCountElement.text(`${imgNumNow}`);

            }
        } else if (direction == 'right') {

            if($(this).hasClass('clicked')) {
                return
            } else {
                $(this).addClass('clicked');
            }

            if(imgNumNow == 1) {
                $(this).animate({
                    marginLeft: '1.2em'
                }, 100);

                $(this).animate({
                    marginLeft: 0
                }, 100, function() {
                    $(this).removeClass('clicked');
                });

            }else if(imgNumNow <= imgCount) {

                imgNumNow--;
                //анимирую уход картинки
                $(this).animate({
                    left: '110%'
                }, 250, function() {
                    $(this).removeClass('clicked');
                }); // end animate

                //анимирую "приход" картинки
                $(this).prev('img').addClass('clicked').animate({
                    left: 0,
                    marginLeft: 0
                }, 250, function() {
                    $(this).removeClass('clicked');
                }); // end animate

                imgCountElement.text(`${imgNumNow}`);

            }

        }


    },
    triggerOnTouchEnd:false,
    threshold:20 // сработает через 20 пикселей
};

$('.product-img-gallery > img').swipe(swipeOBj).stop(); // end swipe

$('.basket').click(function() {
    $('.basket-modal').show();
    inBasket = true;
}); // end click

$('.basket-modal > .modal-close').click(function() {
    inBasket = false;
}); // end click

$(document).on('click', '.add-basket', function() {
    if(!$(this).hasClass('remove-the-basket')) {
        let parentBlockId = $(this).parent('.product-modal').attr('id');
        let clone = $(`.products > .products-mini > .product-mini-id__${parentBlockId}`).clone(true);
        let price = clone.children('.product-mini-price').text();
        price = price.slice(0, price.length - 1);
        $('.basket-modal > .basket-products-mini').append(clone);

        $('.buy').show();

        // product-summ show
        $('.product-summ').show();
        let basketPrice = $('.product-summ-num').text();
        basketPrice = basketPrice.slice(0, basketPrice.length - 1);
        basketPrice = +basketPrice + +price
        $('.product-summ-num').text(`${basketPrice}$`);

        $('.modal-close').click();
        $('.basket-product-none').hide();

        $('.basket-count').show();

        $(this).text('Удалить из корзины').removeClass('add-basket').addClass('remove-the-basket');

        // modal-push
        $('.product-basket__compleate').stop().animate({marginBottom: 0}, 450);
        let line = $('.product-basket__compleate > .progress-line');
        line.css('margin-left', '0');

        $('.product-basket__compleate > .cancel-button').click(function() {
            $(`.product-modal-id__${parentBlockId} > .remove-the-basket`).text('Добавить в корзину').removeClass('remove-the-basket').addClass('add-basket');
            $('.product-basket__compleate').stop().animate({
                marginBottom: '-100px'
            }, 450);
            $('.basket-products-mini > .product-mini:last-child').fadeOut(150, function() {
                $(this).remove();

                if($('.basket-products-mini > .product-mini').length == 0) {
                    $('.buy').hide();
                    $('.product-summ').hide();
                    $('.product-summ-num').text(`0$`);
                    $('.basket-product-none').show();
                    $('.basket-count').fadeOut(250);
                } else {
                    $('.product-summ-num').text(`${+basketPrice - +price}$`);
                }
            }); // end fadeOut

        }); // end click

        let lineAnimate = new Promise(function(resolve, reject) {
            line.stop().animate({
                marginLeft: '-100%'
            }, 3500, () => resolve()); // end animate
        });
        lineAnimate
        .then(() => {
            $('.product-basket__compleate').animate({
                marginBottom: '-100px'
            }, 450, () => line.css('margin-left', '0'));
            $('.product-basket__compleate > .cancel-button').unbind('click');
        });
    }
}); // end on

$(document).on('click', '.remove-the-basket', function() {
    let basketPrice = $('.product-summ-num').text();
    let price = $(this).siblings('.product-modal-price').text();
    price = price.slice(0, price.length - 1);
    price = +price;

    basketPrice = basketPrice.slice(0, basketPrice.length - 1);
    basketPrice = +basketPrice;


    let parentBlockId = $(this).parent('.product-modal').attr('id');

    $(`.basket-products-mini > .product-mini-id__${parentBlockId}`).remove();

    if($('.basket-products-mini > .product-mini').length == 0) {
        $('.buy').hide();
        $('.product-summ').hide();
        $('.product-summ-num').text(`0$`);
        $('.basket-product-none').show();
        $('.basket-count').fadeOut(250);
    } else {
        $('.product-summ-num').text(`${+basketPrice - +price}$`);
    }
    $(this).removeClass('remove-the-basket').addClass('add-basket').text('Добавить в корзину');


}); // end on

$('.buy').click(function() {
    $('body > *').remove();
    $('body').css('height', '8000px');
    $('body').append(`<div class="bi-eggs">
        <h1>Ы?</h1>
        <p class="down">↓</p>
        <p class="hi">Hi from zelebombo</p>
    </div>`);

    $('.bi-eggs').fadeIn(500);
});

}); // end ready
