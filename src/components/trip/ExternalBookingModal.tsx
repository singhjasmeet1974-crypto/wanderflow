import React from 'react';
import { getBookingProviderLinks } from '../../lib/booking';
import {
  ExternalLink,
  ShieldCheck,
  Building,
  Plane,
  Bus,
  Home,
  AlertCircle,
  X,
} from 'lucide-react';

interface ExternalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationName: string;
}

export const ExternalBookingModal: React.FC<ExternalBookingModalProps> = ({
  isOpen,
  onClose,
  destinationName,
}) => {
  if (!isOpen) return null;

  const links = getBookingProviderLinks(destinationName);

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'Hotels':
        return <Building className="w-4 h-4 text-emerald-600" />;
      case 'Flights':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'Buses & Trains':
        return <Bus className="w-4 h-4 text-amber-600" />;
      case 'Experiences':
      default:
        return <Home className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0704D]">
              External Travel Logistics
            </span>
            <h3 className="text-xl font-bold text-stone-900 font-editorial mt-0.5">
              Booking Options for {destinationName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear Disclaimer Badge */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Wanderflow is a planning companion, not a ticketing agency.</strong> Selecting a link below redirects you directly to the verified provider's official portal. Wanderflow does not take payment cards or charge fees.
          </p>
        </div>

        {/* Providers List */}
        <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
          {links.map((link) => (
            <a
              key={link.provider}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 hover:border-[#16382B] hover:bg-stone-50 transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-stone-100 group-hover:bg-[#16382B]/10 transition">
                  {getServiceIcon(link.serviceType)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900 group-hover:text-[#16382B]">
                      {link.provider}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold">
                      {link.serviceType}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{link.recommendedFor}</p>
                </div>
              </div>

              <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#16382B] transition shrink-0 ml-2" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Safe external redirection
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
