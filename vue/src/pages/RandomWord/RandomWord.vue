<template>
  <VContainer>
    <VRow class="mt-12 mb-1">
      <VCol class="title" cols="6">
        Total words: <span>{{ totalWords }}</span></VCol
      >
      <VCol class="d-flex justify-end">
        <VBtn class="mt-2" color="primary" @click="onRandomWordFind">
          Find random word
          <VIcon right dark> mdi-file-find </VIcon>
        </VBtn>
      </VCol>
      <VCol>
        <VBtn class="mt-2" color="primary" :disabled="!selectedWord" @click="onWordReveal">
          Reveal word
          <VIcon right dark> mdi-cannabis </VIcon>
        </VBtn>
      </VCol>
    </VRow>
    <VProgressLinear
      v-if="selectedWord && selectedWord.complexity"
      class="my-3"
      :color="COMPLEXITY_COLORS[selectedWord.complexity - 1]"
      rounded
      value="100"
    />
    <h1 v-if="selectedWord" :style="`visibility: ${hideAnswer ? 'hidden' : 'visible'}`">
      {{ selectedWord.word }}
    </h1>
    <VList v-if="selectedWord">
      <template v-for="(meaning, meaningIndex) in selectedWord.meanings">
        <VListItem :key="meaningIndex">
          <VAvatar class="mr-8" color="teal" size="48">
            <span class="white--text text-truncate">{{ meaning.partOfSpeech }}</span>
          </VAvatar>
          <VListItemContent>
            <template v-for="(definition, definitionIndex) in meaning.definitions">
              <div :key="definitionIndex" class="mb-4">
                <VListItemTitle>{{ definition.definition }}</VListItemTitle>
                <VListItemSubtitle :style="`visibility: ${hideAnswer ? 'hidden' : 'visible'}`">{{
                  definition.example || '...'
                }}</VListItemSubtitle>
                <div>
                  <VChip
                    v-for="synonym in definition.synonyms"
                    :key="synonym"
                    class="ma-2"
                    color="cyan"
                    label
                    text-color="white"
                  >
                    {{ synonym }}
                  </VChip>
                </div>
              </div>
            </template>
          </VListItemContent>
        </VListItem>
      </template>
    </VList>
  </VContainer>
</template>

<script>
import { useRandomWord } from './RandomWord';

export default {
  setup() {
    const {
      selectedWord,
      onRandomWordFind,
      onWordReveal,
      COMPLEXITY_COLORS,
      hideAnswer,
      totalWords,
    } = useRandomWord();
    return {
      selectedWord,
      onRandomWordFind,
      onWordReveal,
      COMPLEXITY_COLORS,
      hideAnswer,
      totalWords,
    };
  },
};
</script>

<style scoped></style>
