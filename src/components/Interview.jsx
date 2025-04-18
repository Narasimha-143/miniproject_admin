// import React, { useEffect } from 'react'
// import { Layout } from './Layout';
// import { useState } from 'react';
// import { ChevronLeft, FileQuestion, LogOut, Menu, Users } from 'lucide-react';

// function Interview() {
//     const token = localStorage.getItem("token");



//   const [pendingposts,setPendingposts] = useState([]);

//   const fetchposts = async () => {
//     console.log("fetching posts")
//     try {
//       const response = await fetch('http://localhost:9001/posts/pendingposts');
//       const data = await response.json();
//       console.log(data)
//       setPendingposts(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(()=>{
//     fetchposts();
//   },[]);
  

// const handleApprove = async (id) => {
//     console.log("Handle approve function, ID:", id);

//     try {
//       const response = await fetch('http://localhost:9001/posts/approvepost', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, token }),
//       });

   
//       const data = await response.text(); // because it's a plain string, not JSON

// if (!response.ok) {
//   throw new Error(data || 'Approval failed');
// }
// alert(data)
       
//       await fetchposts(0);
//     } catch (error) {
//       console.error('Error approving paper:', error.message);
//     }
// };

// const handleReject = async (id) => {
//     console.log("Handle reject function Paper, ID:", id);
//     const msg=confirm("do you want to reject question paper");
//     if(msg){
//       const token=localStorage.getItem("token");
   
//     try {
//       const response = await fetch('http://localhost:9001/posts/rejectpost', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ id,token }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Rejection failed');
//       }
      
//       alert(data.message);
//       console.log('Rejection successful:', data);
      
//       setPendingposts(pendingposts.filter(paper => paper.id != id));
      
//     } catch (error) {
//       console.error('Error rejecting paper:', error.message);
//     }
//   }
//   };
 

//   return (
//     <Layout>x
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       <div className="flex-1 overflow-auto">
//         <div className="p-4 md:p-8">

//             {
//             pendingposts.map((mockData)=>{
//                 return(
//                   <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 m-6">
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                     <h1 className="text-xl md:text-2xl font-bold text-gray-800">Interview Experience Review</h1>
//                     <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
//                       <button
//                         onClick={()=>handleApprove(mockData.id)}
//                         className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={()=>handleReject(mockData.id)}
//                         className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
    
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//                     <div className="space-y-4">
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-semibold text-gray-700 mb-3">Company Details</h3>
//                         <div className="space-y-2">
//                           <p><span className="font-medium">Company:</span> {mockData.companyName}</p>
//                           <p><span className="font-medium">Role:</span> {mockData.role}</p>
//                           <p><span className="font-medium">Salary:</span> {mockData.salary} LPA</p>
//                           <p><span className="font-medium">Interview Date:</span> {mockData.interviewDate}</p>
//                         </div>
//                       </div>
    
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-semibold text-gray-700 mb-3">Candidate Details</h3>
//                         <div className="space-y-2">
//                           {/* <p><span className="font-medium">Branch:</span> {mockData.branches.join(', ')}</p> */}
//                           <p><span className="font-medium">Branch:</span> {mockData.eligibility.branches}</p>
//                           <p><span className="font-medium">CGPA:</span> {mockData.eligibility.cgpa}</p>
//                           <p><span className="font-medium">Year of Passing:</span> {mockData.eligibility.yearOfPassing}</p>
//                           <p><span className="font-medium">Backlogs:</span> {mockData.eligibility.backlogs}</p>
//                         </div>
//                       </div>
//                     </div>
    
//                     <div className="space-y-4">
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-semibold text-gray-700 mb-3">Experience</h3>
//                         <p className="whitespace-pre-wrap break-words">{mockData.experience}</p>
//                       </div>
    
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-semibold text-gray-700 mb-3">Tips</h3>
//                         <p className="whitespace-pre-wrap break-words">{mockData.tips}</p>
//                       </div>
//                     </div>
//                   </div>
    
