import { gql } from '@apollo/client';

/**
 * Requêtes GraphQL pour l'application de gestion bancaire
 *
 * Ce fichier contient toutes les requêtes GraphQL utilisées par l'application
 * React pour interagir avec le backend Spring Boot GraphQL. Les requêtes
 * sont organisées par fonctionnalité et utilisent des variables pour
 * la réutilisabilité.
 *
 * Les requêtes incluent :
 * - Gestion des comptes (CRUD et statistiques)
 * - Gestion des transactions (consultation et statistiques)
 * - Recherche par critères (ID, type)
 *
 * Toutes les requêtes sont exportées en tant que constantes pour être
 * utilisées dans les composants React avec Apollo Client.
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */

// Requête pour récupérer tous les comptes
export const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Requête pour récupérer un compte par ID
export const GET_COMPTE_BY_ID = gql`
  query GetCompteById($id: ID!) {
    compteById(id: $id) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Requête pour calculer le solde total
export const GET_TOTAL_SOLDE = gql`
  query GetTotalSolde {
    totalSolde {
      count
      sum
      average
    }
  }
`;

// Requête pour récupérer les comptes par type
export const GET_COMPTE_BY_TYPE = gql`
  query GetCompteByType($type: TypeCompte!) {
    findCompteByType(type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Requête pour récupérer les transactions d'un compte
export const GET_COMPTE_TRANSACTIONS = gql`
  query GetCompteTransactions($id: ID!) {
    compteTransactions(id: $id) {
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

// Requête pour récupérer toutes les transactions
export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    allTransactions {
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

// Requête pour obtenir les statistiques des transactions
export const GET_TRANSACTION_STATS = gql`
  query GetTransactionStats {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;
