$(document).ready(function(){

  //add new ticket
  $(document.getElementsByClassName('add-ticket')).click(function(e){
    e.preventDefault();
    var sectionId;
    var eventTarget = $(event.target);
    if(event.target.tagName.toLowerCase() == 'i'){
      sectionId = eventTarget.parent().parent().attr('id');
    }
    else{
      sectionId = eventTarget.parent().attr('id');
    }
    $.ajax({
        method: 'POST',
        url: '/vtb/addTicket/section='+sectionId,
        contentType: 'text/plain',
        success: function(res){
          //update information on front-end
          location.reload();
        }
      });
  });

  $(document.getElementById('add-section')).click(function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/vtb/addSection',
        contentType: 'text/plain',
        success: function(res){
          //update information on front-end
          location.reload();
        }
      });
  });

  $(document.getElementsByClassName('close-section')).click(function(e){
    e.preventDefault();
    var sectionId;
    var eventTarget = $(event.target);
    if(event.target.tagName.toLowerCase() == 'i'){
      sectionId = eventTarget.parent().parent().parent().attr('id');
    }
    else{
      sectionId = eventTarget.parent().parent().attr('id');
    }
    // alert(ticketId);

    $.ajax({
      type: 'DELETE',
      url: '/vtb/removeSection/section=' + sectionId,
      contentType: 'text/plain',
      success: function(res){
        location.reload();
      }
    });
  });

  $(document.getElementsByClassName('close-ticket')).click(function(e){
    e.preventDefault();
    var ticketId;
    var sectionId;
    var eventTarget = $(event.target);
    if(event.target.tagName.toLowerCase() == 'i'){
      ticketId = eventTarget.parent().parent().parent().attr('id');
      sectionId = eventTarget.parent().parent().parent().parent().attr('id');
    }
    else{
      ticketId = eventTarget.parent().parent().attr('id');
      sectionId = eventTarget.parent().parent().parent().attr('id');
    }
    //alert(sectionId);

    $.ajax({
      type: 'DELETE',
      url: '/vtb/removeTicket/section=' + sectionId + '&ticket=' + ticketId,
      contentType: 'text/plain',
      success: function(res){
        location.reload();
      }
    });
  });

  $(document.getElementsByClassName('ticket-title')).change(function(){
    var ticketId;
    var sectionId;
    var eventTarget = $(event.target);
    ticketId = eventTarget.parent().attr('id');
    sectionId = eventTarget.parent().parent().attr('id');
    var updatedText = eventTarget[0].value;

    $.ajax({
      type: 'POST',
      url: '/vtb/updateTicketTitle/section=' + sectionId + '&ticket=' + ticketId,
      data: {title: updatedText},
      success: function(res){
        location.reload();
      }
    });
  });

  $('.ticket').on('change', 'textarea', function(event){
    var ticketId;
    var sectionId;
    var eventTarget = event.target;
    ticketId = $(eventTarget).parent().attr('id');
    sectionId = $(eventTarget).parent().parent().attr('id');
    var updatedText = eventTarget.value;

    $.ajax({
      type: 'POST',
      url: '/vtb/updateTicketDetails/section=' + sectionId + '&ticket=' + ticketId,
      data: {details: updatedText},
      success: function(res){
        location.reload();
      }
    });
  });

  $('.section').on('change', '.title-section', function(event){
    var sectionId;
    var eventTarget = event.target;
    sectionId = $(eventTarget).parent().parent().attr('id');
    var updatedText = eventTarget.value;
    $.ajax({
      type: 'POST',
      url: '/vtb/updateSectionTitle/section=' + sectionId,
      data: {title: updatedText},
      success: function(res){
        location.reload();
      }
    });
  });

  $('.title-board').on('change', function(event){
    var updatedText = event.target.value;
    $.ajax({
      type: 'POST',
      url: '/vtb/updateBoardTitle/',
      data: {title: updatedText},
      success: function(res){
        location.reload();
      }
    });
  });

});
