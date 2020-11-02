
function insert() { 
    $('body').append('<div class="top"></div>');
        $('.top').append('<div class="menuitem-index"><a href="index.html"><span>Elevation Aotearoa</span></a></div>');
        $('.top').append('<div class="menuitem"><a href="discover.html"><span>Discover Data</span></a></div>');
        $('.top').append('<div class="menuitem"><span><a href="learn.html">Learn</a></span></div>');
        $('.top').append('<div class="menuitem"><span><a href="connect.html">Connect</a></span></div>');
        $('.top').append('<div class="menuitem"><span><a href="about.html">About</a></span></div>');
    $('body').append('<div class="landboxframe"></div>');
        $('.landboxframe').append('<div class="imageholder"><img src="img/two_volcano_zoomout_web.jpg" alt="Two Volcanoes"><div class="imageholdertext">Image Holder OverlayText</div></div>');

        $('.landboxframe').append('<div class="landbox1"></div>');
            /*Box Left Top*/
            $('.landbox1').append('<div class="landbox1inner-left" data-href="https://xycarto.github.io/elevation.aotearoa.proto/discover.html"></div>');
                $('.landbox1inner-left').append('<div class="boxstyle-t"></div>');
                $('.landbox1inner-left').append('<div class="boxstyle-m">Discover Data</div>');
                $('.landbox1inner-left').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
            /*Box Middle Top*/
            $('.landbox1').append('<div class="landbox1inner-middle" data-href="https://xycarto.github.io/elevation.aotearoa.proto/stories.html"></div>');
                $('.landbox1inner-middle').append('<div class="boxstyle-t"></div>');
                $('.landbox1inner-middle').append('<div class="boxstyle-m">Our Stories</div>');
                $('.landbox1inner-middle').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
            /*Box Right Top*/
            $('.landbox1').append('<div class="landbox1inner-right" data-href="https://xycarto.github.io/elevation.aotearoa.proto/learn.html"></div>');
                $('.landbox1inner-right').append('<div class="boxstyle-t"></div>');
                $('.landbox1inner-right').append('<div class="boxstyle-m">Learn</div>');
                $('.landbox1inner-right').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
            /*Box Left Bottom*/
            $('.landboxframe').append('<div class="landbox2"></div>');
                $('.landbox2').append('<div class="landbox2inner-left" data-href="https://xycarto.github.io/elevation.aotearoa.proto/connect.html"></div>');
                    $('.landbox2inner-left').append('<div class="boxstyle-t"></div>');
                    $('.landbox2inner-left').append('<div class="boxstyle-m">Connect</div>');
                    $('.landbox2inner-left').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');
            /*Box Right Bottom*/
            $('.landbox2').append('<div class="landbox2inner-middle" data-href="https://xycarto.github.io/elevation.aotearoa.proto/about.html"></div>');
                $('.landbox2inner-middle').append('<div class="boxstyle-t"></div>');
                $('.landbox2inner-middle').append('<div class="boxstyle-m">About</div>');
                $('.landbox2inner-middle').append('<div class="boxstyle-b"><p>Some sort of text will go here. This will explain something about the link and what you are about to see.  It will be really cool content. </p></div>');

    $(".landbox1inner-left").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox1inner-middle").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox1inner-right").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox2inner-left").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });

    $(".landbox2inner-middle").click(function(){
        window.location = $(this).attr("data-href");
        return false;
    });


};




    

