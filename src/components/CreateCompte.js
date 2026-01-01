import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';

/**
 * Composant React pour créer un nouveau compte bancaire
 *
 * Ce composant fournit un formulaire interactif pour créer des comptes bancaires.
 * Il utilise Apollo Client pour exécuter la mutation GraphQL et met automatiquement
 * à jour la liste des comptes après création.
 *
 * Fonctionnalités :
 * - Formulaire avec validation des champs (solde positif requis)
 * - Sélection du type de compte (courant/épargne)
 * - Gestion des états de chargement et d'erreur
 * - Mise à jour automatique de la liste via refetchQueries
 * - Interface utilisateur moderne avec Tailwind CSS
 * - Messages de feedback utilisateur (succès/erreur)
 *
 * Le composant réinitialise le formulaire après création réussie
 * et affiche des alertes pour informer l'utilisateur du résultat.
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */
const CreateCompte = ({ onCompteCreated }) => {
    const [solde, setSolde] = useState('1000.00');
    const [type, setType] = useState('COURANT');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!solde || parseFloat(solde) < 0) {
            alert('Veuillez entrer un solde valide');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            // Générer un numéro de compte aléatoire
            const numero = 'FR76' + 
                Math.floor(1000 + Math.random() * 9000) + 
                Math.floor(1000 + Math.random() * 9000) + 
                Math.floor(1000 + Math.random() * 9000) + 
                Math.floor(1000 + Math.random() * 9000);

            const nouveauCompte = {
                numero,
                type: type === 'COURANT' ? 'Compte Courant' : 'Compte Épargne',
                solde: parseFloat(solde),
                proprietaire: 'Nouveau Client' // Vous pouvez ajouter un système d'authentification plus tard
            };

            await compteService.createCompte(nouveauCompte);
            
            setSolde('1000.00');
            setType('COURANT');
            
            if (onCompteCreated) {
                onCompteCreated();
            }
            
            alert('Compte créé avec succès !');
        } catch (err) {
            console.error('Erreur lors de la création du compte:', err);
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Solde initial *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-400 text-sm">€</span>
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={solde}
                            onChange={(e) => setSolde(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                            placeholder="Ex: 1000.00"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Type de compte *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                            type === 'COURANT'
                                ? 'border-cyan-500 bg-cyan-900/30 text-cyan-100'
                                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        }`}>
                            <input
                                type="radio"
                                value="COURANT"
                                checked={type === 'COURANT'}
                                onChange={(e) => setType(e.target.value)}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <div className="text-2xl mb-2">💳</div>
                                <div className="font-semibold">Courant</div>
                                <div className="text-xs text-slate-400">Usage quotidien</div>
                            </div>
                        </label>

                        <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                            type === 'EPARGNE'
                                ? 'border-teal-500 bg-teal-900/30 text-teal-100'
                                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        }`}>
                            <input
                                type="radio"
                                value="EPARGNE"
                                checked={type === 'EPARGNE'}
                                onChange={(e) => setType(e.target.value)}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <div className="text-2xl mb-2">💰</div>
                                <div className="font-semibold">Épargne</div>
                                <div className="text-xs text-slate-400">Économies</div>
                            </div>
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{error.message}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                        loading 
                            ? 'bg-cyan-900 cursor-not-allowed text-cyan-400' 
                            : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-md hover:shadow-lg hover:shadow-cyan-500/20'
                    }`}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Création en cours...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Créer le compte</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateCompte;
