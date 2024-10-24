import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardSubTitle,
  
} from 'mdb-react-ui-kit';
import { BASE_URL } from '../Constants/constants';
import { useNavigate } from 'react-router-dom';


export default function Cards({data}) {
  const navigate=useNavigate()
  return (
    <MDBCard style={{width:'19rem'}} className='col-12  col-md-3 col-lg-4 col-xl-2 col-xxl-1 ' onClick={()=>navigate(`/courtUserViewPage/${data._id}`)}>
      <MDBCardImage src= {`${BASE_URL}/images/${data.courtPic}`} position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle > {data?.courtName} </MDBCardTitle>
        <MDBCardSubTitle> {data.type} </MDBCardSubTitle>
        <MDBCardSubTitle> {data.location} </MDBCardSubTitle>
        <MDBCardText>
        
        </MDBCardText>
       
      </MDBCardBody>
    </MDBCard>
  );
}