## 搭建项目
引入element-plus/各种icon,搭建路由架子
## 搭建组件市场
先编写基础组件,目录结构
```
.
├── Common
├── Editor
└── SurveyComs
    ├── Common
    ├── EditItems
    └── Materials
        └── SelectComs
```
1. 公共组件: Header组件
2. 编辑器相关组件
3. 业务相关组件

组件市场视图目录: `src/views/MaterialsView`
实现不同的组件,主组件src/views/MaterialsView/Index.vue
```html
<div>
    <h1 class="font-weight-100 text-center m0 p0">组件市场</h1>
    <div class="container mc flex">
      <!-- 导航 -->
      <nav class="category mc">
        <router-link class="category-item" to="/materials/select-group">
          <el-icon>
            <xxx-component />
          </el-icon>
          <div>选择</div>
        </router-link>
      </nav>
      <!-- 上面的router跳转的路由出口 -->
      <div class="coms">
        <RouterView />
      </div>
    </div>
  </div>
```
这里的router-link组件的to属性,会将对应路由的组件,注入到RouterView容器中.

左侧的不同部分又关联很多类别的视图,例如src/views/MaterialsView/SelectGroupView.vue这些.
也就是多级路由.

组件市场的右边都是三栏结构,实现Layout.vue组件`src/views/MaterialsView/Layout.vue`

```html
<!-- 组件市场除了左侧的导航条选择，剩余的部分分为三栏 -->
  <div class="layout-container flex">
    <!-- 选择具体的业务组件 -->
    <div class="left flex wrap space-between">
      <slot />
    </div>
    <!-- 显示对应的业务组件 -->
    <div class="center">
      <!-- 对应的组件的路由出口 -->
      <RouterView v-slot="{ Component }">
        <!-- 配合展示动态组件 -->
        <component :is="Component" />
      </RouterView>
    </div>
    <!-- 编辑面板 -->
    <div class="right">编辑面板</div>
  </div>
```

在Layout组件中,不同的业务视图组件,可以主体内容通过插槽的方式传入,这个主体内容中,又会有路由跳转,to属性再将对应的路由组件,注入到center区域的RouterView容器中,配合v-slot属性拿到路由组件,传递给子元素的动态组件组件component,通过is属性传入即可显示对应的组件内容了.
例如下面这个业务视图组件`src/views/MaterialsView/SelectGroupView.vue`,使用Layout组件
```html
<template>
  <Layout>
    <router-link
      class="link-item mb-15"
      exact-active-class="link-item-active"
      to="/materials/select-group/single-select"
      >单选题</router-link>
  </Layout>
</template>
```