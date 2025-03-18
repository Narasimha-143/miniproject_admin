import React, { useEffect, useState } from 'react';
import { Download, Eye, Check, X } from 'lucide-react';
import { Layout } from './Layout';

const QuestionPapers = () => {
  const token = localStorage.getItem("token");
  const [papers, setPaper] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  useEffect(() => {
    console.log("fetching")
    fetchPapers(0);
  }, [])
  const [page, setPage] = useState(0);
  const [rejectedpage,setRejectedPage]=useState(0);
  const [totalRejectedpages,setTotalRejectedPages]=useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectedPapers, setRejectedPapers] = useState([]);
  // const fetchPapers = async () => {
  //   try {
  //     const response = await fetch('http://localhost:9000/pendingpapers', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}` // Add token to headers

  //       },

  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch papers');
  //     }

  //     const data = await response.json();
  //     console.log('Fetched Papers:', data);
  //     setPaper(data.papers);

  //   } catch (error) {
  //     console.error('Error fetching papers:', error.message);
  //   }
  // };
  const fetchPapers = async (page=page) => {
     // if (loading || (totalPages !== null && page >= totalPages)) return; // Stop if loading or all pages are fetched
 
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:9000/pendingpapers?page=${page}&size=10`,{ 
        method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add token to headers
              }
              })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
      // setQuestionPapers(data.papers)
      //setQuestionPapers((prevPapers) => [...prevPapers, ...data.papers]); // Append new papers
      if (papers && page!=0) {
        setPaper((prevPapers) => [...prevPapers, ...data.papers]);
      }else{
        setPaper(data.papers)
      }
  
        setTotalPages(data.totalPages);
       setPage(data.currentPage+1); // Increment page for next fetch
      } catch (err) {
        toast.error(err.message);
      }
      setLoading(false);
    };
  const handleApprove = async (id) => {
    console.log("Handle approve function, ID:", id);

    try {
      const response = await fetch('http://localhost:9000/handleapprove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Approval failed');
      }
      if(data.message){
        alert(data.message)
      }
      


     // fetchPapers(); // Assuming fetchPapers is used to refresh the list
      // setPaper(papers.filter(paper => paper.id != id))
      await fetchPapers(0)
    } catch (error) {
      console.error('Error approving paper:', error.message);
    }
  };
//   const handleReject = async (paperId) => {
//     console.log("Handle reject function, Paper ID:", paperId);
//     const msg = window.confirm("Do you want to reject the question paper?");
    
//     if (msg) {  
//         setPaper((prevPapers) => 
//             prevPapers.map(paper => 
//                 paper.id == paperId ? { ...paper, status: "rejected" } : paper
//             )
//         );
//         fetchPapers()
//     }
// };

  const handleReject = async (id) => {
    console.log("Handle reject function Paper, ID:", id);
    const msg=confirm("do you want to reject question paper");
    if(msg){
      const token=localStorage.getItem("token");
   
    try {
      const response = await fetch('http://localhost:9000/rejectpapers', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id,token }),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Rejection failed');
      }

      console.log('Rejection successful:', data);
      setPaper(papers.filter(paper => paper.id != id));
      
    } catch (error) {
      console.error('Error rejecting paper:', error.message);
    }
  }
  };
 
  // }
  const handleDownload = (fileName, fileData) => {

    const byteCharacters = atob(fileData); // Decode Base64
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const getrejectedpapers = async (rejectedpage=rejectedpage) => {
    
//     if (loading || (totalPages !== null && page >= totalPages)) return; // Stop if loading or all pages are fetched
// alert("in")
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:9000/getrejectedpapers?page=${rejectedpage}&size=10`,{ 
      method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Add token to headers
            }
            })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
    // setQuestionPapers(data.papers)
    //setQuestionPapers((prevPapers) => [...prevPapers, ...data.papers]); // Append new papers
    if (papers) {
      setRejectedPapers((prevPapers) => [...prevPapers, ...data.papers]);
        
      
    }else{
      setRejectedPapers(data.papers)
    }
    setShowModal(true); 
      setTotalRejectedPages(data.totalPages);
     setRejectedPage(data.currentPage+1); // Increment page for next fetch
    } catch (err) {
      alert(err.message)
    }
    setLoading(false);
  };
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:9000/deletepaper/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     });
  
  //     if (!response.ok) throw new Error("Failed to delete paper.");
  
  //     // Remove the deleted paper from the state
  //     setRejectedPapers(rejectedPapers.filter(paper => paper.id !== id));
  
  //     toast.success("Paper deleted successfully!");
  //   } catch (err) {
  //     //toast.error(err.message);
  //   }
  // };
  // const handleAccept=async(paper)=>{
    
  //     //using post send data to localhost:9000/adminupload
  //     handleDelete(paper.id);
  //     getrejectedpapers();
   
  // }
  const handleAccept = async (paper) => {
    console.log(paper)
    const id=paper.id;
    try {
      // Send paper data to backend for acceptance
      const response = await fetch("http://localhost:9000/uploads/adminupload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id), // Send the paper details
      });
  
      if (!response.ok) {
        throw new Error("Failed to accept paper.");
      }
  
      // After accepting, delete the paper from rejected list
    // await handleDelete(paper.id);
  
      // Refresh the rejected papers list
      setRejectedPapers(rejectedPapers.filter(paper => paper.id != id));
      await getrejectedpapers(0);
    } catch (error) {
      console.error("Error accepting paper:", error);
      toast.error(error.message);
    }
  };
 
  
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Question Papers</h1>
        {
          papers && papers.length === 0 ? (
            <div className="text-center text-gray-600">No question papers available.</div>
          ) : (

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Academic Year</th>
                    <th className="px-4 py-2 border">Batch</th>
                    <th className="px-4 py-2 border">Branch</th>
                    <th className="px-4 py-2 border">Subject</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">File</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* PDF Viewer Modal */}
                  {selectedPaper && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
                      <div className="bg-white rounded-2xl w-full max-w-[90%] md:max-w-xl h-[90vh] flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                          <h2 className="text-xl font-semibold text-gray-900">{`${selectedPaper.subject}.pdf`}</h2>
                          <button
                            onClick={() => setSelectedPaper(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                          <iframe src={`data:application/pdf;base64,${selectedPaper.fileData}`} width="100%" height="100%" />
                        </div>
                      </div>
                    </div>
                  )}
                  {papers && papers.map((paper) => (
                    <tr key={paper.id} className="text-center">
                      <td className="px-4 py-2 border">{paper.academicYear}</td>
                      <td className="px-4 py-2 border">{paper.semester}</td>
                      <td className="px-4 py-2 border">{paper.branch}</td>
                      <td className="px-4 py-2 border">{paper.subject}</td>
                      <td className="px-4 py-2 border">{paper.examType}</td>
                      <td className="px-4 py-2 border">{paper.fileName}</td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${paper.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : paper.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="flex space-x-2 justify-center">
                          {paper.status !== 'rejected' && (
                            <>
                              <button
                                className="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition"
                                title="View"
                              >
                                <Eye className="w-4 h-4" onClick={() => setSelectedPaper(paper)} />
                              </button>
                              <button
                                className="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition"
                                title="Download"
                              >
                                <Download className="w-4 h-4" onClick={() => handleDownload(paper.fileName, paper.fileData)} />
                              </button>
                            </>
                          )}
                          {paper.status === 'pending' && (
                            <>
                              <button
                                className="text-white bg-green-500 p-2 rounded-lg hover:bg-green-600 transition"
                                title="Approve"
                                onClick={() => { handleApprove(paper.id) }}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                className="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 transition"
                                title="Reject"
                                onClick={() => { handleReject(paper.id) }}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
             {page < totalPages && (
                  <button onClick={fetchPapers}>
                    {loading ? "Loading..." : "Show More"}
                    {page}
                  </button>
                )}
      </div>
      <button onClick={()=>getrejectedpapers(0)}
      className="bg-red-500 text-white text-center p-3 rounded-lg shadow-lg w-32 cursor-pointer hover:bg-red-700 transition duration-300"
   
    >
      🗑️ Trash
    </button>
    {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative">
      {/* Close Button */}
      <button
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>

      <h2 className="text-lg font-semibold mb-3">Rejected Papers</h2>

      {/* Display Papers */}
      {rejectedPapers.length > 0 ? (
        <ul className="max-h-60 overflow-y-auto">
          {rejectedPapers.map((paper, index) => (
            <li key={index} className="border-b py-2 flex justify-between items-center">
              <span>{paper.fileName}</span>
              <div className="flex space-x-3">
                {/* Accept Icon */}
                <button 
                  onClick={() => handleAccept(paper)}
                  className="text-green-500 hover:text-green-700"
                  title="Accept Paper"
                >
                  ✅
                </button>

                {/* Delete Icon */}
                <button 
                  onClick={() => handleDelete(paper.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete from Trash"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rejected papers found.</p>
      )}
    </div>
  </div>
)}

    </Layout>
  );
};

export default QuestionPapers;
