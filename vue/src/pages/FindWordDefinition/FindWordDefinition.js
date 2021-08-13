import { onMounted, ref, watch } from '@vue/composition-api';
import axios from 'axios';
import { debounce } from 'lodash';

const COMPLEXITY_COLORS = ['green', 'orange', 'red'];

export function useParole() {
  const complexity = ref(1);
  const search = ref('');
  const selectedWord = ref(null);
  const matchedWords = ref([]);

  onMounted(async () => {
    await axios.get('/api/words');
  });

  watch(search, async (value) => {
    if (value) {
      debouncedFetchWords();
    }
  });

  const fetchWords = async () => {
    const { data } = await axios.get(
      `/api/words?filter={"where":{"word":{"like":"${search.value}.*","options":"i"}}}`
    );
    matchedWords.value = data;
  };

  const debouncedFetchWords = debounce(fetchWords, 500);

  const playAudio = (selectedWord) => {
    const audio = selectedWord?.phonetics[0]?.audio;
    new Audio(audio)?.play();
  };

  const onSelectedWordChange = async (newValue) => {
    playAudio(newValue);
    selectedWord.value = newValue;
  };

  const onSearchSubmit = async () => {
    if (!search.value) return;
    const { data } = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${search.value}`
    );
    if (data) {
      playAudio(data[0]);
      selectedWord.value = data[0];
    }
  };

  const onAddToDictionary = async () => {
    await axios.post('/api/words', {
      ...selectedWord.value,
      complexity: complexity.value,
    });
  };

  return {
    search,
    complexity,
    selectedWord,
    matchedWords,
    onSelectedWordChange,
    onSearchSubmit,
    onAddToDictionary,
    COMPLEXITY_COLORS,
  };
}
