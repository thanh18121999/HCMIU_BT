// du lieu menu trang home
let dtmenu = [];
$.ajax({
    type: 'POST',
    url:  uri_api + "store/StoredProcedure",
    data: JSON.stringify({
        "loai": 1
    }),
    dataType: "json",
    contentType: "application/json",
    async: false,
    globle: false,
    success: function (su) {
        if (su.message === "success")
            dtmenu = su.responses;
    },
    error: function (er) {
        console.log(er)
    }
});