# a-lowcode

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
## 技术实现
一个业务组件会对应多个编辑组件。
例如某个标题业务组件对应：内容、居中、字号、颜色编辑组件。通过jsonSchema进行数据映射，这个对应关系在 JSON Schema 里面来定义，只有在 JSON Schema 里面定义了编辑项，才能够编辑。
都有的核心字段：id、type、name
业务组件的status字段关联着所有的编辑组件，独有的某些属性可能有options、isShow、editComponent、currentStatus


```javascript
export default function () {
  return {
    // 正确：防止组件被转换为响应式对象，减少性能上的开销，配置文件本身静态化即可，没必要响应式
    type: markRaw(SingleSelect), 
    name: 'single-select',
    id: uuidv4(),
    // 组件的状态：组件的每一个能够修改的状态都应该对应一个编辑组件
    status: {
      title: {
        id: uuidv4(),
        status: '单选题默认标题',
        isShow: true,
        name: 'title-editor',
        editCom: markRaw(TitleEditor),
      },
      desc: {
        id: uuidv4(),
        status: '单选题默认描述',
        isShow: true,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
      },
      options: {
        id: uuidv4(),
        status: ['默认选项1', '默认选项2'],
        currentStatus: 0,
        isShow: true,
        name: 'options-editor',
        editCom: markRaw(OptionsEditor),
      },
      position: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['左对齐', '居中对齐'],
        isShow: true,
        name: 'position-editor',
        editCom: markRaw(PositionEditor),
      },
      titleSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['22', '20', '18'],
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      descSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['16', '14', '12'],
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      titleWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      descWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      titleItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      descItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
    },
  };
}
```
在pinia状态管理中，做数据仓库，actions里面设置各个setter.

```javascript
export const useMaterialStore = defineStore('materialStore', {
  state: () => ({
    currentMaterialCom: 'single-select', // 当前选中的组件
    // 记录所有的业务组件
    coms: {
      'single-select': defaultStatusMap['single-select'](),
    },
  }),
  actions: {
    setTextStatus,
  },
});
```

业务组件排布都是用的基础布局组件Layout，控制左边展示组件列表，中间是组件展示，右边是编辑组件。
Layout组件通过provide注入actions的所需setter，子组件中使用inject注入这些方法，然后修改时触发这些setter。

```Vue
<template>
  <div class="layout-container flex">
    <!-- 选择具体的业务组件 -->
    <div class="left flex wrap space-between">
      <slot />
    </div>
    <!-- 显示对应的业务组件 -->
    <div class="center">
      <Router-View v-slot="{ Component }">
        <component
          :is="Component"
          :status="store.coms[store.currentMaterialCom].status"
          :serialNum="1"
        />
      </Router-View>
    </div>
    <!-- 编辑面板 -->
    <div class="right">
      <EditPannel :com="currentCom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditPannel from '@/components/SurveyComs/EditItems/EditPannel.vue';
import { computed, provide } from 'vue';
import { useMaterialStore } from '@/stores/useMaterial';
// 数据仓库
const store = useMaterialStore();
// 获取当前选中组件的状态数据
const currentCom = computed(() => store.coms[store.currentMaterialCom]);

const updateStatus = (configKey: string, payload?: number | string | boolean | object) => {
  // 拿到新的状态数据之后，就应该去修改仓库里面的数据
  switch (configKey) {
    case 'title':
    case 'desc': {
      if (typeof payload !== 'string') {
        console.error('Invalid payload type for "title or desc". Expected string.');
      }
      store.setTextStatus(currentCom.value.status[configKey], payload);
    }
  }
};
provide('updateStatus', updateStatus);
</script>
```
核心一点就是在Layout组件中使用了路由组件RouterView，当我在业务组件中点击了RouterLink后，会在这里渲染。
```javascript
<Router-View v-slot="{ Component }">
  <component
    :is="Component"
    :status="store.coms[store.currentMaterialCom].status"
    :serialNum="1"
  />
</Router-View>
```

### 组件市场核心
通过配置文件生成：
```typescript
// 该文件是题型面板对应的配置文件，用于配置题型面板的题型信息
import { CircleCheck, ChatLineSquare, User } from '@element-plus/icons-vue';
export const SurveyComsList = [
  {
    title: '选择题',
    icon: CircleCheck,
    list: [
      { materialName: 'single-select', comName: '单选题' },
      { materialName: 'single-pic-select', comName: '图片单选' },
    ],
  },
  {
    title: '备注说明',
    icon: ChatLineSquare,
    list: [{ materialName: 'text-note', comName: '备注说明' }],
  },
  {
    title: '个人信息',
    icon: User,
    list: [
      { materialName: 'personal-info-gender', comName: '性别' },
      { materialName: 'personal-info-education', comName: '学历' },
    ],
  },
];

```

