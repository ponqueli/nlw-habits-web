import { FormEvent, useState } from 'react'
import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox';
import { api } from '../lib/axios';
import { notify } from '../utils/notify-alert';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabitForm({ setOpen }: any) {
  const [title, setTitle] = useState<string>('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function resetForm() {
    setTitle('');
    setWeekDays([]);
  }

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || !weekDays.length) {
      notify('warn', 'Preencha todos os campos!');
      return;
    };

    const newHabit = {
      title,
      weekDays,
    }

    try {
      await api.post('/habits', newHabit);
      notify('success', 'Hábito criado com sucesso!');
      resetForm();
      setOpen(false);
    } catch (error) {
      notify('error', 'Erro ao criar hábito!');
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(weekDays.filter(day => day !== weekDay))
    } else {
      setWeekDays([...weekDays, weekDay])
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className='font-semibold leading-tight'>
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, estudar React, etc..."
        autoFocus
        className='p-4 rounded-lg mt-3 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-600 text-white placeholder:text-zinc-400'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className='font-semibold leading-tight mt-4'>
        Qual a recorrência?
      </label>

      <div className="mt-6 flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span
                className="text-white leading-tight"
              >
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        })}
      </div>
      <button
        type="submit"
        className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 bg-green-600 text-white font-semibold hover:bg-green-500 transition-colors duration-200 focus: outline-none focus: ring-2 focus:ring-green-600 focus: ring-offset-2 focus: ring-offset-zinc-900'
      >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  )
}