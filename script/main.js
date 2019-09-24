$(document).ready(function() {

function typeFileCheck(src) {
    let type = src.substr(5, 5);
    if(type == 'image') {
        return true
    }
    return false
}

let image_add_status = false;

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
                  let newimage = `<img src="${src}"></img>`
                  $('.image-file__added-global').append(newimage);
                  $('.form-group').hide();

                  //добавление мини версии
                  newImage = `<img src="${src}" class="image-file__added gallery-active"></img>`;

                  image_add_status = true;
                  $('.image-added-message__error-submit').hide();
                  $('.image-added-message__error').hide();
                  $('.image-added-message__error-full').hide();

                  // прячем большую версию кнопки т отображаем мини
                  $('.image-add .label').before(newImage);
                  $('.image-add .label').show();
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

$(document).on('click', '.image-file__added',function() {
    let $src = $(this).attr('src');
    $('.image-file__added-global img').attr('src', $src);
    $('.gallery-active').removeClass('gallery-active');
    $(this).addClass('gallery-active');
}); // end click


let $modal = $('.modal > .modal-body, .modal > .add-modal-bg');

$('.add-button').click(function() {
    $modal.show();

    $('body').css({
        overflow: 'hidden'
    }); // end css

}); // end click

$('.modal-close').click(function() {
    $modal.hide();

    $('body').css({
        overflow: 'auto'
    }); // end css

}); // end click

$('.add-modal-bg').click(function() {
    $modal.hide();
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


$('form').submit(function(e) {
    e.preventDefault();
    let name = $('.modal-name').val();
    if (name.length == 0) {
        $('.name-value-error').show();
    } else {
        $('.name-value-error').hide();
    }


    let description = $('.modal-description').val();

    if (description.length == 0) {
        $('.description-value-error').show();
        $('.description-value-length-error').hide();
    } else if (description.length < 5 || description.length > 150) {
        $('.description-value-error').hide();
        $('.description-value-length-error').show();
    }


    let price = $('.modal-price').val();

    if(isNaN(price)) {
        $('.price-type-error').show();
        $('.price-max-error').hide();
        $('.price-error').hide();
    } else {
        if (price.length == 0) {
            $('.price-error').show();
            $('.price-max-error').hide();
        } else if (price > 1000000) {
            $('.price-error').hide();
            $('.price-max-error').show();
        }
    }

    if (!image_add_status) {
        $('.image-added-message__error-submit').show();
    }
}); // end submit

}); // end ready
