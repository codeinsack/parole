<template>
  <VApp>
    <VAppBar app clipped-right>
      <Tabs />
      <VIcon> mdi-logout </VIcon>
    </VAppBar>
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<script>
import Tabs from './components/Tabs.vue';

export default {
  components: { Tabs },
};
</script>
