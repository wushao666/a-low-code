import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('@/views/MaterialsView/Index.vue'),
      redirect: '/materials/select-group', // 添加重定向，进入 materials 时自动跳转到 select-group
      children: [
        {
          path: 'select-group',  // 不需要加 /
          name: 'select-group',
          component: () => import('@/views/MaterialsView/SelectGroupView.vue'),
        },
        {
          path: 'input-group',
          name: 'input-group',
          component: () => import('@/views/MaterialsView/InputGroupView.vue'),
        },
        {
          path: 'advanced-group',
          name: 'advanced-group',
          component: () => import('@/views/MaterialsView/AdvancedGroupView.vue'),
        },
        {
          path: 'note-group',
          name: 'note-group',
          component: () => import('@/views/MaterialsView/NoteGroupView.vue'),
        },
        {
          path: 'personal-info-group',
          name: 'personal-info-group',
          component: () => import('@/views/MaterialsView/PersonalInfoGroupView.vue'),
        },
        {
          path: 'contact-group',
          name: 'contact-group',
          component: () => import('@/views/MaterialsView/ContactGroupView.vue'),
        },
      ],
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/EditorView/Index.vue'),
    },
  ],
});

export default router;
