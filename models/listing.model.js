import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: false,
    },
    images: {
        type: [String],  // Array of image URLs
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 0,
    },
    furnished: {
        type: Boolean,
        default: false,
    },
    parking: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ['rent', 'sale'],  
        required: true,
    },
    offer: {
        type: Boolean,
        default: false,
    },
    bedrooms: {
        type: Number,
        required: true,
        min: 0,

    },

    imageUrl: {
        type: Array,
        required: true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    },
}, {
    timestamps: true,  
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
