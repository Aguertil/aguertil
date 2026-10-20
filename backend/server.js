import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Charger les données JSON
const loadJSON = (filename) => {
  const filePath = join(__dirname, '../frontend/src/data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const debtData = loadJSON('debtData.json');
const presidentsData = loadJSON('presidentsData.json');
const networkData = loadJSON('networkData.json');
const promisesData = loadJSON('promisesData.json');

// Configuration de la dette en temps réel
const REFERENCE_DATE = new Date('2024-01-01T00:00:00Z');
const REFERENCE_DEBT = 3100000000000;
const DEBT_PER_SECOND = 2733;

// Fonction pour calculer la dette actuelle
const calculateCurrentDebt = () => {
  const now = new Date();
  const secondsElapsed = Math.floor((now - REFERENCE_DATE) / 1000);
  return REFERENCE_DEBT + (secondsElapsed * DEBT_PER_SECOND);
};

// ==================== ROUTES ====================

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API Observatoire Citoyen',
    version: '1.0.0',
    endpoints: {
      debt: {
        '/api/debt/current': 'Dette publique actuelle en temps réel',
        '/api/debt/stats': 'Statistiques de la dette',
        '/api/debt/historical': 'Données historiques 2014-2023',
        '/api/debt/projections': 'Projections futures'
      },
      presidents: {
        '/api/presidents': 'Liste de tous les présidents',
        '/api/presidents/:id': 'Détails d\'un président',
        '/api/presidents/ranking/:field': 'Classement par critère'
      },
      promises: {
        '/api/promises': 'Liste de tous les présidents avec leurs promesses',
        '/api/promises/:id': 'Détails des promesses d\'un président',
        '/api/promises/stats/global': 'Statistiques globales des promesses'
      },
      network: {
        '/api/network': 'Données complètes du réseau d\'influence',
        '/api/network/thinktanks': 'Liste des think tanks',
        '/api/network/billionaires': 'Liste des milliardaires',
        '/api/network/media': 'Liste des médias',
        '/api/network/entity/:id': 'Détails d\'une entité'
      }
    }
  });
});

// ==================== DETTE ====================

// Dette actuelle en temps réel
app.get('/api/debt/current', (req, res) => {
  const currentDebt = calculateCurrentDebt();
  const now = new Date();
  
  res.json({
    debt: currentDebt,
    debtFormatted: new Intl.NumberFormat('fr-FR').format(Math.floor(currentDebt)),
    debtPerSecond: DEBT_PER_SECOND,
    timestamp: now.toISOString(),
    referenceDate: REFERENCE_DATE.toISOString(),
    referenceDebt: REFERENCE_DEBT
  });
});

// Statistiques de la dette
app.get('/api/debt/stats', (req, res) => {
  const currentDebt = calculateCurrentDebt();
  
  res.json({
    currentDebt,
    population: debtData.population,
    activePopulation: debtData.activePopulation,
    gdp: debtData.gdp,
    annualInterest: debtData.annualInterest,
    debtPerSecond: debtData.debtPerSecond,
    interestPerSecond: debtData.interestPerSecond,
    calculations: {
      debtPerCapita: Math.floor(currentDebt / debtData.population),
      debtPerActive: Math.floor(currentDebt / debtData.activePopulation),
      debtToGdpPercent: ((currentDebt / debtData.gdp) * 100).toFixed(2),
      debtPerMinute: debtData.debtPerSecond * 60,
      debtPerHour: debtData.debtPerSecond * 3600,
      debtPerDay: debtData.debtPerSecond * 86400,
      debtPerYear: debtData.debtPerSecond * 31536000
    }
  });
});

// Données historiques
app.get('/api/debt/historical', (req, res) => {
  res.json({
    data: debtData.historicalData,
    summary: {
      startYear: debtData.historicalData[0].year,
      endYear: debtData.historicalData[debtData.historicalData.length - 1].year,
      startDebt: debtData.historicalData[0].debt,
      endDebt: debtData.historicalData[debtData.historicalData.length - 1].debt,
      totalIncrease: debtData.historicalData[debtData.historicalData.length - 1].debt - debtData.historicalData[0].debt,
      percentIncrease: (((debtData.historicalData[debtData.historicalData.length - 1].debt - debtData.historicalData[0].debt) / debtData.historicalData[0].debt) * 100).toFixed(2)
    }
  });
});

// Projections futures
app.get('/api/debt/projections', (req, res) => {
  const years = parseInt(req.query.years) || 5;
  const currentDebt = calculateCurrentDebt();
  const projections = [];
  
  for (let i = 1; i <= years; i++) {
    const futureDebt = currentDebt + (DEBT_PER_SECOND * 31536000 * i);
    projections.push({
      year: new Date().getFullYear() + i,
      projectedDebt: futureDebt,
      projectedGdpRatio: ((futureDebt / debtData.gdp) * 100).toFixed(2)
    });
  }
  
  res.json({
    baseDebt: currentDebt,
    baseYear: new Date().getFullYear(),
    projections
  });
});

// ==================== PRÉSIDENTS ====================