### 编辑器核心
分为两步：
#### 1、往画布上添加组件
其实就是通过自定义的jsonSchema展示当前模板有哪些组件，然后添加这些组件到画布，所谓的画布就是编辑器。
例如某个活动模版是：
```typescript
export const SurveyComsList: MaterialGroup[] = [
  {
    title: '选择',
    icon: CircleCheck,
    list: [
      { materialName: 'single-select', comName: '单选' },
      { materialName: 'multi-select', comName: '多选' },
      { materialName: 'option-select', comName: '下拉' },
      { materialName: 'single-pic-select', comName: '图片单选' },
      { materialName: 'multi-pic-select', comName: '图片多选' },
    ],
  },

  {
    title: '文本输入',
    icon: EditPen,
    list: [{ materialName: 'text-input', comName: '文本输入' }],
  },
  {
    title: '高级题型',
    icon: Files,
    list: [
      { materialName: 'rate-score', comName: '评价/打分' },
      { materialName: 'date-time', comName: '日期/时间' },
    ],
  },
  {
    title: '备注说明',
    icon: ChatLineSquare,
    list: [
      {
        materialName: 'text-note',
        comName: '备注说明',
      },
    ],
  },
  {
    title: '个人信息',
    icon: User,

    list: [
      { materialName: 'personal-info-name', comName: '姓名' },
      { materialName: 'personal-info-id', comName: '身份证' },
      { materialName: 'personal-info-birth', comName: '出生日期' },
      { materialName: 'personal-info-gender', comName: '性别' },
      { materialName: 'personal-info-age', comName: '年龄' },
      { materialName: 'personal-info-education', comName: '学历' },
      { materialName: 'personal-info-collage', comName: '大学' },
      { materialName: 'personal-info-major', comName: '专业' },
      { materialName: 'personal-info-industry', comName: '行业' },
      { materialName: 'personal-info-career', comName: '职业' },
      { materialName: 'personal-info-company', comName: '公司' },
      { materialName: 'personal-info-position', comName: '职位' },
    ],
  },
  {
    title: '联系方式',
    icon: Message,
    list: [
      { materialName: 'personal-info-tel', comName: '手机' },
      { materialName: 'personal-info-wechat', comName: '微信号' },
      { materialName: 'personal-info-qq', comName: 'QQ号' },
      { materialName: 'personal-info-email', comName: '邮箱' },
      { materialName: 'personal-info-address', comName: '地址' },
    ],
  },
]
```

展示的时候根据materialName进行匹配，具体是通过configs的componentMap
```typescript
export const componentMap: ComponentMap = {
  // 业务组件
  'single-select': markRaw(SingleSelect),
  'multi-select': markRaw(MultiSelect),
  'option-select': markRaw(OptionsSelect),
  'single-pic-select': markRaw(SinglePicSelect),
  'multi-pic-select': markRaw(MultiPicSelect),
  'text-note': markRaw(TextNote),
  'text-input': markRaw(TextInput),
  'personal-info-name': markRaw(TextInput),
  'personal-info-id': markRaw(TextInput),
  'personal-info-tel': markRaw(TextInput),
  'personal-info-wechat': markRaw(TextInput),
  'personal-info-qq': markRaw(TextInput),
  'personal-info-email': markRaw(TextInput),
  'personal-info-address': markRaw(TextInput),
  'personal-info-gender': markRaw(SingleSelect),
  'personal-info-age': markRaw(SingleSelect),
  'personal-info-education': markRaw(SingleSelect),
  'personal-info-career': markRaw(SingleSelect),
  'date-time': markRaw(DateTime),
  'personal-info-birth': markRaw(DateTime),
  'personal-info-collage': markRaw(TextInput),
  'personal-info-major': markRaw(TextInput),
  'personal-info-industry': markRaw(TextInput),
  'personal-info-company': markRaw(TextInput),
  'personal-info-position': markRaw(TextInput),
  'rate-score': markRaw(RateScore),
  // 编辑组件
  'title-editor': markRaw(TitleEditor),
  'desc-editor': markRaw(DescEditor),
  'position-editor': markRaw(PositionEditor),
  'options-editor': markRaw(OptionsEditor),
  'size-editor': markRaw(SizeEditor),
  'weight-editor': markRaw(WeightEditor),
  'italic-editor': markRaw(ItalicEditor),
  'text-input-type-editor': markRaw(TextInputTypeEditor),
  'text-type-editor': markRaw(TextTypeEditor),
  'pic-options-editor': markRaw(PicOptionsEditor),
  'date-time-type-editor': markRaw(DateTimeTypeEditor),
  'rate-text-editor': markRaw(rateTextEditor),
}
```
一开始数据仓库是空的，coms没啥内容，只有占位的标题。
```typescript
export const useEditorStore = defineStore('editor', {
  state: () => ({
    currentComponentIndex: -1, // 一开始没有选中的组件
    surveyCount: 0, // 用于对问题进行计数
    // 每个业务组件的状态，一开始有两个默认的业务组件
    coms: initStore(),
  }),
  actions: {
    setCurrentComponentIndex(index: number) {
      this.currentComponentIndex = index
    },
    // 新增题目的时候，也需要取消聚焦
    addCom(coms: Status[], newCom: Status) {
     
  },
})
```

当我点击左侧的某个组件时，触发addCom的action，`store.addCom(store.coms, status)`
把上面的map存储的内容添加到coms里面，画布上就有了组件，组件的内容来自于store里面的数据。
#### 2、编辑画布组件

上面给画布加上了组件后，就是每一块有了内容，点击时，`store.setCurrentComponentIndex(index)`
右侧的编辑区域
```vue
<template>
  <div class="right-side-container" @wheel="handleScroll($event)">
    <div
      v-if="store.currentComponentIndex === -1"
      class="content flex justify-content-center align-items-center"
    >
      点击题型进行编辑
    </div>
    <div v-else>
      <EditPannel :com="currentCom" />
    </div>
  </div>
</template>
```
EditPannel公共编辑组件本质上用的计算属性，`const currentCom = computed(() => store.coms[store.currentComponentIndex])`，所以就能渲染了。
### 存储问卷
id、创建的时间、更新的时间、title、组件详情
### 问卷预览
