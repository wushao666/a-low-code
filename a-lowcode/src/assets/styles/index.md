SCSS 引入语法说明
在 SCSS 中，@import 有两种主要的引入语法:

1. 普通 SCSS 引入 (推荐)

```
@import './common.scss';
@import './reset.scss';
@import './variables.scss';
@import './coms.scss';
```

2. URL 引入方式 (当前代码使用)

```
@import url('./common.scss');
```

区别说明
普通 SCSS 引入
文件会被编译和合并
支持 SCSS 变量和混合器共享
更好的代码组织和管理
开发环境下更容易调试
URL 引入方式
主要用于引入外部 CSS 文件
不会被 SCSS 编译器处理
适合引入第三方样式库
会产生额外的 HTTP 请求
建议修改
对于当前项目，建议修改为普通 SCSS 引入方式：

这样可以:

提高编译效率
更好地利用 SCSS 特性
减少不必要的 HTTP 请求
保持代码的一致性

css中也是一样的
```
/* CSS文件中引入其他CSS文件 */
@import "style.css";
@import url("style.css");

/* 带媒体查询的引入 */
@import "print.css" print;
@import url("mobile.css") screen and (max-width: 768px);
```