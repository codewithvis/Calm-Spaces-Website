const journalKey = (userId: string) => `calm-spaces:journal:${userId}`;

export function loadJournal(userId: string) {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(journalKey(userId)) ?? "";
}

export function saveJournal(userId: string, text: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(journalKey(userId), text);
}

export function exportJournal(text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `calm-spaces-journal-${new Date().toISOString().slice(0, 10)}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}
