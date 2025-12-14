// Default Company and Component Configuration
// Based on Reslink Energy quotation design

/**
 * Default company information
 */
export const DEFAULT_COMPANY_INFO = {
    name: 'Reslink Technologies Pvt. Ltd.',
    brandName: 'RESLINK ENERGY',
    presenterName: 'Aditya Deshmukh',
    totalCapacity: '45Mw',
    totalCapacityLabel: 'Total capacity installed',
    happyCustomers: '350+',
    happyCustomersLabel: 'Happy customers',
    cities: '10+',
    citiesLabel: 'Cities',
    missionStatement: 'We are on a mission to deliver 10,000 world-class solar installations ensuring maximum performance, durability, and ROI for every project.',
    contact: {
        phone: '9560523752',
        email: 'team@reslink.org',
        website: 'www.reslink.ai',
        address: '4A,Hauz Khas, New-Delhi, 110049'
    },
    footer: {
        amcNote: 'Each site is installed by Reslink Team end to end with 5 years of AMC & monitoring'
    }
};

/**
 * Default panel brands and specifications
 */
export const DEFAULT_PANELS = [
    {
        brand: 'Adani Solar',
        specs: 'Topcon bifacial, 580W',
        quantity: 6,
        category: 'Best panel OEMs'
    },
    {
        brand: 'Waaree',
        specs: 'Topcon bifacial, 580W',
        quantity: 6,
        category: 'Best panel OEMs'
    },
    {
        brand: 'Vikram Solar',
        specs: 'Topcon bifacial, 580W',
        quantity: 6,
        category: 'Best panel OEMs'
    }
];

/**
 * Default inverter brands and specifications
 */
export const DEFAULT_INVERTERS = [
    {
        brand: 'Sungrow',
        specs: 'Grid tied, 3kW Ongrid',
        quantity: 1,
        category: 'Best Inverter OEMs'
    },
    {
        brand: 'Solis',
        specs: 'Grid tied, 3kW Ongrid',
        quantity: 1,
        category: 'Best Inverter OEMs'
    },
    {
        brand: 'SolarEdge',
        specs: 'Grid tied, 3kW Ongrid',
        quantity: 1,
        category: 'Best Inverter OEMs'
    }
];

/**
 * Default structure and electrical components
 */
export const DEFAULT_STRUCTURE = [
    {
        component: 'HDGI Advanced structure',
        specs: 'HDGI Advanced structure',
        quantity: 'As per design',
        category: 'Structure & Electrical Components'
    },
    {
        component: 'ACDB, DCDB, MC4 Connectors, LA',
        specs: 'ACDB, DCDB, MC4 Connectors, LA',
        quantity: 'As per design',
        category: 'Structure & Electrical Components'
    },
    {
        component: '3 Earthing and all DC & AC Wiring',
        specs: '3 Earthing and all DC & AC Wiring',
        quantity: 'As per design',
        category: 'Structure & Electrical Components'
    }
];

/**
 * Component status badges
 */
export const COMPONENT_STATUS = {
    panels: { label: 'On Track', color: '#10b981' },
    inverters: { label: 'PR Checked', color: '#f59e0b' },
    structure: { label: 'GI Checked', color: '#10b981' }
};

/**
 * Scope of work details
 */
export const SCOPE_OF_WORK = [
    {
        item: 'System Design',
        deliverable: 'Net metering'
    },
    {
        item: 'Installation',
        deliverable: '5 year of free amc'
    }
];

/**
 * Notes and disclaimers
 */
export const DISCLAIMERS = {
    netMetering: 'Net metering is entirely dependent on DISCOM, we don\'t control their process',
    generation: 'Generation figures are indicative and may vary with site conditions, weather patterns.',
    components: 'Specific brands will be as per the product you choose',
    panels: 'All panels are checked before delivery',
    inverters: 'We are using grid tied ongrid inverters',
    structure: 'Our all structures are hot-diped GI'
};
