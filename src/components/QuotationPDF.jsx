import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
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
const CoverPage = ({ data }) => {
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
            <Image src={images.logo.company} style={{ width: 100, height: 25, objectFit: 'contain' }} />
            <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -20 }}>
              {data.formData.companyInfo.brandName}
            </Text>
          </View>
          <Text style={{ fontSize: 11, marginBottom: 20 }}>Reslink Technologies Pvt. Ltd.</Text>
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
            <Image src={images.logo.companyFooter} style={{ width: 50, height: 12, objectFit: 'contain' }} />
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
const AboutReslinkPage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    {/* Modern Header with Logo and Branding */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
      <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image src={images.logo.company} style={{ width: 60, height: 15, objectFit: 'contain' }} />
        <Text style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginLeft: -8 }}>
          {data.formData.companyInfo.brandName}
        </Text>
      </View>
    </View>

    <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 15, letterSpacing: 0.5 }}>ABOUT RESLINK</Text>
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

    {/* Large Solar Panels Image */}
    <View style={{ marginTop: 25, marginBottom: 20 }}>
      <Image src={images.hero.solarPanels} style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 8 }} />
    </View>

    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 9, color: '#64748b', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center' }}>
        {data.formData.companyInfo.footer.amcNote}
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
        <Text style={{ fontSize: 9 }}>Generated by {data.formData.companyInfo.name}</Text>
      </View>
  </Page>
);

// Generation Page
const GenerationPage = ({ data }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  return (
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Brand Name */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 11, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src={images.logo.company} style={{ width: 60, height: 15, objectFit: 'contain' }} />
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
const ROIPage = ({ data }) => (
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
          Residential starts at 8% only
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
const ComponentsPage = ({ data }) => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={{ fontSize: 12, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
        <Image src={images.logo.reslink} style={styles.logoImage} />
      </View>

      <Text style={styles.sectionTitle}>COMPONENTS</Text>
      <Text style={[styles.subtitle, { marginBottom: 20 }]}>
        We believe in working with Tier 1 OEMs only to maintain our quality benchmark.
      </Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>COMPONENT</Text>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>MAKE</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>SPECS</Text>
          <Text style={styles.tableCell}>QUANTITY</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1.5, fontWeight: 'bold' }]}>Best panel OEMs</Text>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>{data.formData.panels[0].brand}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{data.formData.panels[0].specs}</Text>
          <Text style={styles.tableCell}>{data.formData.panels[0].quantity}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1.5, fontWeight: 'bold' }]}>Best Inverter OEMs</Text>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>{data.formData.inverters[0].brand}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{data.formData.inverters[0].specs}</Text>
          <Text style={styles.tableCell}>{data.formData.inverters[0].quantity}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1.5, fontWeight: 'bold' }]}>Structure & Electrical</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}></Text>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>HDGI Structure</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>HDGI Advanced structure</Text>
          <Text style={styles.tableCell}>As per design</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 9, color: '#64748b', fontStyle: 'italic' }}>
          Specific brands will be as per the product you choose
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>{data.formData.capacity}kW Ongrid proposal</Text>
        <Text>PAGE 5</Text>
        <Text>Generated by Reslink</Text>
      </View>
    </Page>
  );
};

// Timeline Page
const TimelinePage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={{ fontSize: 12, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
      <Image src={images.logo.reslink} style={styles.logoImage} />
    </View>

    <Text style={styles.sectionTitle}>TIMELINE</Text>
    <Text style={[styles.subtitle, { marginBottom: 20 }]}>TIMELINE AND MILESTONES</Text>

    <View style={{ marginBottom: 30 }}>
      {[
        { step: 1, name: 'Permitting', duration: '1 week' },
        { step: 2, name: 'Procurement', duration: '2 weeks' },
        { step: 3, name: 'Installation', duration: '2-4 weeks' },
        { step: 4, name: 'Site Assessment', duration: '2-3 weeks' },
        { step: 5, name: 'Electrical', duration: '4th week' },
        { step: 6, name: 'Commissioning', duration: '6th week' }
      ].map((item) => (
        <View key={item.step} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
          <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: item.step === 3 ? '#1a1a2e' : '#02746A', justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>{item.step}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 10, color: '#64748b' }}>{item.duration}</Text>
          </View>
        </View>
      ))}
    </View>

    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>SYSTEM SPECIFICATION</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {[
        `${data.formData.capacity}KW OF CAPACITY`,
        'HDGI STRUCTURE',
        'GRID TIED INVERTER',
        'ONGRID SYSTEM'
      ].map((spec, index) => (
        <View key={index} style={{ flex: '0 0 48%', padding: 15, border: '1px solid #e2e8f0', borderRadius: 4 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', textAlign: 'center' }}>{spec}</Text>
        </View>
      ))}
    </View>

    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 9, color: '#64748b', fontStyle: 'italic' }}>
        Net metering is entirely dependent on DISCOM, we don't control their process
      </Text>
    </View>

    <View style={styles.footer}>
      <Text>{data.formData.capacity}kW Ongrid proposal</Text>
      <Text>PAGE 6</Text>
      <Text>Generated by Reslink</Text>
    </View>
  </Page>
);

