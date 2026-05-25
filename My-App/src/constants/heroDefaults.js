export const defaultHeroSettings = {
  headingLine1: 'The car you want.',
  headingLine2: 'The trip you remember.',
  description: 'Clean vehicles, quick booking, and transparent pricing for weddings, airport pickups, tours, and business travel.',
  chip1: 'Airport pickup',
  chip2: 'With driver or self drive',
  chip3: '24/7 support',
  bookNowText: 'Book Now',
  whatsappText: 'WhatsApp Us',
  heroImageUrl: '',
  heroImageAlt: 'Imran Rent a Car',
  availableBadge: 'Available Today',
  priceLabel: 'Starting from',
  priceValue: 'PKR 9,000',
  priceUnit: 'per day',
  driverTagTitle: 'Driver',
  driverTagValue: 'Available',
  pickupTagTitle: 'Pickup',
  pickupTagValue: 'Rawalpindi',
  areaTagTitle: 'Area',
  areaTagValue: 'Islamabad',
};

export const mergeHeroSettings = (incoming = {}) => ({
  ...defaultHeroSettings,
  ...incoming,
});
