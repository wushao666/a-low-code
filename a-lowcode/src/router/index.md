# `import.meta.env.BASE_URL` 说明

这是 Vite 提供的环境变量，用于设置应用的基础路由路径。

### 1. 基本概念
- `BASE_URL` 是应用部署时的基础路径
- 默认值是 `'/'`，表示部署在域名根路径
- 可在 vite.config.ts 中通过 `base` 选项配置

### 2. 常见使用场景

#### 2.1 默认配置
```typescript
// vite.config.ts
export default defineConfig({
  base: '/' // 默认值，部署在域名根目录
})
```

#### 2.2 子目录部署
```typescript
// vite.config.ts
export default defineConfig({
  base: '/my-app/' // 部署在子目录
})
```

### 3. 实际效果举例

假设您的应用部署在不同环境：

1. **根目录部署**
   - `BASE_URL = '/'`
   - 访问地址：`https://example.com/`

2. **子目录部署**
   - `BASE_URL = '/my-app/'`
   - 访问地址：`https://example.com/my-app/`

3. **CDN部署**
   - `BASE_URL = 'https://cdn.example.com/my-app/'`
   - 资源从CDN加载

在您的路由配置中：
```typescript
createWebHistory(import.meta.env.BASE_URL)
```
这行代码确保了无论应用部署在哪个路径下，路由都能正确工作。

Vue Router 子路由 path 规则说明
子路由 path 不需要加斜杠 /
在 Vue Router 中，子路由的 path 属性有以下规则：

1. 父路由 - 需要完整路径，包含斜杠：
```
{
  path: '/materials',  // ✅ 父路由需要完整路径
  children: [...]
}
```
2. 子路由 - 不需要加斜杠：
```
{
  children: [
    {
      path: 'select-group',     // ✅ 正确：直接写相对路径
      // path: '/select-group'  // ❌ 错误：不要加斜杠
    }
  ]
}
```
原因说明
1. Vue Router 会自动基于父路由路径构建完整路径
2. 最终路径: /materials/select-group
3. 使用相对路径可以：
- 避免路径重复
- 便于路由重构
- 减少维护成本
- 完整路径示例
```
/materials                       # 父路由
/materials/select-group         # 子路由
/materials/select-group/single-select  # 孙子路由
```


