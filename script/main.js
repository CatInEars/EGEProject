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

    reader.onload = function(e) {
      let src        = e.target.result;
      let imageCheck = typeFileCheck(src);
      if(imageCheck) {
          $('.image-added-massage__error').hide();
          let newimage = `<img src="${src}" class="image-file__added"></img>`
          $('.image-add').append(newimage);
      } else {
          $('.image-added-massage__error').show();
      }
    }

    reader.readAsDataURL(input.files[0]);
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
