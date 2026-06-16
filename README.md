# Drought Severity Assessment using Multi-temporal Vegetation Condition Index (VCI)

## Project Overview

This project assesses drought severity in Kottayam District, Kerala using MODIS NDVI satellite imagery and the Vegetation Condition Index (VCI) in Google Earth Engine.

## Study Area

Kottayam District, Kerala, India

## Objectives

* Assess drought severity using multi-temporal NDVI data.
* Calculate Vegetation Condition Index (VCI).
* Classify drought severity into different categories.
* Generate area statistics for each drought class.

## Data Used

* MODIS MOD13Q1
* NDVI
* Kerala District Boundary Shapefile
* Google Earth Engine

## Methodology

1. MODIS NDVI Collection
2. NDVI Minimum Calculation
3. NDVI Maximum Calculation
4. Current NDVI Extraction
5. VCI Calculation
6. Drought Classification
7. Area Statistics

## Drought Classes

| VCI Range | Category          |
| --------- | ----------------- |
| < 0.2     | Extreme Drought   |
| 0.2 – 0.4 | Moderate Drought  |
| 0.4 – 0.6 | Mild Drought      |
| > 0.6     | Normal Vegetation |

## Results

| Category          | Area (sq.km) |
| ----------------- | ------------ |
| Extreme Drought   | 1.98         |
| Moderate Drought  | 9.14         |
| Mild Drought      | 224.95       |
| Normal Vegetation | 1965.62      |

## Tools Used

* Google Earth Engine
* MODIS Satellite Data
* GIS Techniques

## Report

The complete project report is available in this repository.

## Author

**Siyon Peter**
