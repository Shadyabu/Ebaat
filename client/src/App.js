import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransferForm from './TransferForm';


const App = () => {
  const handleTransferSubmit = (transferData) => {
    // This function handles the submitted data from TransferForm
    console.log('Transfer Data:', transferData);

    // Example: Call your backend API or Stellar SDK here
    // fetch('/api/transfer', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(transferData),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Transfer successful:', data))
    // .catch(error => console.error('Error with transfer:', error));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Escrow App</h1>
      <TransferForm onSubmit={handleTransferSubmit} />
    </div>
  );
};

export default App;
