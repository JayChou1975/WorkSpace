package com.example.dbeaver_vue.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController  // 声明这是一个控制层。
public class dbController {
    @Resource
    private JdbcTemplate jdbcTemplate; // 直接私有化jdbc模板，初始化成员变量。

    @RequestMapping("getList")
    public List<Map<String,Object>> getList(){
        return jdbcTemplate.queryForList("Select * from NewTable_1");
    }
}
