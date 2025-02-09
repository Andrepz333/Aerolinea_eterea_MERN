import Reservas from '../models/reservas.model.js';
//http://localhost:4000/api/createReserva CREATE
export const createReserva = async (req, res) => {
    try {
        const { from, to, departure, return: returnDate, airfare, baggage } = req.body;
        // Validar fechas
        if (new Date(departure) >= new Date(returnDate)) {
            return res.status(400).json({ message: "La fecha de regreso debe ser posterior a la de salida" });
        }

        const newReserva = new Reservas({ 
            from,
            to,
            departure,
            return: returnDate,
            airfare,
            baggage
        });
        await newReserva.save();
        res.json(newReserva);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
};

//http://localhost:4000/api/getReservas READ
export const getReservas = async (req, res) => {
    try {
        const reservas = await Reservas.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// http://localhost:4000/api/searchReservaByRoute
export const searchReservaByRoute = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: 'Debe proporcionar los parámetros: from y to' });
        }

        const reserva = await Reservas.findOne({ from, to });

        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        res.json({ reserva });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//http://localhost:4000/api/updateReserva UPDATE

export const updateReserva = async (req, res) => {
    try {
        const { from, to, departure, return: returnDate, airfare, baggage } = req.body;

        const reserva = await Reservas.findOne({ from, to });

        if (!reserva) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        // Validar fechas
        if (new Date(departure) >= new Date(returnDate)) {
            return res.status(400).json({ message: "La fecha de regreso debe ser posterior a la de salida" });
        }

        // Actualizar campos
        reserva.departure = departure;
        reserva.return = returnDate;
        reserva.airfare = airfare;
        reserva.baggage = baggage;

        await reserva.save();
        res.json({ message: "Reserva actualizada", reserva });
    } catch (error) {
        console.error("Error en updateReserva:", error);
        res.status(500).json({ message: error.message });
    }
};

//http://localhost:4000/api/deleteReserva

export const deleteReserva = async (req, res) => {
    try {
        const { from, to } = req.body;

        const reserva = await Reservas.findOneAndDelete({ from, to });

        if (!reserva) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        res.json({ message: "Reserva eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
