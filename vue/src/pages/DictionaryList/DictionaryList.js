import { onMounted, ref } from '@vue/composition-api';
import axios from 'axios';

const headers = [{ text: 'Word', value: 'word' }];

export function useDictionaryList() {
  const words = ref([]);

  onMounted(async () => {
    const { data } = await axios.get('/api/words');
    words.value = data;
  });

  return {
    headers,
    words,
  };
}
