import { ref } from 'vue';

export function useHttp() {
  const data = ref(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const request = async (url: string, options: RequestInit = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Ошибка ${response.status}`);

      data.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Неизвестная ошибка';
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, request };
}
