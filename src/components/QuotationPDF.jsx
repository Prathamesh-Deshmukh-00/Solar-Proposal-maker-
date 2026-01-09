import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, G, Polygon, Line, Circle, Rect } from '@react-pdf/renderer';
import { images } from '../utils/imageAssets';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica'
  },
  coverPage: {
    backgroundColor: '#FFFFFF',
    padding: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingTop: 20
  },
  logoImage: {
    width: 120,
    height: 30,
    objectFit: 'contain'
  },
  brandLogo: {
    width: 60,
    height: 30,
    objectFit: 'contain'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a2e'
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20
  },
  text: {
    fontSize: 12,
    color: '#1a1a2e',
    lineHeight: 1.5
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#64748b'
  },
  roiPage: {
    backgroundColor: '#02746A',
    padding: 40
  },
  roiTitle: {
    fontSize: 34,
    fontWeight: 300,
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8
  },
  roiSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 20,
    width: '100%',
    textAlign: 'left'
  },
  chartImage: {
    width: '100%',
    height: 400,
    marginBottom: 20
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 20
  },
  metricBox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'transparent',
    border: '1px solid #FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  metricLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.32,
    textAlign: 'center',
    fontWeight: 600,
    lineHeight: 1.3
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 500,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 1.2,
    marginBottom: 8
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 20
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingVertical: 8
  },
  tableHeader: {
    backgroundColor: '#1a1a2e',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    padding: 5
  },
  companyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  metricCard: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    minWidth: 120
  },
  metricCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5
  },
  metricCardLabel: {
    fontSize: 9,
    color: '#FFFFFF'
  }
});

// Cover Page Component
const CoverPage = ({ data, logo }) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Page size="A4" style={styles.coverPage}>
      <Image src={images.hero.windTurbines} style={{ width: '100%', height: 550, objectFit: 'cover' }} />
      
      <View style={{ flexDirection: 'row', padding: 30, paddingTop: 40, paddingBottom: 30 }}>
        <View style={{ flex: 1, paddingRight: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginLeft: -25 }}>
            <Image src={logo} style={{ width: 100, height: 25, objectFit: 'contain' }} />
            <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -20 }}>
              {data.formData.companyInfo.brandName}
            </Text>
          </View>
          <Text style={{ fontSize: 11, marginBottom: 20 }}>{data.formData.companyInfo.name}</Text>
          <Text style={{ fontSize: 10 }}>Proposal no {data.formData.proposalNumber}</Text>
        </View>

        <View style={{ width: 1, backgroundColor: '#000000', marginHorizontal: 20 }} />

        <View style={{ flex: 2, paddingLeft: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 15 }}>SOLAR PROPOSAL</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>ONGRID {data.formData.capacity}KW</Text>
            <Text style={{ fontSize: 14 }}>{currentDate}</Text>
          </View>
          <Text style={{ fontSize: 11, marginBottom: 5 }}>Client name: {data.formData.customerName}</Text>
          <Text style={{ fontSize: 11, lineHeight: 1.4 }}>
            Address: {data.formData.customerCity}, {data.formData.district}, {data.formData.city}
          </Text>
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#000000', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#94a3b8', fontSize: 8, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>Prepared for</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' }}>{data.formData.customerName}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: '#94a3b8', fontSize: 8, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>Presented by</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' }}>{data.formData.companyInfo.presenterName}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Image src={logo} style={{ width: 50, height: 12, objectFit: 'contain' }} />
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -10 }}>
              {data.formData.companyInfo.brandName}
            </Text>
          </View>
          <Text style={{ color: '#94a3b8', fontSize: 7 }}>Generated on</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 8, fontWeight: 'bold' }}>{currentDate} | 1:00PM</Text>
        </View>
      </View>
    </Page>
  );
};

// About Reslink Page
const AboutReslinkPage = ({ data, logo }) => (
  <Page size="A4" style={styles.page}>
    {/* Modern Header with Logo and Branding */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
      <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image src={logo} style={{ width: 60, height: 15, objectFit: 'contain' }} />
        <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
          {data.formData.companyInfo.brandName}
        </Text>
      </View>
    </View>

    <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 15, letterSpacing: 0.5, textTransform: 'uppercase' }}>ABOUT {data.formData.companyInfo.brandName}</Text>
    {/* Conditional Content: Combined Text if metrics are missing, otherwise Mission + Standard Metrics */
    (parseInt(data.formData.companyInfo.happyCustomers) <= 0 && parseInt(data.formData.companyInfo.totalCapacity) <= 0) ? (
      <View style={{ 
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        border: '1px solid #e2e8f0'
      }}>
        <Text style={{ 
          fontSize: 10, 
          lineHeight: 1.5, 
          color: '#334155', 
          textAlign: 'justify' 
        }}>
          We are on a mission to deliver 10,000 world-class solar installations ensuring maximum performance, durability, and ROI for every project. Aditya Solar Energy is a leading rooftop solar solutions provider committed to making solar power affordable and hassle-free. We offer zero-investment solar systems with easy EMI options—pay an amount equal to your electricity bill and start saving from day one. With end-to-end installation, government subsidy assistance, and premium-quality panels backed by a 25-year warranty, we ensure long-term value and reliability. Serving residential, commercial, and industrial customers, we help you enjoy clean, cost-effective solar energy and free power for decades.
        </Text>
      </View>
    ) : (
      <>
        <Text style={{ fontSize: 11, lineHeight: 1.6, color: '#334155', marginBottom: 25 }}>{data.formData.companyInfo.missionStatement}</Text>

        <View style={{ flexDirection: 'row', gap: 15, marginBottom: 25 }}>
          <View style={{ flex: 1, backgroundColor: '#000', color: 'white', padding: 20, borderRadius: 6, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6 }}>{data.formData.companyInfo.totalCapacity}</Text>
            <Text style={{ fontSize: 8, color: '#FFFFFF', opacity: 0.9, textTransform: 'uppercase', letterSpacing: 0.5 }}>{data.formData.companyInfo.totalCapacityLabel}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#000', color: 'white', padding: 20, borderRadius: 6, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6 }}>{data.formData.companyInfo.happyCustomers}</Text>
            <Text style={{ fontSize: 8, color: '#FFFFFF', opacity: 0.9, textTransform: 'uppercase', letterSpacing: 0.5 }}>{data.formData.companyInfo.happyCustomersLabel}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#000', color: 'white', padding: 20, borderRadius: 6, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6 }}>{data.formData.companyInfo.cities}</Text>
            <Text style={{ fontSize: 8, color: '#FFFFFF', opacity: 0.9, textTransform: 'uppercase', letterSpacing: 0.5 }}>{data.formData.companyInfo.citiesLabel}</Text>
          </View>
        </View>
      </>
    )}

    {/* Large Solar Panels Image */}
    <View style={{ marginTop: 25, marginBottom: 20 }}>
      <Image src={images.hero.solarPanels} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 8 }} />
    </View>

    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 9, color: '#64748b', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center' }}>
        {data.formData.companyInfo.footer.amcNote.replace(/Reslink/g, data.formData.companyInfo.brandName)}
      </Text>
    </View>

    <View style={[styles.footer, { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderTop: '1px solid #e5e7eb',
      marginTop: 20
    }]}>
      <Text style={{ fontSize: 9 }}>{data.formData.capacity}kW Ongrid proposal</Text>
      <Text style={{ fontSize: 9 }}>PAGE 2</Text>
      <Text style={{ fontSize: 9 }}>Generated by {data.formData.companyInfo.brandName}</Text>
    </View>
  </Page>
);

