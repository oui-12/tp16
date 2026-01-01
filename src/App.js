import React, { useState } from 'react';
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

/**
 * Composant principal de l'application React de gestion bancaire
 *
 * Cette application fournit une interface utilisateur moderne
 * et professionnelle pour la gestion des comptes bancaires et des transactions.
 *
 * Fonctionnalités principales :
 * - Affichage de la liste des comptes avec statistiques
 * - Création de nouveaux comptes (courant/épargne)
 * - Gestion des transactions (dépôts/retraits)
 * - Interface responsive avec Tailwind CSS
 *
 * L'application utilise une base de données locale avec json-server.
 *
 * @author Hamza Aglagal
 * @version 1.0
 * @since 2025
 */
function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    
    const handleDataUpdated = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };
    
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            {/* Navigation Header */}
            <nav className="bg-slate-800 shadow-lg border-b border-cyan-900">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">🏦</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-cyan-300">Banque Aqua</h1>
                                <p className="text-sm text-cyan-400">Gestion des Comptes</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-cyan-400">
                                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">Connecté</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-100 mb-2">
                        Bienvenue dans votre Espace Bancaire
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Gérez vos comptes et transactions en toute simplicité avec notre interface moderne
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column - Account Management */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                                    <span className="text-cyan-600 text-sm">💳</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Gestion des Comptes</h3>
                            </div>
                            <CreateCompte onCompteCreated={handleDataUpdated} />
                        </div>
                    </div>

                    {/* Middle Column - Account List */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                    <span className="text-teal-600 text-sm">📊</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Vos Comptes</h3>
                            </div>
                            <CompteList key={`comptes-${refreshKey}`} />
                        </div>
                    </div>

                    {/* Right Column - Transactions */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                                    <span className="text-sky-600 text-sm">💸</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Transactions</h3>
                            </div>
                            <TransactionForm onTransactionCreated={handleDataUpdated} />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                                    <span className="text-cyan-600 text-sm">📋</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Historique</h3>
                            </div>
                            <TransactionList key={`transactions-${refreshKey}`} />
                        </div>
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                        <div className="text-2xl font-bold text-cyan-600 mb-2">💰</div>
                        <div className="text-sm text-slate-600">Comptes Gérés</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                        <div className="text-2xl font-bold text-teal-500 mb-2">📈</div>
                        <div className="text-sm text-slate-600">Transactions Réussies</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                        <div className="text-2xl font-bold text-sky-500 mb-2">🔒</div>
                        <div className="text-sm text-slate-600">Sécurité Garantie</div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-800 text-cyan-100 mt-12">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center">
                        <p className="text-cyan-300">TP 16 - Application React avec Base de Données Locale</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
