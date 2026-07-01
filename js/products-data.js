/**
 * VP TRADELINK — Products Data
 * ─────────────────────────────────────────────────────────────
 * To ADD a product    → copy any product object, paste into the
 *                       correct category array, fill in fields.
 * To REMOVE a product → delete its object from the array.
 * To ADD a variant    → add an object to its `variants` array.
 * All specs are INDICATIVE. Do not remove the disclaimer flags.
 * ─────────────────────────────────────────────────────────────
 */

const VP_CATEGORIES = [
  { id: 'feed',     label: 'Feed Ingredients',    icon: 'feed',     description: 'High-protein de-oiled cakes sourced from established processors across India, used in compound animal feed formulations.' },
  { id: 'agro',     label: 'Agro Commodities',    icon: 'agro',     description: 'Premium agricultural commodities from established growers and processors, suited to food, spice, pharma and nutraceutical applications.' },
  { id: 'minerals', label: 'Industrial Minerals', icon: 'minerals', description: 'High-grade minerals from established Indian mines and beneficiation facilities, serving ceramics, glass, drilling and specialty industries.' }
];

const VP_PRODUCTS = [

  /* ── FEED INGREDIENTS ─────────────────────────────────────── */

  {
    id: 'rapeseed-meal',
    name: 'Rapeseed Meal',
    subtitle: 'De-Oiled Cake (DOC)',
    category: 'feed',
    hsn: '2306 41 00',
    image: 'images/products/rapeseed-meal.jpg',
    description: 'A high-protein by-product of rapeseed oil extraction, widely used as a protein source in compound animal feeds. Typically supplied from established solvent-extraction mills in Gujarat and Rajasthan.',
    variants: null,
    specs: [
      { parameter: 'Crude Protein',   min: 34,   max: 38,  unit: '%'  },
      { parameter: 'Crude Fat',       min: 2,    max: 4,   unit: '%'  },
      { parameter: 'Crude Fiber',     min: 10,   max: 14,  unit: '%'  },
      { parameter: 'Moisture',        min: null, max: 10,  unit: '%'  },
      { parameter: 'Total Ash',       min: 6,    max: 8,   unit: '%'  },
      { parameter: 'Sand & Silica',   min: null, max: 1.5, unit: '%'  }
    ],
    applications: ['Poultry feed — layers & broilers', 'Cattle & dairy nutrition', 'Swine feed formulations', 'Aquaculture feed'],
    packaging: ['50 kg PP woven bags', 'Approx. 20–22 MT per 20FT FCL']
  },

  {
    id: 'soybean-meal',
    name: 'Soybean Meal',
    subtitle: 'De-Oiled Cake (DOC)',
    category: 'feed',
    hsn: '2304 00 00',
    image: 'images/products/soybean-meal.jpg',
    description: 'The primary global protein source for commercial animal feed. Produced via solvent extraction, delivering a consistent amino acid profile. Typically supplied from established processing facilities.',
    variants: null,
    specs: [
      { parameter: 'Crude Protein',   min: 46,   max: 49,  unit: '%'  },
      { parameter: 'Crude Fat',       min: 1,    max: 2,   unit: '%'  },
      { parameter: 'Crude Fiber',     min: 5,    max: 7,   unit: '%'  },
      { parameter: 'Moisture',        min: null, max: 12,  unit: '%'  },
      { parameter: 'Total Ash',       min: 6,    max: 8,   unit: '%'  },
      { parameter: 'Urease Activity', min: null, max: 0.2, unit: 'ΔpH' }
    ],
    applications: ['Poultry feed — primary protein source', 'Swine & hog nutrition', 'Cattle & dairy formulations', 'Aquaculture & shrimp feed'],
    packaging: ['50 kg PP woven bags', 'Approx. 22–24 MT per 20FT FCL']
  },

  {
    id: 'dorb',
    name: 'De-Oiled Rice Bran',
    subtitle: 'DORB',
    category: 'feed',
    hsn: '2302 40 00',
    image: 'images/products/dorb.jpg',
    description: 'A nutritious by-product of rice bran oil extraction, rich in fiber and micronutrients. Widely used as an economical energy and bulk ingredient in ruminant and poultry feed formulations.',
    variants: null,
    specs: [
      { parameter: 'Crude Protein',  min: 12,   max: 15,  unit: '%' },
      { parameter: 'Crude Fat',      min: 1,    max: 3,   unit: '%' },
      { parameter: 'Crude Fiber',    min: 20,   max: 25,  unit: '%' },
      { parameter: 'Moisture',       min: null, max: 10,  unit: '%' },
      { parameter: 'Total Ash',      min: 12,   max: 15,  unit: '%' },
      { parameter: 'Sand & Silica',  min: null, max: 3,   unit: '%' }
    ],
    applications: ['Ruminant & cattle feed', 'Poultry feed — filler & bulking agent', 'Compound feed manufacturing', 'Aquaculture feed'],
    packaging: ['50 kg PP woven bags', 'Approx. 20–22 MT per 20FT FCL']
  },

  /* ── AGRO COMMODITIES ─────────────────────────────────────── */

  {
    id: 'cumin-seeds',
    name: 'Cumin Seeds',
    subtitle: 'Jeera — Machine Clean · Sortex · Europe Grade',
    category: 'agro',
    hsn: '0909 21 00',
    image: 'images/products/cumin-seeds.jpg',
    description: 'Aromatic cumin sourced from major growing regions in Rajasthan and Gujarat. Cleaned, sorted and graded to buyer specification. Typically available in Machine Clean, Sortex Clean and Europe grade.',
    variants: null,
    specs: [
      { parameter: 'Purity',          min: 98,   max: 99.5, unit: '%' },
      { parameter: 'Moisture',        min: null, max: 10,   unit: '%' },
      { parameter: 'Foreign Matter',  min: null, max: 1,    unit: '%' },
      { parameter: 'Other Seeds',     min: null, max: 0.5,  unit: '%' },
      { parameter: 'Volatile Oil',    min: 2.5,  max: 4,    unit: '%' }
    ],
    applications: ['Spice processing & grinding', 'Food flavouring & seasoning', 'Curry & masala manufacture', 'Pharmaceutical & Ayurvedic use'],
    packaging: ['25 kg or 50 kg PP bags', 'Approx. 19–21 MT per 20FT FCL']
  },

  {
    id: 'sesame-seeds',
    name: 'Sesame Seeds',
    subtitle: 'Natural White · Hulled White · Black',
    category: 'agro',
    hsn: '1207 40 10 / 1207 40 90',
    image: 'images/products/sesame-seeds.jpg',
    description: 'Sesame seeds sourced from established agricultural producers. Available in three variants to suit oil extraction, food processing and nutraceutical applications.',
    variants: [
      {
        name: 'Natural White Sesame',
        specs: [
          { parameter: 'Purity',          min: 99,   max: 99.95, unit: '%' },
          { parameter: 'Oil Content',     min: 48,   max: 52,    unit: '%' },
          { parameter: 'Moisture',        min: null, max: 6,     unit: '%' },
          { parameter: 'FFA (as Oleic)',  min: null, max: 1,     unit: '%' },
          { parameter: 'Foreign Matter',  min: null, max: 0.1,   unit: '%' }
        ]
      },
      {
        name: 'Hulled White Sesame',
        specs: [
          { parameter: 'Purity',      min: 99.95, max: null, unit: '%'  },
          { parameter: 'Oil Content', min: 48,    max: 52,   unit: '%'  },
          { parameter: 'Moisture',    min: null,  max: 5,    unit: '%'  },
          { parameter: 'Whiteness',   min: 42,    max: null, unit: '°WI' },
          { parameter: 'Ash',         min: null,  max: 1.5,  unit: '%'  }
        ]
      },
      {
        name: 'Black Sesame',
        specs: [
          { parameter: 'Purity',         min: 98,   max: 99.5, unit: '%' },
          { parameter: 'Oil Content',    min: 44,   max: 48,   unit: '%' },
          { parameter: 'Moisture',       min: null, max: 6,    unit: '%' },
          { parameter: 'Foreign Matter', min: null, max: 1,    unit: '%' }
        ]
      }
    ],
    applications: ['Sesame oil extraction', 'Bakery & confectionery topping', 'Tahini & paste production', 'Health food & nutraceuticals'],
    packaging: ['25 kg or 50 kg PP bags', 'Approx. 20–22 MT per 20FT FCL']
  },

  {
    id: 'turmeric',
    name: 'Turmeric',
    subtitle: 'Fingers / Slices · Powder',
    category: 'agro',
    hsn: '0910 30 00',
    image: 'images/products/turmeric.jpg',
    description: 'Turmeric sourced from primary growing regions. Available in whole finger/slice form and as processed powder. Curcumin levels are indicative and vary by grade and seasonal origin.',
    variants: [
      {
        name: 'Turmeric Fingers / Slices',
        specs: [
          { parameter: 'Curcumin Content', min: 3,    max: 5,  unit: '%' },
          { parameter: 'Moisture',         min: null, max: 10, unit: '%' },
          { parameter: 'Total Ash',        min: null, max: 8,  unit: '%' },
          { parameter: 'Foreign Matter',   min: null, max: 1,  unit: '%' }
        ]
      },
      {
        name: 'Turmeric Powder',
        specs: [
          { parameter: 'Curcumin Content', min: 3,    max: 5,   unit: '%'    },
          { parameter: 'Moisture',         min: null, max: 8,   unit: '%'    },
          { parameter: 'Total Ash',        min: null, max: 8,   unit: '%'    },
          { parameter: 'Mesh Size',        min: 60,   max: 100, unit: 'mesh' }
        ]
      }
    ],
    applications: ['Spice & curry manufacturing', 'Food colouring & flavouring', 'Pharmaceutical & nutraceutical use', 'Cosmetics & personal care'],
    packaging: ['25 kg or 50 kg PP bags', 'Approx. 18–20 MT per 20FT FCL']
  },

  {
    id: 'coriander-seeds',
    name: 'Coriander Seeds',
    subtitle: 'Dhaniya — Eagle · Scooter · Industrial Grade',
    category: 'agro',
    hsn: '0909 21 10',
    image: 'images/products/coriander-seeds.jpg',
    description: 'Coriander seeds cleaned, sorted and graded from major Indian producing regions. Typically available in Eagle, Scooter and Industrial grade specifications to suit varied processing requirements.',
    variants: null,
    specs: [
      { parameter: 'Purity',         min: 99,   max: 99.5, unit: '%' },
      { parameter: 'Moisture',       min: null, max: 10,   unit: '%' },
      { parameter: 'Foreign Matter', min: null, max: 1,    unit: '%' },
      { parameter: 'Volatile Oil',   min: 0.3,  max: 1,    unit: '%' },
      { parameter: 'Other Seeds',    min: null, max: 0.5,  unit: '%' }
    ],
    applications: ['Spice grinding & processing', 'Food flavouring & seasoning', 'Essential oil extraction', 'Pharmaceutical & Ayurvedic use'],
    packaging: ['25 kg or 50 kg PP bags', 'Approx. 19–21 MT per 20FT FCL']
  },

  {
    id: 'psyllium',
    name: 'Psyllium',
    subtitle: 'Seeds · Husk (Isabgol) · Husk Powder',
    category: 'agro',
    hsn: '1211 90 30 / 1211 90 40',
    image: 'images/products/psyllium.jpg',
    description: 'Psyllium products sourced from established processors in Gujarat and Rajasthan — India\'s primary producing regions. Available across food, pharmaceutical and industrial grades on request.',
    variants: [
      {
        name: 'Psyllium Seeds',
        specs: [
          { parameter: 'Purity',          min: 99,   max: null, unit: '%'  },
          { parameter: 'Mucilage Content',min: 8,    max: 12,   unit: '%'  },
          { parameter: 'Moisture',        min: null, max: 10,   unit: '%'  },
          { parameter: 'Foreign Matter',  min: null, max: 1,    unit: '%'  }
        ]
      },
      {
        name: 'Psyllium Husk (Isabgol)',
        specs: [
          { parameter: 'Husk Purity',    min: 85,   max: 99,  unit: '%'    },
          { parameter: 'Swelling Factor',min: 40,   max: 50,  unit: 'mL/g' },
          { parameter: 'Moisture',       min: null, max: 10,  unit: '%'    },
          { parameter: 'Ash',            min: null, max: 4,   unit: '%'    }
        ]
      },
      {
        name: 'Psyllium Husk Powder',
        specs: [
          { parameter: 'Husk Purity', min: 85,   max: 99, unit: '%'    },
          { parameter: 'Mesh Size',   min: 40,   max: 80, unit: 'mesh' },
          { parameter: 'Moisture',    min: null, max: 10, unit: '%'    },
          { parameter: 'Ash',         min: null, max: 4,  unit: '%'    }
        ]
      }
    ],
    applications: ['Dietary supplements & health foods', 'Pharmaceutical formulations', 'Food fiber additives', 'Industrial binding applications'],
    packaging: ['25 kg or 50 kg bags', 'Approx. 18–20 MT per 20FT FCL']
  },

  {
    id: 'moringa-powder',
    name: 'Moringa Powder',
    subtitle: 'Leaf Powder — Food & Organic Grades',
    category: 'agro',
    hsn: '1212 99 90',
    image: 'images/products/moringa-powder.jpg',
    description: 'Moringa leaf powder sourced from established processors in South India. Rich in protein and micronutrients. Organic-certified variants may be arranged subject to availability and minimum quantity.',
    variants: null,
    specs: [
      { parameter: 'Crude Protein',  min: 25,   max: 30,  unit: '%'    },
      { parameter: 'Moisture',       min: null, max: 8,   unit: '%'    },
      { parameter: 'Total Ash',      min: 8,    max: 10,  unit: '%'    },
      { parameter: 'Crude Fiber',    min: 6,    max: 10,  unit: '%'    },
      { parameter: 'Mesh Size',      min: 60,   max: 80,  unit: 'mesh' }
    ],
    applications: ['Dietary supplements & nutraceuticals', 'Food & beverage fortification', 'Pharmaceutical applications', 'Animal nutrition supplements'],
    packaging: ['20 kg or 25 kg bags', 'Approx. 16–18 MT per 20FT FCL']
  },

  /* ── INDUSTRIAL MINERALS ──────────────────────────────────── */

  {
    id: 'quartz',
    name: 'Quartz',
    subtitle: 'Lumps · Grits · Powder',
    category: 'minerals',
    hsn: '2505 10 00',
    image: 'images/products/quartz.jpg',
    description: 'High-purity quartz sourced from established mines and beneficiation facilities in Rajasthan. Available in three forms to serve glass, ceramics, foundry and specialty industrial requirements.',
    variants: [
      {
        name: 'Quartz Lumps',
        specs: [
          { parameter: 'SiO₂',     min: 98,   max: 99.9, unit: '%' },
          { parameter: 'Fe₂O₃',    min: null, max: 0.2,  unit: '%' },
          { parameter: 'Al₂O₃',    min: null, max: 0.5,  unit: '%' },
          { parameter: 'Moisture', min: null, max: 0.5,  unit: '%' }
        ]
      },
      {
        name: 'Quartz Grits',
        specs: [
          { parameter: 'SiO₂',       min: 98,   max: 99.5,                unit: '%'  },
          { parameter: 'Fe₂O₃',      min: null, max: 0.1,                 unit: '%'  },
          { parameter: 'Size Range',  min: null, max: null, text: '0–2 / 2–5 / 5–15 mm', unit: '' },
          { parameter: 'Moisture',    min: null, max: 0.5,                 unit: '%'  }
        ]
      },
      {
        name: 'Quartz Powder',
        specs: [
          { parameter: 'SiO₂',       min: 98,   max: 99.5,              unit: '%'  },
          { parameter: 'Fe₂O₃',      min: null, max: 0.1,               unit: '%'  },
          { parameter: 'Mesh Range', min: null, max: null, text: '100–800 mesh', unit: '' },
          { parameter: 'Moisture',   min: null, max: 0.5,               unit: '%'  }
        ]
      }
    ],
    applications: ['Glass & flat glass manufacturing', 'Ceramic tiles & sanitaryware', 'Foundry & moulding sand', 'Ferro-silicon production'],
    packaging: ['50 kg PP bags or 1 MT FIBC jumbo bags', 'Approx. 20–22 MT per 20FT FCL']
  },

  {
    id: 'feldspar',
    name: 'Feldspar',
    subtitle: 'Potash · Soda — Lumps & Powder',
    category: 'minerals',
    hsn: '2529 10 00',
    image: 'images/products/feldspar.jpg',
    description: 'Feldspar sourced from established mineral processing operations in Rajasthan and Gujarat. Available in Potash and Soda compositions, each in lumps and powder form for ceramics, glass and specialty applications.',
    variants: [
      {
        name: 'Potash Feldspar — Lumps',
        specs: [
          { parameter: 'K₂O',      min: 9,    max: 12,  unit: '%' },
          { parameter: 'SiO₂',     min: 65,   max: 70,  unit: '%' },
          { parameter: 'Al₂O₃',    min: 16,   max: 18,  unit: '%' },
          { parameter: 'Fe₂O₃',    min: null, max: 0.3, unit: '%' },
          { parameter: 'Moisture', min: null, max: 1,   unit: '%' }
        ]
      },
      {
        name: 'Potash Feldspar — Powder',
        specs: [
          { parameter: 'K₂O',       min: 9,    max: 12,                   unit: '%' },
          { parameter: 'SiO₂',      min: 65,   max: 70,                   unit: '%' },
          { parameter: 'Al₂O₃',     min: 16,   max: 18,                   unit: '%' },
          { parameter: 'Fe₂O₃',     min: null, max: 0.3,                  unit: '%' },
          { parameter: 'Mesh Range',min: null, max: null, text: '100–325 mesh', unit: '' }
        ]
      },
      {
        name: 'Soda Feldspar — Lumps',
        specs: [
          { parameter: 'Na₂O',     min: 7,    max: 11,  unit: '%' },
          { parameter: 'SiO₂',     min: 65,   max: 70,  unit: '%' },
          { parameter: 'Al₂O₃',    min: 16,   max: 18,  unit: '%' },
          { parameter: 'Fe₂O₃',    min: null, max: 0.5, unit: '%' },
          { parameter: 'Moisture', min: null, max: 1,   unit: '%' }
        ]
      },
      {
        name: 'Soda Feldspar — Powder',
        specs: [
          { parameter: 'Na₂O',      min: 7,    max: 11,                   unit: '%' },
          { parameter: 'SiO₂',      min: 65,   max: 70,                   unit: '%' },
          { parameter: 'Al₂O₃',     min: 16,   max: 18,                   unit: '%' },
          { parameter: 'Fe₂O₃',     min: null, max: 0.5,                  unit: '%' },
          { parameter: 'Mesh Range',min: null, max: null, text: '100–325 mesh', unit: '' }
        ]
      }
    ],
    applications: ['Ceramic tiles & sanitaryware', 'Glass & glass-ceramics', 'Vitrified & porcelain tiles', 'Enamel & glaze production'],
    packaging: ['50 kg PP bags or 1 MT FIBC jumbo bags', 'Approx. 20–22 MT per 20FT FCL']
  },

  {
    id: 'bentonite',
    name: 'Bentonite',
    subtitle: 'Sodium · Calcium · Activated',
    category: 'minerals',
    hsn: '2508 10 00',
    image: 'images/products/bentonite.jpg',
    description: 'Bentonite sourced from established mining and processing operations. Available in Sodium, Calcium and Acid-Activated compositions suited to drilling, foundry, animal feed and edible oil applications.',
    variants: [
      {
        name: 'Sodium Bentonite',
        specs: [
          { parameter: 'Swelling Index',    min: 20,   max: 60, unit: 'mL/2g' },
          { parameter: 'pH (2% solution)',  min: 8,    max: 10, unit: ''       },
          { parameter: 'Moisture',          min: null, max: 15, unit: '%'      },
          { parameter: 'Viscosity',         min: 30,   max: 50, unit: 'cP'    }
        ]
      },
      {
        name: 'Calcium Bentonite',
        specs: [
          { parameter: 'Blue Absorption',  min: 25,   max: 35, unit: 'g/100g' },
          { parameter: 'pH (2% solution)', min: 7,    max: 9,  unit: ''       },
          { parameter: 'Moisture',         min: null, max: 15, unit: '%'      },
          { parameter: 'Swelling Index',   min: 3,    max: 8,  unit: 'mL/2g' }
        ]
      },
      {
        name: 'Activated Bentonite',
        specs: [
          { parameter: 'Oil Adsorption',     min: 45,   max: 65, unit: 'g/100g'   },
          { parameter: 'pH (10% slurry)',    min: 3,    max: 6,  unit: ''         },
          { parameter: 'Moisture',           min: null, max: 12, unit: '%'        },
          { parameter: 'Free Acid',          min: null, max: 0.1,unit: 'N H₂SO₄' }
        ]
      }
    ],
    applications: ['Oil & gas drilling fluids', 'Foundry & iron-ore pelletisation', 'Animal feed binder', 'Edible oil clarification (Activated grade)'],
    packaging: ['50 kg PP bags or 1 MT FIBC jumbo bags', 'Approx. 20–22 MT per 20FT FCL']
  }

];
