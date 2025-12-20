import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  MapPin, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  AlertTriangle,
  Info,
  Zap,
  IndianRupee,
  TrendingUp,
  PiggyBank,
  ArrowLeft,
  Calculator,
  Clock,
  BarChart3,
  Download,
  FileText
} from 'lucide-react';
import { 
  ComposedChart,
  BarChart,
  Line,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { QuotationPDF } from './components/QuotationPDF';
import { 
  CoverPage, 
  AboutReslinkPage, 
  ROIPage, 
  GenerationPage, 
  ComponentsPage, 
  TimelinePage, 
  OfferTermsPage, 
  EnvironmentPage, 
  ThankYouPage 
} from './components/QuotationPages';
import { convertChartToImage } from './utils/chartToImage';
import { calculateEnvironmentalImpact } from './utils/environmentalCalculations';
import { DEFAULT_COMPANY_INFO, DEFAULT_PANELS, DEFAULT_INVERTERS, DEFAULT_STRUCTURE, DEFAULT_SYSTEM_DETAILS } from './utils/defaults';
import { images } from './utils/imageAssets';
import { toPng } from 'html-to-image';
import './App.css';

// ==========================================
// 1. HELPER FUNCTIONS (API & Logic)
// ==========================================

async function fetchSolarData(address, capacity, options = {}) {
  const apiKey = "z1mUz9LdRuyPZ1YXXgOdGTB2Gbz3sau18LojsdCl";

  if (!apiKey) throw new Error("Configuration Error: API Key is missing.");
  if (!address) throw new Error("Address is required.");
  if (!capacity) throw new Error("System Capacity is required.");

  const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData || geoData.length === 0) {
    throw new Error("Address not found. Please check City/District spelling.");
  }

  const lat = parseFloat(geoData[0].lat);
  const lon = parseFloat(geoData[0].lon);
  
  const finalConfig = {
    system_capacity: capacity,
    module_type: options.module_type || 0,
    array_type: options.array_type || 0,
    losses: options.losses || 20,
    azimuth: options.azimuth || 180,
    tilt: options.tilt || Math.abs(lat)
  };

  const params = new URLSearchParams({
    api_key: apiKey,
    lat: lat,
    lon: lon,
    ...finalConfig
  });

  const pvUrl = `https://developer.nrel.gov/api/pvwatts/v8.json?${params.toString()}`;
  const pvRes = await fetch(pvUrl);
  const pvData = await pvRes.json();

  if (pvData.errors && pvData.errors.length > 0) throw new Error(pvData.errors.join(", "));
  if (!pvData.outputs) throw new Error("API returned no data.");

  return {
    outputs: pvData.outputs,
    station_info: pvData.station_info,
    location: { lat, lon, display_name: geoData[0].display_name }
  };
}

const calculateFinancials = (capacity, plantCost, annualGeneration, isLoanEnabled, tenureYears, interestRate) => {
  const RATE_PER_UNIT = 8; 

  let subsidy = 0;
  if (capacity >= 3) subsidy = 78000;
  else if (capacity >= 2) subsidy = 60000;
  else if (capacity >= 1) subsidy = 30000;

  const netCost = Math.max(0, plantCost - subsidy);

  let emi = 0;
  if (isLoanEnabled && netCost > 0) {
    const monthlyRate = (interestRate / 100) / 12;
    const numMonths = tenureYears * 12;
    emi = (netCost * monthlyRate * Math.pow(1 + monthlyRate, numMonths)) / 
          (Math.pow(1 + monthlyRate, numMonths) - 1);
  }

  const annualSavings = annualGeneration * RATE_PER_UNIT;
  const paybackPeriod = netCost / annualSavings;
  
  const comparisonData = [];
  let balance = -netCost; // Start with negative investment

  for (let i = 1; i <= 25; i++) {
    balance += annualSavings; // Add yearly savings
    comparisonData.push({
       year: `Year ${i}`,
       savings: Math.round(balance)
    });
  }

  return {
    subsidy,
    netCost, 
    emi: Math.round(emi),
    isLoanEnabled,
    tenureString: isLoanEnabled ? `${tenureYears} Years` : 'N/A',
    annualSavings,
    lifetimeSavings: Math.round((annualSavings * 30) - netCost), // 30 years total savings minus investment
    paybackPeriod: parseFloat(paybackPeriod.toFixed(1)),
    comparisonData
  };
};

