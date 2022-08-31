import React from 'react'

function MakePayment() {
  return (
    <div>
    <div className="container">
         <h2>Make Payment</h2>

        <form action="#" className="form-group">
        
            <div className="row">
            <div className="col-12 mb-3">
                 <input type="number" className="form-control" placeholder='Card Number'/>
            </div>
               <div className="col-12 col-md-6 mb-3">
                   <input type="text" className="form-control" placeholder='Valid Until'/>
               </div>
               <div className="col-12 col-md-6 mb-3">
                   <input type="number" className="form-control" placeholder='CVV'/>
               </div>
               <div className="col-12 mb-3">
                   <input type="text" className="form-control" placeholder='Card Name'/>
               </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-3">Send OTP</button>
        </form>
    </div>
       
    </div>
  )
}

export default MakePayment