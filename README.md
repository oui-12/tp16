# 🏦 Application de Gestion Bancaire - React avec JSON Server

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![JSON Server](https://img.shields.io/badge/JSON%20Server-0.17.0-000000?logo=json)](https://github.com/typicode/json-server)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

Une application de gestion bancaire moderne et réactive développée avec React et utilisant JSON Server comme backend simulé. Cette application permet de gérer des comptes bancaires et d'effectuer des opérations de dépôt et de retrait.

## 🌟 Fonctionnalités

### 💰 Gestion des Comptes
- 🆕 Création de nouveaux comptes bancaires
- 👁️ Visualisation de la liste des comptes
- 🔄 Mise à jour des soldes en temps réel
- 🗑️ Suppression de comptes

### 💳 Opérations Bancaires
- 💵 Effectuer des dépôts
- 💸 Effectuer des retraits
- 📋 Historique des transactions
- 📊 Affichage des soldes actuels

### 🎨 Interface Utilisateur
- 🖥️ Design moderne et réactif
- 🌓 Thème sombre par défaut
- 📱 Compatible mobile
- 🚀 Animations fluides

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## ⚙️ Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/oui-12/tp16.git
   cd tp16
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Démarrer le serveur JSON (dans un terminal séparé)**
   ```bash
   npm run server
   # ou
   yarn server
   ```

4. **Démarrer l'application React**
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Accéder à l'application**
   Ouvrez votre navigateur et allez sur : [http://localhost:3000](http://localhost:3000)

## 🛠️ Structure du Projet

```
tp16/
├── public/               # Fichiers statiques
├── src/
│   ├── components/      # Composants React
│   │   ├── CompteList.js
│   │   ├── CreateCompte.js
│   │   ├── TransactionForm.js
│   │   └── TransactionList.js
│   ├── services/        # Services API
│   │   └── api.js
│   ├── App.js           # Composant principal
│   └── index.js         # Point d'entrée de l'application
├── db.json              # Base de données JSON
└── package.json         # Dépendances et scripts
```

## 🔧 API Endpoints

Le serveur JSON fournit les endpoints suivants :

- `GET /comptes` - Récupérer tous les comptes
- `POST /comptes` - Créer un nouveau compte
- `GET /comptes/:id` - Récupérer un compte par ID
- `PUT /comptes/:id` - Mettre à jour un compte
- `DELETE /comptes/:id` - Supprimer un compte
- `GET /transactions` - Récupérer toutes les transactions
- `POST /transactions` - Créer une nouvelle transaction

## 🎨 Personnalisation

### Thèmes
L'application utilise Tailwind CSS pour le style. Vous pouvez personnaliser les couleurs dans le fichier `tailwind.config.js`.

### Données Initiales
Vous pouvez modifier les données initiales en éditant le fichier `db.json`.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [React](https://reactjs.org/)
- [JSON Server](https://github.com/typicode/json-server)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter :

- 📧 Email: votre@email.com
- 🌐 Site web: [votresite.com](https://votresite.com)
- 🐦 Twitter: [@votrepseudo](https://twitter.com/votrepseudo)

---

<div align="center">
  <p>Fait avec ❤️ par Votre Nom</p>
  <p>✨ Merci d'avoir utilisé cette application ! ✨</p>
</div>