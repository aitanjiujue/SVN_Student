var pageSize = 3;
var totalCount;
$(function () {
    userOper = new UserOper();
    loadUserPage(0);

    $("#queryButton").bind("click", function () {
        loadUserPage(0);
    })

    function loadUserPage(startPage) {
        var param = new Object();
        param.startIndex = startPage * pageSize;
        param.pageSize = pageSize;

        $.ajax({
            url: "/user/userPage",
            async: true,
            type: "GET",
            data: param,
            success: function (data) {
                if (data != "") {
                    $("#pageListContainer").empty();
                    $("#pageListContainer").html(data);
                    loadUerPageNumber(startPage)
                }
            }
        })

        function loadUerPageNumber(startPage) {
            var param = new Object();
            param.startIndex = startPage * pageSize;
            param.pageSize = pageSize;
            param.total = totalCount;

            $.ajax({
                url: "/user/userPageNumber",
                async: true,
                type: "GET",
                data: param,
                success: function (data) {
                    if (data != "") {
                        $("#pageNumberToolBar").empty();
                        $("#pageNumberToolBar").html(data);
                    }
                }
            })
        }

    }

}
