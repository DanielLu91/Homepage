
(function(){
  var active_item=$("footer ul li .active");
  var interval=window.setInterval(autoClick,3000);
  var f=new Footer();
  var checkout=new CheckoutClick();

  $(window).scroll(function(){
    var viewHeight=window.innerHeight;
    $('.animateme').each(function(){
      var scrollheight=pageYOffset;
      var baseline=pageYOffset+viewHeight;
      var topDis=$(this).offset().top;
      var bottomDis=$(this).offset().top+$(this).height();
      if(topDis<baseline&&bottomDis>baseline){
        if(!$(this).hasClass('start'))
          $(this).addClass('start');
      }
    });
  });


  function Footer(){
    var preNum=active_item.attr('id').charAt(active_item.attr('id').length-1);
    $("footer ul li a").each(function(i){
      $(this).click(function(){
        if($(this).hasClass("active"))
          return;
        else{
          active_item.removeClass("active");
          $(this).addClass("active");
          var num=$(this).attr('id').charAt(active_item.attr('id').length-1);
          preNum=active_item.attr('id').charAt(active_item.attr('id').length-1);
          var preSectionId="#section"+preNum;
          var recentSectionId="#section"+num;
          $(preSectionId).removeClass("item-active");
          $(recentSectionId).addClass("item-active");
          active_item=$(this);
          // flush interval
          window.clearInterval(interval);
          interval=window.setInterval(autoClick,3000);
        }
      });
    }
    );
  }

  function autoClick(){
    // 1-4
    var currentNum=active_item.attr('id').charAt(active_item.attr('id').length-1);
    var nextNum=currentNum;
    if(currentNum==4)
      nextNum=1;
    else
      nextNum++;
    var nextLink="#link"+nextNum;
    active_item.removeClass("active");
    $(nextLink).addClass("active");
    var nextnum=$(nextLink).attr('id').charAt(active_item.attr('id').length-1);
    var currentSectionId="#section"+currentNum;
    var nextSectionId="#section"+nextNum;
    $(currentSectionId).removeClass("item-active");
    $(nextSectionId).addClass("item-active");
    active_item=$(nextLink);
  }

  function CheckoutClick(){
    $('.item').each(function(){
      $(this).click(function(){
        window.clearInterval(interval);
        var num=$(this).attr('id').charAt($(this).attr('id').length-1);
        var pageId='#page'+num;
        var pagePath='page'+num+'.html';
        var subtileId='#subtitle'+num;
        $("#title-container").addClass('disappear');
        $('.subtitles').each(function(){
          $(this).removeClass('flipin');
        });
        $(subtileId).addClass('flipin');
        $('#right-down-block').css('display','none');
        // $(pageId).addClass('pageUp');
        $('.pages').load(pagePath);
      });
    });
  }

})();
