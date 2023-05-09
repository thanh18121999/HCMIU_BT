$(function () {
    $('#spinner').fadeIn();
    // load menu
    let idwebpage = sessionStorage.getItem("webpage");
    // console.log(idwebpage)
    if (idwebpage === null) {
        let lsmenu = getDataMenu();
        loadMenu(lsmenu);
    }
    else {
        let lsmenu = getDataMenu(idwebpage);
        loadMenu(lsmenu, true);
    }

    $(window).scroll(function () {
        let currentScroll = $(this).scrollTop() + 1;
        let height = $('#menu-mini').height();
        checkedmenu = $('#menu #menu-part').css('display');
        if (checkedmenu === "flex") {
            height = $('#menu-mini').height() + $('#menu').height();
            height = 320;
        }
        let margiontop = Math.round(height) + 8;

        if (currentScroll > height) {
            $('body').css('margin-top', margiontop);
            $('#menu-mini').addClass('sticky-menu animated fadeInDown');
            if (checkedmenu === "flex")
                $('#menu').addClass('sticky-menu animated fadeInDown');
        } else {
            $('body').css('margin-top', 0);
            $('#menu-mini').removeClass('sticky-menu animated fadeInDown');
            if (checkedmenu === "flex")
                $('#menu').removeClass('sticky-menu animated fadeInDown');
        }
        // previousScroll = currentScroll;
    });
    functionEventCall();
    let imgLogoLoads = $('img.imgLogoLoad');
    $.each(imgLogoLoads, function (i, el) {
        $(el).attr('src', 'config/' + $(el).attr('id') + '.png');
    });
    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": uri_api + "/store/StoredProcedure",
    //     "method": "POST",
    //     "headers": {
    //       "Accept": "*/*",
    //       "Content-Type": "application/json"
    //     },
    //     "processData": false,
    //     "data": {loai: 1}
    //   };
      
    //   $.ajax(settings).done(function (response) {
    //     console.log(response);
    //   });
});

function loadMenu(lsmenu, show = false) {
    if (lsmenu.length > 0) {
        $('#menu-part div.menu-part-level1').html('');
        $('#menu-bar-content div.menu-part-level1').html('');
        $('#map-link #map-link-content').html("");
        $.map(lsmenu, function (el) {
            $.map(el.menu, function (el2) {
                let ela = $(el2.description);
                ela.attr("id", el2.id).attr("position", el2.position);
                //
                let ela2 = $(el2.description).attr("id", el2.id).attr("position", el2.position);
                if (ela2.attr("multileft") === "true" || ela2.attr("multileft") === "true") {
                    ela2.removeAttr('multileft');
                    ela2.removeAttr('multiright');
                    ela2.attr('multi', "true");
                }
                //
                let ela3 = $(`<div>${$(el2.description).text().toUpperCase()}</div>`);
                ela3.attr("webpage", "true");
                ela3.attr("id", el2.id);
                ela3.attr("relg", $(el2.description).attr("relg"));
                //
                if (ela.attr("hide") === "true") {
                    ela.hide();
                    ela2.hide();
                    ela3.hide();
                }
                //
                let parent = el2.parent;
                //
                let menuname = `menu-part-level${el.level}`;
                // level 1
                let parentela = `div#${parent} `;
                if ($(`#menu-part div#${parent}`).length === 0 && $(`#menu-bar-content div#${parent}`).length === 0)
                    parentela = "";
                //
                if ($(`#menu-part ${parentela}> div.${menuname}`).length === 0) {
                    $(`#menu-part ${parentela}`).append(`<div class="${menuname}">`);
                }
                if ($(`#menu-bar-content ${parentela}> div.${menuname}`).length === 0) {
                    $(`#menu-bar-content ${parentela}`).append(`<div class="${menuname}">`);
                }
                $(`#menu-part ${parentela}> div.${menuname}`).append(ela);
                $(`#menu-bar-content ${parentela}> div.${menuname}`).append(ela2);
                //
                if (ela.attr("webpage") === "true") {
                    let elhome = $(`#department .department-title > div[relg="${ela3.attr("relg")}"]`);
                    if (elhome.length > 0) elhome.attr("id", el2.id);
                }
                if (ela.attr('footer') === "true") {
                    $('#map-link .title').text(el2.name);

                    $.ajax({
                        type: 'POST',
                        url: uri_api + "store/StoredProcedure",
                        data: JSON.stringify({ loai: 6, sotrang: 1, soitem: 1, menuid: ela3.attr('id') }),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (su) {
                            if (su.message === "success") {
                                if (su.responses.length > 0) {
                                    $('#map-link #map-link-content').html(su.responses[0].articlecontent);
                                }
                            }
                        },
                        error: function (er) {
                            console.log(er)
                        }
                    });
                }
            });
            setTimeout(
                function () {
                    $('#spinner').fadeOut();
                }, 3000);
        });
    }
    else
        $('#spinner').fadeOut();
    $('#title-subpage').hide();
    if (show === true) $('#title-subpage').show();
}


$('*[href]').click(function () {
    let href = $(this).attr('href');
    if (href !== undefined) {
        let target = $(this).attr('target');
        if (target === "_tab")
            window.open(href, '_blank');
        else {
            document.location.href = href;
            if (href === "/") sessionStorage.clear();
        }
    }
});

$('#menu-bar').click(function (e) {
    $('#menu-bar-content').show();
    $('#menu-lang').hide();
    $('#menu-bar').hide();
    $('#content-page').hide();
    $('#menu').hide();
});

$('#menu-bar-close').click(function (e) {
    e.stopPropagation();
    $('#menu-bar-content').hide();
    $('#menu-lang').show();
    $('#menu-bar').show();
    $('#content-page').show();
    $('#menu').show();
});

$('.flag-lang').click(function () {
    //
    let lang = $(this).attr('lang');
    // $('.flag-lang').css('display', 'flex');
    // $(`#menu-mini .flag-lang[lang="${lang}"]`).hide();
    //set ngon ngu
    try {
        localStorage.setItem('lang', lang);
    } catch (e) {
        if (e.name == "NS_ERROR_FILE_CORRUPTED") {
            console.log("Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites.")
        }
    }
    location.href = window.location.origin + '/' + config.sub_folder;
});

$('#btnTimKiem').click(function () {
    $('#dvTimKiem').toggleClass('hide-opacity');
});