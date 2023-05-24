$(document).ready(function(){

    $(window).scroll(function(){
        console.log($(window).scrollTop());
        const scroll = $(window).scrollTop();
        const imgLogo = $("#logo");

        if(scroll => 375){
            imgLogo.attr('src','/img/c-mm.png');
        }
        if(scroll <= 375){
            imgLogo.attr('src','/img/logo.png');
        }
    })

    $("#gal1").hide();
    $("#gal2").hide();

    $("body").hover(function(){
        $("#gal1").hide();
        $("#gal2").hide();
    });

    $(".texto-intro p b a.color-negro").hover(function(){
        $("#gal1").show();
        $("#gal2").hide();
    });
    $(".texto-intro p b.btn2 a").hover(function(){
        $("#gal2").show();
        $("#gal1").hide();
    });
});
