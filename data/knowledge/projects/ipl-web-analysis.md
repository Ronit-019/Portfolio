# IPL Web Analysis (2008-2024)

## Overview
An interactive Streamlit dashboard providing in-depth analysis of IPL team tally, player performance, batting, bowling, and head-to-head match statistics from 2008 to 2024.

## Problem
IPL cricket fans, analysts, and enthusiasts lack an interactive, unified way to analyze 17 seasons of historical statistics across teams, players, and head-to-head matchups.

## Solution
A multi-page Streamlit application using Pandas to read, clean, merge, and analyze match and ball-by-ball delivery datasets, presenting key metrics in an intuitive UI.

## Technical Details
- **Architecture Flow**: Decoupled Streamlit Frontend layout (app.py) from separate Python-based analysis modules to ensure code maintainability.
- **Dataset Integration**: Loads and merges matches.csv and deliveries.xls files inside a Pandas processing layer.

## Challenges & Resolutions
- **Aggregations Memory Constraints**: Processed millions of rows in the deliveries dataset by using optimized Pandas groupby groupings, pre-filtering matches, and lazy loading category details.
- **Outlier Strike/Economy Rankings**: Prevented batsmen or bowlers with very few records from skewing metrics by setting strict eligibility thresholds (minimum 100 runs for batters and minimum 120 balls for bowlers).
