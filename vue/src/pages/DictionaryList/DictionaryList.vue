<template>
  <VContainer class="py-0">
    <VRow class="mt-12">
      <VCol class="py-0">
        <VDataTable class="elevation-2" :headers="headers" :items="words" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import { useDictionaryList } from './DictionaryList';

export default {
  setup() {
    const { words, headers } = useDictionaryList();

    return {
      words,
      headers,
    };
  },
};
</script>

<style scoped></style>
