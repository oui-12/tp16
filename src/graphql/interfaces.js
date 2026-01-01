/**
 * Interfaces TypeScript pour les entités bancaires GraphQL
 *
 * Ce fichier définit toutes les interfaces TypeScript utilisées dans l'application
 * bancaire React avec Apollo Client. Ces interfaces assurent la sécurité des types
 * et l'autocomplétion lors du développement.
 *
 * Les interfaces sont organisées par domaine :
 * - Entités principales (Compte, Transaction)
 * - Statistiques (SoldeStats, TransactionStats)
 * - Requêtes/DTOs (CompteRequest, TransactionRequest)
 * - Types énumérés (TypeCompte, TypeTransaction)
 *
 * Toutes les interfaces sont exportées pour être utilisées dans les composants
 * React et les requêtes GraphQL.
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */

// Interface pour un compte bancaire
export interface Compte {
    id: string;           // Identifiant unique du compte
    solde: number;        // Solde actuel du compte
    dateCreation: string; // Date de création au format ISO
    type: TypeCompte;     // Type de compte (COURANT ou EPARGNE)
}

// Interface pour une transaction bancaire
export interface Transaction {
    id: string;           // Identifiant unique de la transaction
    type: TypeTransaction; // Type de transaction (DEPOT ou RETRAIT)
    montant: number;      // Montant de la transaction
    date: string;         // Date de la transaction au format ISO
    compte: Compte;       // Compte associé à la transaction
}

// Interface pour les statistiques de solde des comptes
export interface SoldeStats {
    count: number;   // Nombre total de comptes
    sum: number;     // Somme totale des soldes
    average: number; // Moyenne des soldes
}

// Interface pour les statistiques des transactions
export interface TransactionStats {
    count: number;       // Nombre total de transactions
    sumDepots: number;   // Somme totale des dépôts
    sumRetraits: number; // Somme totale des retraits
}

// Interface pour les demandes de création de compte
export interface CompteRequest {
    solde: number;    // Solde initial du nouveau compte
    type: TypeCompte; // Type du nouveau compte
}

// Interface pour les demandes de création de transaction
export interface TransactionRequest {
    type: TypeTransaction; // Type de la transaction
    montant: number;       // Montant de la transaction
    compteId: string;      // ID du compte concerné
}

// Types énumérés pour les valeurs prédéfinies
export type TypeCompte = 'COURANT' | 'EPARGNE';         // Types de comptes disponibles
export type TypeTransaction = 'DEPOT' | 'RETRAIT';      // Types de transactions disponibles
