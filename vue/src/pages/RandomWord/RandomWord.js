import { onMounted, ref } from '@vue/composition-api';
import axios from 'axios';

const COMPLEXITY_COLORS = ['green', 'orange', 'red'];

export function useRandomWord() {
  const selectedWord = ref(null);
  const hideAnswer = ref(true);
  const totalWords = ref(0);

  onMounted(async () => {
    const { data } = await axios.get('/api/words/count');
    totalWords.value = data.count;
  });

  const playAudio = (selectedWord) => {
    const audio = selectedWord?.phonetics[0]?.audio;
    new Audio(audio)?.play();
  };

  const onRandomWordFind = async () => {
    hideAnswer.value = true;
    const { data } = await axios.get('/api/words/get-random-word');
    selectedWord.value = data.data[0];
  };

  const onWordReveal = () => {
    hideAnswer.value = false;
    playAudio(selectedWord.value);
  };

  return {
    selectedWord,
    onRandomWordFind,
    COMPLEXITY_COLORS,
    onWordReveal,
    hideAnswer,
    totalWords,
  };
}
