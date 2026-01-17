import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true }, 
    currency: { type: String, default: 'INR' },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending' 
    },
    paymentMethodType: { type: String }, 
    paymentDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;