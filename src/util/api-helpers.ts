export async function fetchWithRetry<T>(
    url: string, 
    options: RequestInit = {}, 
    retries = 3
  ): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.status === 429) {
          const delay = parseInt(response.headers.get("Retry-After") || "1", 10) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    throw new Error('Max retries reached');
  }
  