// Offer & Terms Page
const OfferTermsPage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={{ fontSize: 12, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
      <Image src={images.logo.reslink} style={styles.logoImage} />
    </View>

    <Text style={styles.sectionTitle}>OFFER & TERMS</Text>

    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>COST</Text>
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.tableCell, { flex: 2 }]}>DESCRIPTION</Text>
        <Text style={styles.tableCell}>AMOUNT</Text>
        <Text style={styles.tableCell}>TOTAL</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2 }]}>Solar plus</Text>
        <Text style={styles.tableCell}>Rs {parseInt(data.formData.plantCost).toLocaleString()}</Text>
        <Text style={styles.tableCell}>Rs {parseInt(data.formData.plantCost).toLocaleString()}</Text>
      </View>
    </View>
    <Text style={{ fontSize: 9, color: '#64748b', marginBottom: 20 }}>
      {data.formData.capacity}kW ongrid solar system with tax @8.90% GST
    </Text>

    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>SCOPE</Text>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1 }]}>System Design</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>Net metering</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1 }]}>Installation</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>5 year of free amc</Text>
      </View>
    </View>

    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>PAYMENT TERMS</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
      {[
        { stage: 1, percent: '10%', label: 'Advance' },
        { stage: 2, percent: '60%', label: 'Procurement' },
        { stage: 3, percent: '10%', label: 'On installation' },
        { stage: 4, percent: '10%', label: 'Net metering' }
      ].map((term) => (
        <View key={term.stage} style={{ alignItems: 'center', flex: 1 }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: term.stage === 2 ? '#1a1a2e' : '#02746A', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>{term.stage}</Text>
          </View>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{term.percent}</Text>
          <Text style={{ fontSize: 8, color: '#64748b' }}>{term.label}</Text>
        </View>
      ))}
    </View>

    <View style={styles.footer}>
      <Text>{data.formData.capacity}kW Ongrid proposal</Text>
      <Text>PAGE 7</Text>
      <Text>Generated by Reslink</Text>
    </View>
  </Page>
);

// Environment Impact Page
const EnvironmentPage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={{ fontSize: 12, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
      <Image src={images.logo.reslink} style={styles.logoImage} />
    </View>

    <Text style={styles.sectionTitle}>ENVIRONMENT IMPACT</Text>
    <Text style={[styles.subtitle, { marginBottom: 40 }]}>
      You are contributing to solve earth's biggest problem- Climate Change
    </Text>

    <View style={{ gap: 30 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>CARBON DIOXIDE OFFSET</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#02746A' }}>
          {data.envImpact.co2Offset.toLocaleString()} Metric Tons
        </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>EQUIVALENT ACRES OF FOREST</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#10b981' }}>
          {data.envImpact.forestEquivalent.toLocaleString()} Acres/Year
        </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>COAL BURN AVOIDED</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#f59e0b' }}>
          {data.envImpact.coalAvoided.toLocaleString()} Metric Tons
        </Text>
      </View>
    </View>

    <View style={styles.footer}>
      <Text>{data.formData.capacity}kW Ongrid proposal</Text>
      <Text>PAGE 8</Text>
      <Text>Generated by Reslink</Text>
    </View>
  </Page>
);

// Thank You Page
const ThankYouPage = ({ data }) => (
  <Page size="A4" style={styles.coverPage}>
    <View style={styles.header}>
      <Text style={{ fontSize: 12, color: '#64748b' }}>{data.formData.capacity}kW Ongrid Proposal</Text>
      <Image src={images.logo.reslink} style={styles.logoImage} />
    </View>

    <View style={{ padding: 40, paddingTop: 100, alignItems: 'center' }}>
      <Text style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>THANK YOU</Text>
      <Text style={{ fontSize: 16, color: '#64748b', marginBottom: 60 }}>Looking forward to work and add value</Text>
    </View>

    <View style={[styles.footer, { backgroundColor: '#1a1a2e', padding: 20, left: 0, right: 0, flexDirection: 'column', gap: 10 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 10, marginBottom: 3 }}>Phone:</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>{data.formData.companyInfo.contact.phone}</Text>
        </View>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 10, marginBottom: 3 }}>Website:</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>{data.formData.companyInfo.contact.website}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 10, marginBottom: 3 }}>Email:</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>{data.formData.companyInfo.contact.email}</Text>
        </View>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 10, marginBottom: 3 }}>Address:</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>{data.formData.companyInfo.contact.address}</Text>
        </View>
      </View>
    </View>

    <View style={{ position: 'absolute', bottom: 60, left: 40, right: 40 }}>
      <Text style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>
        {data.formData.capacity}kW Ongrid proposal • PAGE 9 • Generated by Reslink
      </Text>
    </View>
  </Page>
);

// Main Quotation PDF Document
export const QuotationPDF = ({ data }) => (
  <Document>
    <CoverPage data={data} />
    <AboutReslinkPage data={data} />
    <GenerationPage data={data} />
    <ROIPage data={data} />
    <ComponentsPage data={data} />
    <TimelinePage data={data} />
    <OfferTermsPage data={data} />
    <EnvironmentPage data={data} />
    <ThankYouPage data={data} />
  </Document>
);
