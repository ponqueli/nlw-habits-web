import './lib/dayjs';
import { ToastContainer, toast } from 'react-toastify';
import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
//import { Habit } from "./components/Habit"

export function App() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <SummaryTable />
        <ToastContainer />
      </div>
    </div>
  )
}
