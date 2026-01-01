import React, { useState, useEffect } from "react";
import { compteService } from "../services/api";

/**
 * Composant React pour afficher la liste des comptes bancaires
 *
 * Ce composant utilise Apollo Client pour récupérer et afficher tous les comptes
 * bancaires depuis le backend GraphQL. Il fournit une interface utilisateur
 * moderne avec :
 * - Affichage en grille responsive des informations des comptes
 * - Indicateurs visuels pour les types de compte (courant/épargne)
 * - Bouton de rafraîchissement pour recharger les données
 * - Gestion des états de chargement et d'erreur
 * - Statistiques du nombre total de comptes
 *
 * Le composant utilise Tailwind CSS pour le styling et gère automatiquement
 * la mise à jour des données via Apollo Client.
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */
const CompteList = () => {
    const [comptes, setComptes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadComptes = async () => {
        try {
            setLoading(true);
            const data = await compteService.getComptes();
            setComptes(data);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des comptes:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComptes();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <span className="ml-3 text-cyan-400">Chargement des comptes...</span>
        </div>
    );

    if (error) return (
        <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg">
            <div className="flex items-center">
                <div className="text-red-400 mr-3">⚠️</div>
                <div>
                    <p className="font-semibold">Erreur de chargement</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-400">Total: {comptes.length} compte(s)</span>
                </div>
                <button
                    onClick={loadComptes}
                    className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                    title="Rafraîchir"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {comptes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">🏦</div>
                    <p className="text-slate-500">Aucun compte disponible</p>
                    <p className="text-slate-400 text-sm mt-2">Créez votre premier compte pour commencer</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {comptes.map((compte) => (
                        <div key={compte.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:shadow-lg hover:border-cyan-500/30 transition-all duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            compte.type === 'COURANT' 
                                                ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-800' 
                                                : 'bg-teal-900/50 text-teal-300 border border-teal-800'
                                        }`}>
                                            {compte.type}
                                        </div>
                                        <span className="text-slate-400 text-sm">ID: {compte.id}</span>
                                    </div>
                                    <h3 className={`text-2xl font-bold ${
                                        compte.solde >= 0 ? 'text-white' : 'text-rose-400'
                                    }`}>
                                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(compte.solde)}
                                    </h3>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Créé le {new Date(compte.dateCreation).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                                <div className={`rounded-lg p-3 text-center ${
                                    compte.type === 'COURANT' 
                                        ? 'bg-cyan-900/30 border border-cyan-800' 
                                        : 'bg-teal-900/30 border border-teal-800'
                                }`}>
                                    <div className="text-2xl">{compte.type === 'COURANT' ? '💳' : '💰'}</div>
                                    <div className="text-xs text-slate-300 mt-1">
                                        {compte.type === 'COURANT' ? 'Compte Courant' : 'Compte Épargne'}
                                    </div>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                compte.solde >= 0
                                    ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                                {compte.solde >= 0 ? '✓ Solde positif' : '⚠️ Solde négatif'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompteList;
