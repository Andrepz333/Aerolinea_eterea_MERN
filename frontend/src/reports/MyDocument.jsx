import { Page, Text, View, Document, StyleSheet, Image,Svg, Path } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

// Función auxiliar para formatear fechas
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

// Estilos
const styles = StyleSheet.create({
  page: { 
    padding: 40,
    backgroundColor: 'white',
    fontFamily: 'Helvetica'
  },
  headerContainer: {
    marginBottom: 30,
  },
  header: { 
    flexDirection: 'row',
    backgroundColor: '#800080',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 15
  },
  headerText: { 
    color: 'white',
    fontSize: 28,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  subHeader: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5
  },
  mainContent: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#800080',
    borderRadius: 8,
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#800080',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#800080'
  },
  row: { 
    flexDirection: 'row',
    marginBottom: 8,
    paddingVertical: 3
  },
  label: { 
    width: 150,
    fontWeight: 'bold',
    color: '#444',
    fontSize: 11
  },
  value: { 
    flex: 1,
    color: '#000',
    fontSize: 11
  },
  table: { 
    display: 'table',
    width: 'auto',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#800080',
    borderRadius: 8,
    overflow: 'hidden'
  },
  tableRow: { 
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#800080'
  },
  tableHeader: { 
    backgroundColor: '#800080',
    color: 'white',
    padding: 8,
    fontWeight: 'bold'
  },
  tableCell: { 
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#800080',
    fontSize: 10
  },
  footer: {
    marginTop: 30,
    alignItems: 'center'
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#800080',
    borderRadius: 8,
    backgroundColor: '#faf5ff'
  },
  qrCode: { 
    width: 120,
    height: 120
  },
  qrLabel: {
    marginTop: 8,
    fontSize: 10,
    color: '#800080',
    textAlign: 'center'
  }
});

const PlaneIcon = () => (
  <Svg viewBox="0 0 24 24" width={30} height={30}>
    <Path
      fill="#fff"
      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
    />
  </Svg>
);

const MyDocument = ({ reservaData, userData, qrCodeImage }) => {
      // Formatear las fechas de departure y return
  const departureFormatted = formatDateTime(reservaData?.departure);
  const returnFormatted = formatDateTime(reservaData?.return);

    return (
      <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <PlaneIcon />
            <Text style={styles.headerText}>E-TICKET - Ethereal Airline</Text>
          </View>
          <Text style={styles.subHeader}>Your journey begins with us</Text>
        </View>

        <View style={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>NAME:</Text>
          <Text style={styles.value}>{userData?.name || 'Gisel andrea Pinta'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>NATIONALITY:</Text>
          <Text style={styles.value}>{userData?.nationality || 'Colombiano/a'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>DOCUMENT TYPE:</Text>
          <Text style={styles.value}>{userData?.documentType || 'ID'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>DOCUMENT NUMBER:</Text>
          <Text style={styles.value}>{userData?.documentNumber || '1192814468'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>BIRTHDAY:</Text>
          <Text style={styles.value}>{userData?.birthday || '22/08/2001'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>GENDER:</Text>
          <Text style={styles.value}>{userData?.gender || 'Female'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>PHONE:</Text>
          <Text style={styles.value}>{userData?.phone || '3135121268'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>EMAIL:</Text>
          <Text style={styles.value}>{userData?.email || 'andreapz333@gmail.com'}</Text>
        </View> 
      </View>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Details</Text>

        <View style={styles.row}>
            <Text style={styles.label}>ISSUE DATE:</Text>
            <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
          </View>

        <View style={styles.row}>
          <Text style={styles.label}>ORIGIN:</Text>
          <Text style={styles.value}>{reservaData?.from || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>DESTINATION:</Text>
          <Text style={styles.value}>{reservaData?.to || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>DEPARTURE DATE:</Text>
          <Text style={styles.value}>{departureFormatted}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>RETURN DATE:</Text>
          <Text style={styles.value}>{returnFormatted}</Text>
        </View>
      </View>

      <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 1, color: 'white' }]}>FLIGHT NUMBER</Text>
              <Text style={[styles.tableCell, { flex: 1, color: 'white' }]}>AIRLINE</Text>
              <Text style={[styles.tableCell, { flex: 1, color: 'white' }]}>BAGGAGE</Text>
              <Text style={[styles.tableCell, { flex: 1, color: 'white' }]}>AIRFARE</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1 }]}>EA-{Math.floor(Math.random() * 1000)}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Ethereal Airline</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{reservaData?.baggage || 'N/A'}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{reservaData?.airfare || 'N/A'}</Text>
            </View>
          </View>
        </View>

      <View style={styles.footer}>
          <View style={styles.qrContainer}>
            {qrCodeImage && (
              <>
                <Image style={styles.qrCode} src={qrCodeImage} />
                <Text style={styles.qrLabel}>Scan for digital version of ticket</Text>
              </>
            )}
          </View>
      </View>
    </Page>
  </Document>
);
};

// PropTypes
MyDocument.propTypes = {
    reservaData: PropTypes.shape({
      from: PropTypes.oneOf(["Bogotá", "Medellín", "Cali", "Cartagena", "Barranquilla"]).isRequired,
      to: PropTypes.oneOf(["Madrid", "Miami", "Buenos Aires", "Cancún", "São Paulo"]).isRequired,
      departure: PropTypes.string.isRequired,
      return: PropTypes.string,
      baggage: PropTypes.oneOf(["Basic", "Classic", "Premium"]),
      airfare: PropTypes.oneOf(["carry-on", "checked", "special"]),
    }),
    userData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      nationality: PropTypes.oneOf(["Colombian", "American", "Mexican", "Spanish", "French", "German", "Brazilian", "Argentinian", "Chilean", "Peruvian"]),
      documentType: PropTypes.oneOf(["ID", "Passport"]).isRequired,
      documentNumber: PropTypes.string.isRequired,
      birthday: PropTypes.instanceOf(Date).isRequired,
      gender: PropTypes.oneOf(['Male', 'Female', 'Other']).isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    qrCodeImage: PropTypes.string, // URL de la imagen
  };

export default MyDocument;