//                   <div className="mt-6">
//                     <h3 className="font-semibold text-gray-700 mb-4">Interview Rounds</h3>
//                     <div className="space-y-4">
//                       {mockData.rounds.map((round, index) => (
//                         <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                           <h4 className="font-medium text-gray-800 mb-3">{round.roundName}</h4>
//                           <div className="space-y-2">
//                             <p><span className="font-medium">Duration:</span> {round.duration} hour(s)</p>
//                             <p><span className="font-medium">Description:</span> {round.description}</p>
//                           </div>
//                           <div className="mt-4">
//                             <h5 className="font-medium text-gray-800 mb-2">Questions</h5>
//                             <div className="space-y-2">
//                               {round.questions.map((q, qIndex) => (
//                                 <div key={qIndex} className="bg-white p-3 rounded-md">
//                                   <div className="space-y-1">
//                                     <p><span className="font-medium">Type:</span> {q.type}</p>
//                                     <p><span className="font-medium">Q:</span> {q.questions}</p>
//                                     <p><span className="font-medium">A:</span> {q.answer}</p>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 )
//               })
//             }
//         </div>
//       </div>
//     </div>
//     </Layout>
//   );
// }
// export default Interview


import React, { useEffect, useState } from 'react';
import { Layout } from './Layout';

function Interview() {
  const token = localStorage.getItem("token");
  const [pendingposts, setPendingposts] = useState([]);

  const fetchposts = async () => {
    console.log("fetching posts");
    try {
      const response = await fetch('http://localhost:9001/posts/pendingposts');
      const data = await response.json();
      console.log(data);
      setPendingposts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchposts();
  }, []);

  const handleApprove = async (id) => {
    console.log("Handle approve function, ID:", id);
    try {
      const response = await fetch('http://localhost:9001/posts/approvepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, token }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Approval failed');
      }

      alert(data);
      await fetchposts();
    } catch (error) {
      console.error('Error approving paper:', error.message);
    }
  };

  const handleReject = async (id) => {
    console.log("Handle reject function Paper, ID:", id);
    const msg = confirm("Do you want to reject this question paper?");
    if (msg) {
      try {
        const response = await fetch('http://localhost:9001/posts/rejectpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Rejection failed');
        }

        alert(data.message);
        console.log('Rejection successful:', data);

        setPendingposts(pendingposts.filter(paper => paper.id !== id));
      } catch (error) {
        console.error('Error rejecting paper:', error.message);
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {pendingposts.map((mockData) => (
              <div key={mockData.id} className="bg-white rounded-lg shadow-lg p-4 md:p-6 m-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Interview Experience Review</h1>
                    <div className="text-sm text-gray-600 mt-1">
                      <p><span className="font-medium">Uploaded by:</span> {mockData.user.username}</p>
                      <p><span className="font-medium">Email:</span> {mockData.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => handleApprove(mockData.id)}
                      className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(mockData.id)}
                      className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">Company Details</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Company:</span> {mockData.companyName}</p>
                        <p><span className="font-medium">Role:</span> {mockData.role}</p>
                        <p><span className="font-medium">Salary:</span> {mockData.salary} LPA</p>
                        <p><span className="font-medium">Interview Date:</span> {mockData.interviewDate}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">Candidate Details</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Branch:</span> {mockData.eligibility.branches}</p>
                        <p><span className="font-medium">CGPA:</span> {mockData.eligibility.cgpa}</p>
                        <p><span className="font-medium">Year of Passing:</span> {mockData.eligibility.yearOfPassing}</p>
                        <p><span className="font-medium">Backlogs:</span> {mockData.eligibility.backlogs}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">Experience</h3>
                      <p className="whitespace-pre-wrap break-words">{mockData.experience}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">Tips</h3>
                      <p className="whitespace-pre-wrap break-words">{mockData.tips}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-4">Interview Rounds</h3>
                  <div className="space-y-4">
                    {mockData.rounds.map((round, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">{round.roundName}</h4>
                        <div className="space-y-2">
                          <p><span className="font-medium">Duration:</span> {round.duration} hour(s)</p>
                          <p><span className="font-medium">Description:</span> {round.description}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-medium text-gray-800 mb-2">Questions</h5>
                          <div className="space-y-2">
                            {round.questions.map((q, qIndex) => (
                              <div key={qIndex} className="bg-white p-3 rounded-md">
                                <div className="space-y-1">
                                  <p><span className="font-medium">Type:</span> {q.type}</p>
                                  <p><span className="font-medium">Q:</span> {q.questions}</p>
                                  <p><span className="font-medium">A:</span> {q.answer}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Interview;
