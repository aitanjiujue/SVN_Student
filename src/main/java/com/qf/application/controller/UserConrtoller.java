package com.qf.application.controller;

import com.qf.application.service.IUserService;
import com.qf.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "userConrtoller")
public class UserConrtoller extends BaseController {

    @Autowired
    private IUserService userService;

    @RequestMapping(value="/getUserPage/{currentPage}")
    public ModelAndView UserPage(HttpServletRequest request) {
        //paramMap中装着传递过来的startIndex和pageSize

       // Map<String, Object> paramMap = this.getParam(request);
        Map<String, Object> paramMap = new HashMap<>();



        //map  orgList  total  orgList.ftl
        //查询回来的map中放着两个查询到的数据  orgList和total

        Map<String, Object> resultMap = userService.queryUserList(paramMap);
        //跳转视图并携带数据到视图
        ModelAndView modelAndView = new ModelAndView("/user/userList");
        modelAndView.addObject("userList", resultMap.get("user/userList"));
        modelAndView.addObject("total", resultMap.get("total"));
        return modelAndView;
    }

}
