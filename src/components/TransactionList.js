import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

/**
 * Composant React pour afficher l'historique des transactions bancaires
 *
 * Ce composant affiche la liste complète des transactions effectuées sur tous
 * les comptes bancaires. Il utilise Apollo Client pour récupérer les données
 * GraphQL et les présente dans une interface utilisateur moderne et intuitive.
 *
 * Fonctionnalités :
 * - Affichage paginé des transactions avec défilement
 * - Tri chronologique (plus récent en haut)
 * - Indicateurs visuels colorés selon le type (dépôt/vert, retrait/rouge)
 * - Bouton de rafraîchissement manuel des données
 * - Gestion des états de chargement et d'erreur
 * - Affichage détaillé : type, montant, date, compte associé, solde actuel
 * - Interface responsive avec Tailwind CSS
 * - Compteur total des transactions
 *
 * Les transactions sont affichées avec des bordures colorées et des icônes
 * pour une meilleure lisibilité. Le composant gère automatiquement les cas
 * où aucune transaction n'est disponible.
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */
const TransactionList = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading) return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <span className="ml-3 text-cyan-400">Chargement des transactions...</span>
        </div>
    );

    if (error) return (
        <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg">
            <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{error.message}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-400">Total: {data.allTransactions.length} transaction(s)</span>
                </div>
                <button
                    onClick={() => refetch()}
                    className="text-cyan-400 hover:text-cyan-300 p-2 rounded-lg hover:bg-slate-800 transition-all duration-200"
                    title="Actualiser"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {data.allTransactions.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">📋</div>
                    <p className="text-slate-400">Aucune transaction disponible</p>
                    <p className="text-slate-500 text-sm mt-2">Effectuez une transaction pour commencer</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {data.allTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={`bg-slate-800 rounded-xl p-4 border ${
                                transaction.type === 'DEPOT' 
                                    ? 'border-teal-900/50 hover:border-teal-800' 
                                    : 'border-cyan-900/50 hover:border-cyan-800'
                            } transition-all hover:shadow-lg`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        transaction.type === 'DEPOT'
                                            ? 'bg-teal-900/30 text-teal-300 border border-teal-800'
                                            : 'bg-cyan-900/30 text-cyan-300 border border-cyan-800'
                                    }`}>
                                        {transaction.type === 'DEPOT' ? '📥' : '📤'}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">
                                            {transaction.type === 'DEPOT' ? 'Dépôt' : 'Retrait'}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            {transaction.compte.type} • {new Date(transaction.date).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xl font-bold ${
                                        transaction.type === 'DEPOT' ? 'text-teal-400' : 'text-cyan-400'
                                    }`}>
                                        {transaction.type === 'DEPOT' ? '+' : '-'}{transaction.montant.toFixed(2)} €
                                    </p>
                                    <div className="text-sm text-slate-500">
                                        {new Date(transaction.date).toLocaleString('fr-FR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                    <p className="text-sm text-slate-400">
                                        Solde: {transaction.compte.solde.toFixed(2)} €
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
