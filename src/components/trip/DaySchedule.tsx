import React, { useState } from 'react';
import { ItineraryDay, ItineraryActivity, ActivityCategory } from '../../types';
import { ActivityItem } from './ActivityItem';
import { Plus, Calendar, Clock, DollarSign, Sparkles } from 'lucide-react';

interface DayScheduleProps {
  day: ItineraryDay;
  onUpdateDay: (updatedDay: ItineraryDay) => void;
}

export const DaySchedule: React.FC<DayScheduleProps> = ({ day, onUpdateDay }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState<Omit<ItineraryActivity, 'id'>>({
    time: '10:00 AM',
    title: '',
    location: '',
    notes: '',
    estimatedCost: 0,
    category: 'Sightseeing',
  });

  const totalDayCost = day.activities.reduce((sum, act) => sum + (act.estimatedCost || 0), 0);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title.trim()) return;

    const activity: ItineraryActivity = {
      ...newActivity,
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };

    onUpdateDay({
      ...day,
      activities: [...day.activities, activity],
    });

    setNewActivity({
      time: '12:00 PM',
      title: '',
      location: '',
      notes: '',
      estimatedCost: 0,
      category: 'Food & Drink',
    });
    setShowAddForm(false);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const items = [...day.activities];
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;
    onUpdateDay({ ...day, activities: items });
  };

  const handleMoveDown = (index: number) => {
    if (index >= day.activities.length - 1) return;
    const items = [...day.activities];
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;
    onUpdateDay({ ...day, activities: items });
  };

  const handleDeleteActivity = (index: number) => {
    const items = day.activities.filter((_, i) => i !== index);
    onUpdateDay({ ...day, activities: items });
  };

  const handleUpdateActivity = (index: number, updated: ItineraryActivity) => {
    const items = [...day.activities];
    items[index] = updated;
    onUpdateDay({ ...day, activities: items });
  };

  const handleThemeTitleChange = (title: string) => {
    onUpdateDay({ ...day, themeTitle: title });
  };

  return (
    <div className="bg-[#FAF9F6] rounded-2xl border border-[#E6E2D8] p-5 sm:p-6 space-y-4">
      {/* Day Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#16382B] text-white flex items-center justify-center font-bold text-sm font-editorial shrink-0 shadow-xs">
            D{day.dayNumber}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stone-900 font-editorial">
                Day {day.dayNumber}
              </h3>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#16382B]" />
                {day.date}
              </span>
            </div>
            <input
              type="text"
              value={day.themeTitle || ''}
              onChange={(e) => handleThemeTitleChange(e.target.value)}
              placeholder="Give this day a theme (e.g. Waterfall Trek, Historic Old City)..."
              className="text-xs font-medium text-stone-600 bg-transparent border-b border-dashed border-stone-300 hover:border-stone-500 focus:border-[#16382B] focus:outline-none w-full max-w-sm mt-0.5"
            />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
              Day Est. Cost
            </span>
            <span className="text-xs font-bold text-[#16382B]">
              ₹{totalDayCost.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      {/* Add Activity Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddActivity}
          className="p-4 rounded-xl bg-white border border-[#16382B]/20 shadow-sm space-y-3 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="text-xs font-bold text-[#16382B] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A43B]" />
              New Activity for Day {day.dayNumber}
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-stone-400 hover:text-stone-600 text-xs font-medium"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">Time</label>
              <input
                type="text"
                placeholder="09:00 AM"
                value={newActivity.time}
                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                required
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#16382B] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">Category</label>
              <select
                value={newActivity.category}
                onChange={(e) =>
                  setNewActivity({
                    ...newActivity,
                    category: e.target.value as ActivityCategory,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#16382B] focus:outline-none"
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
                placeholder="0"
                value={newActivity.estimatedCost || ''}
                onChange={(e) =>
                  setNewActivity({
                    ...newActivity,
                    estimatedCost: Number(e.target.value) || 0,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#16382B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Activity Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Sunrise hike to temple viewpoint"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                required
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#16382B] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Location / Address *
              </label>
              <input
                type="text"
                placeholder="e.g. Old Town Trailhead"
                value={newActivity.location}
                onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                required
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#16382B] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-stone-600 block mb-1">
              Notes &amp; Practical Tips
            </label>
            <input
              type="text"
              placeholder="e.g. Carry student ID, bring extra water, shoes required"
              value={newActivity.notes}
              onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#16382B] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#16382B] text-white hover:bg-[#235441]"
            >
              Save Activity
            </button>
          </div>
        </form>
      )}

      {/* Activity List */}
      <div className="space-y-2.5">
        {day.activities.length === 0 ? (
          <div className="p-8 rounded-xl bg-white/70 border border-dashed border-stone-300 text-center space-y-2">
            <p className="text-xs text-stone-500 font-medium">
              No activities planned for Day {day.dayNumber} yet.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#16382B] hover:text-[#E0704D]"
            >
              <Plus className="w-3.5 h-3.5" />
              Add the first activity
            </button>
          </div>
        ) : (
          day.activities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isFirst={index === 0}
              isLast={index === day.activities.length - 1}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              onDelete={() => handleDeleteActivity(index)}
              onUpdate={(updated) => handleUpdateActivity(index, updated)}
            />
          ))
        )}
      </div>
    </div>
  );
};
