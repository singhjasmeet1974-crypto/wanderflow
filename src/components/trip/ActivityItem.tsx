import React, { useState } from 'react';
import { ItineraryActivity, ActivityCategory } from '../../types';
import {
  Clock,
  MapPin,
  ChevronUp,
  ChevronDown,
  Trash2,
  Edit2,
  Utensils,
  Camera,
  Compass,
  Bus,
  Bed,
  Smile,
  Check,
  X,
} from 'lucide-react';

interface ActivityItemProps {
  activity: ItineraryActivity;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onUpdate: (updated: ItineraryActivity) => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ItineraryActivity>(activity);

  const getCategoryIcon = (category: ActivityCategory) => {
    switch (category) {
      case 'Food & Drink':
        return <Utensils className="w-3.5 h-3.5 text-amber-600" />;
      case 'Sightseeing':
        return <Camera className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Adventure':
        return <Compass className="w-3.5 h-3.5 text-orange-600" />;
      case 'Transport':
        return <Bus className="w-3.5 h-3.5 text-blue-600" />;
      case 'Stay':
        return <Bed className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Relaxation':
      default:
        return <Smile className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editForm);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSaveEdit}
        className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="text-[11px] font-bold text-stone-600 block mb-1">Time</label>
            <input
              type="text"
              value={editForm.time}
              onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
              placeholder="e.g. 10:00 AM"
              required
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-stone-600 block mb-1">Category</label>
            <select
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value as ActivityCategory })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
            >
              <option value="Sightseeing">Sightseeing</option>
              <option value="Food & Drink">Food &amp; Drink</option>
              <option value="Adventure">Adventure</option>
              <option value="Transport">Transport</option>
              <option value="Stay">Stay</option>
              <option value="Relaxation">Relaxation</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-stone-600 block mb-1">
              Estimated Cost (₹)
            </label>
            <input
              type="number"
              min="0"
              value={editForm.estimatedCost}
              onChange={(e) =>
                setEditForm({ ...editForm, estimatedCost: Number(e.target.value) || 0 })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-bold text-stone-600 block mb-1">Activity Title</label>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              required
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-stone-600 block mb-1">Location / Venue</label>
            <input
              type="text"
              value={editForm.location}
              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              required
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-stone-600 block mb-1">Notes / Tips</label>
          <input
            type="text"
            value={editForm.notes || ''}
            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
            placeholder="e.g. Pre-book tickets or carry student ID"
            className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-[#16382B] text-white hover:bg-[#235441] transition"
          >
            <Check className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="group relative p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Time & Info */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="shrink-0 flex flex-col items-center">
          <div className="px-2 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-500" />
            <span>{activity.time}</span>
          </div>
          <div className="mt-1 p-1 rounded-full bg-stone-50 border border-stone-100">
            {getCategoryIcon(activity.category)}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-stone-900 truncate">{activity.title}</h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
              {activity.category}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
            <MapPin className="w-3 h-3 text-[#E0704D] shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>

          {activity.notes && (
            <p className="text-xs text-stone-500 mt-1 italic line-clamp-1">{activity.notes}</p>
          )}
        </div>
      </div>

      {/* Cost & Reorder Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
        {activity.estimatedCost > 0 ? (
          <span className="text-xs font-bold text-[#16382B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            ₹{activity.estimatedCost.toLocaleString()}
          </span>
        ) : (
          <span className="text-xs text-stone-400 font-medium">Free</span>
        )}

        {/* Move up / down buttons */}
        <div className="flex items-center gap-0.5 bg-stone-100 rounded-lg p-0.5">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Move activity up"
            title="Move earlier"
            className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Move activity down"
            title="Move later"
            className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Edit & Delete */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Edit activity details"
            className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete activity"
            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
