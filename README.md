# Hidden Voting Blocs in the UN General Assembly

The UN General Assembly is often described through familiar lenses — the West vs. the Global South, Cold War allegiances, regional solidarity. This project asks whether the voting data actually supports those groupings, or reveals something different.

**Live site:** [un-hidden-blocs.vercel.app](https://un-hidden-blocs.vercel.app)

---

## Question

Do countries vote together at the UN because of geography, Cold War allegiance, and regional blocs, or do the real fault lines cut differently?

---

## Findings

- **4 voting blocs** emerge from the data: Global South (79 countries), Western Bloc (57), Swing States (48), and a US-Aligned Core (13)
- US alignment dropped sharply after the Cold War across nearly all key countries, visible in decade-by-decade trends
- Human rights and Palestinian conflict resolutions show the starkest splits between blocs
- The most opposed pairs involve countries that share very few votes in common, suggesting deliberate diplomatic avoidance

---

## Pipeline

```
UNVotes.csv (380MB)
    │
    ▼
build_db.ipynb          → SQLite database (843K votes, 5195 resolutions, 198 countries)
    │
    ▼
eda_with_sql.ipynb   → SQL queries: issue breakdown, pairwise agreement, US alignment
    │
    ▼
clustering.ipynb     → K-means clustering (k=4), PCA visualization
    │
    ▼
output/*.json           → Pre-computed results served to frontend
    │
    ▼
frontend/               → React + Plotly interactive dashboard
```

---

## Stack

| Layer | Tools |
|---|---|
| Data & Storage | Python, pandas, SQLite, SQL (CTEs, window functions) |
| Analysis | scikit-learn (k-means, PCA), Jupyter Notebooks |
| Frontend | React, Vite, Plotly.js |
| Data Source | [Voeten, Strezhnev & Bailey (2009)](https://doi.org/10.7910/DVN/LEJUQZ), Harvard Dataverse |

---

## Running Locally

**Prerequisites:** Python 3.9+, Node.js 18+

```bash
# Install Python dependencies
pip install pandas country_converter scikit-learn plotly nbformat

# Run pipeline notebooks in order (pipeline/)
# 1. build_db.ipynb       — builds un_votes.db from UNVotes.csv
# 2. eda_with_sql.ipynb.ipynb
# 3. clustering.ipynb
# Then run the export script to generate output/*.json

# Frontend
cd frontend
npm install
npm run dev
```

> The raw CSV (`UNVotes.csv`, 380MB) is not included. Download it from Harvard Dataverse below.

---

## Citation

Voeten, Erik, Anton Strezhnev, and Michael Bailey. "United Nations General Assembly Voting Data." Harvard Dataverse, 2009.
[https://doi.org/10.7910/DVN/LEJUQZ](https://doi.org/10.7910/DVN/LEJUQZ)
