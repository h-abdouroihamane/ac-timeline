import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/mobile',
        name: 'mobile',
        component: () => import('@/views/Mobile.vue'),
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
