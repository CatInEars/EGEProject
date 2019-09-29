$(document).ready(function() {

function swipeDetector(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
    if (phase=="start"){
        // сработает в начале swipe
    }
    if (phase=="end"){
        //сработает через 20 пикселей то число которое выбрали в threshold
        if (direction == 'left') {
            //сработает при движении влево
            alert('left');
        }
        if (direction == 'right') {
            //сработает при движении вправо
            alert('ridht');
        }
        if (direction == 'up') {
            //сработает при движении вверх
            alert('up');
        }
        if (direction == 'down') {
            //сработает при движении вниз
            alert('down');
        }
    }
};

function formChecker(context) {

    let name = $('.modal-name').val();
    if (name.length == 0) {
        $('.name-value-error').show();
        $('.name-input').parent('.modal-cool-input').addClass('error-cool');
    } else {
        $('.name-value-error').hide();
    }


    let description = $('.modal-description').val();

    if (description.length == 0) {
        $('.description-error-hider').hide();
        $('.description-value-error').show();
        $('.modal-description').parent('.modal-cool-input').addClass('error-cool');
    } else if (description.length < 5 || description.length > 1000) {
        $('.description-error-hider').hide();
        $('.description-value-length-error').show();
    }


    let price = $('.modal-price').val();

    if(isNaN(price)) {
        $('.price-error_hider').hide();
        $('.price-type-error').show();
        $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
    } else {
        if (price.length == 0) {
            $('.price-error_hider').hide();
            $('.price-error').show();
            $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
        } else if (price > 1000000) {
            $('.price-error_hider').hide();
            $('.price-max-error').show();
            $('.modal-price').parent('.modal-cool-input').addClass('error-cool');
        }
    }

    if ($('.image-file__added').length == 0) {
        $('.image-added-message__error').hide();
        $('.image-added-message__error-submit').show();
        $('.label-global').addClass('error-cool');
        $('.label-global > .far, .label-global > span').css({color: 'red'});
        setTimeout(() => {$('.label-global > .far, .label-global > span').css({color: 'grey'})}, 500);
    }

    setTimeout(() => {$('.modal-cool-input, .label-global').removeClass('error-cool')}, 500);
} // end formChecker

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
              }else{

                  $('.image-added-message__error').hide();
                  let newImage = `<img src="${src}" class="image-file__added"></img>`
                  $('.image-add .label').before(newImage);
                  // прячем большую версию кнопки т отображаем мини
                  $('.form-group').hide();
                  $('.image-add .label').show();

              }
          } else {
              $('.image-added-message__error').show();
          }

          if($('.image-file__added').length == 6) {
              console.log('in if');
              $('.image-add .label').hide();
          }
        }

        reader.readAsDataURL(input.files[0]);



        if($('.image-file__added').length == 5) {
            console.log('in if');
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

    } else {
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


let $addModal      = $('.modal > .modal-body, .modal > .add-modal-bg');
    $productModal  = $('.modal > .product-modal, .modal > .product-modal-bg');

$('.add-button').click(function() {
    $addModal.show();

    $('body').css({
        overflow: 'hidden'
    }); // end css

}); // end click

$('.product-mini').click(function() {
    let thisId = $(this).attr('id');
    $(`.modal > .product-modal-id__${thisId}`).show();
    //console.log(`.modal > product-modal-id__${thisId}`);

    $('body').css({
        overflow: 'hidden'
    }); // end css
}); // end click

$('.modal-close').click(function() {
    $addModal.hide();
    $productModal.hide();
    $('.error-message-hider').hide();

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

let imgNumNow = 1;

$('.product-img-gallery > img').click(function() {

    if($(this).hasClass('clicked')) {
        return
    } else {
        $(this).addClass('clicked');
    }

    let imgCount        = $(this).parent('.product-img-gallery').children('img').length;
    let imgCountElement = $(this).parent('.product-img-gallery').children('.img-count');
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
        console.log(imgNumNow);
        //анимирую уход картинки
        $(this).animate({
            left: '-110%'
        }, 400, function() {
            $(this).removeClass('clicked');
        }); // end animate

        //анимирую "приход" картинки
        $(this).next('img').animate({
            left: 0,
            marginLeft: 0
        }, 400); // end animate

        imgCountElement.text(`${imgNumNow}/${imgCount}`);

    }/* else {
        imgNumNow--;
        console.log(imgNumNow);

        $(this).animate({
            left: '100%',
            marginLeft: '1.5em'
        }, 400, function() {
            $(this).removeClass('clicked');
        }); // end animate

        $(this).prev('img').animate({
            left: 0
        }, 400); // end animate

    }*/

}).stop(); // end click

$('body').swipe({
    swipeStatus: swipeDetector,
    triggerOnTouchEnd: false,
    threshold: 20 // сработает через 20 пикселей
});

}); // end ready
