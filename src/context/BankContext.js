import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMPTES, GET_TRANSACTIONS } from '../graphql/queries';
import { CREATE_COMPTE, CREATE_TRANSACTION } from '../graphql/mutations';

/**
 * Contexte de l'application bancaire
 * Fournit un état global et des méthodes pour gérer les comptes et les transactions
 * @type {React.Context}
 */
const BankContext = createContext();

/**
 * Fournisseur du contexte bancaire
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Composants enfants
 * @returns {JSX.Element} Fournisseur de contexte
 */
export const BankProvider = ({ children }) => {
  // État local pour les comptes et les transactions
  const [comptes, setComptes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des données via GraphQL
  const { data: comptesData, loading: loadingComptes, error: errorComptes } = useQuery(GET_COMPTES);
  const { data: transactionsData, loading: loadingTransactions, error: errorTransactions } = useQuery(GET_TRANSACTIONS);
  
  // Mise à jour de l'état avec les données récupérées
  useEffect(() => {
    if (comptesData) {
      setComptes(comptesData.comptes || []);
    }
    if (transactionsData) {
      setTransactions(transactionsData.transactions || []);
    }
    setLoading(loadingComptes || loadingTransactions);
    setError(errorComptes || errorTransactions || null);
  }, [comptesData, transactionsData, loadingComptes, loadingTransactions, errorComptes, errorTransactions]);

  // Mutation pour créer un nouveau compte
  const [createCompteMutation] = useMutation(CREATE_COMPTE, {
    refetchQueries: [{ query: GET_COMPTES }],
    onError: (err) => {
      console.error("Erreur lors de la création du compte:", err);
      setError(err.message);
    }
  });

  // Mutation pour créer une nouvelle transaction
  const [createTransactionMutation] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }, { query: GET_COMPTES }],
    onError: (err) => {
      console.error("Erreur lors de la création de la transaction:", err);
      setError(err.message);
    }
  });

  /**
   * Crée un nouveau compte
   * @param {Object} compte - Les détails du compte à créer
   * @param {string} compte.type - Le type de compte ('COURANT' ou 'EPARGNE')
   * @param {number} compte.solde - Le solde initial du compte
   * @param {number} [compte.tauxInteret] - Le taux d'intérêt (pour les comptes épargne)
   * @param {number} [compte.decouvertAutorise] - Le découvert autorisé (pour les comptes courants)
   * @returns {Promise<void>}
   */
  const createCompte = async (compte) => {
    try {
      await createCompteMutation({
        variables: {
          input: {
            type: compte.type,
            solde: parseFloat(compte.solde),
            ...(compte.type === 'EPARGNE' && { tauxInteret: parseFloat(compte.tauxInteret || 2.5) }),
            ...(compte.type === 'COURANT' && { decouvertAutorise: parseFloat(compte.decouvertAutorise || 500) })
          }
        }
      });
    } catch (err) {
      console.error("Erreur dans createCompte:", err);
      throw err;
    }
  };

  /**
   * Crée une nouvelle transaction
   * @param {Object} transaction - Les détails de la transaction
   * @param {string} transaction.compteId - L'ID du compte concerné
   * @param {string} transaction.type - Le type de transaction ('DEPOT' ou 'RETRAIT')
   * @param {number} transaction.montant - Le montant de la transaction
   * @param {string} [transaction.description] - Une description optionnelle
   * @returns {Promise<void>}
   */
  const createTransaction = async (transaction) => {
    try {
      await createTransactionMutation({
        variables: {
          input: {
            compteId: transaction.compteId,
            type: transaction.type,
            montant: parseFloat(transaction.montant),
            description: transaction.description || ''
          }
        }
      });
    } catch (err) {
      console.error("Erreur dans createTransaction:", err);
      throw err;
    }
  };

  // Valeur du contexte
  const value = {
    comptes,
    transactions,
    loading,
    error,
    createCompte,
    createTransaction
  };

  return (
    <BankContext.Provider value={value}>
      {children}
    </BankContext.Provider>
  );
};

/**
 * Hook personnalisé pour utiliser le contexte bancaire
 * @returns {Object} Le contexte bancaire
 * @throws {Error} Si utilisé en dehors d'un BankProvider
 */
export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank doit être utilisé à l\'intérieur d\'un BankProvider');
  }
  return context;
};

export default BankContext;
