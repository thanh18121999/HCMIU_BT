// let uri_api = "https://dhqt.api.phuckhanggem.com/";
// let uri_img = "https://dhqt.phuckhanggem.com/ftp_images/";
// let uri_api = "https://bndhqt.phuckhangnet.vn/api/";
// let uri_img = "https://bndhqt.phuckhangnet.vn/ftp_images/";
let uri_api = config.uri_api;
let uri_img = config.uri_img;
let uri_sto = config.uri_sto;

$(function () {
    if (getUrlParameter("page-name") === false)
        loadPage("home");
    else {
        let web_page = getUrlParameter("web-page");
        let menu_name = getUrlParameter("menu-name");
        let menu_id = getUrlParameter("menu-id");
        let scroll_to = getUrlParameter("scroll-to");
        let post_id = getUrlParameter("post-id");
        let table_name = getUrlParameter("table-name");
        let page_name = getUrlParameter("page-name");
        let user_id = getUrlParameter("user-id");
        let department = getUrlParameter("department");
        let position_title = getUrlParameter("position-title");
        loadPage(page_name, menu_name, menu_id, scroll_to, post_id, table_name, web_page, user_id, department, position_title);
    }

    window.onpopstate = function () {
        if (getUrlParameter("page-name") === false)
            loadPage("home");
        else {
            let web_page = getUrlParameter("web-page");
            let menu_name = getUrlParameter("menu-name");
            let menu_id = getUrlParameter("menu-id");
            let scroll_to = getUrlParameter("scroll-to");
            let post_id = getUrlParameter("post-id");
            let table_name = getUrlParameter("table-name");
            let user_id = getUrlParameter("user-id");
            let department = getUrlParameter("department");
            let position_title = getUrlParameter("position-title");
            loadPage(page_name, menu_name, menu_id, scroll_to, post_id, table_name, web_page, user_id, department, position_title);
        }
    };
    $("#btn-scroll").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});

function loadPage(page_name, menu_name = false, menu_id = false, scroll_to = false, post_id = false, table_name = false, web_page = false, user_id = false, department = false, position_title = false) {
    let random = (1 + Math.floor(Math.random() * 6000));
    //
    let url = `${config.sub_folder}/template_01/html/${page_name}.html?_=${random.toString()}`;
    //
    $("#content-page").load(window.location.origin + '/' + url);
    if ($('#menu-bar-content').length > 0)
        $('#menu-bar-content').hide();
    $('#menu-lang').show();
    $('#menu-bar').show();
    $('#content-page').show();
    $('#menu').show();
    let newuri = "?page-name=" + page_name;
    if (menu_name !== undefined && menu_name !== false)
        newuri += "&menu-name=" + menu_name;
    if (menu_id !== undefined && menu_id !== false)
        newuri += "&menu-id=" + menu_id;
    if (scroll_to !== undefined && scroll_to !== false)
        newuri += "&scroll-to=" + scroll_to;
    if (post_id !== undefined && post_id !== false)
        newuri += "&post-id=" + post_id;
    if (table_name !== undefined && table_name !== false)
        newuri += "&table-name=" + table_name;
    if (web_page !== undefined && web_page !== false)
        newuri += "&web-page=" + web_page;
    if (user_id !== undefined && user_id !== false)
        newuri += "&user-id=" + user_id;
    if (department !== undefined && department !== false)
        newuri += "&department=" + department;
    if (position_title !== undefined && position_title !== false)
        newuri += "&position-title=" + position_title;
    replaceURI(newuri);
}

function loadLang(lang) {
    $('.flag-lang').css('display', 'flex');
    $(`#menu-mini .flag-lang[lang="${lang}"]`).hide();
    //set ngon ngu
    try {
        localStorage.setItem('lang', lang);
        //
        let opt = resource_lang[lang];
        let els = Object.keys(opt);
        $.each(els, function (i, el) {
            $(`[relg="${el}"]`).text(opt[el]);
        });
    } catch (e) {
        if (e.name == "NS_ERROR_FILE_CORRUPTED") {
            console.log("Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites.")
        }
    }
}

