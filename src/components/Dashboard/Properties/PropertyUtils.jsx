//  const generateTransaction = async () => {
//     try {
//       const data = {
//         amount,
//         purpose: Plan,
//       };
//       const token = window.JSON.parse(localStorage.getItem("token"));
//       const response = await axios.post(
//         "https://celahl.herokuapp.com/api//transaction/generate",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token} `,
//           },
//         }
//       );
//       // kunleolaakande@gmail.com

//         const config = {
//     reference: response?.data?.data?.reference,
//     email: "user@example.com",
//     amount: 20000,
//     publicKey: 'pk_test_834f034d162826c6ec4afc5396c60e62b28836b'
//   };
  

//           const handlePaystackSuccessAction = (reference) => {
//       // Implementation for whatever you want to do with reference and after success call.
//       console.log(reference);
//     };

//     // you can call this function anything
//     const handlePaystackCloseAction = () => {
//       // implementation for  whatever you want to do when the Paystack dialog closed.
//       console.log('closed')
//     }

//     const componentProps = {
//         ...config,
//         text: 'Paystack Button Implementation',
//         onSuccess: (reference) => handlePaystackSuccessAction(reference),
//         onClose: handlePaystackCloseAction,
//     };

//       console.log(response.data.data.reference);
//       // if (response.status === 200) {
//       //   const config = {
//       //     reference: (new Date()).getTime().toString(),
//       //     email: "user@example.com",
//       //     amount: 20000,
//       //     publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
//       //   };
//       // const data = {
//       //   callback_url: null,
//       //   // amount: response.data.data.amount,
//       //   reference: response.data.data.reference,
//       // };
//       // console.log(data);
//       // const addmoney = await axios.post(
//       //   "https://celahl.herokuapp.com/api//transaction/initiate",
//       //   data,
//       //   {
//       //     headers: {
//       //       Authorization: `Bearer ${token} `,
//       //     },
//       //   }
//       // );
//       // if (addmoney.status === 200) {
//       //   const url = window.open(
//       //     addmoney.data.data.authorization_url,
//       //     "_blank"
//       //   );
//       //   console.log(url);
//       // }
//       // console.log(addmoney);
//       // }
//       // await axios.get("https://celahl.herokuapp.com/api//transaction/verify");
//     } catch (err) {
//       ErrorNotification(err?.response?.data?.message);
//       if (err.message === "Network Error") {
//         ErrorNotification("Please check your internet connections");
//       }
//       console.log(err);
//     }
//   };