// Generation Page
const GenerationPage = ({ data, logo }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  return (
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Brand Name */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={logo} style={{ width: 60, height: 15, objectFit: 'contain' }} />
          <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
            {data.formData.companyInfo.brandName}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>GENERATION</Text>
      <Text style={[styles.subtitle, { marginBottom: 30 }]}>{currentMonth} - ROUND THE YEAR GENERATION</Text>

      {data.charts.generationChart && <Image src={data.charts.generationChart} style={[styles.chartImage, { height: 400 }]} />}

      {/* Custom Professional Legend */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        gap: 20, 
        marginTop: 15,
        marginBottom: 20,
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        border: '1px solid #e5e7eb'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ 
            width: 14, 
            height: 14, 
            backgroundColor: '#000000',
            borderRadius: 2
          }} />
          <Text style={{ 
            fontSize: 9, 
            fontWeight: 500, 
            color: '#374151'
          }}>
            Actual generation according to customer review
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ 
            width: 14, 
            height: 14, 
            backgroundColor: '#2dd4bf',
            borderRadius: 2
          }} />
          <Text style={{ 
            fontSize: 9, 
            fontWeight: 500, 
            color: '#374151'
          }}>
            Theoretical generation according to weather and GHI conditions
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#02746A' }}>85%</Text>
          <Text style={{ fontSize: 10, color: '#64748b' }}>PR: Performance Ratio</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#02746A' }}>25%</Text>
          <Text style={{ fontSize: 10, color: '#64748b' }}>Monsoon Dip</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#02746A' }}>
            {(data.result.outputs.ac_annual / 365).toFixed(1)} <Text style={{ fontSize: 12, fontWeight: 'normal' }}>Units</Text>
          </Text>
          <Text style={{ fontSize: 10, color: '#64748b' }}>Average daily generation</Text>
        </View>
      </View>

      <View style={{ marginTop: 0}}>
        <Text style={{ fontSize: 9, color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>
          Generation figures are indicative and may vary with site conditions, weather patterns.
        </Text>
      </View>

      <View style={[styles.footer, { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderTop: '1px solid #e5e7eb',
        marginTop: 20
      }]}>
        <Text style={{ fontSize: 9 }}>{data.formData.capacity}kW Ongrid proposal</Text>
        <Text style={{ fontSize: 9 }}>PAGE 3</Text>
        <Text style={{ fontSize: 9 }}>Generated by {data.formData.companyInfo.name}</Text>
      </View>
    </Page>
  );
};

// ROI Summary Page
const ROIPage = ({ data, logo }) => (
  <Page size="A4" style={styles.roiPage}>
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 11, color: '#FFFFFF', letterSpacing: 0.3 }}>{data.formData.capacity}kW Ongrid Proposal</Text>
    </View>

    <Text style={styles.roiTitle}>{data.formData.capacity}KW ONGRID ROI</Text>
    <Text style={styles.roiSubtitle}>SOLAR IS ONE OF THE BEST INVESTMENT YOU WILL EVER MAKE</Text>

    {data.charts.roiChart && <Image src={data.charts.roiChart} style={styles.chartImage} />}

    {/* Top three stat boxes - compact horizontal design */}
    <View style={{ flexDirection: 'row', gap: 15, marginBottom: 20 }}>
      {/* Box 1 */}
      <View style={{ flex: 1, border: '1px solid #FFFFFF', paddingVertical: 15, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Image src="/rupee-icon.png" style={{ width: 30, height: 30, marginRight: 4 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 500, lineHeight: 1.1 }}>{Math.round(data.financials.annualSavings).toLocaleString()}</Text>
        </View>
        <Text style={{ color: '#E8E8E8', fontSize: 11, fontWeight: 800, letterSpacing: 1.32, textTransform: 'uppercase', lineHeight: 1.3, textAlign: 'center' }}>
          Yearly{'\n'}Savings
        </Text>
      </View>

      {/* Box 2 */}
      <View style={{ flex: 1, border: '1px solid #FFFFFF', paddingVertical: 15, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 500, lineHeight: 1.1, marginBottom: 8 }}>
          {data.financials.paybackPeriod} Years
        </Text>
        <Text style={{ color: '#E8E8E8', fontSize: 11, fontWeight: 800, letterSpacing: 1.32, textTransform: 'uppercase', lineHeight: 1.3, textAlign: 'center' }}>
          Payback{'\n'}Period
        </Text>
      </View>

      {/* Box 3 */}
      <View style={{ flex: 1, border: '1px solid #FFFFFF', paddingVertical: 15, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Image src="/rupee-icon.png" style={{ width: 30, height: 30, marginRight: 4 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 500, lineHeight: 1.1 }}>{(data.financials.lifetimeSavings / 100000).toFixed(1)}L</Text>
        </View>
        <Text style={{ color: '#E8E8E8', fontSize: 11, fontWeight: 800, letterSpacing: 1.32, textTransform: 'uppercase', lineHeight: 1.3, textAlign: 'center' }}>
          Total Lifetime{'\n'}Saving
        </Text>
      </View>
    </View>

    {/* Middle text - textAlign: center, marginBottom: 24px */}
    <View style={{ alignItems: 'center', marginBottom: 16 }}>
      {/* color: #ffffff, fontSize: 18px, fontWeight: 400, letterSpacing: 0.04em */}
      <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 400, letterSpacing: 0.72 }}>
        Easy Financing Options Available
      </Text>
    </View>

    {/* Bottom button - display: flex, justifyContent: center */}
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {/* backgroundColor: #d9d9d9, padding: 8px 32px */}
      <View style={{ backgroundColor: '#d9d9d9', paddingVertical: 8, paddingHorizontal: 32 }}>
        {/* color: #000000, fontSize: 16px, fontWeight: 400 */}
        <Text style={{ color: '#000000', fontSize: 16, fontWeight: 400 }}>
          Residential starts at 6% only
        </Text>
      </View>
    </View>

<View
  style={[
    styles.footer,
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: '#FFFFFF',
      marginTop: 15,
    },
  ]}
>
  <Text style={{ fontSize: 9, color: '#FFFFFF' }}>
    {data.formData.capacity}kW Ongrid proposal
  </Text>
  <Text style={{ fontSize: 9, color: '#FFFFFF' }}>PAGE 4</Text>
  <Text style={{ fontSize: 9, color: '#FFFFFF' }}>
    Generated by {data.formData.companyInfo.name}
  </Text>
</View>



  </Page>
);

