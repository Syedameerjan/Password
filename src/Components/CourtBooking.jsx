import React, { useEffect, useState } from 'react';
import "./common/CSS/CourtBooking.css";
import { ModalView } from './common/Modal';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Config/AxiosInstance';
import { BASE_URL, TIMINGS } from '../Constants/constants';




function CourtBooking() {
  const { id } = useParams()
  const [singleCourtData, setSingleCourtData] = useState({})
  const [modalOpen, setModalOpen] = useState()
  const [timeSlotData, setTimeSlotData] = useState({
    startDate: '',
    endDate: '',
    cost: ''
  })
  const [showDropDown, setShowDropDown] = useState(false)
  const [selectedTimes, setSlectedTimes] = useState([])
  const [filterTimes, setFilterTimes] = useState(TIMINGS)
  const [slotData, setSlotData] = useState([])
  const [inputDate, setInputDate] = useState()
  const [bookingModal, setBookingModal] = useState(false)
  const [selectedSlot, setSlectedSlot] = useState(null)



  useEffect(() => {
    getSingleCourtData()
    getTimeSlotData(new Date())
  }, []);

  useEffect(() => {
    getletestFilterSlots()
  }, [selectedTimes])

  const getSingleCourtData = () => {
    AxiosInstance.get('/users/getSingleCourtData', { params: { courtId: id } }).then((res) => {
      setSingleCourtData(res.data)
    })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleChange = (e) => {
    setTimeSlotData({ ...timeSlotData, [e.target.name]: e.target.value })
  }
  const getletestFilterSlots = () => {
    if (selectedTimes.length === 0) {
      setFilterTimes(TIMINGS)
    } else {
      const tempArray = []
      for (let slot of TIMINGS) {
        let flag = false;
        for (let Sslot of selectedTimes) {
          if (slot.id === Sslot.id) {
            flag = true;
          }
        }
        if (!flag) {
          tempArray.push(slot)
        }
      }
      setFilterTimes(tempArray)

    }

  };
  const handleClose = () => {
    setModalOpen(false)
  }
  const handleModalClose = () => {
    setBookingModal(false)
  }
  const handleAddTimeSlot = async () => {
    try {
      const response = await AxiosInstance.post('/admin/addTimeSlotData', {...timeSlotData, selectedTimes,courtId: id, 
      });
        setModalOpen(false);
        setTimeSlotData(false);
        selectedTimes.length = 0
        // setSelectedTimes([]);
        getTimeSlotData(new Date(finalDate));

        if (response.data.message === 'court time slot created successfully') {
          alert('court slots added successfully');
        }
        
      }
      catch (error) {
        // Handle errors from Axios
        if (error.response && error.response.data && error.response.data.message === 'user not authentic') {
          alert('User not authenticated');
        } else {
          // Handle other types of errors
          console.error('An error occurred:', error);
          alert('An error occurred while adding court slots.');
        }
      }
  };

  // from line No.97 to 123, date aliginments 
  const projectDate = slotData.length > 0 ? new Date(slotData[0].date) : null;
  const minimumDate = new Date();
  minimumDate.setHours(0, 0, 0, 0);
  // const projectDate = slotData.map((slot) => {
  //   return new Date(slot.date);
  // });

  const finalDate = projectDate ? (projectDate < minimumDate ? minimumDate : projectDate) : null;
  const formattedDate = finalDate ? finalDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }) : null;

  const handleTodayClick = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    getTimeSlotData(formattedToday)
  };
  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    getTimeSlotData(formattedTomorrow)
  };


  // this is for showing Time slots for booking
  const getTimeSlotData = (date = new Date()) => {
    AxiosInstance.get('/users/dayWiseTimeSlot', { params: { courtId: id, date: date } }).then((res) => {
      console.log(date, "date");
      setSlotData(res.data)


    })
      .catch((err) => {
        debugger
      })
  }


  // this is for Razorpay integration
  const initiateBooking =async ()=>{
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await AxiosInstance.post("/payment/orders",{slotId:selectedSlot._id});

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_rD4vZigg4bbPKE", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "My slot.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              slotId:selectedSlot._id,
          };
          // debugger

          const result = await AxiosInstance.post("/payment/success", data);

        alert(result.data.msg);
            setBookingModal(false)
            getTimeSlotData(new Date(finalDate))
            
          
      },
      prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  }
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}


  return (
    <>
    {/* line No. 215 to 253 court interface */}
      <div className="single-court-img-box">
        <img src={`${BASE_URL}/images/${singleCourtData.courtPic}`} alt="" />
        <div className="court-name">
          <h3>{singleCourtData.courtName}</h3>

          
          <button onClick={() => setModalOpen(true)}>Add Time Slot</button>


          
        </div>
      </div>

      <div className='d-flex'>
        <marquee behavior="scroll" direction="right" className="rolling-booking">
          <h3 className="d-inline"> confirm slot before 2 hour </h3>
        </marquee>
      </div>

      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className=" col-md-6 col-lg-5 col-12 border border-1 rounded-2 ">
            <div className="date-picker">
              <span className='p-1' onClick={handleTodayClick}>Today</span>
              <span className='p-1' onClick={handleTomorrowClick}>Tommorrow</span>
              <span className='p-1'>Slected Date: {formattedDate}</span>
              <div>
                <input type="date" placeholder="select a  specific Date" min={new Date().toISOString().split('T')[0]} value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
                <button className='btn btn-success ' onClick={() => inputDate && getTimeSlotData(new Date(inputDate))}>Search</button>
              </div>

              <div className="slotname-container d-flex flex-wrap gx-2 mt-3 pointer">
                {slotData.map((slot) => <span className={`span-slot  ${slot.bookedBy?'bg-warning':''}`} key={slot.id} onClick={() => { !slot.bookedBy && setBookingModal(true); !slot.bookedBy &&setSlectedSlot(slot) }} >{slot.slot.name}</span>)} 
              </div>

              <button className="btn btn-primary  w-100 mt-2 border">
                {" "}
                Book Now{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* admin --- modal for court schedule */}













      

      <ModalView modalOpen={modalOpen} setModalOpen={setModalOpen}>

        <div className="d-flex flex-column  add-court-timing-modal">
          <div className='name-board'>
            <h3 className="name-adjust">{singleCourtData.courtName}</h3>
            <h5 className='place-adjust'>{singleCourtData.location}</h5>
          </div>

          <label htmlFor="">starting date</label>
          <input type="date" min={new Date().toISOString().split('T')[0]} value={timeSlotData.startDate} name='startDate' onChange={handleChange} />
          <label htmlFor="">ending Date</label>
          <input type="date" min={timeSlotData.startDate} value={timeSlotData.endDate} name='endDate' onChange={handleChange} />

          <label htmlFor="">cost </label>
          <input type="number" name='cost' value={timeSlotData.cost} onChange={handleChange} />

          <div className="cus-dropdown mt-4 d-inline" onClick={() => setShowDropDown(true)}>
            Select Timings
            {showDropDown && (
              <div className="cus-options" onMouseLeave={() => setShowDropDown(false)}>

                <ul>{filterTimes.map((element, index) => (
                  <li onClick={() => setSlectedTimes([...selectedTimes, element])}> {element.name}</li>
                ))}
                </ul>

              </div>
            )}

          </div>
          <div className="slotname-container d-flex flex-wrap gx-2 mt-3 pointer">

            {selectedTimes.length > 0 ? selectedTimes.map((element) => (
              <span className="border border-1 bg-warning border rounded-2 border-dark p-1  span-slot">
                {element.name}
              </span>

            )) :


              <i>no slots available</i>
            }


          </div>
          <span className='d-flex justify-content-around'><button className="btn btn-primary  mt-3 border rounded-2 cus-button" onClick={handleAddTimeSlot}>
            {" "}
            Add Slot{" "}
          </button>
            <button className="btn btn-danger  mt-3 border rounded-2 cus-button  " onClick={handleClose}>
              {" "}
              Close{" "}
            </button>
          </span>
        </div>

      </ModalView>

      {/* user --- modal for booking */}
      <ModalView modalOpen={bookingModal} setBookingModal={setBookingModal}>

        <div className='name-board'>
          <h3 className="name-adjust">{selectedSlot?.court?.courtName}</h3>
          <h5 className='place-adjust'>{selectedSlot?.court?.location}</h5>
          <h5 className='place-adjust'>{selectedSlot?.court?.type}</h5>
        </div>

        <div className='name-board' >
        <div className=' d-flex justify-content-around p-2'>
          <span className='bg-warning rounded border border-primary p-1'>Date:{new Date(selectedSlot?.date).toString().slice(0, 15)}</span>
          <span className='bg-warning rounded border border-primary p-1'>Slot:{selectedSlot?.slot?.name}</span>
          <span className='bg-warning rounded border border-primary p-1'>Cost: {selectedSlot?.cost}.00</span>
        </div>
        <div className="rounded-circle mt-0 p-2"><img className='rounded-5 mx-auto d-block' src={`${BASE_URL}/images/${singleCourtData.courtPic}`} alt="" /></div>
        </div>


        <span className='d-flex justify-content-around'><button className="btn btn-primary  mt-3 border rounded-2 cus-button" onClick={initiateBooking} >
          {" "}
          Book Now{" "}
        </button>
          <button className="btn btn-danger  mt-3 border rounded-2 cus-button  " onClick={handleModalClose}>
            {" "}
            Close{" "}
          </button>
        </span>
      </ModalView>



    </>

  )
}



export default CourtBooking;