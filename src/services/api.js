const API_URL = 'http://localhost:3001';

export const compteService = {
  // Récupérer tous les comptes
  getComptes: async () => {
    const response = await fetch(`${API_URL}/comptes`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des comptes');
    }
    return response.json();
  },

  // Créer un nouveau compte
  createCompte: async (compteData) => {
    const response = await fetch(`${API_URL}/comptes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compteData),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création du compte');
    }
    return response.json();
  },

  // Mettre à jour un compte
  updateCompte: async (id, compteData) => {
    const response = await fetch(`${API_URL}/comptes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compteData),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du compte');
    }
    return response.json();
  },

  // Supprimer un compte
  deleteCompte: async (id) => {
    const response = await fetch(`${API_URL}/comptes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du compte');
    }
    return id;
  },
};

export const transactionService = {
  // Récupérer toutes les transactions
  getTransactions: async () => {
    const response = await fetch(`${API_URL}/transactions`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des transactions');
    }
    return response.json();
  },

  // Créer une nouvelle transaction
  createTransaction: async (transactionData) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création de la transaction');
    }
    return response.json();
  },
};
