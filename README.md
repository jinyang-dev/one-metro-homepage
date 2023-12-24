# One metro homepage

基于 [Metro-UI-CSS](https://github.com/olton/Metro-UI-CSS) 的仿Win8的导航首页，直接放在服务器中即可访问。

导航页的磁贴内容均在``config/one.json``中配置。

## 一、板块配置

当前页面规划为横向3个大板块，分别对应配置文件中的main_tiles、second_tiles、lives。支持的子项目配置：

* title：板块标题
* width：板块宽度，单位中型磁贴的宽度
* items：仅main_tiles、second_tiles支持该配置，用于板块内部的磁贴配置（下边章节再详细说明）
* images：仅lives支持该配置，用于板块内的图片展示配置（下边章节再详细说明）

```json
{
    "main_tiles": {
        "title": "快速访问",
        "width": 6,
        "items": [
        ]
    },
    "second_tiles": {
        "title": "工作状态",
        "width": 2,
        "items": [
        ]
    },
    "lives": {
        "title": "关键时刻",
        "width": 2,
        "images": [
        ]
    }
}
```

## 二、磁贴配置

### 跳转磁贴

跳转磁贴用于配置指定URL的页面跳转，配置示例：

```json
{
    "title" : "GitHub",
    "icon" : "images/icons/github.png",
    "color" : "#2932E1",
    "size" : "wide",
    "url" : "http://www.github.com",
    "tips": "探索代码的世界",
    "news": "5"
}
```

配置项说明：

* title：磁贴名，可选，除了小型磁贴，其它规格的磁贴建议配置
* icon：磁贴图标
* color：磁贴背景颜色
* size：磁贴大小，支持：small，medium，wide
* url：跳转地址
* tips：磁贴提示，可选，用于鼠标悬浮时显示的提示信息
* news：磁贴消息数量标签，可选，用于显示消息数量

### 倒计时磁贴

倒计时磁贴是一个wide规格的磁贴，用于显示倒计时，不可点击跳转。配置示例：

```json
 {
    "title": "晚饭倒计时",
    "type": "countdown",
    "datetime": "18:00"
}
```

配置项说明：

* title：磁贴名
* type：固定为 countdown
* datetime：目标日期，只配置时间时为当天这个时间点，如 18:00 表示打开页面的当天的18:00。也可以指定具体日期的时间，如：12/24/2023 18:00

### 图片展示磁贴

图片展示磁贴是一个wide规格的磁贴，用于展示指定图册，仅支持在lives板块配置，不可点击跳转。配置实例：

```json
"lives": {
    "title": "关键时刻",
    "width": 2,
    "images": [
        "images/lives/ycd1.jpg",
        "images/lives/ycd2.png",
        "images/lives/ycd3.webp",
        "images/lives/ycd4.webp",
        "images/lives/ycd5.jpg"
    ]
}
```

配置项说明，在images中指定需要展示的图片。



## 三、图片版权声明

本项目中仅作为本人学习使用，所涉及的图片资源从网上或阿里巴巴矢量图标库获取，如有侵权，请联系我删除。