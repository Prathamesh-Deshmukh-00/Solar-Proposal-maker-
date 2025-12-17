// Import all image assets for use in PDF
// Hero Images
import windTurbinesHero from '../assets/Images/wind_turbines_hero.png';
import solarPanelsImage from '../assets/Images/Solar system.png';

// Company Logos
import companyLogo from '../assets/Images/Company logo.png';
import companyLogo2 from '../assets/Images/company logo 2.png';

// Timeline & Spec Icons
import certificateLogo from '../assets/Images/Certificate Logo.png';
import trolleyLogo from '../assets/Images/Trorry Vehical.png';
import toolsLogo from '../assets/Images/Tool Logo.png'; // Installation
import electricianLogo from '../assets/Images/Eleectrician Logo.png';
import tealGearLogo from '../assets/Images/Teal Gars logo.png'; // Site Assessment
import commissioningLogo from '../assets/Images/Commisning Logo.png';

import zigZagArrow from '../assets/Images/zig zag Arrow.png'; // 15KW
import cubeLogo from '../assets/Images/Cube logo.png'; // HDGI Structure
import chargingAdapter from '../assets/Images/Charging addepter logo.png'; // Inverter
import gearLogo from '../assets/Images/Gare logo.png'; // Ongrid system fallback or specific

export const images = {
    hero: {
        windTurbines: windTurbinesHero,
        solarPanels: solarPanelsImage
    },
    logo: {
        company: companyLogo,
        companyFooter: companyLogo2
    },
    timeline: {
        permitting: certificateLogo,
        procurement: trolleyLogo,
        installation: toolsLogo,
        siteAssessment: tealGearLogo,
        electrical: electricianLogo,
        commissioning: commissioningLogo
    },
    specs: {
        capacity: zigZagArrow,
        structure: cubeLogo,
        inverter: chargingAdapter,
        ongrid: tealGearLogo // Reusing gear for system or could use Gare logo
    }
};

