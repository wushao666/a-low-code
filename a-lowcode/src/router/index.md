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