// Components Page
const ComponentsPage = ({ data, logo }) => {
  const { systemDetails } = data.formData;

  // Helper to get Panel Warranty string based on technology
  const getPanelWarranty = (tech) => {
    if (tech && tech.toLowerCase().includes('topcon')) {
      return '12 years (product), 30 years (performance)';
    }
    return '10 years (product), 25 years (performance)';
  };

  // Helper to get Structure Description string
  const getStructureDescription = (material, pathway, cChannel, nutBolt) => {
    let baseDesc = '';
    const mat = material || '';
    if (mat.includes('GI (Galvanized Iron)') || mat.includes('HDGI (Hot-Dip Galvanized Iron)')) {
       baseDesc = 'Hot Dip GI (C channel) structure with >80 microns zinc coating';
    } else {
       baseDesc = `${mat} structure with high quality`;
    }
    
    let suffix = '';
    if (nutBolt) suffix += ', nut-bolted structure';
    if (pathway) suffix += ', with pathway';
    if (cChannel) suffix += ' and C-Channel';
    
    return baseDesc + suffix;
  };

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={logo} style={{ width: 60, height: 15, objectFit: 'contain' }} />
          <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
            {data.formData.companyInfo.brandName}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#0F172A', marginBottom: 10, textTransform: 'uppercase' }}>SOLAR COMPONENTS</Text>
      <Text style={{ fontSize: 13, color: '#000000', marginBottom: 20, lineHeight: 1.4 }}>
        <Text style={{ fontWeight: 'bold' }}>High-quality</Text> components from trusted <Text style={{ fontWeight: 'bold' }}>Tier-1</Text> OEMs, selected for performance, safety, and long-term ROI.
      </Text>

      {/* Components Table */}
      <View style={{ border: '1px solid #000000', borderRadius: 4, overflow: 'hidden' }}>
        
        {/* Table Header */}
        <View style={{ flexDirection: 'row', backgroundColor: '#0F172A', paddingVertical: 10, paddingHorizontal: 5 }}>
          <View style={{ flex: 18, alignItems: 'center' }}><Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>Specifications</Text></View>
          <View style={{ flex: 12, alignItems: 'center' }}><Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>Brand</Text></View>
          <View style={{ flex: 15, alignItems: 'center' }}><Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>Description</Text></View>
        </View>

        {/* Panel Row */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #cbd5e1', backgroundColor: '#FFFFFF', minHeight: 80 }}>
          {/* Main Spec */}
          <View style={{ flex: 18, padding: 10, borderRight: '1px solid #cbd5e1' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
               <Image src={images.components.panel} style={{ width: 20, height: 20, marginRight: 5, objectFit: 'contain' }} />
               <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Panel</Text>
            </View>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Watt Peak:</Text> {systemDetails.panels.capacity} Wp</Text>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Type:</Text> {systemDetails.panels.type}</Text>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Tech:</Text> {systemDetails.panels.technology}</Text>
            <Text style={{ fontSize: 8, color: '#64748b' }}>{getPanelWarranty(systemDetails.panels.technology)}</Text>
          </View>
          {/* Brand */}
          <View style={{ flex: 12, padding: 10, borderRight: '1px solid #cbd5e1', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={images.brands.waaree} style={{ width: 60, height: 20, objectFit: 'contain', marginBottom: 5 }} />
            <Text style={{ fontSize: 9, color: '#64748b', textAlign: 'center' }}>{systemDetails.panels.company}</Text>
          </View>
          {/* Description */}
          <View style={{ flex: 15, padding: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 9, lineHeight: 1.3 }}>{systemDetails.panels.type} High Wattage {systemDetails.panels.technology} solar panels, with 25 years of warranty</Text>
          </View>
        </View>

        {/* Inverter Row */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #cbd5e1', backgroundColor: '#e5e7eb', minHeight: 80 }}>
          <View style={{ flex: 18, padding: 10, borderRight: '1px solid #cbd5e1' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
               <Image src={images.components.inverter} style={{ width: 20, height: 20, marginRight: 5, objectFit: 'contain' }} />
               <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Inverter</Text>
            </View>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Capacity:</Text> {systemDetails.inverter.capacity}</Text>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Type:</Text> {systemDetails.inverter.type}</Text>
            <Text style={{ fontSize: 9, color: '#0284c7', fontWeight: 'bold' }}>Warranty: <Text style={{ color: '#000000', fontWeight: 'normal' }}>{systemDetails.inverter.warranty}</Text></Text>
          </View>
          <View style={{ flex: 12, padding: 10, borderRight: '1px solid #cbd5e1', justifyContent: 'center', alignItems: 'center' }}>
             <Image src={systemDetails.inverter.company.toLowerCase().includes('polycab') ? images.brands.polycab : images.brands.sungrow} style={{ width: 60, height: 30, objectFit: 'contain', marginBottom: 5 }} />
             <Text style={{ fontSize: 9, color: '#64748b', textAlign: 'center' }}>{systemDetails.inverter.company}</Text>
          </View>
          <View style={{ flex: 15, padding: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 9, lineHeight: 1.3 }}>{systemDetails.inverter.company} {systemDetails.inverter.capacity} inverter, with all protection features, and anti-islanding support</Text>
          </View>
        </View>

        {/* Cable Row */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #cbd5e1', backgroundColor: '#FFFFFF', minHeight: 80 }}>
          <View style={{ flex: 18, padding: 10, borderRight: '1px solid #cbd5e1' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
               <Image src={images.components.cable} style={{ width: 20, height: 20, marginRight: 5, objectFit: 'contain' }} />
               <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Cable</Text>
            </View>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Type:</Text> DC/AC Cables ({systemDetails.electrical.cableSize})</Text>
            <Text style={{ fontSize: 9, marginBottom: 2 }}>double insulated cables</Text>
          </View>
          <View style={{ flex: 12, padding: 10, borderRight: '1px solid #cbd5e1', justifyContent: 'center', alignItems: 'center' }}>
             <Image src={images.brands.polycab} style={{ width: 60, height: 20, objectFit: 'contain', marginBottom: 5 }} />
             <Text style={{ fontSize: 9, color: '#64748b' }}>Polycab</Text>
          </View>
          <View style={{ flex: 15, padding: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 9, lineHeight: 1.3 }}>Polycab U/V resistant, {systemDetails.electrical.cableSize} long lasting cables</Text>
          </View>
        </View>

        {/* Structure Row */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #cbd5e1', backgroundColor: '#e5e7eb', minHeight: 80 }}>
          <View style={{ flex: 18, padding: 10, borderRight: '1px solid #cbd5e1' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
               <Image src={images.components.structure} style={{ width: 20, height: 20, marginRight: 5, objectFit: 'contain' }} />
               <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Structure</Text>
            </View>
            <View style={{ marginBottom: 5 }}>
                {systemDetails.structure.dimensionsLabel.split('\n').map((line, i) => (
                    <Text key={i} style={{ fontSize: 9, marginBottom: 1 }}>{line}</Text>
                ))}
            </View>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Height:</Text> Front {systemDetails.structure.legHeightFront} / Back {systemDetails.structure.legHeightBack}</Text>
            {systemDetails.structure.nutBolt && <Text style={{ fontSize: 9, marginBottom: 2 }}>SS bolts for nut</Text>}
          </View>
          <View style={{ flex: 12, padding: 10, borderRight: '1px solid #cbd5e1', justifyContent: 'center', alignItems: 'center' }}>
             <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#64748b', textAlign: 'center' }}>{systemDetails.structure.material}</Text>
          </View>
          <View style={{ flex: 15, padding: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 9, lineHeight: 1.3 }}>{getStructureDescription(systemDetails.structure.material, systemDetails.structure.pathway, systemDetails.structure.cChannel, systemDetails.structure.nutBolt)}</Text>
          </View>
        </View>

         {/* Electrical Row */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #cbd5e1', backgroundColor: '#FFFFFF' }}>

          {/* Specifications */}
          <View style={{ flex: 18, padding: 10, borderRight: '1px solid #cbd5e1' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Image src={images.components.electrical} style={{ width: 20, height: 20, marginRight: 5 }} />
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Electrical Component</Text>
            </View>

            <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 4 }}>Sub-Components:</Text>
            <Text style={{ fontSize: 9 }}>• ACDB & DCDB</Text>
            <Text style={{ fontSize: 9 }}>• MC4 Connectors</Text>
            <Text style={{ fontSize: 9 }}>• Earthing Kit</Text>
          </View>

          {/* Brand */}
          <View style={{ flex: 12, padding: 10, borderRight: '1px solid #cbd5e1', justifyContent: 'center', alignItems: 'center' }}>
             {/* ACDB/DCDB */}
             <View style={{ alignItems: 'center', marginBottom: 10 }}>
               <Image src={images.brands.polycab} style={{ width: 40, height: 18, marginBottom: 2 }} />
               <Text style={{ fontSize: 8, color: '#64748b', textAlign: 'center' }}>{systemDetails.electrical.acdbDcdb}</Text>
             </View>
             {/* MC4 */}
             <View style={{ alignItems: 'center', marginBottom: 10 }}>
               <Image src={images.brands.truePower} style={{ width: 40, height: 18, marginBottom: 2 }} />
               <Text style={{ fontSize: 8, color: '#64748b', textAlign: 'center' }}>{systemDetails.electrical.mc4}</Text>
             </View>
             {/* Earthing */}
             <View style={{ alignItems: 'center' }}>
               <Image src={images.brands.sgPower} style={{ width: 40, height: 18, marginBottom: 2 }} />
               <Text style={{ fontSize: 8, color: '#64748b', textAlign: 'center' }}>{systemDetails.electrical.earthing}</Text>
             </View>
          </View>

          {/* Description */}
          <View style={{ flex: 15, padding: 10, justifyContent: 'center' }}>
            <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 9 }}>DCDB: With DC MCB & SPD</Text>
                <Text style={{ fontSize: 9 }}>ACDB: With MCB, RCCB & SPD</Text>
            </View>
            <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 9 }}>MC4 Connectors of {systemDetails.electrical.mc4} brand</Text>
            </View>
            <View>
                <Text style={{ fontSize: 9 }}>{systemDetails.electrical.earthing} LA of 1.5 m, 3 earthing rods & chemical bag</Text>
            </View>
          </View>
        </View>

        {/* Services Row */}
        <View style={{ flexDirection: 'row', backgroundColor: '#e5e7eb', minHeight: 70 }}>
          <View style={{ flex: 18, padding: 10, borderRight: '1px solid #cbd5e1' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
               <Image src={images.components.services} style={{ width: 20, height: 20, marginRight: 5, objectFit: 'contain' }} />
               <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Services</Text>
            </View>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Installation:</Text> End-to-end</Text>
            <Text style={{ fontSize: 9, marginBottom: 2 }}><Text style={{ fontWeight: 'bold' }}>Support:</Text> 5 years free AMC</Text>
            <Text style={{ fontSize: 8, color: '#64748b' }}>Ongoing generation tracking</Text>
          </View>
          <View style={{ flex: 12, padding: 10, borderRight: '1px solid #cbd5e1', justifyContent: 'center', alignItems: 'center' }}>
             <Image src={logo} style={{ width: 60, height: 20, objectFit: 'contain', marginBottom: 5 }} />
             <Text style={{ fontSize: 9, color: '#64748b' }}>{data.formData.companyInfo.brandName}</Text>
          </View>
          <View style={{ flex: 15, padding: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 9, lineHeight: 1.3 }}>Professional installation with comprehensive after-sales support</Text>
          </View>
        </View>

      </View>

      <View style={[styles.footer, { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderTop: '1px solid #e5e7eb',
        marginTop: 20
      }]}>
        <Text style={{ fontSize: 9 }}>{data.formData.capacity}kW Ongrid proposal</Text>
        <Text style={{ fontSize: 9 }}>PAGE 6</Text>
        <Text style={{ fontSize: 9 }}>Generated by {data.formData.companyInfo.name}</Text>
      </View>
    </Page>
  );
};

// Timeline Page
const TimelinePage = ({ data, logo }) => {
  const steps = [
    { step: 1, name: 'Permitting', desc: 'Permitting would be done within a week', duration: '1 week', color: '#02746A', textColor: '#FFFFFF', icon: images.timeline.permitting },
    { step: 2, name: 'Procurement', desc: 'It takes time from around 1-2 weeks', duration: '1-2 weeks', color: '#FFFFFF', textColor: '#000000', icon: images.timeline.procurement },
    { step: 3, name: 'Installation', desc: 'Installation takes 2-4 week time', duration: '2-4 weeks', color: '#000000', textColor: '#FFFFFF', icon: images.timeline.installation },
    { step: 4, name: 'Site Assessment', desc: 'The Site Assessment takes 2-4 weeks', duration: '2-4 weeks', color: '#02746A', textColor: '#FFFFFF', icon: images.timeline.siteAssessment },
    { step: 5, name: 'Electrical', desc: 'The electrical work is wrapped up to the 4th week', duration: '4th week', color: '#FFFFFF', textColor: '#000000', icon: images.timeline.electrical },
    { step: 6, name: 'Commissioning', desc: 'The commissioning will be completed upto 6th week', duration: '6th week', color: '#000000', textColor: '#FFFFFF', icon: images.timeline.commissioning }
  ];

  return (
    <Page size="A4" style={styles.page}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={logo} style={{ width: 60, height: 15, objectFit: 'contain' }} />
          <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
            {data.formData.companyInfo.brandName}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#000000', marginBottom: 10, textTransform: 'uppercase' }}>TIMELINE</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000', marginTop: 5, marginBottom: 30, textTransform: 'uppercase' }}>TIMELINE AND MILESTONES</Text>

      {/* Timeline Visualization */}
      <View style={{ marginBottom: 5, position: 'relative', height: 180, justifyContent: 'center' }}>
        {/* Connecting Line */}
        <View style={{ position: 'absolute', top: 90, left: 30, right: 30, height: 2, backgroundColor: '#cbd5e1' }} />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
          {steps.map((item, index) => {
            const isOdd = (index + 1) % 2 !== 0; // 1, 3, 5 -> Top Content
            // Step 1, 3, 5: Content Top, Hexagon Bottom (on line)
            // Step 2, 4, 6: Hexagon Top (on line), Content Bottom

            return (
              <View key={item.step} style={{ alignItems: 'center', width: 80 }}>
                
                {/* Top Section */}
                <View style={{ height: 80, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5 }}>
                  {isOdd && (
                    <>
                      <Image src={item.icon} style={{ width: 24, height: 24, marginBottom: 5, objectFit: 'contain' }} />
                      <Text style={{ fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
                      <Text style={{ fontSize: 7, color: '#64748b', textAlign: 'center', marginTop: 2 }}>{item.desc}</Text>
                    </>
                  )}
                </View>

                {/* Hexagon Marker */}
                <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Svg height="30" width="80" viewBox="0 0 100 30">
                    <Polygon
                      points="10,15 20,0 80,0 90,15 80,30 20,30"
                      fill={item.color}
                      stroke={item.color === '#FFFFFF' ? '#e2e8f0' : 'none'}
                      strokeWidth={1}
                    />
                  </Svg>
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 8, color: item.textColor, fontWeight: 'bold' }}>STEP 0{item.step}</Text>
                  </View>
                </View>

                {/* Bottom Section */}
                <View style={{ height: 80, justifyContent: 'flex-start', alignItems: 'center', marginTop: 5 }}>
                  {!isOdd && (
                    <>
                      <Image src={item.icon} style={{ width: 24, height: 24, marginBottom: 5, objectFit: 'contain' }} />
                      <Text style={{ fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
                      <Text style={{ fontSize: 7, color: '#64748b', textAlign: 'center', marginTop: 2 }}>{item.desc}</Text>
                    </>
                  )}
                </View>
                
              </View>
            );
          })}
        </View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', marginTop: 20 }}>SYSTEM SPECIFICATION</Text>
      
      {/* System Specifications Diagram */}
      <View style={{ height: 300, position: 'relative', marginTop: 0 }}>
        
        {/* Connecting Lines (Manual SVG Paths) */}
        <Svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {/* Top Left Connection */}
          <Path d="M 160 80 Q 200 80 200 130" stroke="#000" strokeWidth={1.5} fill="none" />
           <Circle cx="200" cy="130" r="3" fill="#000" />
           <Circle cx="160" cy="80" r="3" fill="#000" />

          {/* Bottom Left Connection */}
          <Path d="M 160 220 Q 200 220 200 170" stroke="#000" strokeWidth={1.5} fill="none" />
          <Circle cx="200" cy="170" r="3" fill="#000" />
          <Circle cx="160" cy="220" r="3" fill="#000" />

          {/* Top Right Connection */}
          <Path d="M 370 80 Q 330 80 330 130" stroke="#000" strokeWidth={1.5} fill="none" />
          <Circle cx="330" cy="130" r="3" fill="#000" />
          <Circle cx="370" cy="80" r="3" fill="#000" />

          {/* Bottom Right Connection */}
          <Path d="M 370 220 Q 330 220 330 170" stroke="#000" strokeWidth={1.5} fill="none" />
          <Circle cx="330" cy="170" r="3" fill="#000" />
          <Circle cx="370" cy="220" r="3" fill="#000" />
        </Svg>

        {/* Central Box */}
        <View style={{ 
          position: 'absolute', 
          top: 120, 
          left: '35%', 
          width: '30%', 
          height: 60, 
          backgroundColor: '#000000', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 10
        }}>
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>SYSTEM</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>SPECIFICATION</Text>
        </View>

        {/* Top Left Box: Capacity */}
        <View style={{ position: 'absolute', top: 30, left: 10, width: 150, padding: 10, border: '1.5px solid #000', borderRadius: 4, alignItems: 'center', backgroundColor: '#e5e7eb' }}>
             <Image src={images.specs.capacity} style={{ width: 30, height: 30, marginBottom: 5 }} />
             <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>{data.formData.capacity}KW OF{'\n'}CAPACITY</Text>
        </View>

        {/* Bottom Left Box: Structure */}
        <View style={{ position: 'absolute', top: 180, left: 10, width: 150, padding: 10, border: '1.5px solid #000', borderRadius: 4, alignItems: 'center', backgroundColor: '#e5e7eb' }}>
             <Image src={images.specs.structure} style={{ width: 30, height: 30, marginBottom: 5 }} />
             <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>HDGI{'\n'}STRUCTURE</Text>
        </View>

        {/* Top Right Box: Inverter */}
        <View style={{ position: 'absolute', top: 30, right: 10, width: 150, padding: 10, border: '1.5px solid #000', borderRadius: 4, alignItems: 'center', backgroundColor: '#e5e7eb' }}>
             <Image src={images.specs.inverter} style={{ width: 30, height: 30, marginBottom: 5 }} />
             <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>GRID TIED{'\n'}INVERTER</Text>
        </View>

        {/* Bottom Right Box: Ongrid System */}
        <View style={{ position: 'absolute', top: 180, right: 10, width: 150, padding: 10, border: '1.5px solid #000', borderRadius: 4, alignItems: 'center', backgroundColor: '#e5e7eb' }}>
             <Image src={images.specs.ongrid} style={{ width: 30, height: 30, marginBottom: 5 }} />
             <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>ONGRID{'\n'}SYSTEM</Text>
        </View>

      </View>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 9, color: '#64748b', fontStyle: 'italic' }}>
          Net metering is entirely dependent on DISCOM, we don't control that process
        </Text>
      </View>

      <View style={[styles.footer, { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderTop: '1px solid #e5e7eb',
        marginTop: 20
      }]}>
        <Text style={{ fontSize: 9 }}>{data.formData.capacity}kW Ongrid proposal</Text>
        <Text style={{ fontSize: 9 }}>PAGE 5</Text>
        <Text style={{ fontSize: 9 }}>Generated by {data.formData.companyInfo.brandName}</Text>
      </View>
    </Page>
  );
};

// Offer & Terms Page
const OfferTermsPage = ({ data, logo }) => {
  const incomingCost = parseFloat(data.formData.finance?.plantCost) || 0;
  const subsidyAmount = parseFloat(data.formData.finance?.subsidy) || 0;
  const discountAmount = parseFloat(data.formData.finance?.discount) || 0;
  
  // Payment Terms
  const terms = data.formData.finance?.paymentTerms || {
    advance: 10,
    procurement: 60,
    installation: 20,
    netMetering: 10
  };

  // Calculation Flow:
  // 1. Incoming - Discount = Payable (Amount user pays to us)
  const payableAmount = incomingCost - discountAmount;
  
  // 2. Payable includes GST (13.8% or 8.9% implied from reverse calc). 
  // User logic: Base = Payable / 1.138 (assuming 13.8% GST for solar standard or use existing 8.9% logic)
  const baseSystemCost = Math.round(payableAmount / 1.138); 
  // const gstAmount = payableAmount - baseSystemCost;

  // 3. Final Cost for customer after subsidy
  const finalCost = payableAmount - subsidyAmount;

  // EMI Data
  const emiData = data.formData.finance?.emi || {};
  const isEmiEnabled = emiData.enabled;
  
  // Display Logic for Payable Row
  const payableLabel = "Payable Amount";
  const payableValue = isEmiEnabled 
    ? `Rs ${emiData.amount?.toLocaleString('en-IN')} / Month`
    : `Rs ${payableAmount.toLocaleString('en-IN')}`;
    
  const payableSubtext = isEmiEnabled
    ? `(for ${Math.floor(emiData.tenureMonths / 12)} Years ${emiData.tenureMonths % 12} Months)`
    : "(including GST)";

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={logo} style={{ width: 60, height: 15, objectFit: 'contain' }} />
          <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
            {data.formData.companyInfo.brandName}
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginBottom: 20 }]}>OFFER & TERMS</Text>

      {/* COST Section */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' }}>COST</Text>
      
      <View style={{ marginBottom: 5 }}>
        {/* Table Header */}
        <View style={{ flexDirection: 'row', backgroundColor: '#000000', paddingVertical: 8, paddingHorizontal: 10 }}>
          <View style={{ flex: 3 }}><Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>Description</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}><Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>Amount</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}><Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>Total</Text></View>
        </View>

        {/* System Cost (Incoming) */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #e2e8f0', paddingVertical: 8, paddingHorizontal: 10 }}>
          <View style={{ flex: 3 }}><Text style={{ fontSize: 10, color: '#334155' }}>System Cost</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}><Text style={{ fontSize: 10, color: '#334155' }}>Rs {incomingCost.toLocaleString('en-IN')}</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}></View>
        </View>

        {/* Discount */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #e2e8f0', paddingVertical: 8, paddingHorizontal: 10 }}>
          <View style={{ flex: 3 }}><Text style={{ fontSize: 10, color: '#334155' }}>Discount (if any)</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}><Text style={{ fontSize: 10, color: '#334155' }}>- Rs {discountAmount.toLocaleString('en-IN')}</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}></View>
        </View>

        {/* Payable Amount */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #e2e8f0', paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#f8fafc' }}>
          <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#000000' }}>{payableLabel}</Text>
              <Text style={{ fontSize: 7, color: '#64748b', marginTop: 2 }}>
                  {payableSubtext}
              </Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}><Text style={{ fontSize: 10, fontWeight: 'bold', color: '#000000' }}>{payableValue}</Text></View>
        </View>

        {/* Subsidy */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #e2e8f0', paddingVertical: 8, paddingHorizontal: 10 }}>
          <View style={{ flex: 3 }}><Text style={{ fontSize: 10, color: '#334155' }}>Subsidy</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}><Text style={{ fontSize: 10, color: '#334155' }}>- Rs {subsidyAmount.toLocaleString('en-IN')}</Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}></View>
        </View>

        {/* Final Cost */}
        <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10, borderBottom: '1px solid #cbd5e1', backgroundColor: '#f1f5f9' }}>
          <View style={{ flex: 3 }}><Text style={{ fontSize: 11, fontWeight: 'bold' }}>Final Cost <Text style={{ fontSize: 9, fontWeight: 'normal' }}>(after subsidy)</Text></Text></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}></View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}><Text style={{ fontSize: 11, fontWeight: 'bold' }}>Rs {finalCost.toLocaleString('en-IN')}</Text></View>
        </View>
      </View>

      <Text style={{ fontSize: 9, color: '#02746A', marginBottom: 30 }}>Inclusive of all taxes and installation</Text>

      {/* SCOPE Section */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' }}>SCOPE</Text>
      <View style={{ border: '1px solid #cbd5e1', marginBottom: 30 }}>
        {/* Header */}
        <View style={{ backgroundColor: '#e5e7eb', padding: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>What we cover under our services</Text>
        </View>
        {/* Row 1 */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #cbd5e1' }}>
          <View style={{ flex: 1, padding: 8, borderRight: '1px solid #cbd5e1' }}><Text style={{ fontSize: 10 }}>System Design</Text></View>
          <View style={{ flex: 1, padding: 8 }}><Text style={{ fontSize: 10 }}>5 year of free amc</Text></View>
        </View>
        {/* Row 2 */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 8, borderRight: '1px solid #cbd5e1' }}><Text style={{ fontSize: 10 }}>Installation</Text></View>
          <View style={{ flex: 1, padding: 8 }}><Text style={{ fontSize: 10 }}>Net metering</Text></View>
        </View>
      </View>
       <Text style={{ fontSize: 8, color: '#64748b', fontStyle: 'italic', marginBottom: 30, marginTop: -20 }}>
          Delay in net metersing is entirely on DISCOM, we don't control their operations
      </Text>


      {/* PAYMENT TERMS Section */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 30, textTransform: 'uppercase' }}>PAYMENT TERMS</Text>
      
      <View style={{ height: 150, justifyContent: 'center', position: 'relative' }}>
         {/* Main Horizontal Line */}
         <View style={{ position: 'absolute', top: 75, left: 10, right: 10, height: 2, backgroundColor: '#94a3b8' }} />

         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            {/* Step 1: Top Circle */}
            <View style={{ alignItems: 'center', width: 80 }}>
               <View style={{ 
                 width: 40, height: 40, borderRadius: 20, 
                 backgroundColor: '#FFFFFF', border: '3px solid #02746A', 
                 justifyContent: 'center', alignItems: 'center',
                 marginBottom: 15, zIndex: 10
               }}>
                 <Text style={{ fontSize: 14, fontWeight: 'bold' }}>1</Text>
               </View>
               <Svg height="15" width="20" viewBox="0 0 20 15" style={{ marginTop: -15, marginBottom: 5 }}>
                 <Polygon points="0,0 20,0 10,15" fill="#02746A" />
               </Svg> 
               <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginTop: 30 }}>{terms.advance}%{'\n'}Advance</Text>
            </View>

            {/* Step 2: Bottom Circle */}
            <View style={{ alignItems: 'center', width: 80 }}>
               <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>{terms.procurement}%{'\n'}Procurement</Text>
               <Svg height="15" width="20" viewBox="0 0 20 15" style={{ marginBottom: -15, marginTop: 5 }}>
                 <Polygon points="10,0 20,15 0,15" fill="#000000" />
               </Svg>
               <View style={{ 
                 width: 40, height: 40, borderRadius: 20, 
                 backgroundColor: '#FFFFFF', border: '3px solid #000000', 
                 justifyContent: 'center', alignItems: 'center',
                 marginTop: 15, zIndex: 10
               }}>
                 <Text style={{ fontSize: 14, fontWeight: 'bold' }}>2</Text>
               </View>
            </View>

            {/* Step 3: Top Circle */}
            <View style={{ alignItems: 'center', width: 80 }}>
               <View style={{ 
                 width: 40, height: 40, borderRadius: 20, 
                 backgroundColor: '#FFFFFF', border: '3px solid #02746A', 
                 justifyContent: 'center', alignItems: 'center',
                 marginBottom: 15, zIndex: 10
               }}>
                 <Text style={{ fontSize: 14, fontWeight: 'bold' }}>3</Text>
               </View>
               <Svg height="15" width="20" viewBox="0 0 20 15" style={{ marginTop: -15, marginBottom: 5 }}>
                 <Polygon points="0,0 20,0 10,15" fill="#02746A" />
               </Svg>
               <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginTop: 30 }}>{terms.installation}%{'\n'}Installation</Text>
            </View>

            {/* Step 4: Bottom Circle */}
            <View style={{ alignItems: 'center', width: 80 }}>
               <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>{terms.netMetering}%{'\n'}Net metering</Text>
               <Svg height="15" width="20" viewBox="0 0 20 15" style={{ marginBottom: -15, marginTop: 5 }}>
                  <Polygon points="10,0 20,15 0,15" fill="#000000" />
               </Svg>
               <View style={{ 
                 width: 40, height: 40, borderRadius: 20, 
                 backgroundColor: '#FFFFFF', border: '3px solid #000000', 
                 justifyContent: 'center', alignItems: 'center',
                 marginTop: 15, zIndex: 10
               }}>
                 <Text style={{ fontSize: 14, fontWeight: 'bold' }}>4</Text>
               </View>
            </View>
         </View>
      </View>

      <View style={[styles.footer, { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderTop: '1px solid #e5e7eb',
        marginTop: 20
      }]}>
        <Text style={{ fontSize: 9 }}>{data.formData.capacity}kW Ongrid proposal</Text>
        <Text style={{ fontSize: 9 }}>PAGE 7</Text>
        <Text style={{ fontSize: 9 }}>Generated by {data.formData.companyInfo.name}</Text>
      </View>
    </Page>
  );
};

