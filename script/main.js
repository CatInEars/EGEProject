$(document).ready(function() {

function addImage(input) {
    let reader = new FileReader();

    reader.onload = function(e) {
      let src      = e.target.result;
      let newimage = `<img src="${src}" class="image-file__added"></img>`
      $('.image-add').append(newimage);
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
    addImage(this);
}); // end change

}); // end ready
