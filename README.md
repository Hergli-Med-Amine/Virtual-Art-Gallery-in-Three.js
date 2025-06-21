# Galerie d'Art Virtuelle - Three.js

Une galerie d'art virtuelle interactive créée avec Three.js, permettant aux utilisateurs de parcourir des œuvres d'art en 3D dans un environnement immersif.

## 🎨 Fonctionnalités

- **Navigation 3D** : Parcourez la galerie avec des contrôles de caméra fluides
- **Œuvres d'art réalistes** : Peintures célèbres affichées avec des textures haute qualité
- **Sculptures 3D** : Modèles géométriques placés sur des socles
- **Interactivité** : Cliquez sur les œuvres pour afficher des informations détaillées
- **Interface utilisateur moderne** : Panneau d'information élégant avec animations
- **Éclairage réaliste** : Ambiance de galerie avec ombres et éclairage directionnel
- **Design responsive** : Compatible avec tous les appareils

## 🖼️ Œuvres incluses

### Peintures
- **La Nuit Étoilée** - Vincent van Gogh (1889)
- **La Joconde** - Léonard de Vinci (1503-1519)
- **La Grande Vague** - Katsushika Hokusai (1831)
- **Le Cri** - Edvard Munch (1893)
- **Guernica** - Pablo Picasso (1937)

### Sculptures
- **Forme Abstraite I** - Artiste Contemporain (2020)
- **Équilibre** - Sculpteur Moderne (2019)

## 🚀 Installation et utilisation

1. **Cloner ou télécharger** le projet
2. **Ouvrir** `index.html` dans un navigateur web moderne
3. **Naviguer** dans la galerie en utilisant la souris :
   - Clic gauche + glisser : Faire pivoter la caméra
   - Molette : Zoomer/Dézoomer
   - Clic droit + glisser : Déplacer la vue
4. **Cliquer** sur une œuvre d'art pour voir ses détails
5. **Appuyer sur Échap** ou cliquer sur ✕ pour fermer le panneau d'information

## 🛠️ Technologies utilisées

- **Three.js** : Moteur 3D JavaScript
- **HTML5** : Structure de l'application
- **CSS3** : Styling et animations
- **JavaScript ES6** : Logique de l'application

## 📁 Structure du projet

```
Virtual-Art-Gallery/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── main.js             # Logique Three.js
└── README.md           # Documentation
```

## 🎮 Contrôles

- **Souris** : Navigation dans la galerie
- **Clic gauche** : Sélectionner une œuvre d'art
- **Échap** : Fermer le panneau d'information
- **Molette** : Zoom avant/arrière

## 🌟 Fonctionnalités avancées

- **Chargement progressif** : Écran de chargement avec spinner
- **Gestion d'erreurs** : Images de substitution si le chargement échoue
- **Animations fluides** : Transitions CSS pour l'interface utilisateur
- **Ombres réalistes** : Système d'ombres pour plus de réalisme
- **Matériaux physiques** : Rendu PBR pour les sculptures

## 🔧 Personnalisation

Pour ajouter de nouvelles œuvres d'art, modifiez le tableau `artworksData` dans `main.js` :

```javascript
{
    type: 'painting',
    title: 'Titre de l\'œuvre',
    artist: 'Nom de l\'artiste',
    year: 'Année',
    description: 'Description détaillée...',
    imageUrl: 'URL_de_l_image',
    position: { x: 0, y: 2, z: -9.8 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2, y: 1.5, z: 1 }
}
```

## 🎯 Objectifs pédagogiques atteints

✅ **Galerie virtuelle 3D** avec environnement réaliste  
✅ **Navigation utilisateur** avec OrbitControls  
✅ **Modèles 3D réalistes** pour peintures et sculptures  
✅ **Interactivité** avec système de raycasting  
✅ **Informations détaillées** sur les artistes et œuvres  
✅ **Interface utilisateur moderne** et responsive  
✅ **Éclairage professionnel** avec ombres  
✅ **Architecture modulaire** et maintenable  

## 📱 Compatibilité

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Améliorations futures possibles

- Chargement de modèles 3D GLTF/GLB pour les sculptures
- Système de navigation par salles multiples
- Mode VR/AR avec WebXR
- Effets sonores et musique d'ambiance
- Sauvegarde des œuvres favorites
- Partage sur réseaux sociaux
- Mode plein écran

## 📄 Licence

Ce projet est créé à des fins éducatives. Les images des œuvres d'art sont utilisées depuis Wikimedia Commons sous licence libre.

---

*Développé avec ❤️ pour l'apprentissage de Three.js*