// Liste de tous les présidents
app.get('/api/presidents', (req, res) => {
  const sortBy = req.query.sortBy || 'startYear';
  const order = req.query.order || 'asc';
  const adjusted = req.query.adjusted === 'true';
  
  let presidents = [...presidentsData.presidents];
  
  presidents.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Si on demande les valeurs ajustées
    if (adjusted) {
      const adjustedField = sortBy + 'Adjusted';
      if (a[adjustedField] !== undefined) {
        aVal = a[adjustedField];
        bVal = b[adjustedField];
      }
    }
    
    return order === 'desc' ? bVal - aVal : aVal - bVal;
  });
  
  const debtField = adjusted ? 'debtIncreaseAdjusted' : 'debtIncrease';
  const debtPerYearField = adjusted ? 'debtPerYearAdjusted' : 'debtPerYear';
  
  res.json({
    count: presidents.length,
    adjusted,
    presidents,
    summary: {
      totalDebtAccumulated: presidents.reduce((sum, p) => sum + (p[debtField] || p.debtIncrease), 0),
      averageDebtPerYear: presidents.reduce((sum, p) => sum + (p[debtPerYearField] || p.debtPerYear), 0) / presidents.length,
      periodCovered: `${presidents[0].startYear}-${presidents[presidents.length - 1].endYear}`
    },
    note: presidentsData.inflationNote
  });
});

// Détails d'un président
app.get('/api/presidents/:id', (req, res) => {
  const president = presidentsData.presidents.find(p => p.id === parseInt(req.params.id));
  
  if (!president) {
    return res.status(404).json({ error: 'Président non trouvé' });
  }
  
  res.json(president);
});

// Classement des présidents par critère
app.get('/api/presidents/ranking/:field', (req, res) => {
  const { field } = req.params;
  const adjusted = req.query.adjusted === 'true';
  const validFields = ['debtIncrease', 'debtPerYear', 'gdpRatioEnd', 'years'];
  
  if (!validFields.includes(field)) {
    return res.status(400).json({ 
      error: 'Critère invalide',
      validFields 
    });
  }
  
  let sortField = field;
  
  // Si on demande les valeurs ajustées
  if (adjusted) {
    const adjustedField = field + 'Adjusted';
    // Vérifier si le champ ajusté existe pour le premier président
    if (presidentsData.presidents[0][adjustedField] !== undefined) {
      sortField = adjustedField;
    }
  }
  
  const ranking = [...presidentsData.presidents]
    .sort((a, b) => (b[sortField] || b[field]) - (a[sortField] || a[field]))
    .map((p, index) => ({
      rank: index + 1,
      name: p.name,
      period: p.period,
      value: p[sortField] || p[field],
      valueNominal: p[field],
      valueAdjusted: p[sortField] !== field ? p[sortField] : undefined,
      inflationCoefficient: p.inflationCoefficient,
      party: p.party
    }));
  
  res.json({
    field,
    adjusted,
    ranking,
    note: adjusted ? presidentsData.inflationNote : undefined
  });
});

// ==================== PROMESSES DE CAMPAGNE ====================

// Liste de tous les présidents avec leurs promesses
app.get('/api/promises', (req, res) => {
  res.json({
    count: promisesData.presidents.length,
    presidents: promisesData.presidents,
    statistics: promisesData.statistics,
    note: promisesData.note
  });
});

// Détails d'un président avec ses promesses
app.get('/api/promises/:id', (req, res) => {
  const president = promisesData.presidents.find(p => p.id === req.params.id);
  
  if (!president) {
    return res.status(404).json({ error: 'Président non trouvé' });
  }
  
  res.json(president);
});

// Statistiques globales des promesses
app.get('/api/promises/stats/global', (req, res) => {
  const stats = promisesData.statistics;
  const totalRate = ((stats.fulfilled + stats.partiallyFulfilled * 0.5) / stats.totalPromises * 100).toFixed(1);
  
  res.json({
    total: stats.totalPromises,
    fulfilled: stats.fulfilled,
    partiallyFulfilled: stats.partiallyFulfilled,
    notFulfilled: stats.notFulfilled,
    fulfillmentRate: totalRate + '%',
    averageDebtIncrease: stats.averageDebtIncrease + ' points de PIB'
  });
});

// ==================== RÉSEAU D'INFLUENCE ====================

// Données complètes du réseau
app.get('/api/network', (req, res) => {
  res.json({
    thinktanks: networkData.thinktanks,
    billionaires: networkData.billionaires,
    media: networkData.media,
    summary: {
      totalThinktanks: networkData.thinktanks.length,
      totalBillionaires: networkData.billionaires.length,
      totalMedia: networkData.media.length
    }
  });
});

// Liste des think tanks
app.get('/api/network/thinktanks', (req, res) => {
  res.json({
    count: networkData.thinktanks.length,
    thinktanks: networkData.thinktanks
  });
});

// Liste des milliardaires
app.get('/api/network/billionaires', (req, res) => {
  res.json({
    count: networkData.billionaires.length,
    billionaires: networkData.billionaires
  });
});

// Liste des médias
app.get('/api/network/media', (req, res) => {
  res.json({
    count: networkData.media.length,
    media: networkData.media
  });
});

// Détails d'une entité (think tank, milliardaire ou média)
app.get('/api/network/entity/:id', (req, res) => {
  const { id } = req.params;
  
  let entity = networkData.thinktanks.find(t => t.id === id);
  let type = 'thinktank';
  
  if (!entity) {
    entity = networkData.billionaires.find(b => b.id === id);
    type = 'billionaire';
  }
  
  if (!entity) {
    entity = networkData.media.find(m => m.id === id);
    type = 'media';
  }
  
  if (!entity) {
    return res.status(404).json({ error: 'Entité non trouvée' });
  }
  
  res.json({
    type,
    entity
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    message: 'Consultez / pour voir la liste des endpoints disponibles'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 API Observatoire Citoyen démarrée sur http://localhost:${PORT}`);
  console.log(`📊 Dette actuelle: ${new Intl.NumberFormat('fr-FR').format(Math.floor(calculateCurrentDebt()))} €`);
});
