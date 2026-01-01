import React, { useState, useEffect } from 'react';
import { compteService, transactionService } from '../services/api';

/**
 * Composant React pour effectuer des transactions bancaires
 *
 * Ce composant fournit un formulaire interactif pour effectuer des dépôts
 * et retraits sur les comptes bancaires existants.
 *
 * Fonctionnalités :
 * - Formulaire avec validation des champs (montant positif requis)
 * - Sélection du type de transaction (dépôt/retrait)
 * - Sélecteur dynamique des comptes disponibles
 * - Gestion des états de chargement et d'erreur
 * - Interface utilisateur colorée selon le type de transaction
 * - Messages de feedback utilisateur (succès/erreur)
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */
const TransactionForm = (props) => {
    const [type, setType] = useState('DEPOT');
    const [montant, setMontant] = useState('50.00');
    const [compteId, setCompteId] = useState('');
    const [comptes, setComptes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Charger la liste des comptes
    useEffect(() => {
        const loadComptes = async () => {
            try {
                const data = await compteService.getComptes();
                setComptes(data);
                if (data.length > 0 && !compteId) {
                    setCompteId(data[0].id);
                }
            } catch (err) {
                console.error('Erreur lors du chargement des comptes:', err);
                setError('Impossible de charger la liste des comptes');
            }
        };
        
        loadComptes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!montant || parseFloat(montant) <= 0) {
            alert('Veuillez entrer un montant valide');
            return;
        }

        if (!compteId) {
            alert('Veuillez sélectionner un compte');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const montantValue = parseFloat(montant);
            const compteIdValue = parseInt(compteId, 10);
            
            // Créer la transaction
            const nouvelleTransaction = {
                type: type === 'DEPOT' ? 'crédit' : 'débit',
                montant: montantValue,
                compteId: compteIdValue,
                date: new Date().toISOString(),
                description: type === 'DEPOT' ? 'Dépôt' : 'Retrait'
            };
            
            await transactionService.createTransaction(nouvelleTransaction);
            
            // Mettre à jour le solde du compte
            const compte = comptes.find(c => c.id === compteIdValue);
            if (compte) {
                const nouveauSolde = type === 'DEPOT' 
                    ? parseFloat(compte.solde) + montantValue
                    : parseFloat(compte.solde) - montantValue;
                
                await compteService.updateCompte(compteIdValue, {
                    ...compte,
                    solde: nouveauSolde
                });
            }
            
            setMontant('50.00');
            setType('DEPOT');
            
            if (props.onTransactionCreated) {
                props.onTransactionCreated();
            }
            
            alert('Transaction effectuée avec succès !');
        } catch (err) {
            console.error('Erreur lors de la transaction:', err);
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
                        Type de transaction *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setType('DEPOT')}
                            className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                                type === 'DEPOT'
                                    ? 'border-teal-500 bg-teal-900/20 text-teal-400'
                                    : 'border-slate-700 hover:border-slate-600 text-slate-400'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <span>💸</span>
                                <span>Dépôt</span>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('RETRAIT')}
                            className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                                type === 'RETRAIT'
                                    ? 'border-rose-500 bg-rose-900/20 text-rose-400'
                                    : 'border-slate-700 hover:border-slate-600 text-slate-400'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <span>🏧</span>
                                <span>Retrait</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Montant *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-400 text-sm">€</span>
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            placeholder="0.00"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Compte *
                    </label>
                    <select
                        value={compteId}
                        onChange={(e) => setCompteId(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        disabled={loading || comptes.length === 0}
                    >
                        {comptes.length === 0 ? (
                            <option value="">Aucun compte disponible</option>
                        ) : (
                            comptes.map((compte) => (
                                <option key={compte.id} value={compte.id}>
                                    {compte.numero} - {compte.type} (Solde: {parseFloat(compte.solde).toFixed(2)} €)
                                </option>
                            ))
                        )}
                    </select>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{error}</span>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || comptes.length === 0}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                        loading || comptes.length === 0
                            ? 'bg-slate-700 cursor-not-allowed'
                            : type === 'DEPOT'
                            ? 'bg-teal-600 hover:bg-teal-700'
                            : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Traitement...
                        </div>
                    ) : type === 'DEPOT' ? (
                        'Effectuer un dépôt'
                    ) : (
                        'Effectuer un retrait'
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
