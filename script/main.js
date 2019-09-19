$(document).ready(function() {

function typeFileCheck(src) {
    let type = src.substr(5, 5);
    if(type == 'image') {
        return true
    }
    return false
}

function addImage(input) {
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
                  $('.label .far').hide();
                  $('.label').css('padding', '.9em');

                  //добавление мини версии
                  newimage = `<img src="${src}" class="image-file__added"></img>`
                  $('.image-add').append(newimage);

              }else{

                  $('.image-added-message__error').hide();
                  let newimage = `<img src="${src}" class="image-file__added"></img>`
                  $('.image-add').append(newimage);
                  $('.label .far').hide();
                  $('.label').css('padding', '.9em');

              }
          } else {
              $('.image-added-message__error').show();
          }
        }

        reader.readAsDataURL(input.files[0]);



        if($('.image-file__added').length == 5) {
            $('.form-group').hide();
            //$('.image-file__added:first-child').removeClass('image-file__added').addClass('image-file__added-global');
        }

    }else {
        $('.image-added-message__error-full').show();
        setTimeout(() => {$('.image-added-message__error-full').fadeOut(700)}, 6000);
    }
}




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
        addImage(this);
    }catch {

    }

    /* Это басня о том на кой #уй тута try
    * Короче если юзер ничего не добавит, и нажмет
    * отмену, то в классе FileReader, а конкретно в
    * методе readAsDataURL происходит ошибка и
    * "вываливается" в консоль, что выглядит
    * не эстетичненько и я заебашил суда try
    * так что ребята с telegrama не ебите мозг пж :)
    */

}); // end change



}); // end ready
