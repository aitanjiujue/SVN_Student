function UserOper() {

    this.addUser = function () {

    }

    this.insertUser = function () {
        var userId = $("#userId").val();
        var param = new Object();
        param.userId = userId;


        var year = $("#year").val();
        var month = $("#month").val();
        var day = $("#day").val();
        var birthday_temp = year + "-" + month + "-" + day;
        param.birthday_temp = birthday_temp;

        var provinceId = $("#provinceId").val();
        var cityId = $("#cityId").val();
        var countryId = $("#countryId").val();

        if (provinceId) {
            param.provinceName = $("#provinceId").find("option:selected").text();
        }

        if (cityId) {
            param.cityName = $("#cityId").find("option:selected").text();
        }

        if (countryId) {
            param.contryName = $("#countryId").find("option:selected").text();
        }

        param.provinceId = provinceId;
        param.cityId = cityId;
        param.countryId = countryId;


        var url = "/user/addUser";
        var desc = "新增";
        if (userId) {
            url = "/user/updateUser";
            desc = "修改";
        }

        $.ajax({
            url: url,
            async: true,
            type: "POST",
            data: param,
            success: function (data) {
                //{"isSuccess",true}
                var obj = jQuery.parseJSON(data);
                if (obj.isSuccess == true) {
                    var alerts = layer.alert(desc + "成功", 1, function () {
                        layer.close(alerts);
                        location.reload();
                    });
                } else {
                    var alerts = layer.alert(desc + "失败", 5, function () {
                        layer.close(alerts);
                    });
                }
            }
        })
    }

    this.showUser = function (userId) {
        var htmlStr = userOper.initHtml();
        $.layer({
            type: 1,
            title: false,
            area: ['auto', 'auto'],
            page: {
                html: htmlStr
            }
        });
        var param = new Object();
        param.userId = userId;

        $.getJSON("/user/getUserById", param, function (data) {
            $("#userId").val(data.userId);
            $("#orgId").val(data.orgId);
            $("#orgName").val(data.orgName);
            $("#userChName").val(data.userChName);
            $("#mobilePhone").val(data.mobilePhone);
            $("#email").val(data.email);
            $("#userName").val(data.userName);
            $("#userPassword").val(data.userPassword);

            $("input[name='userSex'][value=" + data.userSex + "]").attr("checked", true);

            var birthday_temp = data.userBirthday;
            //把日期变成毫秒数
            var bithday_time = Date.parse(birthday_temp);
            //通过毫秒数构造一个日期对象
            var date = new Date(bithday_time);
            //得到年份
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();

            if(month<10){
                month = "0"+month;
            }
            if(day<10){
                day = "0"+day;
            }

            //初始日期
            InitDate();

            $("#year").val(year);
            $("#month").val(month);
            $("#day").val(day);

            var provinceId=data.provinceId;
            var cityId=data.cityId;
            var countryId=data.countryId;

            CascadeArea(provinceId, cityId, countryId,"provinceId", "cityId", "countryId");
            $("#provinceId").val(provinceId);
            $("#cityId").val(cityId);
            $("#countryId").val(countryId);

            $("#saveButton").hide();
        })


    }
    
    this.editUser = function (userId) {
        var htmlStr = userOper.initHtml();
        $.layer({
            type: 1,
            title: false,
            area: ['auto', 'auto'],
            page: {
                html: htmlStr
            }
        });
        var param = new Object();
        param.userId = userId;

        $.getJSON("/user/getUserById", param, function (data) {
            $("#userId").val(data.userId);
            $("#orgId").val(data.orgId);
            $("#orgName").val(data.orgName);
            $("#userChName").val(data.userChName);
            $("#mobilePhone").val(data.mobilePhone);
            $("#email").val(data.email);
            $("#userName").val(data.userName);
            $("#userPassword").val(data.userPassword);

            $("input[name='userSex'][value=" + data.userSex + "]").attr("checked", true);

            var birthday_temp = data.userBirthday;
            //把日期变成毫秒数
            var bithday_time = Date.parse(birthday_temp);
            //通过毫秒数构造一个日期对象
            var date = new Date(bithday_time);
            //得到年份
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();

            if(month<10){
                month = "0"+month;
            }
            if(day<10){
                day = "0"+day;
            }
            //初始化日期
            InitDate();

            $("#year").val(year);
            $("#month").val(month);
            $("#day").val(day);

            var provinceId=data.provinceId;
            var cityId=data.cityId;
            var countryId=data.countryId;

            CascadeArea(provinceId, cityId, countryId,"provinceId", "cityId", "countryId");
            $("#provinceId").val(provinceId);
            $("#cityId").val(cityId);
            $("#countryId").val(countryId);
        })
    }
    //删除
    this.deleteUser = function (userId) {
        var param = new Object();
        param.userId = userId;
        $.getJSON("/user/getDelectUserById", param, function (data) {
            if (data.isSuccess == true){
                var alerts = layer.alert("删除成功",1,function () {
                    layer.close(alerts);
                    location.reload();
                })
            }else {
                var alerts = layer.alert("删除失败",5,function () {
                    layer.close(alerts);
                })
            }
        });

        loadUserPage(0);

    }


}
