
    $(document).ready(function () {
        
        $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
           
            if (this.hash !== "") {
               
                event.preventDefault();

                var hash = this.hash;

                
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 900, function () {

                    
                    window.location.hash = hash;
                });
            } 

        });
        
    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
    $(document).ready(function () {
        $('#sign-btn').on('click', function (e) {
            $(e.currentTarget).closest('ul').hide();
            $('form#signin').fadeIn('fasr');
        })
    });
    $(document).ready(function () {
        $('#sign-btn1').on('click', function (e) {
            $(".stage").css('height', '812px');
            $(e.currentTarget).closest('ul').hide();
            $('form#signup').fadeIn('fasr');
        })
    });
})
  