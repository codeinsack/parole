import Vue from 'vue';
import VueRouter from 'vue-router';

import DictionaryList from '../pages/DictionaryList/DictionaryList.vue';
import FindWordDefinition from '../pages/FindWordDefinition/FindWordDefinition.vue';
import RandomWord from '../pages/RandomWord/RandomWord.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/find-word-definition',
    component: FindWordDefinition,
    alias: '/',
  },
  {
    path: '/dictionary-list',
    component: DictionaryList,
  },
  {
    path: '/random-word',
    component: RandomWord,
  },
];

const router = new VueRouter({ mode: 'history', routes });

export default router;
