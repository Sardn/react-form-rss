import { useForm } from 'react-hook-form';
import './App.css';

interface MyForm {
  name: string;
  age: number;
}

function App() {
  const { register, handleSubmit } = useForm<MyForm>({
    defaultValues: {},
  });

  const submit: SubmitHandler<MyForm> = data => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)} action="">
        <input type="text" />
        <input type="number" />
        <button>Отправить</button>
      </form>
    </>
  );
}

export default App;
