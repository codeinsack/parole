<template>
  <VContainer>
    <VRow class="mt-12 mb-1">
      <VCol cols="6">
        <VAutocomplete
          :value="selectedWord"
          :items="matchedWords"
          :search-input.sync="search"
          label="Search"
          autocomplete="off"
          item-value="id"
          item-text="word"
          clearable
          hide-no-data
          no-filter
          return-object
          @keydown.esc="onSearchSubmit"
          @input="onSelectedWordChange"
        >
          <template #no-data>
            <span class="d-none" />
          </template>
        </VAutocomplete>
      </VCol>
      <VCol class="d-flex justify-end">
        <VRating v-model="complexity" length="3" large />
      </VCol>
      <VCol>
        <VBtn class="mt-2" :disabled="!selectedWord" color="primary" @click="onAddToDictionary">
          Add to dictionary
          <VIcon right dark> mdi-book-open </VIcon>
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
    <h1 v-if="selectedWord">{{ selectedWord.word }}</h1>
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
                <VListItemSubtitle>{{ definition.example || '...' }}</VListItemSubtitle>
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
      COMPLEXITY_COLORS,
      search,
      complexity,
      selectedWord,
      matchedWords,
      onSelectedWordChange,
      onSearchSubmit,
      onAddToDictionary,
    } = useRandomWord();
    return {
      COMPLEXITY_COLORS,
      search,
      complexity,
      selectedWord,
      matchedWords,
      onSelectedWordChange,
      onSearchSubmit,
      onAddToDictionary,
    };
  },
};
</script>

<style scoped></style>
