import { EnquiryRecord, GpsRecord, StsTrackingRecord, CompetitorMapping } from '../types/reconciliation';
import { normalizeVesselName } from '../utils/normalizer';

export const SAMPLE_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'enq-1',
    date: '2025-03-03',
    vesselName: 'MSC BARI',
    normalizedVessel: normalizeVesselName('MSC BARI'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 1200,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 150,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 1200,
    mgoQty: 150,
    hsfoQty: 0,
    totalEnquiryQty: 1350
  },
  {
    id: 'enq-2',
    date: '2025-03-04',
    vesselName: 'M/V PACIFIC RUBY',
    normalizedVessel: normalizeVesselName('M/V PACIFIC RUBY'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 500,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 100,
    fuelGrade3: 'HSFO 380',
    qty3: 300,
    vlsfoQty: 500,
    mgoQty: 100,
    hsfoQty: 300,
    totalEnquiryQty: 900
  },
  {
    id: 'enq-3',
    date: '2025-03-05',
    vesselName: 'EVER GIVEN',
    normalizedVessel: normalizeVesselName('EVER GIVEN'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 2200,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 250,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 2200,
    mgoQty: 250,
    hsfoQty: 0,
    totalEnquiryQty: 2450
  },
  {
    id: 'enq-4',
    date: '2025-03-07',
    vesselName: 'MAERSK MC-KINNEY MOLLER',
    normalizedVessel: normalizeVesselName('MAERSK MC-KINNEY MOLLER'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 1800,
    fuelGrade2: 'HSFO 380',
    qty2: 800,
    fuelGrade3: 'LSMGO 0.1%',
    qty3: 150,
    vlsfoQty: 1800,
    mgoQty: 150,
    hsfoQty: 800,
    totalEnquiryQty: 2750
  },
  {
    id: 'enq-5',
    date: '2025-03-10',
    vesselName: 'COSCO SHIPPING PLANET',
    normalizedVessel: normalizeVesselName('COSCO SHIPPING PLANET'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 1400,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 200,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 1400,
    mgoQty: 200,
    hsfoQty: 0,
    totalEnquiryQty: 1600
  },
  {
    id: 'enq-6',
    date: '2025-03-12',
    vesselName: 'MT STAR AURORA',
    normalizedVessel: normalizeVesselName('MT STAR AURORA'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 750,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 80,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 750,
    mgoQty: 80,
    hsfoQty: 0,
    totalEnquiryQty: 830
  },
  {
    id: 'enq-7',
    date: '2025-03-14',
    vesselName: 'HAPAG AL JASRAH',
    normalizedVessel: normalizeVesselName('HAPAG AL JASRAH'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 950,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 120,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 950,
    mgoQty: 120,
    hsfoQty: 0,
    totalEnquiryQty: 1070
  },
  {
    id: 'enq-8',
    date: '2025-03-15',
    vesselName: 'NORNS',
    normalizedVessel: normalizeVesselName('NORNS'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 350,
    fuelGrade2: undefined,
    qty2: 0,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 350,
    mgoQty: 0,
    hsfoQty: 0,
    totalEnquiryQty: 350
  },
  {
    id: 'enq-9',
    date: '2025-03-17',
    vesselName: 'ONE APUS',
    normalizedVessel: normalizeVesselName('ONE APUS'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 1600,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 180,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 1600,
    mgoQty: 180,
    hsfoQty: 0,
    totalEnquiryQty: 1780
  },
  {
    id: 'enq-10',
    date: '2025-03-19',
    vesselName: 'BERGE OLYMPUS',
    normalizedVessel: normalizeVesselName('BERGE OLYMPUS'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 850,
    fuelGrade2: undefined,
    qty2: 0,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 850,
    mgoQty: 0,
    hsfoQty: 0,
    totalEnquiryQty: 850
  },
  {
    id: 'enq-11',
    date: '2025-03-22',
    vesselName: 'CMA CGM ANTOINE DE SAINT EXUPERY',
    normalizedVessel: normalizeVesselName('CMA CGM ANTOINE DE SAINT EXUPERY'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 2100,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 300,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 2100,
    mgoQty: 300,
    hsfoQty: 0,
    totalEnquiryQty: 2400
  },
  {
    id: 'enq-12',
    date: '2025-03-24',
    vesselName: 'GLOBAL VOYAGER',
    normalizedVessel: normalizeVesselName('GLOBAL VOYAGER'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 600,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 70,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 600,
    mgoQty: 70,
    hsfoQty: 0,
    totalEnquiryQty: 670
  },
  {
    id: 'enq-13',
    date: '2025-03-26',
    vesselName: 'NORDIC EMPRESS',
    normalizedVessel: normalizeVesselName('NORDIC EMPRESS'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 1100,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 120,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 1100,
    mgoQty: 120,
    hsfoQty: 0,
    totalEnquiryQty: 1220
  },
  {
    id: 'enq-14',
    date: '2025-03-28',
    vesselName: 'NORNS',
    normalizedVessel: normalizeVesselName('NORNS'),
    fuelGrade1: 'VLSFO 0.5%',
    qty1: 800,
    fuelGrade2: 'LSMGO 0.1%',
    qty2: 50,
    fuelGrade3: undefined,
    qty3: 0,
    vlsfoQty: 800,
    mgoQty: 50,
    hsfoQty: 0,
    totalEnquiryQty: 850
  }
];

// Realistic FLOW / GPS report records (demonstrating actual supply section with verified quantities & barges)
export const SAMPLE_GPS_RECORDS: GpsRecord[] = [
  {
    id: 'gps-1',
    vesselName: 'MSC BARI',
    normalizedVessel: normalizeVesselName('MSC BARI'),
    barge: 'GPS PATRIOT',
    quantity: 1342.5,
    date: '2025-03-04',
    sectionSource: 'Actual Supply Log'
  },
  {
    id: 'gps-2',
    vesselName: 'EVER GIVEN',
    normalizedVessel: normalizeVesselName('EVER GIVEN'),
    barge: 'GPS CENTURION',
    quantity: 2460.0,
    date: '2025-03-06',
    sectionSource: 'Actual Supply Log'
  },
  {
    id: 'gps-3',
    vesselName: 'COSCO SHIPPING PLANET',
    normalizedVessel: normalizeVesselName('COSCO SHIPPING PLANET'),
    barge: 'GPS PATRIOT',
    quantity: 1590.2,
    date: '2025-03-11',
    sectionSource: 'Actual Supply Log'
  },
  {
    id: 'gps-4',
    vesselName: 'ONE APUS',
    normalizedVessel: normalizeVesselName('ONE APUS'),
    barge: 'GPS ENDEAVOUR',
    quantity: 1775.8,
    date: '2025-03-18',
    sectionSource: 'Actual Supply Log'
  },
  {
    id: 'gps-5',
    vesselName: 'GLOBAL VOYAGER',
    normalizedVessel: normalizeVesselName('GLOBAL VOYAGER'),
    barge: 'GPS CENTURION',
    quantity: 672.0,
    date: '2025-03-25',
    sectionSource: 'Actual Supply Log'
  },
  {
    id: 'gps-6',
    vesselName: 'NORNS',
    normalizedVessel: normalizeVesselName('NORNS'),
    barge: 'GPS PATRIOT',
    quantity: 341.212,
    date: '2025-03-16',
    sectionSource: 'Actual Supply Log'
  }
];

// STS Bunkering / Tracking report records (competitor operations)
export const SAMPLE_TRACKING_RECORDS: StsTrackingRecord[] = [
  {
    id: 'sts-1',
    vesselName: 'PACIFIC RUBY',
    normalizedVessel: normalizeVesselName('PACIFIC RUBY'),
    barge: 'OCEAN PRIDE',
    competitor: 'TFG Marine',
    quantity: 895.0,
    date: '2025-03-05'
  },
  {
    id: 'sts-2',
    vesselName: 'MAERSK MC-KINNEY MOLLER',
    normalizedVessel: normalizeVesselName('MAERSK MC-KINNEY MOLLER'),
    barge: 'HERCULES STAR',
    competitor: 'Peninsula Petroleum',
    quantity: 2740.0,
    date: '2025-03-08'
  },
  {
    id: 'sts-3',
    vesselName: 'HAPAG AL JASRAH',
    normalizedVessel: normalizeVesselName('HAPAG AL JASRAH'),
    barge: 'MINERVA TITAN',
    competitor: 'Minerva Bunkering',
    quantity: 1065.0,
    date: '2025-03-15'
  },
  {
    id: 'sts-4',
    vesselName: 'CMA CGM ANTOINE DE SAINT EXUPERY',
    normalizedVessel: normalizeVesselName('CMA CGM ANTOINE DE SAINT EXUPERY'),
    barge: 'BUNKER DUKE',
    competitor: '', // Empty competitor to demonstrate barge mapping!
    quantity: 2380.0,
    date: '2025-03-23'
  }
];

export const INITIAL_COMPETITOR_MAPPINGS: CompetitorMapping[] = [
  { bargeName: 'BUNKER DUKE', competitorName: 'World Fuel Services' },
  { bargeName: 'SEABULK VOYAGER', competitorName: 'Shell Marine' },
  { bargeName: 'TRANS PETRO 1', competitorName: 'TFG Marine' }
];

export const SAMPLE_ENQUIRY_ROWS: unknown[][] = [
  ['Date', 'Vessel Name', 'Fuel Grade 1', 'Qty 1 (MT)', 'Fuel Grade 2', 'Qty 2 (MT)', 'Fuel Grade 3', 'Qty 3 (MT)', 'Total Enquiry Qty (MT)'],
  ['2025-03-03', 'MSC BARI', 'VLSFO 0.5%', 1200, 'LSMGO 0.1%', 150, '', 0, 1350],
  ['2025-03-04', 'M/V PACIFIC RUBY', 'VLSFO 0.5%', 500, 'LSMGO 0.1%', 100, 'HSFO 380', 300, 900],
  ['2025-03-05', 'EVER GIVEN', 'VLSFO 0.5%', 2200, 'LSMGO 0.1%', 250, '', 0, 2450],
  ['2025-03-07', 'MAERSK MC-KINNEY MOLLER', 'VLSFO 0.5%', 1800, 'HSFO 380', 800, 'LSMGO 0.1%', 150, 2750],
  ['2025-03-10', 'COSCO SHIPPING PLANET', 'VLSFO 0.5%', 1400, 'LSMGO 0.1%', 200, '', 0, 1600],
  ['2025-03-12', 'MT STAR AURORA', 'VLSFO 0.5%', 750, 'LSMGO 0.1%', 80, '', 0, 830],
  ['2025-03-14', 'HAPAG AL JASRAH', 'VLSFO 0.5%', 950, 'LSMGO 0.1%', 120, '', 0, 1070],
  ['2025-03-15', 'NORNS', 'VLSFO 0.5%', 350, '', 0, '', 0, 350],
  ['2025-03-17', 'ONE APUS', 'VLSFO 0.5%', 1600, 'LSMGO 0.1%', 180, '', 0, 1780],
  ['2025-03-19', 'BERGE OLYMPUS', 'VLSFO 0.5%', 850, '', 0, '', 0, 850],
  ['2025-03-22', 'CMA CGM ANTOINE DE SAINT EXUPERY', 'VLSFO 0.5%', 2100, 'LSMGO 0.1%', 300, '', 0, 2400],
  ['2025-03-24', 'GLOBAL VOYAGER', 'VLSFO 0.5%', 600, 'LSMGO 0.1%', 70, '', 0, 670],
  ['2025-03-26', 'NORDIC EMPRESS', 'VLSFO 0.5%', 1100, 'LSMGO 0.1%', 120, '', 0, 1220],
  ['2025-03-28', 'NORNS', 'VLSFO 0.5%', 800, 'LSMGO 0.1%', 50, '', 0, 850]
];

export const SAMPLE_GPS_ROWS: unknown[][] = [
  ['Date', 'Receiving Vessel', 'Supplying Barge', 'Actual Quantity (MT)', 'Section'],
  ['2025-03-04', 'MSC BARI', 'GPS PATRIOT', 1342.5, 'Actual Supply Log'],
  ['2025-03-06', 'EVER GIVEN', 'GPS CENTURION', 2460.0, 'Actual Supply Log'],
  ['2025-03-11', 'COSCO SHIPPING PLANET', 'GPS PATRIOT', 1590.2, 'Actual Supply Log'],
  ['2025-03-16', 'NORNS', 'GPS PATRIOT', 341.212, 'Actual Supply Log'],
  ['2025-03-18', 'ONE APUS', 'GPS ENDEAVOUR', 1775.8, 'Actual Supply Log'],
  ['2025-03-25', 'GLOBAL VOYAGER', 'GPS CENTURION', 672.0, 'Actual Supply Log']
];

export const SAMPLE_TRACKING_ROWS: unknown[][] = [
  ['Operation Date', 'Buyer Vessel', 'STS Barge', 'Competitor Company', 'Delivered MT'],
  ['2025-03-05', 'PACIFIC RUBY', 'OCEAN PRIDE', 'TFG Marine', 895.0],
  ['2025-03-08', 'MAERSK MC-KINNEY MOLLER', 'HERCULES STAR', 'Peninsula Petroleum', 2740.0],
  ['2025-03-15', 'HAPAG AL JASRAH', 'MINERVA TITAN', 'Minerva Bunkering', 1065.0],
  ['2025-03-23', 'CMA CGM ANTOINE DE SAINT EXUPERY', 'BUNKER DUKE', '', 2380.0]
];
