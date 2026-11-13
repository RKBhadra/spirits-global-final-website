function readStoredJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn('Unable to read stored data:', key, error);
    return fallback;
  }
}

function writeStoredJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn('Unable to persist data:', key, error);
    return false;
  }
}