// Environment Impact Page
const EnvironmentPage = ({ data, logo }) => {
  const capacity = parseFloat(data.formData.capacity) || 0;
  
  // Calculation factors per 1kW (User provided)
  const co2Val = capacity * 25.29;
  const forestVal = capacity * 118.7;
  const coalVal = capacity * 1.259;

  return (
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Brand Name */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={logo} style={{ width: 60, height: 15, objectFit: 'contain' }} />
          <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
            {data.formData.companyInfo.brandName}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>ENVIRONMENT IMPACT</Text>
      <Text style={{ fontSize: 14, color: '#000000', marginBottom: 50, marginTop: 10 }}>
        You are contributing to solve earth's biggest problem- <Text style={{ fontWeight: 'bold' }}>Climate Change</Text>
      </Text>

      <View style={{ gap: 40, paddingLeft: 30 }}>
        {/* CO2 Offset */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={images.environment.co2} style={{ width: 140, height: 140, marginRight: 40, objectFit: 'contain' }} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 }}>CARBON DIOXIDE{'\n'}OFFSET</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#02746A' }}>
              {co2Val.toLocaleString(undefined, { maximumFractionDigits: 1 })} Metric Tons
            </Text>
          </View>
        </View>

        {/* Forest Equivalent */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={images.environment.tree} style={{ width: 140, height: 140, marginRight: 40, objectFit: 'contain' }} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 }}>EQUIVALENT ACRES{'\n'}OF FOREST</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#02746A' }}>
              {forestVal.toLocaleString(undefined, { maximumFractionDigits: 1 })} Acres/Year
            </Text>
          </View>
        </View>

        {/* Coal Burn Avoided */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={images.environment.fire} style={{ width: 140, height: 140, marginRight: 40, objectFit: 'contain' }} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 }}>COAL BURN{'\n'}AVOIDED</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#02746A' }}>
              {coalVal.toLocaleString(undefined, { maximumFractionDigits: 2 })} Metric Tons
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.footer, { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderTop: '1px solid #e5e7eb',
          marginTop: 20
        }]}>
        <Text style={{ fontSize: 9 }}>{data.formData.capacity}kW Ongrid proposal</Text>
        <Text style={{ fontSize: 9 }}>PAGE 8</Text>
        <Text style={{ fontSize: 9 }}>Generated by {data.formData.companyInfo.name}</Text>
      </View>
    </Page>
  );
};

