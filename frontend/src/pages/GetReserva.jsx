import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservas } from '../features/reservaSlice';
import { Plane } from 'lucide-react';
import { Link } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from "../reports/MyDocument.jsx";
import QRCode from 'qrcode';

function GetReservas() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { list: reservas, loading } = useSelector(state => state.reservas);
  const [qrCodes, setQrCodes] = useState({});

  useEffect(() => {
    dispatch(fetchReservas());
  }, [dispatch]);

  useEffect(() => {
    const generateQRCode = async () => {
      const qrMap = {};
      for (let reserva of reservas) {
        qrMap[reserva._id] = await QRCode.toDataURL(`TICKET-${user?.documentNumber || 'guest'}`);
      }
      setQrCodes(qrMap);
    };
    
    if (reservas.length > 0) {
      generateQRCode();
    }
  }, [reservas, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-500 to-purple-500">
      <div className="container mx-auto pt-8 pb-12">
        <Link to="/createReserva" className="flex justify-center items-center gap-2 text-5xl font-bold mb-6">
          <Plane className="text-cyan-400 w-12 h-12" />
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text hover:from-fuchsia-500 hover:to-cyan-400 transition-all duration-300">
            Ethereal Airline
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-center text-gray-600">Flight Reservations</h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-lg rounded-xl p-8 shadow-2xl overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs uppercase bg-white/10 text-cyan-400">
              <tr>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Departure</th>
                <th className="px-6 py-3">Return</th>
                <th className="px-6 py-3">Airfare</th>
                <th className="px-6 py-3">Baggage</th>
                <th className="px-6 py-3">Ticket</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva._id} className="border-b border-cyan-400/30">
                  <td className="px-6 py-4">{reserva.from}</td>
                  <td className="px-6 py-4">{reserva.to}</td>
                  <td className="px-6 py-4">{reserva.departure}</td>
                  <td className="px-6 py-4">{reserva.return}</td>
                  <td className="px-6 py-4">{reserva.airfare}</td>
                  <td className="px-6 py-4">{reserva.baggage}</td>

                  <td className="px-6 py-4">

                  {console.log("ReservaData:", reserva, "UserData:", user)}
                    <PDFDownloadLink
                      document={<MyDocument reservaData={reserva} userData={user} qrCodeImage={qrCodes[reserva._id]} />}
                      fileName={`ticket-${reserva._id}.pdf`}
                    >
                      {({ loading }) => loading ? "Generando..." : "Descargar Ticket"}
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetReservas;
