import { gql } from '@apollo/client';

/**
 * Mutations GraphQL pour les opérations de modification
 *
 * Ce fichier contient toutes les mutations GraphQL utilisées pour modifier
 * les données dans le backend. Les mutations permettent de créer, modifier
 * et supprimer des comptes et transactions.
 *
 * Les mutations incluent :
 * - Création de comptes bancaires
 * - Suppression de comptes existants
 * - Ajout de transactions (dépôts/retraits)
 *
 * Chaque mutation retourne les données mises à jour pour permettre
 * la mise à jour automatique de l'interface utilisateur via Apollo Client.
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */

// Mutation pour créer un compte
export const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Mutation pour supprimer un compte
export const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
  }
`;

// Mutation pour ajouter une transaction
export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transactionRequest: TransactionRequest!) {
    addTransaction(transactionRequest: $transactionRequest) {
      id
      type
      montant
      date
      compte {
        id
        solde
        type
      }
    }
  }
`;