// Thank You Page
const ThankYouPage = ({ data, logo }) => {
  const contact = data.formData.companyInfo.contact || {};
  const branding = data.formData.companyInfo || {};

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={logo} style={{ width: 60, height: 15, objectFit: 'contain' }} />
          <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
            {branding.brandName}
          </Text>
        </View>
      </View>

      {/* Hero Image - Reduced height to fit page */}
      <Image 
        src={images.thankYou.hero} 
        style={{ 
          width: '100%', 
          height: 320, 
          objectFit: 'cover', 
          marginTop: 20 
        }} 
      />

      {/* Title Section - Reduced spacing */}
      <View style={{ marginTop: 15, marginBottom: 30 }}>
        <Text style={{ fontSize: 50, fontWeight: 'normal', color: '#000000', textTransform: 'uppercase', lineHeight: 1 }}>
          THANK YOU
        </Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 5 }}>
          <Text style={{ fontSize: 13, color: '#374151' }}>
            Looking forward to work and add value
          </Text>
          
          {/* Arrow Icon Box */}
          <Svg width="40" height="40" viewBox="0 0 40 40">
            <Rect x="1" y="1" width="38" height="38" stroke="#000000" strokeWidth="1.5" fill="none" rx="0" />
            <Path d="M12 28 L28 12 M28 12 L20 12 M28 12 L28 20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
      </View>

      {/* Contact Information Black Box - Compacted */}
      <View style={{ 
        backgroundColor: '#000000', 
        paddingVertical: 35, 
        paddingHorizontal: 30, 
        marginTop: 10, 
        marginBottom: 10 
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Left Column */}
          <View style={{ gap: 12 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 3 }}>Phone:</Text>
              <Text style={{ fontSize: 13, color: '#FFFFFF' }}>{contact.phone || branding.phone || '9560523752'}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 3 }}>Email:</Text>
              <Text style={{ fontSize: 13, color: '#38bdf8' }}>{contact.email || branding.email || 'team@reslink.org'}</Text>
            </View>
          </View>

          {/* Right Column */}
          <View style={{ alignItems: 'flex-end', gap: 12 }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 3 }}>Website:</Text>
              <Text style={{ fontSize: 13, color: '#38bdf8' }}>{contact.website || branding.website || 'www.reslink.ai'}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
               <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 3 }}>Address:</Text>
               <Text style={{ fontSize: 13, color: '#FFFFFF', textAlign: 'right', width: 250, lineHeight: 1.4 }}>
                 {contact.address || branding.address || '4A, Hauz Khas, New-Delhi, 110049'}
               </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderTop: '1px solid #e5e7eb',
          marginTop: 20
      }]}>
        <Text style={{ fontSize: 9 }}>{data.formData.capacity}kW Ongrid proposal</Text>
        <Text style={{ fontSize: 9 }}>PAGE 9</Text>
        <Text style={{ fontSize: 9 }}>Generated by {branding.name}</Text>
      </View>
    </Page>
  );
};

// Main Quotation PDF Document
export const QuotationPDF = ({ data }) => (
  <Document>
    <CoverPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <AboutReslinkPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <GenerationPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <ROIPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <TimelinePage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <ComponentsPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <OfferTermsPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <EnvironmentPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
    <ThankYouPage data={data} logo={data.formData.companyInfo.logo || images.logo.company} />
  </Document>
);
