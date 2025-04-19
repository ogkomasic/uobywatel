// Przechowywanie dokumentów
class DocumentManager {
  constructor() {
    this.documents = {
      'mDowód': null,
      'mLegitymacja': null,
      'mPrawoJazdy': null
    };
    this.loadFromLocalStorage();
  }

  saveDocument(type, data) {
    this.documents[type] = data;
    localStorage.setItem(type, JSON.stringify(data));
  }

  getDocument(type) {
    return this.documents[type];
  }

  loadFromLocalStorage() {
    for (const type in this.documents) {
      const savedData = localStorage.getItem(type);
      if (savedData) {
        this.documents[type] = JSON.parse(savedData);
      }
    }
  }
}

// Inicjalizacja
const documentManager = new DocumentManager();
