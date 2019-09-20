$(document).ready(function() {

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
                  let newimage = `<img src="${src}"></img>`
                  $('.image-file__added-global').append(newimage);
                  $('.form-group').hide();

                  //добавление мини версии
                  newImage = `<img src="${src}" class="image-file__added gallery-active"></img>`;

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
    }catch {

    }
}); // end change



}); // end ready