const processChartData = (outputs, capacity) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  // Base actual generation values for 1kW system (per month in kWh)
  // Original values were for 3kW, so divided by 3 to get per-kW values
  const baseGenerationPer1kW = [93.33, 123.33, 140, 143.33, 143.33, 123.33, 110, 120, 130, 140, 123.33, 93.33];
  
  // Scale by actual system capacity
  const actualGeneration = baseGenerationPer1kW.map(val => Math.round(val * capacity));

  return outputs.ac_monthly.map((val, index) => ({
    name: months[index],
    totalEnergy: Math.round(val), // Theoretical generation (teal bars)
    dailyAverage: parseFloat((val / daysInMonth[index]).toFixed(1)),
    fixedReference: actualGeneration[index] // Actual generation (black bars) - scaled by capacity
  }));
};

// ==========================================
// 2. COMPONENT: SOLAR FORM
// ==========================================

const SolarForm = ({ onCalculate, loading }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showComponents, setShowComponents] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showSystemDetails, setShowSystemDetails] = useState(false);
  
  const [formData, setFormData] = useState({
    // Customer Info
    customerName: '',
    customerCity: '',
    
    // Location
    state: 'Maharashtra',
    district: '',
    city: '',
    
    // System
    capacity: '3',
    plantCost: '195000', 
    
    // Advanced
    module_type: '0', 
    array_type: '0',
    losses: '20',
    tilt: '', 
    azimuth: '180',
    
    // Finance
    isLoanEnabled: false,
    loanTenure: 5,
    interestRate: 6,
    
    // Components (defaults)
    panels: DEFAULT_PANELS,
    inverters: DEFAULT_INVERTERS,
    structure: DEFAULT_STRUCTURE,
    
    // Company Info (defaults)
    companyInfo: DEFAULT_COMPANY_INFO,

    // System Details (defaults)
    systemDetails: DEFAULT_SYSTEM_DETAILS,
    
    // Proposal
    proposalNumber: '1'
  });

  useEffect(() => {
    const cap = parseFloat(formData.capacity);
    if (!isNaN(cap)) {
      if (cap >= 3 && cap <= 3.5) {
        setFormData(prev => ({ ...prev, plantCost: '195000' }));
      } else if (cap >= 5 && cap <= 5.5) {
        setFormData(prev => ({ ...prev, plantCost: '280000' }));
      }
    }
  }, [formData.capacity]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSystemDetailsChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      systemDetails: {
        ...prev.systemDetails,
        [section]: {
          ...prev.systemDetails[section],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = `${formData.city}, ${formData.district}, ${formData.state}`;
    onCalculate({ ...formData, address: fullAddress });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-4 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Customer Information */}
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-700 flex items-center gap-2">
              <FileText size={20} className="text-amber-500"/> Customer Information
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="e.g. Mr. Harsh"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-base"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">City *</label>
                <input
                  type="text"
                  name="customerCity"
                  placeholder="e.g. New-Delhi"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-base"
                  value={formData.customerCity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Location for Solar Calculation */}
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-700 flex items-center gap-2">
              <MapPin size={20} className="text-amber-500"/> Location Details (for Solar Calculation)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">State</label>
                <input
                  type="text"
                  name="state"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-base"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">District</label>
                <input
                  type="text"
                  name="district"
                  placeholder="e.g. Akola"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-base"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">City/Town</label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Telhara"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-base"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* System & Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-base font-bold text-slate-700 flex items-center gap-2">
                <Zap size={20} className="text-amber-500" /> System Size (kW)
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  name="capacity"
                  step="0.1"
                  placeholder="3"
                  className="w-full p-3 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-base"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
                <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-medium">kW</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base font-bold text-slate-700 flex items-center gap-2">
                <IndianRupee size={20} className="text-amber-500" /> Plant Cost (Pre-Subsidy)
              </label>
              <input
                type="number"
                inputMode="decimal"
                name="plantCost"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-base"
                value={formData.plantCost}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* EMI Section */}
          <div className="bg-amber-50/50 p-4 md:p-5 rounded-xl border border-amber-100 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <PiggyBank size={18} className="text-amber-600"/> 
                Enable EMI / Finance?
              </label>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${!formData.isLoanEnabled ? 'text-slate-600' : 'text-slate-400'}`}>No</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isLoanEnabled" 
                    checked={formData.isLoanEnabled} 
                    onChange={handleChange} 
                    className="sr-only peer" 
                  />
                  <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
                <span className={`text-sm font-medium ${formData.isLoanEnabled ? 'text-amber-600' : 'text-slate-400'}`}>Yes</span>
              </div>
            </div>

            {formData.isLoanEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Interest Rate (% p.a.)</label>
                  <input 
                    type="number"
                    inputMode="decimal" 
                    name="interestRate" 
                    step="0.1"
                    value={formData.interestRate} 
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Tenure: <span className="text-amber-600 font-bold">{formData.loanTenure} Years</span></label>
                  <input 
                    type="range" 
                    name="loanTenure" 
                    min="0.5" 
                    max="10" 
                    step="0.5" 
                    value={formData.loanTenure} 
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-4"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Company Details Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowCompany(!showCompany)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors p-2"
            >
              <FileText size={16} />
              {showCompany ? "Hide Company Profile" : "Edit Company Profile"}
              {showCompany ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showCompany && (
            <div className="space-y-6 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-2">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Company Brand Name</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, brandName: e.target.value }
                    }))}
                    value={formData.companyInfo.brandName}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    placeholder="e.g. RESLINK ENERGY"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Company Full Name</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, name: e.target.value }
                    }))}
                    value={formData.companyInfo.name}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    placeholder="e.g. Reslink Technologies Pvt. Ltd."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Quotation Created By</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, presenterName: e.target.value }
                    }))}
                    value={formData.companyInfo.presenterName}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    placeholder="e.g. Aditya Deshmukh"
                  />
                </div>
                 <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Company Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData(prev => ({
                            ...prev,
                            companyInfo: { ...prev.companyInfo, logo: reader.result }
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-sm"
                  />
                  {formData.companyInfo.logo && (
                    <img src={formData.companyInfo.logo} alt="Logo Preview" className="h-10 object-contain mt-2" />
                  )}
                </div>
              </div>

              <hr className="border-slate-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Phone Number</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { 
                        ...prev.companyInfo, 
                        contact: { ...prev.companyInfo.contact, phone: e.target.value } 
                      }
                    }))}
                    value={formData.companyInfo.contact.phone}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Email Address</label>
                  <input
                    type="email"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { 
                        ...prev.companyInfo, 
                        contact: { ...prev.companyInfo.contact, email: e.target.value } 
                      }
                    }))}
                    value={formData.companyInfo.contact.email}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                  />
                </div>
                 <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-500">Address</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { 
                        ...prev.companyInfo, 
                        contact: { ...prev.companyInfo.contact, address: e.target.value } 
                      }
                    }))}
                    value={formData.companyInfo.contact.address}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-500">Website</label>
                   <input
                    type="text"
                     onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { 
                        ...prev.companyInfo, 
                        contact: { ...prev.companyInfo.contact, website: e.target.value } 
                      }
                    }))}
                    value={formData.companyInfo.contact.website}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                  />
                </div>
              </div>

               <hr className="border-slate-200" />
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Total Capacity</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, totalCapacity: e.target.value }
                    }))}
                    value={formData.companyInfo.totalCapacity}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    placeholder="e.g. 45Mw"
                  />
                </div>
                 <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Happy Customers</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, happyCustomers: e.target.value }
                    }))}
                    value={formData.companyInfo.happyCustomers}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                     placeholder="e.g. 350+"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Cities</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, cities: e.target.value }
                    }))}
                    value={formData.companyInfo.cities}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                     placeholder="e.g. 10+"
                  />
                </div>
               </div>

            </div>
          )}

          {/* System Details Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowSystemDetails(!showSystemDetails)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors p-2"
            >
              <Settings size={16} />
              {showSystemDetails ? "Hide System Details" : "Edit System Details"}
              {showSystemDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showSystemDetails && (
            <div className="space-y-6 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-2">
              
              {/* 1. Panels Details */}
              <div>
                <h4 className="font-bold text-slate-700 mb-3">1. Panels Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Panel Capacity (Wp)</label>
                    <input
                      type="number"
                      max="1200"
                      value={formData.systemDetails.panels.capacity}
                      onChange={(e) => handleSystemDetailsChange('panels', 'capacity', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                      placeholder="e.g. 550"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Technology</label>
                    <select
                      value={formData.systemDetails.panels.technology}
                      onChange={(e) => handleSystemDetailsChange('panels', 'technology', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="TOPCon">TOPCon</option>
                      <option value="HJT">HJT</option>
                      <option value="Mono PERC">Mono PERC</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Company</label>
                    <select
                      value={['Waaree Energies', 'Adani Solar', 'Tata Power Solar', 'Vikram Solar'].includes(formData.systemDetails.panels.company) ? formData.systemDetails.panels.company : 'Other'}
                      onChange={(e) => handleSystemDetailsChange('panels', 'company', e.target.value === 'Other' ? '' : e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="Waaree Energies">Waaree Energies</option>
                      <option value="Adani Solar">Adani Solar</option>
                      <option value="Tata Power Solar">Tata Power Solar</option>
                      <option value="Vikram Solar">Vikram Solar</option>
                      <option value="Other">Other</option>
                    </select>
                    {(!['Waaree Energies', 'Adani Solar', 'Tata Power Solar', 'Vikram Solar'].includes(formData.systemDetails.panels.company)) && (
                      <input
                        type="text"
                        placeholder="Enter brand name"
                        value={formData.systemDetails.panels.company}
                        onChange={(e) => handleSystemDetailsChange('panels', 'company', e.target.value)}
                        className="w-full p-2 mt-1 bg-white border border-slate-200 rounded-md text-base"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Type</label>
                    <select
                      value={formData.systemDetails.panels.type}
                      onChange={(e) => handleSystemDetailsChange('panels', 'type', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="Bifacial">Bifacial</option>
                      <option value="Monofacial">Monofacial</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* 2. Inverter Details */}
              <div>
                <h4 className="font-bold text-slate-700 mb-3">2. Inverter Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Capacity</label>
                    <select
                      value={formData.systemDetails.inverter.capacity}
                      onChange={(e) => handleSystemDetailsChange('inverter', 'capacity', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(k => (
                        <option key={k} value={`${k}kw`}>{k}kw</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Type</label>
                    <select
                      value={formData.systemDetails.inverter.type}
                      onChange={(e) => handleSystemDetailsChange('inverter', 'type', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="Ongrid">Ongrid</option>
                      <option value="Offgrid">Offgrid</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Warranty</label>
                    <select
                      value={formData.systemDetails.inverter.warranty}
                      onChange={(e) => handleSystemDetailsChange('inverter', 'warranty', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      {Array.from({ length: 15 }, (_, i) => i + 1).map(y => (
                        <option key={y} value={`${y} years`}>{y} years</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Company</label>
                    <select
                       value={['Havells', 'Adani Solar', 'Waaree', 'Luminous', 'Sungrow', 'Growatt'].includes(formData.systemDetails.inverter.company) ? formData.systemDetails.inverter.company : 'Other'}
                       onChange={(e) => handleSystemDetailsChange('inverter', 'company', e.target.value === 'Other' ? '' : e.target.value)}
                       className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="Havells">Havells</option>
                      <option value="Adani Solar">Adani Solar</option>
                      <option value="Waaree">Waaree</option>
                      <option value="Luminous">Luminous</option>
                      <option value="Sungrow">Sungrow</option>
                      <option value="Growatt">Growatt</option>
                      <option value="Other">Other</option>
                    </select>
                    {(!['Havells', 'Adani Solar', 'Waaree', 'Luminous', 'Sungrow', 'Growatt'].includes(formData.systemDetails.inverter.company)) && (
                      <input
                        type="text"
                        placeholder="Enter brand name"
                        value={formData.systemDetails.inverter.company}
                        onChange={(e) => handleSystemDetailsChange('inverter', 'company', e.target.value)}
                        className="w-full p-2 mt-1 bg-white border border-slate-200 rounded-md text-base"
                      />
                    )}
                  </div>
                </div>
              </div>

               <hr className="border-slate-200" />

              {/* 3. Structure Details */}
              <div>
                <h4 className="font-bold text-slate-700 mb-3">3. Structure Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Material</label>
                     <select
                       value={['Stainless Steel (SS)', 'Pre-Galvanized (GP)', 'Aluminium', 'HDGI (Hot-Dip Galvanized Iron)', 'GI (Galvanized Iron)'].includes(formData.systemDetails.structure.material) ? formData.systemDetails.structure.material : 'Other'}
                       onChange={(e) => handleSystemDetailsChange('structure', 'material', e.target.value === 'Other' ? '' : e.target.value)}
                       className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="Stainless Steel (SS)">Stainless Steel (SS)</option>
                      <option value="Pre-Galvanized (GP)">Pre-Galvanized (GP)</option>
                      <option value="Aluminium">Aluminium</option>
                      <option value="HDGI (Hot-Dip Galvanized Iron)">HDGI (Hot-Dip Galvanized Iron)</option>
                      <option value="GI (Galvanized Iron)">GI (Galvanized Iron)</option>
                      <option value="Other">Other</option>
                    </select>
                    {(!['Stainless Steel (SS)', 'Pre-Galvanized (GP)', 'Aluminium', 'HDGI (Hot-Dip Galvanized Iron)', 'GI (Galvanized Iron)'].includes(formData.systemDetails.structure.material)) && (
                      <input
                        type="text"
                        placeholder="Enter material"
                        value={formData.systemDetails.structure.material}
                        onChange={(e) => handleSystemDetailsChange('structure', 'material', e.target.value)}
                        className="w-full p-2 mt-1 bg-white border border-slate-200 rounded-md text-base"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Front Leg Height</label>
                     <select
                      value={formData.systemDetails.structure.legHeightFront}
                      onChange={(e) => handleSystemDetailsChange('structure', 'legHeightFront', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                       {Array.from({ length: 25 }, (_, i) => i + 1).map(h => (
                        <option key={h} value={`${h} feet`}>{h} feet</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Back Leg Height</label>
                    <select
                      value={formData.systemDetails.structure.legHeightBack}
                      onChange={(e) => handleSystemDetailsChange('structure', 'legHeightBack', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                       {Array.from({ length: 25 }, (_, i) => i + 1).map(h => (
                        <option key={h} value={`${h} feet`}>{h} feet</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 col-span-1 md:col-span-3">
                    <label className="text-xs font-semibold text-slate-500">Dimensions (Leg & Rafter)</label>
                    <textarea
                      value={formData.systemDetails.structure.dimensionsLabel}
                      onChange={(e) => handleSystemDetailsChange('structure', 'dimensionsLabel', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base h-20"
                      placeholder="e.g. Leg: C 150x70x15x2 mm..."
                    />
                  </div>
                </div>
                 <div className="flex gap-6 mt-4 flex-wrap">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.systemDetails.structure.nutBolt}
                        onChange={(e) => handleSystemDetailsChange('structure', 'nutBolt', e.target.checked)}
                        className="accent-amber-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-slate-700">Nut Bolt Structure</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.systemDetails.structure.pathway}
                        onChange={(e) => handleSystemDetailsChange('structure', 'pathway', e.target.checked)}
                        className="accent-amber-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-slate-700">Pathway</span>
                    </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.systemDetails.structure.cChannel}
                        onChange={(e) => handleSystemDetailsChange('structure', 'cChannel', e.target.checked)}
                        className="accent-amber-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-slate-700">C-Channel</span>
                    </label>
                  </div>
              </div>

               <hr className="border-slate-200" />

              {/* 4. Electrical Components */}
              <div>
                <h4 className="font-bold text-slate-700 mb-3">4. Electrical Components</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">ACDB/DCDB Brand</label>
                     <select
                       value={['Polycab', 'L & T'].includes(formData.systemDetails.electrical.acdbDcdb) ? formData.systemDetails.electrical.acdbDcdb : 'Other'}
                       onChange={(e) => handleSystemDetailsChange('electrical', 'acdbDcdb', e.target.value === 'Other' ? '' : e.target.value)}
                       className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="Polycab">Polycab</option>
                      <option value="L & T">L & T</option>
                      <option value="Other">Other</option>
                    </select>
                    {(!['Polycab', 'L & T'].includes(formData.systemDetails.electrical.acdbDcdb)) && (
                      <input
                        type="text"
                        placeholder="Enter brand name"
                        value={formData.systemDetails.electrical.acdbDcdb}
                        onChange={(e) => handleSystemDetailsChange('electrical', 'acdbDcdb', e.target.value)}
                        className="w-full p-2 mt-1 bg-white border border-slate-200 rounded-md text-base"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Earthing Kit Brand</label>
                     <select
                       value={['SG Power', 'Polycab'].includes(formData.systemDetails.electrical.earthing) ? formData.systemDetails.electrical.earthing : 'Other'}
                       onChange={(e) => handleSystemDetailsChange('electrical', 'earthing', e.target.value === 'Other' ? '' : e.target.value)}
                       className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="SG Power">SG Power</option>
                      <option value="Polycab">Polycab</option>
                      <option value="Other">Other</option>
                    </select>
                    {(!['SG Power', 'Polycab'].includes(formData.systemDetails.electrical.earthing)) && (
                      <input
                        type="text"
                        placeholder="Enter brand name"
                        value={formData.systemDetails.electrical.earthing}
                        onChange={(e) => handleSystemDetailsChange('electrical', 'earthing', e.target.value)}
                        className="w-full p-2 mt-1 bg-white border border-slate-200 rounded-md text-base"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">MC4 Connectors</label>
                     <select
                       value={['True Power', 'Polycab'].includes(formData.systemDetails.electrical.mc4) ? formData.systemDetails.electrical.mc4 : 'Other'}
                       onChange={(e) => handleSystemDetailsChange('electrical', 'mc4', e.target.value === 'Other' ? '' : e.target.value)}
                       className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                      <option value="True Power">True Power</option>
                      <option value="Polycab">Polycab</option>
                      <option value="Other">Other</option>
                    </select>
                    {(!['True Power', 'Polycab'].includes(formData.systemDetails.electrical.mc4)) && (
                      <input
                        type="text"
                        placeholder="Enter brand name"
                        value={formData.systemDetails.electrical.mc4}
                        onChange={(e) => handleSystemDetailsChange('electrical', 'mc4', e.target.value)}
                        className="w-full p-2 mt-1 bg-white border border-slate-200 rounded-md text-base"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">AC Cable Size</label>
                    <select
                      value={formData.systemDetails.electrical.cableSize}
                      onChange={(e) => handleSystemDetailsChange('electrical', 'cableSize', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-base"
                    >
                       {Array.from({ length: 10 }, (_, i) => i + 1).map(s => (
                        <option key={s} value={`${s}sq mm`}>{s}sq mm</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Advanced Options Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors p-2"
            >
              <Settings size={16} />
              {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
              {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Module Type</label>
                <select name="module_type" value={formData.module_type} onChange={handleChange} className="w-full p-2 bg-white border border-slate-200 rounded-md text-base">
                  <option value="0">Standard</option>
                  <option value="1">Premium</option>
                  <option value="2">Thin Film</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Array Type</label>
                <select name="array_type" value={formData.array_type} onChange={handleChange} className="w-full p-2 bg-white border border-slate-200 rounded-md text-base">
                  <option value="0">Fixed - Open Rack</option>
                  <option value="1">Fixed - Roof Mount</option>
                  <option value="2">1-Axis Tracking</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">System Losses (%)</label>
                <input type="number" inputMode="decimal" name="losses" value={formData.losses} onChange={handleChange} className="w-full p-2 bg-white border border-slate-200 rounded-md text-base" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Azimuth (180=S)</label>
                <input type="number" inputMode="decimal" name="azimuth" value={formData.azimuth} onChange={handleChange} className="w-full p-2 bg-white border border-slate-200 rounded-md text-base" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">Tilt (deg) <Info size={12}/></label>
                <input type="number" inputMode="decimal" name="tilt" placeholder="Auto" value={formData.tilt} onChange={handleChange} className="w-full p-2 bg-white border border-slate-200 rounded-md text-base" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {loading ? <><Loader2 className="animate-spin" /> Calculating...</> : "Generate Quotation"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 3. COMPONENT: SOLAR RESULTS
// ==========================================

const SolarResults = ({ result, financials, formData, onReset, onGeneratePDF }) => {
  const chartData = processChartData(result.outputs, parseFloat(formData.capacity)); 
  const yearlyDailyAverage = (result.outputs.ac_annual / 365).toFixed(1);
  const roiChartRef = useRef(null);
  const generationChartRef = useRef(null);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500 pb-10">
      
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium transition-colors p-2"
        >
          <ArrowLeft size={20} /> New Calculation
        </button>
        
        <button
          onClick={() => onGeneratePDF(roiChartRef, generationChartRef)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]"
        >
          <Download size={20} /> Download PDF Quotation
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10"><PiggyBank size={40} className="text-amber-600" /></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Govt. Subsidy</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">₹{financials.subsidy.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10"><Zap size={40} className="text-amber-600" /></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Annual Generation</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{Math.round(result.outputs.ac_annual).toLocaleString()} Units</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10"><Clock size={40} className="text-amber-600" /></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Average</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{yearlyDailyAverage} Units</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-2xl shadow-lg border border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 size={20} className="text-amber-500"/> Monthly Production
            </h3>
            <p className="text-sm text-slate-500">Energy Generation Forecast</p>
          </div>
          
          <div className="h-[550px] md:h-[600px] w-full" ref={generationChartRef} style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }} barGap={2} barCategoryGap="55%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#000000', fontSize: 11, fontWeight: '500'}} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#000000', fontSize: 11, fontWeight: '500'}}
                  domain={[0, (dataMax) => {
                    // Round up to nearest 100
                    return Math.ceil(dataMax / 100) * 100;
                  }]}
                  ticks={(() => {
                    // Generate ticks at 100-unit intervals
                    const maxVal = Math.max(...chartData.map(d => Math.max(d.totalEnergy, d.fixedReference)));
                    const maxTick = Math.ceil(maxVal / 100) * 100;
                    const ticks = [];
                    for (let i = 0; i <= maxTick; i += 100) {
                      ticks.push(i);
                    }
                    return ticks;
                  })()}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '12px' }} cursor={{ fill: '#f5f5f5' }} />
                <Bar dataKey="fixedReference" name="Actual generation according to customer review" fill="#000000" radius={[4, 4, 0, 0]} barSize={19} />
                <Bar dataKey="totalEnergy" name="Theoretical generation according to weather and GHI conditions" fill="#2dd4bf" radius={[4, 4, 0, 0]} barSize={19} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ 
              position: 'absolute', 
              right: '0px', 
              top: '50%', 
              transform: 'translateY(-50%) rotate(-90deg)',
              transformOrigin: 'right center',
              fontSize: '10px',
              color: '#000000',
              whiteSpace: 'nowrap',
              fontWeight: '500'
            }}>
              Units produced per month
            </div>
          </div>

          {/* Custom Professional Legend */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '40px', 
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: '#000000',
                borderRadius: '3px',
                flexShrink: 0
              }}></div>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '500', 
                color: '#374151',
                lineHeight: '1.4'
              }}>
                Actual generation according to customer review
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: '#2dd4bf',
                borderRadius: '3px',
                flexShrink: 0
              }}></div>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '500', 
                color: '#374151',
                lineHeight: '1.4'
              }}>
                Theoretical generation according to weather and GHI conditions
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Impact Analysis</h3>
            <p className="text-slate-400 text-sm mb-6">Based on {result.location.display_name.split(',')[0]}</p>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Est. Yearly Savings</p>
                <p className="text-3xl font-bold text-amber-400">₹{financials.annualSavings.toLocaleString()}</p>
                <p className="text-xs text-slate-400">@ ₹8/Unit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Chart */}
<div className="h-[1540px] w-full" ref={roiChartRef} style={{ backgroundColor: '#02746A', paddingTop: '10px', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '0px', borderRadius: '8px' }}>
  <ResponsiveContainer width="100%" height="100%">
    {(() => {
      // 1️⃣ Find max value in LAKHS
      const maxValueInLakhs = Math.max(
        ...financials.comparisonData.map(d => Math.abs(d.savings / 100000))
      );

      // 2️⃣ Decide step based on max (in lakhs)
      let STEP = 5;
      if (maxValueInLakhs <= 5) STEP = 1;
      else if (maxValueInLakhs <= 10) STEP = 2;
      else if (maxValueInLakhs <= 15) STEP = 3;
      else if (maxValueInLakhs > 24) STEP = 5;

      // 3️⃣ Round max value to nearest step
      const yAxisMaxInLakhs = Math.ceil(maxValueInLakhs / STEP) * STEP;

      // 4️⃣ Generate ticks in RUPEES (for the chart)
      const yTicks = Array.from(
        { length: yAxisMaxInLakhs / STEP + 1 },
        (_, i) => i * STEP * 100000  // Convert back to rupees
      );

      return (
        <ComposedChart
          data={financials.comparisonData}
          margin={{ top: 30, right: 10, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#000000" strokeWidth={0.5} vertical={false} />

          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            angle={-90}
            textAnchor="end"
            height={130}
            interval={0}
            tick={{ 
              fill: '#000000', 
              fontSize: 32, 
              fontWeight: 'bold',
              fontFamily: 'Arial Narrow, Roboto Condensed, sans-serif-condensed'
            }}
          />

          <YAxis
            orientation="right"
            axisLine={false}
            tickLine={false}
            ticks={yTicks}
            domain={[0, yAxisMaxInLakhs * 100000]}
            allowDecimals={false}
            tickFormatter={(value) => {
              const lakhs = Math.round(Math.abs(value/100000));
              return lakhs === 0 ? '₹0' : `₹${lakhs}.0L`;
            }}
            tick={{ 
              fill: '#000000', 
              fontSize: 30, 
              fontWeight: 'bold', 
              dx: 10,
              fontFamily: 'Arial Narrow, Roboto Condensed, sans-serif-condensed'
            }}
            width={90}
          />

          <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, value >= 0 ? 'Profit' : 'Investment Balance']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#ffffff' }} />

          <ReferenceLine y={0} stroke="#000000" strokeWidth={0.5} />

          <Bar
            dataKey="savings"
            name="ROI Balance"
            fill="#E8E8E8"
            barSize={25}
            radius={[14, 14, 0, 0]}
          />
        </ComposedChart>
      );
    })()}
  </ResponsiveContainer>
</div>




      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Investment</p>
              <Calculator className="text-slate-500" size={20}/>
            </div>
            <p className="text-3xl font-bold">₹{financials.netCost.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">(Plant Cost - Subsidy)</p>
          </div>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-200 text-xs font-bold uppercase tracking-wider">Total Savings (30 Yrs)</p>
              <TrendingUp className="text-green-200" size={20}/>
            </div>
            <p className="text-3xl font-bold">₹{financials.lifetimeSavings.toLocaleString()}</p>
            <p className="text-xs text-green-200 mt-1">Pure generation value @ ₹8/unit</p>
          </div>
        </div>

        {financials.isLoanEnabled && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Monthly EMI</p>
                <PiggyBank className="text-amber-500" size={20}/>
              </div>
              <p className="text-3xl font-bold text-slate-800">₹{financials.emi.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-1">For {financials.tenureString}</p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-400 mt-4 pb-4">
        <p>Calculation based on location: {result.location.display_name}</p>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP ORCHESTRATOR
// ==========================================

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [formData, setFormData] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  const handleCalculate = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setFinancials(null);
    setFormData(data);

    try {
      const advancedOptions = {
        module_type: data.module_type,
        array_type: data.array_type,
        losses: data.losses,
        tilt: data.tilt,
        azimuth: data.azimuth
      };

      const solarData = await fetchSolarData(
        data.address, 
        data.capacity, 
        advancedOptions
      );
      
      const plantCost = parseFloat(data.plantCost) || 0;
      
      const finData = calculateFinancials(
        parseFloat(data.capacity),
        plantCost,
        solarData.outputs.ac_annual,
        data.isLoanEnabled,     
        parseFloat(data.loanTenure),
        parseFloat(data.interestRate) || 0
      );

      const envImpact = calculateEnvironmentalImpact(solarData.outputs.ac_annual);

      setResult(solarData);
      setFinancials(finData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async (roiChartRef, generationChartRef) => {
    try {
      // Wait a bit to ensure charts are fully rendered
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Hide all tooltips before capturing
      const tooltips = document.querySelectorAll('.recharts-tooltip-wrapper');
      tooltips.forEach(tooltip => {
        tooltip.style.display = 'none';
      });
      
      // Convert charts to images
      const roiChartImage = await convertChartToImage(roiChartRef.current);
      const generationChartImage = await convertChartToImage(generationChartRef.current);

      // Restore tooltips
      tooltips.forEach(tooltip => {
        tooltip.style.display = '';
      });

      const envImpact = calculateEnvironmentalImpact(result.outputs.ac_annual);

      setPdfData({
        formData,
        result,
        financials,
        envImpact,
        charts: {
          roiChart: roiChartImage,
          generationChart: generationChartImage
        }
      });
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    }
  };

  const handleReset = () => {
    setResult(null);
    setFinancials(null);
    setError(null);
    setFormData(null);
    setPdfData(null);
  };

  const handleDownloadImages = async () => {
    if (!pdfData) return;

    const pages = [
      { component: CoverPage, name: 'Page_1_Cover' },
      { component: AboutReslinkPage, name: 'Page_2_About_Reslink' },
      { component: ROIPage, name: 'Page_3_ROI_Summary' },
      { component: GenerationPage, name: 'Page_4_Generation' },
      { component: ComponentsPage, name: 'Page_5_Components' },
      { component: TimelinePage, name: 'Page_6_Timeline' },
      { component: OfferTermsPage, name: 'Page_7_Offer_Terms' },
      { component: EnvironmentPage, name: 'Page_8_Environment_Impact' },
      { component: ThankYouPage, name: 'Page_9_Thank_You' }
    ];

    try {
      for (let i = 0; i < pages.length; i++) {
        const { component: PageComponent, name } = pages[i];
        
        // Create a temporary container
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        document.body.appendChild(container);

        // Render the page component
        const root = await import('react-dom/client').then(m => m.createRoot(container));
        await new Promise(resolve => {
          root.render(<PageComponent data={pdfData} />);
          setTimeout(resolve, 500); // Wait for rendering
        });

        // Determine height based on page type
        // Cover page needs to be shorter (750px) to match CSS and avoid gaps
        const isCover = name === 'Page_1_Cover';
        const pageHeight = isCover ? 750 : 1123;

        // Convert to image
        const dataUrl = await toPng(container.firstChild, {
          width: 794,
          height: pageHeight,
          backgroundColor: '#ffffff'
        });

        // Download the image
        const link = document.createElement('a');
        link.download = `Solar_Quotation_${formData.customerName.replace(/\s+/g, '_')}_${name}.png`;
        link.href = dataUrl;
        link.click();

        // Cleanup
        root.unmount();
        document.body.removeChild(container);

        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } catch (err) {
      console.error('Error downloading images:', err);
      setError('Failed to download images. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 text-amber-500">
            <Sun size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Solar Quotation Maker</h1>
          <p className="text-slate-500">Professional Grade Estimation • Powered by NREL</p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-start gap-3 animate-in slide-in-from-bottom-2">
            <AlertTriangle className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {!result ? (
          <SolarForm onCalculate={handleCalculate} loading={loading} />
        ) : (
          <SolarResults 
            result={result} 
            financials={financials}
            formData={formData}
            onReset={handleReset}
            onGeneratePDF={handleGeneratePDF}
          />
        )}

        {/* PDF Download Button */}
        {pdfData && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={async () => {
                try {
                  const { pdf } = await import('@react-pdf/renderer');
                  const blob = await pdf(<QuotationPDF data={pdfData} />).toBlob();
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `Solar_Quotation_${formData.customerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
                  link.style.display = 'none';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setTimeout(() => URL.revokeObjectURL(url), 100);
                } catch (err) {
                  console.error('Error downloading PDF:', err);
                  setError('Failed to download PDF. Please try again.');
                }
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95"
            >
              <Download size={20} /> Download PDF
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
