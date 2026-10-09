import { describe, it, expect } from 'vitest';
import { getBookingProviderLinks } from '../booking';

describe('External Booking Links Service', () => {
  it('generates valid search links for destination', () => {
    const links = getBookingProviderLinks('Manali');
    expect(links.length).toBeGreaterThanOrEqual(4);

    const bookingDotCom = links.find((l) => l.provider === 'Booking.com');
    expect(bookingDotCom).toBeDefined();
    expect(bookingDotCom?.url).toContain('booking.com');
    expect(bookingDotCom?.url).toContain('Manali');

    const skyscanner = links.find((l) => l.provider === 'Skyscanner');
    expect(skyscanner).toBeDefined();
    expect(skyscanner?.url).toContain('skyscanner');

    const mmt = links.find((l) => l.provider === 'MakeMyTrip');
    expect(mmt).toBeDefined();
    expect(mmt?.url).toContain('makemytrip');
  });

  it('correctly encodes special characters in destination query', () => {
    const links = getBookingProviderLinks('Leh & Ladakh');
    const bookingLink = links.find((l) => l.provider === 'Booking.com');
    expect(bookingLink?.url).toContain('Leh%20%26%20Ladakh');
  });
});