function replaceURI(newuri) {
    try {
        window.history.pushState({ path: newuri }, '', newuri);
    } catch { console.log("hello in localhost") }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function changeURIMenuScroll(name = false, scroll = false, postid = false, tablename = false, webpage = false, user_id = false, department = false, position_title = false) {
    let search = window.location.search.split("&");
    if (name !== false) {
        search = search.filter(x => x.indexOf("menu-name") === -1 || x === "");
        search.push("menu-name=" + name);
    }
    if (scroll !== false) {
        search = search.filter(x => x.indexOf("scroll-to") === -1 || x === "");
        search.push("scroll-to=" + scroll);
    }
    if (postid !== false) {
        search = search.filter(x => x.indexOf("post-id") === -1 || x === "");
        search.push("post-id=" + postid);
    }
    if (tablename !== false) {
        search = search.filter(x => x.indexOf("table-name") === -1 || x === "");
        search.push("table-name=" + tablename);
    }
    if (webpage !== false) {
        search = search.filter(x => x.indexOf("web-page") === -1 || x === "");
        search.push("web-page=" + webpage);
    }
    if (user_id !== false) {
        search = search.filter(x => x.indexOf("user-id") === -1 || x === "");
        search.push("user-id=" + user_id);
    }
    if (department !== false) {
        search = search.filter(x => x.indexOf("department") === -1 || x === "");
        search.push("department=" + department);
    }
    if (position_title !== false) {
        search = search.filter(x => x.indexOf("position-title") === -1 || x === "");
        search.push("position-title=" + position_title);
    }
    let newuri = window.location.origin + search.join("&");
    replaceURI(newuri);
}

function getDataMenu(id = 0) {
    let lsmenu = [], obj = {}, ilv = 1;
    let tempmenu = dtmenu.map(entry => ({ ...entry }));
    if (id !== 0) {
        ilv--;
        obj[ilv] = tempmenu.filter(x => x.id.toString() === id);
    }
    else {
        obj[ilv] = tempmenu.filter(x => x.menulevel.toString() === ilv.toString());
    }
    let idparents = obj[ilv].map(x2 => x2.id.toString());
    while (idparents.length > 0) {
        lsmenu.push({ level: ilv, menu: $.each(obj[ilv], function (i, x) { x.menulevel = ilv }) });
        ilv++;
        obj[ilv] = tempmenu.filter(x => idparents.indexOf(x.parent.toString()) > -1);
        idparents = obj[ilv].map(x2 => x2.id.toString());
    }
    lsmenu = lsmenu.filter(x => x.level.toString() !== "0");
    return lsmenu;
}

function setColor(pros) {
    $.map(pros, function (cs) {
        let kva = cs.split(":");
        if (kva[1] !== undefined) {
            let key = kva[0].toString().trim();
            let value = kva[1].toString().replace(/^\s+|\s+$/gm, '').replace("!important", "");
            $("body").get(0).style.setProperty(key, value);
        }
    });
}

function functionEventCall(el_name = "") {
    let el = el_name;
    if (el !== "") el = "#" + el + " ";
    $(`${el}[webpage="true"]`).click(function (e) {
        e.stopPropagation();
        let id = $(this).attr('id');
        let elid = dtmenu.find(x => x.id.toString() === id);
        let pros = elid.rootcss.split(";");
        setColor(pros);
        //<span relg="departments">BỘ MÔN</span> 
        $('#title-subpage').html(`<span id="txtSubpageName" relg="${$(this).attr('relg')}">${$(elid.description).text().toUpperCase()}</span>`);
        //
        let lsmenu = getDataMenu(id);
        //
        if (lsmenu.length > 0) {
            loadMenu(lsmenu, true);
            functionEventCall();
            $('#menu-part div.menu-part-level1 .menu-item:first-child').trigger('click');
        }
        sessionStorage.setItem("webpage", id);
        loadLang(localStorage.getItem("lang"));
    });
    $(`${el}[reset="true"]`).click(function (e) {
        e.stopPropagation();
        // if ($(this).attr('reset') === "true") {
        //     let id = $(this).attr('id');
        //     $(this).attr('page', "home")
        //     let elid = dtmenu.find(x => x.id.toString() === id);
        //     let pros = elid.rootcss.split(";");
        //     setColor(pros);
        //     let lsmenu = getDataMenu();
        //     loadMenu(lsmenu);
        // }
        sessionStorage.removeItem("webpage");
        let lsmenu = getDataMenu();
        loadMenu(lsmenu);
        loadPage("home");
    });
    $(`${el}[html="true"]`).click(function (e) {
        e.stopPropagation();
        loadPage($(this).attr(`page`), $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[single="true"]`).click(function (e) {
        e.stopPropagation();
        let postid = $(this).attr("postid");
        let tablename = $(this).attr("tablename");
        if (tablename !== undefined)
            loadPage("single-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), postid, tablename, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
        else if (postid !== undefined)
            loadPage("single-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), postid, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
        else
            loadPage("single-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));

    });

    $(`${el}[multimini="true"]`).click(function (e) {
        e.stopPropagation();
        loadPage("multi-mini-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[multi="true"]`).click(function (e) {
        e.stopPropagation();
        loadPage("multi-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[multileft="true"]`).click(function (e) {
        e.stopPropagation();
        loadPage("multi-mini-post-left", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[multiright="true"]`).click(function (e) {
        e.stopPropagation();
        loadPage("multi-mini-post-right", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });
}

function loadCountRow(data, el_name, menuid, lang) {
    if (data.length > 0) {
        let soitemtong = parseFloat(data[0].countrow);
        //
        if (soitemtong > 0) {
            let numberofpost = Math.floor(parseInt(soitemtong) / soitem);
            if ((soitemtong % parseFloat(soitem)) > 0) numberofpost++;
            if (numberofpost > 0) {
                $(`#${el_name} #number-of-post`).text(`/` + numberofpost);
                $(`#${el_name} #number-of-post`).attr(`value`, numberofpost);
            }

            $(`#${el_name} .btn-page`).click(function (e) {
                let page = parseInt($(`#${el_name} #current-page-post`).text());
                let numpage = parseInt($(`#${el_name} #number-of-post`).attr(`value`));
                if ($(this).attr(`id`) === "left")
                    page--;
                else page++;
                page = (page < 1 ? 1 : page);
                page = (page > numpage ? numpage : page);
                if (parseInt($(`#${el_name} #current-page-post`).text()) !== page) { }
                $(`#${el_name} #current-page-post`).text(page);
                loadMultiPost(page, el_name, menuid, lang)
            });
        }
    }
}

function loadMultiPost(page, el_name, menuid, lang, readmore = true) {
    let firstid = 0;
    let dtpage = [];
    $.ajax({
        type: 'POST',
        url: uri_api + "store/StoredProcedure",
        data: JSON.stringify({
            "loai": 61,
            "sotrang": page,
            "soitem": soitem,
            "menuparentid": menuid,
            "lang": lang,
        }),
        async: false,
        globle: false,
        dataType: "json",
        contentType: "application/json",
        success: function (su) {
            if (su.message === "success") {
                if (su.responses.length === 0) {
                    $.ajax({
                        type: 'POST',
                        url: uri_api + "store/StoredProcedure",
                        data: JSON.stringify({
                            "loai": 6,
                            "sotrang": page,
                            "soitem": soitem,
                            "menuid": menuid,
                            "lang": lang,
                        }),
                        dataType: "json",
                        contentType: "application/json",
                        async: false,
                        globle: false,
                        success: function (su2) {
                            if (su2.message === "success")
                                dtpage = su2.responses;
                        },
                        error: function (er) {
                            console.log(er)
                        }
                    });
                }
                else
                    dtpage = su.responses;
            }
        },
        error: function (er) {
            console.log(er)
        }
    });
    if ($(`#${el_name} #content`).length === 0) console.log("Can't load: " + el_name)
    else {
        $(`#${el_name} #content`).html('');
        $.each(dtpage, function (i, p) {
            let html = `<div class="content-post" postid="${p.id}">`;
            if (p.avatar !== "")
                html += `<div><img src="${uri_img}${p.avatar}" /></div>`;
            html += `<div class="date">${p.createdate}</div><div class="title">${p.title}</div>`;
            html += `<div class="content" postid="${p.id}">${p.summary}</div>`;
            html += `<div class="contenthtml" style="display: none !important;" postid="${p.id}">${p.articlecontent}</div>`;
            // if (readmore && cutcontent)
            html += `<div class="read-more" postid="${p.id}" single="true"><i class="fa-solid fa-right-long"></i></div>`
            html += `</div>`;
            $(`#${el_name} #content`).append(html);
            if (i === 0) firstid = p.id;

            if ($(`#${el_name} #content > div`).length > 0) {
                $(`#${el_name} #content > div`).click(function () {
                    let postid = $(this).attr('postid');
                    let p = {
                        id: postid,
                        title: $(`#${el_name} #content .content-post[postid="${postid}"] .title`).text(),
                        createdate: $(`#${el_name} #content .content-post[postid="${postid}"] .date`).text(),
                        articlecontent: $(`#${el_name} #content .content-post[postid="${postid}"] .contenthtml`).html(),
                    }
                    loadPostToRead(p, `${el_name} #content-post`);
                });
            }
        });
        functionEventCall(el_name);
    }
    return { firstid: firstid, data: dtpage };
}

function loadPostToRead(p, el_name) {
    $(`#${el_name}`).html('');
    let html = `<div class="content-post" postid="${p.id}">`;
    html += `<div class="title">${p.title}</div>`;
    // html += `<div class="date">${p.createdate}</div>`;
    html += `<div class="content sun-editor-editable" postid="${p.id}">${p.articlecontent}</div>`;
    html += `</div>`;
    $(`#${el_name}`).append(html);
}
