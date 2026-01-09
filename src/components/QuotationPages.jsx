import React from 'react';
import './QuotationPages.css';
import { images } from '../utils/imageAssets';

// Cover Page
export const CoverPage = ({ data }) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Format time
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="quotation-page cover-page">
      {/* Hero Image Section */}
      <div className="cover-hero">
        <img 
          src={images.hero.windTurbines} 
          alt="Wind Turbines" 
          className="hero-image"
        />
      </div>

      {/* Main Content */}
      <div className="cover-layout">
        {/* Left Section */}
        <div className="cover-left">
          <div className="cover-logo-section" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={images.logo.company} 
              alt="Company Logo" 
              className="company-logo-header"
              style={{ width: '120px', height: 'auto', objectFit: 'contain' }}
            />
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0', letterSpacing: '0.5px' }}>
              {data.formData.companyInfo.brandName}
            </p>
          </div>
          
          <div className="cover-company-info">
            <p className="company-name">{data.formData.companyInfo.name}</p>
          </div>
          
          <div className="cover-proposal-number">
            <p>Proposal no {data.formData.proposalNumber}</p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="cover-divider"></div>

        {/* Right Section */}
        <div className="cover-right">
          <h1 className="cover-main-title">SOLAR PROPOSAL</h1>
          
          <div className="cover-system-details">
            <h2 className="cover-system-type">ONGRID {data.formData.capacity}KW</h2>
            <p className="cover-date">{currentDate}</p>
          </div>
          
          <div className="cover-client-section">
            <p className="cover-client-label">Client name: <span className="cover-client-value">{data.formData.customerName}</span></p>
            <p className="cover-client-label">Address: <span className="cover-client-value">{data.formData.customerCity}</span></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="cover-footer">
        <div className="footer-left">
          <div className="footer-item">
            <div className="footer-label">Prepared for</div>
            <div className="footer-value">{data.formData.customerName}</div>
          </div>
          <div className="footer-item">
            <div className="footer-label">Presented by</div>
            <div className="footer-value">{data.formData.companyInfo.presenterName}</div>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-logo">
            <img 
              src={images.logo.companyFooter} 
              alt="Company Logo" 
              className="company-logo-footer"
              style={{ width: '50px', height: 'auto', objectFit: 'contain' }}
            />
          </div>
          <div className="footer-generated">
            <div className="footer-label">Generated on</div>
            <div className="footer-value">{currentDate} | {currentTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Reslink Page
export const AboutReslinkPage = ({ data }) => (
  <div className="quotation-page">
    {/* Modern Header with Logo and Branding */}
    <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
      <span className="header-subtitle" style={{ fontSize: '11px', color: '#64748b', fontWeight: '400' }}>
        {data.formData.capacity}kW Ongrid Proposal
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
        <img 
          src={images.logo.company} 
          alt="Company Logo" 
          style={{ width: '80px', height: 'auto', objectFit: 'contain' }}
        />
        <span style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px', marginLeft: '-10px' }}>
          {data.formData.companyInfo.brandName}
        </span>
      </div>
    </div>

    <h2 className="section-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px', letterSpacing: '0.5px' }}>ABOUT {data.formData.companyInfo.brandName.toUpperCase()}</h2>
    {/* Conditional Content: Combined Text if metrics are missing, otherwise Mission + Standard Metrics */
    (parseInt(data.formData.companyInfo.happyCustomers) <= 0 && parseInt(data.formData.companyInfo.totalCapacity) <= 0) ? (
      <div className="company-info-text" style={{ 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ 
          fontSize: '11px', 
          lineHeight: '1.6', 
          color: '#334155', 
          margin: 0,
          textAlign: 'justify' 
        }}>
          We are on a mission to deliver 10,000 world-class solar installations ensuring maximum performance, durability, and ROI for every project. Aditya Solar Energy is a leading rooftop solar solutions provider committed to making solar power affordable and hassle-free. We offer zero-investment solar systems with easy EMI options—pay an amount equal to your electricity bill and start saving from day one. With end-to-end installation, government subsidy assistance, and premium-quality panels backed by a 25-year warranty, we ensure long-term value and reliability. Serving residential, commercial, and industrial customers, we help you enjoy clean, cost-effective solar energy and free power for decades.
        </p>
      </div>
    ) : (
      <>
        <p className="section-text" style={{ fontSize: '13px', lineHeight: '1.8', color: '#334155', marginBottom: '35px' }}>
          {data.formData.companyInfo.missionStatement}
        </p>

        <div className="company-metrics" style={{ display: 'flex', gap: '20px', marginBottom: '35px' }}>
          <div className="metric-card" style={{ 
            flex: 1, 
            background: '#000', 
            color: 'white', 
            padding: '25px 20px', 
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div className="metric-value" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              {data.formData.companyInfo.totalCapacity}
            </div>
            <div className="metric-label" style={{ fontSize: '10px', opacity: '0.9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {data.formData.companyInfo.totalCapacityLabel}
            </div>
          </div>
          <div className="metric-card" style={{ 
            flex: 1, 
            background: '#000', 
            color: 'white', 
            padding: '25px 20px', 
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div className="metric-value" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              {data.formData.companyInfo.happyCustomers}
            </div>
            <div className="metric-label" style={{ fontSize: '10px', opacity: '0.9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {data.formData.companyInfo.happyCustomersLabel}
            </div>
          </div>
          <div className="metric-card" style={{ 
            flex: 1, 
            background: '#000', 
            color: 'white', 
            padding: '25px 20px', 
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div className="metric-value" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              {data.formData.companyInfo.cities}
            </div>
            <div className="metric-label" style={{ fontSize: '10px', opacity: '0.9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {data.formData.companyInfo.citiesLabel}
            </div>
          </div>
        </div>
      </>
    )}
    {/* Large Solar Panels Image */}
    <div style={{ marginTop: '30px', marginBottom: '25px' }}>
      <img 
        src={images.hero.solarPanels} 
        alt="Solar Panels Installation" 
        style={{ 
          width: '100%', 
          height: '350px', 
          objectFit: 'cover',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
        }}
      />
    </div>

    <p className="amc-note" style={{ 
      fontSize: '11px', 
      color: '#64748b', 
      fontStyle: 'italic', 
      marginTop: '25px',
      lineHeight: '1.6',
      textAlign: 'center'
    }}>
      {data.formData.companyInfo.footer.amcNote.replace(/Reslink/g, data.formData.companyInfo.brandName)}
    </p>

    <div className="page-footer" style={{ 
      borderTop: '1px solid #e2e8f0', 
      paddingTop: '15px',
      marginTop: '30px'
    }}>
      <span>{data.formData.capacity}kW Ongrid proposal</span>
      <span>PAGE 2</span>
      <span>Generated by {data.formData.companyInfo.brandName}</span>
    </div>
  </div>
);

// ROI Summary Page (Page 4)
// export const ROIPage = ({ data }) => {
//   return (
//     <div className="quotation-page roi-page" style={{ 
//       background: '#14807d', 
//       color: '#FFFFFF', 
//       padding: '40px',
//       position: 'relative'
//     }}>
//       {/* Header - Small text at top left */}
//       <div style={{ marginBottom: '20px' }}>
//         <p style={{ 
//           fontSize: '11px', 
//           color: '#FFFFFF', 
//           margin: '0', 
//           fontWeight: '400', 
//           opacity: '0.85' 
//         }}>
//           {data.formData.capacity}kW Ongrid Proposal
//         </p>
//       </div>

//       {/* Main Title */}
//       <h1 style={{ 
//         fontSize: '48px', 
//         fontWeight: '700', 
//         margin: '0 0 8px 0', 
//         color: '#FFFFFF',
//         letterSpacing: '3px',
//         lineHeight: '1.1'
//       }}>
//         {data.formData.capacity}KW ONGRID ROI
//       </h1>
      
//       {/* Subtitle */}
//       <p style={{ 
//         fontSize: '11px', 
//         color: '#FFFFFF', 
//         margin: '0 0 30px 0',
//         fontWeight: '400',
//         letterSpacing: '0.8px',
//         opacity: '0.9',
//         textTransform: 'uppercase'
//       }}>
//         SOLAR IS ONE OF THE BEST INVESTMENT YOU WILL EVER MAKE
//       </p>

//       {/* ROI Chart */}
//       {data.charts.roiChart && (
//         <div style={{ marginBottom: '25px', marginTop: '25px' }}>
//           <img 
//             src={data.charts.roiChart} 
//             alt="ROI Chart" 
//             style={{ 
//               width: '100%', 
//               height: '300px', 
//               objectFit: 'contain',
//               background: 'transparent'
//             }} 
//           />
//         </div>
//       )}

   
//       {/* Footer */}
//       <div style={{ 
//         position: 'absolute', 
//         bottom: '20px', 
//         left: '40px', 
//         right: '40px', 
//         display: 'flex', 
//         justifyContent: 'space-between',
//         fontSize: '9px',
//         color: '#FFFFFF',
//         fontWeight: '400'
//       }}>
//         <span>{data.formData.capacity}kW Ongrid proposal</span>
//         <span>PAGE 4</span>
//         <span>Generated by {data.formData.companyInfo.brandName}</span>
//       </div>
//     </div>
//   );
// }

;

// Simple placeholder ROIPage for browser preview (actual PDF uses QuotationPDF.jsx)
export const ROIPage = ({ data }) => (
  <div className="quotation-page roi-page" style={{ 
    background: '#14807d', 
    color: '#FFFFFF', 
    padding: '40px',
    position: 'relative',
    minHeight: '100vh'
  }}>
    <p style={{ fontSize: '11px', margin: '0 0 20px 0' }}>
      {data.formData.capacity}kW Ongrid Proposal
    </p>
    <h1 style={{ fontSize: '48px', fontWeight: '700', margin: '0 0 8px 0' }}>
      {data.formData.capacity}KW ONGRID ROI
    </h1>
    <p style={{ fontSize: '11px', margin: '0 0 30px 0', textTransform: 'uppercase' }}>
      SOLAR IS ONE OF THE BEST INVESTMENT YOU WILL EVER MAKE
    </p>
    {data.charts.roiChart && (
      <img src={data.charts.roiChart} alt="ROI Chart" style={{ width: '100%', height: '300px', objectFit: 'contain', marginBottom: '25px' }} />
    )}
    <div style={{ position: 'absolute', bottom: '20px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
      <span>{data.formData.capacity}kW Ongrid proposal</span>
      <span>PAGE 4</span>
      <span>Generated by {data.formData.companyInfo.brandName}</span>
    </div>
  </div>
);



// Generation Page
export const GenerationPage = ({ data }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="quotation-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <span className="header-subtitle" style={{ fontSize: '12px', color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src={images.logo.company} 
            alt="Company Logo" 
            style={{ width: '80px', height: 'auto', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px', marginLeft: '-10px' }}>
            {data.formData.companyInfo.brandName}
          </span>
        </div>
      </div>

      <h2 className="section-title">GENERATION</h2>
      <p className="section-subtitle">{currentMonth} - ROUND THE YEAR GENERATION</p>

      {data.charts.generationChart && (
        <img src={data.charts.generationChart} alt="Generation Chart" className="chart-image-small" />
      )}

      {/* Custom Professional Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '40px', 
        marginTop: '20px',
        marginBottom: '30px',
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

      <div className="performance-metrics">
        <div className="performance-item">
          <div className="performance-value">85%</div>
          <div className="performance-label">PR: Performance Ratio</div>
        </div>
        <div className="performance-item">
          <div className="performance-value">25%</div>
          <div className="performance-label">Monsoon Dip</div>
        </div>
        <div className="performance-item">
          <div className="performance-value">
            {(data.result.outputs.ac_annual / 365).toFixed(1)} <span style={{ fontSize: '16px', fontWeight: '400' }}>Units</span>
          </div>
          <div className="performance-label">Average daily generation</div>
        </div>
      </div>

      <p className="disclaimer">Generation figures are indicative and may vary with site conditions, weather patterns.</p>

      <div className="page-footer" style={{ 
        position: 'relative',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '15px 30px',
        fontSize: '10px',
        color: '#000000',
        borderTop: '1px solid #e5e7eb',
        marginTop: '20px'
      }}>
        <span>{data.formData.capacity}kW Ongrid proposal</span>
        <span>PAGE 3</span>
        <span>Generated by {data.formData.companyInfo.brandName}</span>
      </div>
    </div>
  );
};

// Components Page
export const ComponentsPage = ({ data }) => (
  <div className="quotation-page">
    <div className="page-header">
      <span className="header-subtitle">{data.formData.capacity}kW Ongrid Proposal</span>
      <span className="header-logo">{data.formData.companyInfo.brandName.toUpperCase()}</span>
    </div>

    <h2 className="section-title">COMPONENTS</h2>
    <p className="section-subtitle">We believe in working with Tier 1 OEMs only to maintain our quality benchmark.</p>

    <table className="components-table">
      <thead>
        <tr>
          <th>COMPONENT</th>
          <th>MAKE</th>
          <th>SPECS</th>
          <th>QUANTITY</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="bold">Best panel OEMs</td>
          <td>{data.formData.panels[0].brand}</td>
          <td>{data.formData.panels[0].specs}</td>
          <td>{data.formData.panels[0].quantity}</td>
        </tr>
        <tr>
          <td className="bold">Best Inverter OEMs</td>
          <td>{data.formData.inverters[0].brand}</td>
          <td>{data.formData.inverters[0].specs}</td>
          <td>{data.formData.inverters[0].quantity}</td>
        </tr>
        <tr>
          <td className="bold">Structure & Electrical</td>
          <td>HDGI Structure</td>
          <td>HDGI Advanced structure</td>
          <td>As per design</td>
        </tr>
      </tbody>
    </table>

    <p className="disclaimer">Specific brands will be as per the product you choose</p>

    <div className="page-footer">
      <span>{data.formData.capacity}kW Ongrid proposal</span>
      <span>PAGE 5</span>
      <span>Generated by {data.formData.companyInfo.brandName}</span>
    </div>
  </div>
);

// Timeline Page
export const TimelinePage = ({ data }) => {
  const timeline = [
    { step: 1, name: 'Permitting', duration: '1 week' },
    { step: 2, name: 'Procurement', duration: '2 weeks' },
    { step: 3, name: 'Installation', duration: '2-4 weeks' },
    { step: 4, name: 'Site Assessment', duration: '2-3 weeks' },
    { step: 5, name: 'Electrical', duration: '4th week' },
    { step: 6, name: 'Commissioning', duration: '6th week' }
  ];

  const specs = [
    `${data.formData.capacity}KW OF CAPACITY`,
    'HDGI STRUCTURE',
    'GRID TIED INVERTER',
    'ONGRID SYSTEM'
  ];

  return (
    <div className="quotation-page">
      <div className="page-header">
        <span className="header-subtitle">{data.formData.capacity}kW Ongrid Proposal</span>
        <span className="header-logo">{data.formData.companyInfo.brandName.toUpperCase()}</span>
      </div>

      <h2 className="section-title">TIMELINE</h2>
      <p className="section-subtitle">TIMELINE AND MILESTONES</p>

      <div className="timeline-list">
        {timeline.map((item) => (
          <div key={item.step} className="timeline-item">
            <div className={`timeline-badge ${item.step === 3 ? 'active' : ''}`}>
              {item.step}
            </div>
            <div className="timeline-content">
              <div className="timeline-name">{item.name}</div>
              <div className="timeline-duration">{item.duration}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="subsection-title">SYSTEM SPECIFICATION</h3>
      <div className="spec-grid">
        {specs.map((spec, index) => (
          <div key={index} className="spec-box">{spec}</div>
        ))}
      </div>

      <p className="disclaimer">Net metering is entirely dependent on DISCOM, we don't control their process</p>

      <div className="page-footer">
        <span>{data.formData.capacity}kW Ongrid proposal</span>
        <span>PAGE 6</span>
        <span>Generated by {data.formData.companyInfo.brandName}</span>
      </div>
    </div>
  );
};

// Offer & Terms Page
export const OfferTermsPage = ({ data }) => {
  const paymentTerms = [
    { stage: 1, percent: '10%', label: 'Advance' },
    { stage: 2, percent: '60%', label: 'Procurement' },
    { stage: 3, percent: '10%', label: 'On installation' },
    { stage: 4, percent: '10%', label: 'Net metering' }
  ];

  return (
    <div className="quotation-page">
      <div className="page-header">
        <span className="header-subtitle">{data.formData.capacity}kW Ongrid Proposal</span>
        <span className="header-logo">{data.formData.companyInfo.brandName.toUpperCase()}</span>
      </div>

      <h2 className="section-title">OFFER & TERMS</h2>

      <h3 className="subsection-title">COST</h3>
      <table className="cost-table">
        <thead>
          <tr>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Solar plus</td>
            <td>Rs {parseInt(data.formData.plantCost).toLocaleString()}</td>
            <td>Rs {parseInt(data.formData.plantCost).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <p className="table-note">{data.formData.capacity}kW ongrid solar system with tax @8.90% GST</p>

      <h3 className="subsection-title">SCOPE</h3>
      <table className="scope-table">
        <tbody>
          <tr>
            <td>System Design</td>
            <td>Net metering</td>
          </tr>
          <tr>
            <td>Installation</td>
            <td>5 year of free amc</td>
          </tr>
        </tbody>
      </table>

      <h3 className="subsection-title">PAYMENT TERMS</h3>
      <div className="payment-terms">
        {paymentTerms.map((term) => (
          <div key={term.stage} className="payment-stage">
            <div className={`payment-badge ${term.stage === 2 ? 'active' : ''}`}>
              {term.stage}
            </div>
            <div className="payment-percent">{term.percent}</div>
            <div className="payment-label">{term.label}</div>
          </div>
        ))}
      </div>

      <div className="page-footer">
        <span>{data.formData.capacity}kW Ongrid proposal</span>
        <span>PAGE 7</span>
        <span>Generated by {data.formData.companyInfo.brandName}</span>
      </div>
    </div>
  );
};

// Environment Impact Page
export const EnvironmentPage = ({ data }) => (
  <div className="quotation-page">
    <div className="page-header">
      <span className="header-subtitle">{data.formData.capacity}kW Ongrid Proposal</span>
      <span className="header-logo">{data.formData.companyInfo.brandName.toUpperCase()}</span>
    </div>

    <h2 className="section-title">ENVIRONMENT IMPACT</h2>
    <p className="section-subtitle">You are contributing to solve earth's biggest problem- Climate Change</p>

    <div className="env-metrics">
      <div className="env-metric">
        <div className="env-metric-title">CARBON DIOXIDE OFFSET</div>
        <div className="env-metric-value teal">{data.envImpact.co2Offset.toLocaleString()} Metric Tons</div>
      </div>

      <div className="env-metric">
        <div className="env-metric-title">EQUIVALENT ACRES OF FOREST</div>
        <div className="env-metric-value green">{data.envImpact.forestEquivalent.toLocaleString()} Acres/Year</div>
      </div>

      <div className="env-metric">
        <div className="env-metric-title">COAL BURN AVOIDED</div>
        <div className="env-metric-value amber">{data.envImpact.coalAvoided.toLocaleString()} Metric Tons</div>
      </div>
    </div>

    <div className="page-footer">
      <span>{data.formData.capacity}kW Ongrid proposal</span>
      <span>PAGE 8</span>
      <span>Generated by {data.formData.companyInfo.brandName}</span>
    </div>
  </div>
);

// Thank You Page
export const ThankYouPage = ({ data }) => (
  <div className="quotation-page thank-you-page">
    <div className="page-header">
      <span className="header-subtitle">{data.formData.capacity}kW Ongrid Proposal</span>
      <span className="header-logo">{data.formData.companyInfo.brandName.toUpperCase()}</span>
    </div>

    <div className="thank-you-content">
      <h1 className="thank-you-title">THANK YOU</h1>
      <p className="thank-you-subtitle">Looking forward to work and add value</p>
    </div>

    <div className="contact-footer">
      <div className="contact-row">
        <div className="contact-item">
          <div className="contact-label">Phone:</div>
          <div className="contact-value">{data.formData.companyInfo.contact.phone}</div>
        </div>
        <div className="contact-item">
          <div className="contact-label">Website:</div>
          <div className="contact-value">{data.formData.companyInfo.contact.website}</div>
        </div>
      </div>
      <div className="contact-row">
        <div className="contact-item">
          <div className="contact-label">Email:</div>
          <div className="contact-value">{data.formData.companyInfo.contact.email}</div>
        </div>
        <div className="contact-item">
          <div className="contact-label">Address:</div>
          <div className="contact-value">{data.formData.companyInfo.contact.address}</div>
        </div>
      </div>
    </div>

    <div className="thank-you-footer">
      {data.formData.capacity}kW Ongrid proposal • PAGE 9 • Generated by {data.formData.companyInfo.brandName}
    </div>
  </div>
);
