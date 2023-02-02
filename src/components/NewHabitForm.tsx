import { Check } from 'phosphor-react'
export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className='font-semibold leading-tight'>
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, estudar React, etc..."
        autoFocus
        className='p-4 rounded-lg mt-3 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-zinc-400'
      />

      <label htmlFor="" className='font-semibold leading-tight mt-4'>
        Qual a recorrência?
      </label>

      <button
        type="submit"
        className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 bg-green-600 text-white font-semibold hover:bg-green-500 transition-all duration-200'
      >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  )
}