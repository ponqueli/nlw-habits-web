import { useEffect, useState } from 'react';
import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { api } from '../lib/axios';
import { notify } from '../utils/notify-alert';

interface HabitsListProps {
  date: Date,
  onCompletedChange: (completed: number) => void,
}

interface HabitsInfo {
  possibleHabits: {
    id: string,
    title: string,
    created_at: string,

  }[],
  completedHabits: string[],
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      setHabitsInfo(response.data);
    })
  }, []);

  const isDateInPast = dayjs(date).endOf('day').isBefore(dayjs(), 'day');

  async function handleToggleHabit(habitId: string) {
    if (isDateInPast) {
      notify('warn', 'Passado é passado. Bora olhar pra frente!');
      return;
    }

    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitCompleted = habitsInfo?.completedHabits.includes(habitId);

    let newCompletedHabits: string[] = [];

    if (isHabitCompleted) {
      newCompletedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
    } else {
      newCompletedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits: newCompletedHabits,
    });

    onCompletedChange(newCompletedHabits.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox.Root
            key={habit.id}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo?.completedHabits.includes(habit.id)}
            disabled={isDateInPast}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span
              className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
            >
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}
    </div>
  )
}