$(function () {
    //
    let iCount = 1;
    let iMax = 3;

    $("#banner #banner_img > img").attr("src", `template_01/imgs/banner/banner-${iCount}.jpg`); iCount++;
    setInterval(function () {
        $("#banner #banner_img > img").fadeOut(1000, function () {
            $(this).attr("src", `template_01/imgs/banner/banner-${iCount}.jpg`);
        }).fadeIn(1000);
        iCount++;
        if (iCount > iMax)
            iCount = 1;
    }, 5000);
    // add id to menu
    let lstEl = ["webpage", "html", "single", "multi", "multimini", "multileft", "multiright"];
    $.each(lstEl, function (i, el) {
        $.map($(`[${el}="true"]`), function (e) {
            let id = $(e).attr("id");
            if (id === undefined) {
                let menu = $(e).attr("menu");
                if (menu !== undefined) {
                    let menufind = dtmenu.find(x => $(x.description).attr("menu") === menu && $(x.description).attr(el) === "true");
                    if (menufind !== undefined) {
                        $(e).attr("id", menufind.id);
                    }
                }
                else {
                    if ($(e).attr("relg") !== undefined)
                        menu = $(e).attr("relg");
                    else {
                        if ($(e).find("[relg]").length > 0)
                            menu = $($(e).find("[relg]")[0]).attr("relg");
                    }
                    menufind = dtmenu.find(x => $(x.description).attr("relg") === menu && $(x.description).attr(el) === "true");
                    if (menufind !== undefined) $(e).attr("id", menufind.id);
                }
            }
        });
    });
    //
    loadNewestNews();
    //
    let lang = localStorage.getItem('lang');
    if (lang === null || lang === undefined || lang === "null") lang = 'vn';
    loadLang(lang);
    //
    functionEventCall();
});

function loadNewestNews() {
    let dtnews = [];
    let menuid = $('#menu div[page="news"]').attr('id');
    $.ajax({
        type: 'POST',
        url: uri_api + "store/StoredProcedure",
        data: JSON.stringify({
            "loai": 61,
            "sotrang": 1,
            "soitem": 3,
            // "lang": "vn",
            // "menuparentid": "5"
            "menuparentid": menuid,
            "lang": localStorage.getItem('lang'),
        }),
        dataType: "json",
        contentType: "application/json",
        async: false,
        globle: false,
        success: function (su) {
            if (su.message === "success")
                dtnews = su.responses;
        },
        error: function (er) {
            console.log(er)
        }
    });
    $('#news .content.cls-flex').html('');
    $.map(dtnews, function (p) {
        // let content = $(p.articlecontent).text().substr(0, 155);
        let html = `<div id="${p.menuid}" class="sub-content" postid="${p.id}" single="true">`;
        if (p.avatar !== "")
            html += `<div class="avatar"><img src="${uri_img}${p.avatar}" /></div>`;
        html += `<div class="text-type">${$(p.description).text()}</div>`;
        html += `<div class="text-title">`;
        html += `<i class="fa-solid fa-square-rss"></i> `;
        html += `<span class="sub-text-title">${p.title}</span>`;
        html += `</div>`;
        html += `<div class="text-content">${p.summary}</div>`;
        html += `</div>`;
        $('#news .content.cls-flex').append(html);
    });
}