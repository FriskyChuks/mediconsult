import {useState} from 'react'
import { useParams } from 'react-router-dom'

import api from '../../AxiosInstance';
import { useMessage } from "../contexts/MessageContext";

const RaisePrescription = ({ baseURL, usersList }) => {
  const {id} = useParams()
  const { showMessage } = useMessage();
  const accessToken = localStorage.getItem('access_token')
  const customer = usersList.filter(user => parseInt(user.id) === parseInt(id))[0]

  const [prescriptions, setPrescriptions] = useState([]);
  const [prescription, setPrescription] = useState('');
  const [morningDosage, setMorningDosage] = useState(1);
  const [afternoonDosage, setAfternoonDosage] = useState(1);
  const [nightDosage, setNightDosage] = useState(1);

 
  const addPrescription = () => {
    if (prescription) {
      const newPrescription = {
        // id: Date.now(),
        name: prescription,
        dosage: `${morningDosage || '1'} X ${afternoonDosage || '1'} X ${nightDosage || '1'}`
      };
      setPrescriptions([...prescriptions, newPrescription]);
      
      setPrescription('');
      setMorningDosage('');
      setAfternoonDosage('');
      setNightDosage('');
    }
  };

  const deletePrescription = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const customer_data = {customer:parseInt(customer.id)}
      const res = await api.post(`${baseURL}/prescriptions/`, customer_data, {
        headers: { "Authorization": `FRISKY ${accessToken}` }
      })
      console.log(res.data)
      if (res.data) {
        prescriptions.map((p) => (
          api.post(`${baseURL}/prescriptions/prescription_detail/`, 
            { prescription: res.data.id, item: p.name, dose: p.dosage }, {
            headers: { "Authorization": `FRISKY ${accessToken}` }
          })
        ))
      }
      showMessage("Prescription successful!!",'success')
      setPrescriptions([])
  };

  return (
    <>
    <div className="container">
      <h2 className="mb-4 text-center">Prescription Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <input
                type="text"
                className="form-control p-3"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                placeholder="Enter the prescription"
              />
            </div>
            <div className="mb-3 d-flex">
              <input
                type="number"
                className="form-control me-2"
                value={morningDosage}
                placeholder="AM"
                min="0"
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value) || 0);
                  setMorningDosage(value.toString());
                }}                
              />
              <input
                type="number"
                className="form-control me-2"
                value={afternoonDosage}
                placeholder="Noon"
                min="0"
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value) || 0);
                  setAfternoonDosage(value.toString());
                }}
                
              />
              <input
                type="number"
                className="form-control"
                value={nightDosage}
                placeholder="PM"
                min="0"
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value) || 0);
                  setNightDosage(value.toString());
                }}                
              />
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={addPrescription}>Add</button>
           </div>
          <div className="col-md-6">
            <div id="prescriptionList" className="border p-3" style={{minHeight: '200px'}}>
              {prescriptions.map((p) => (
                <div key={p.id} className="prescription-item d-flex justify-content-between align-items-center mb-2">
                  <span>{p.name} {" "}{" "} ({p.dosage})</span>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => deletePrescription(p.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    <br /><br />

    </>
  );
}

export default RaisePrescription