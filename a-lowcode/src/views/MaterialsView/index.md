SCSS nth-child(4n + #{$i}) 选择器说明
这个 4n 的使用原理：

1. 基本原理
4n + #{$i} 是一个周期性选择器，其中：

4n: 表示以4为周期
#{$i}: 表示偏移量(1到4)
2. 实际效果
假设有6个元素，下面是选择器匹配的结果：
```
4n + 1: 选中第 1、5 号元素
4n + 2: 选中第 2、6 号元素
4n + 3: 选中第 3、7 号元素
4n + 4: 选中第 4、8 号元素
```
3. 在当前代码中的应用
```
@for $i from 1 through 4 {
  .category-item:nth-child(4n + #{$i}) {
    // 按4个一组循环设置不同的背景色
    @if $i == 1 {
      background-color: var(--primary-color);   // 第1、5个元素
    } @else if $i == 2 {
      background-color: var(--success-color);   // 第2、6个元素
    } @else if $i == 3 {
      background-color: var(--warning-color);   // 第3个元素
    } @else if $i == 4 {
      background-color: var(--error-color);     // 第4个元素
    }
  }
}
```
4. 视觉效果
```
元素1: 主色     (4 × 0 + 1 = 1)
元素2: 成功色   (4 × 0 + 2 = 2)
元素3: 警告色   (4 × 0 + 3 = 3)
元素4: 错误色   (4 × 0 + 4 = 4)
元素5: 主色     (4 × 1 + 1 = 5)
元素6: 成功色   (4 × 1 + 2 = 6)
```
这样设计可以让颜色按照固定规律循环出现，使导航菜单更有视觉规律。
在 nth-child(4n + #{$i}) 中：

n 不是变量，而是表示一个从 0 开始递增的整数序列 (0, 1, 2, 3, ...)
4n 表示一个以 4 为步长的序列 (0, 4, 8, 12, ...)
举例说明
以你的代码为例：
```
nth-child(4n + 1) 会匹配：
- n = 0 时：4×0 + 1 = 1 (第1个元素)
- n = 1 时：4×1 + 1 = 5 (第5个元素)
- n = 2 时：4×2 + 1 = 9 (第9个元素)
```
实际应用
在你的导航菜单中：
```
1. 选择(CircleCheck) - 主色
2. 文本输入(EditPen) - 成功色
3. 高级题型(Files) - 警告色
4. 备注说明(ChatLineSquare) - 错误色
5. 个人信息(User) - 主色（重复第1个颜色）
6. 联系方式(Message) - 成功色（重复第2个颜色）
```
