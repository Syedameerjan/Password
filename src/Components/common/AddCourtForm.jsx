
import React, { useState } from 'react';
import AxiosInstance from '../../Config/AxiosInstance';
import {
    MDBValidation,
    MDBValidationItem,
    MDBInput,
    // MDBBtn,
    MDBInputGroup,
    MDBCheckbox
} from 'mdb-react-ui-kit';
// import { toastError, toastSuccess } from '../../Constants/plugins';
import { useNavigate } from 'react-router-dom';



export default function AddCourtForm() {
    const [formValue, setFormValue] = useState({
        courtName: '',
        location: '',
        type: '',
        address: '',
        

    });
    const navigate=useNavigate()
    const [courtPicture,setCourtPicture]=useState(null) 
    const [selectedImage, setSlectedImage] = useState('')
    const onChange = (e) => {

        setFormValue({ ...formValue, [e.target.name]: e.target.value });
        
    };
    const addFileData=(e)=>{
        setCourtPicture(e.target.files[0])
        e.target?.files[0] ? setSlectedImage(URL?.createObjectURL(e.target?.files[0]) ?? null) : setSlectedImage(null)
    }
    const addCourtData= ()=>{
        
    let fileData=new FormData()
     fileData.append('image',courtPicture)
     

    AxiosInstance.post('/admin/addCourtData',fileData,{params:formValue},{headers:{"Content-type": 'multipart/form-data'}}).then((response)=>{
        
        alert ('New court added')
        navigate('/home')
          
    })

.catch(err=>{
    
    alert('Something went wrong')
})
        
    } 
    
    return (
        <MDBValidation className='row g-5  m-5'>
            <MDBValidationItem className='col-md-4'>
                <MDBInput
                    value={formValue.fname}
                    name='courtName'
                    onChange={onChange}
                    id='validationCustom01'
                    required
                    placeholder='Court Name'

                />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-4'>
                <MDBInput

                    value={formValue.lname}
                    name='location'
                    onChange={onChange}
                    id='validationCustom02'
                    required
                    placeholder='Location'

                />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-4'>
                <MDBInputGroup >
                    <input
                        name='type'
                        type='text'
                        onChange={onChange}
                        className='form-control'
                        id='validationCustomUsername'
                        placeholder='Type'
                        required
                    />
                </MDBInputGroup>
            </MDBValidationItem>
            <MDBValidationItem className='col-12' feedback='Please provide a valid address.' invalid>
                <textarea

                    value={formValue.city}
                    name='address'
                    onChange={onChange}
                    id='validationCustom03'
                    required
                    placeholder='Address with phone number'
                    className='w-100'
                />
            </MDBValidationItem>
            <MDBValidationItem className='col-12 col-md-4' feedback='Please provide a picture.' invalid>
                <MDBInput
                    type='file'
                    name='courtPicture'
                    onChange={addFileData}
                    id='validationCustom05'
                    required
                    label='Court Picture'
                />
            </MDBValidationItem>
            <MDBValidationItem className='col-12' feedback='You must agree before submitting.' invalid>
                <MDBCheckbox label='Agree to terms and conditions' id='invalidCheck' required />
            </MDBValidationItem>
            {selectedImage && <img src={selectedImage} alt="" className='object-fit w-25' />}

            <div className='col-12'>
            {/* <MDBBtn type='submit' onClick={addCourtData}>Submit form</MDBBtn> */}
                 <button className='logbutton mx-4 p-1' type='submit' onClick={addCourtData}>Submit form</button> 
                <button className='logbutton mx-4 p-2' type='reset' >Reset form</button>
                
            </div>
        </MDBValidation>
    );
}






