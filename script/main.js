$(document).ready(function() {

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
    } else if (description.length < 5 || description.length > 150) {
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
        $('.image-file__added-global').css('border', 'none');
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

}); // end ready
