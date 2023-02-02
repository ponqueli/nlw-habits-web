import { Plus, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import logoImage from '../assets/logo.svg';
import { NewHabitForm } from './NewHabitForm';

export function Header() {
  //forma Imperativa e forma Declarativa
  //Imperativa: programação tradicional. Você diz o que fazer e como fazer, cada passo.
  //Declarativa: Voce cria uma condição e a gente reage a essa condição. A gente cria, por exemplo
  // uma informação, o modal está aberta isModalOpen, e em algum lugar do meu código, eu verifico se o modal
  // esta aberto, aí eu faço alguma coisa. 

  //variaveis monitoradas pelo react. Cada vez que muda o valor, o react vai renderizar novamente o componente

  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImage} alt="logo habits" />

      <Dialog.Root>
        <Dialog.Trigger
          type='button'
          className='flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300'
        >
          <Plus size={20} className='text-violet-500' />
          Novo Hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>
            <Dialog.Title className='text-3xl leading-tight font-extrabold'>
              Criar Hábito
            </Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}