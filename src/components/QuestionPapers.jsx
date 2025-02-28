import React, { useEffect, useState } from 'react';
import { Download, Eye, Check, X } from 'lucide-react';
import { Layout } from './Layout';

const QuestionPapers = () => {
  const [papers, setPaper] = useState([
  {
    id: '1',
    academicYear: "2012-2013",
    batch: "E2",
    branch: "ECE",
    subject: "Data Structures",
    type: "Mid-3",
    status: "pending",
    file: {
      name: "PAN-unlocked.pdf",
      lastModified: 1734114053466,
      lastModifiedDate: new Date("Mon Feb 24 2025 23:50:53 GMT+0530"),
      webkitRelativePath: "",
      size: 811864,
      url: "https://example.com/sample1.pdf"
    }
  },
  {
    id: '2',
    academicYear: "2013-2014",
    batch: "E3",
    branch: "CSE",
    subject: "Algorithms",
    type: "Mid-2",
    status: "approved",
    file: {
      name: "Algorithms-Notes.pdf",
      lastModified: 1734115053466,
      lastModifiedDate: new Date("Tue Feb 25 2025 10:30:20 GMT+0530"),
      webkitRelativePath: "",
      size: 921864,
      url: "https://example.com/sample2.pdf"
    }
  },
  {
    id: '3',
    academicYear: "2014-2015",
    batch: "E1",
    branch: "EEE",
    subject: "Digital Electronics",
    type: "Mid-1",
    status: "rejected",
    file: {
      name: "Digital-Notes.pdf",
      lastModified: 1734116053466,
      lastModifiedDate: new Date("Wed Feb 26 2025 12:45:33 GMT+0530"),
      webkitRelativePath: "",
      size: 756412,
      url: "https://example.com/sample3.pdf"
    }
  },
  {
    id: '4',
    academicYear: "2015-2016",
    batch: "E4",
    branch: "IT",
    subject: "Operating Systems",
    type: "Mid-3",
    status: "pending",
    file: {
      name: "OS-Notes.pdf",
      lastModified: 1734117053466,
      lastModifiedDate: new Date("Thu Feb 27 2025 14:20:10 GMT+0530"),
      webkitRelativePath: "",
      size: 834567,
      url: "https://example.com/sample4.pdf"
    }
  },
  {
    id: '5',
    academicYear: "2016-2017",
    batch: "E2",
    branch: "Mechanical",
    subject: "Thermodynamics",
    type: "Mid-2",
    status: "approved",
    file: {
      name: "Thermo-Notes.pdf",
      lastModified: 1734118053466,
      lastModifiedDate: new Date("Fri Feb 28 2025 09:10:45 GMT+0530"),
      webkitRelativePath: "",
      size: 645231,
      url: "https://example.com/sample5.pdf"
    }
  },
  {
    id: '6',
    academicYear: "2017-2018",
    batch: "E1",
    branch: "Civil",
    subject: "Structural Analysis",
    type: "Mid-1",
    status: "rejected",
    file: {
      name: "Structural-Notes.pdf",
      lastModified: 1734119053466,
      lastModifiedDate: new Date("Sat Mar 1 2025 18:30:15 GMT+0530"),
      webkitRelativePath: "",
      size: 723456,
      url: "https://example.com/sample6.pdf"
    }
  },
  {
    id: '7',
    academicYear: "2018-2019",
    batch: "E3",
    branch: "ECE",
    subject: "Communication Systems",
    type: "Mid-3",
    status: "pending",
    file: {
      name: "Communication-Notes.pdf",
      lastModified: 1734120053466,
      lastModifiedDate: new Date("Sun Mar 2 2025 15:00:00 GMT+0530"),
      webkitRelativePath: "",
      size: 812345,
      url: "https://example.com/sample7.pdf"
    }
  },
  {
    id: '8',
    academicYear: "2019-2020",
    batch: "E2",
    branch: "CSE",
    subject: "Machine Learning",
    type: "Mid-2",
    status: "approved",
    file: {
      name: "ML-Notes.pdf",
      lastModified: 1734121053466,
      lastModifiedDate: new Date("Mon Mar 3 2025 22:10:30 GMT+0530"),
      webkitRelativePath: "",
      size: 978654,
      url: "https://example.com/sample8.pdf"
    }
  },
  {
    id: '9',
    academicYear: "2020-2021",
    batch: "E4",
    branch: "IT",
    subject: "Cloud Computing",
    type: "Mid-1",
    status: "rejected",
    file: {
      name: "Cloud-Notes.pdf",
      lastModified: 1734122053466,
      lastModifiedDate: new Date("Tue Mar 4 2025 17:45:20 GMT+0530"),
      webkitRelativePath: "",
      size: 865432,
      url: "https://example.com/sample9.pdf"
    }
  },
  {
    id: '10',
    academicYear: "2021-2022",
    batch: "E3",
    branch: "EEE",
    subject: "Power Systems",
    type: "Mid-3",
    status: "pending",
    file: {
      name: "PowerSystems-Notes.pdf",
      lastModified: 1734123053466,
      lastModifiedDate: new Date("Wed Mar 5 2025 11:25:50 GMT+0530"),
      webkitRelativePath: "",
      size: 754321,
      url: "https://example.com/sample10.pdf"
    }
  }
]);

// useEffect(()=>{
//     fetchPapers();
// })

// const fetchPapers = async () => {
//     try {
//         const response = await fetch('http://localhost:9000/pendingapproved', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch papers');
//         }

//         const papers = await response.json();
//         console.log('Fetched Papers:', papers);
//         setPaper(papers);
//     } catch (error) {
//         console.error('Error fetching papers:', error.message);
//     }
// };
const handleApprove = async (id) => {
    console.log("Handle approve function, ID:", id);

    try {
        // const response = await fetch('http://localhost:9000/handleApprove', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ id }),
        // });

        // const data = await response.json();

        // if (!response.ok) {
        //     throw new Error(data.message || 'Approval failed');
        // }

        // console.log('Approval successful:', data);
        
        // Optionally, refresh the papers list or update the UI
        fetchPapers(); // Assuming fetchPapers is used to refresh the list
    } catch (error) {
        console.error('Error approving paper:', error.message);
    }
};

const handleReject = async (id) => {
    console.log("Handle reject function, ID:", id);

    try {
        // const response = await fetch('http://localhost:9000/handleReject', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ id }),
        // });

        // const data = await response.json();

        // if (!response.ok) {
        //     throw new Error(data.message || 'Rejection failed');
        // }

        // console.log('Rejection successful:', data);
        
        // Optionally, refresh the papers list or update the UI
        fetchPapers(); // Assuming fetchPapers is used to refresh the list
    } catch (error) {
        console.error('Error rejecting paper:', error.message);
    }
};



  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Question Papers</h1>
        {papers.length === 0 ? (
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
                {papers.map((paper) => (
                  <tr key={paper.id} className="text-center">
                    <td className="px-4 py-2 border">{paper.academicYear}</td>
                    <td className="px-4 py-2 border">{paper.batch}</td>
                    <td className="px-4 py-2 border">{paper.branch}</td>
                    <td className="px-4 py-2 border">{paper.subject}</td>
                    <td className="px-4 py-2 border">{paper.type}</td>
                    <td className="px-4 py-2 border">{paper.file.name}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          paper.status === 'approved'
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
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {paper.status === 'pending' && (
                          <>
                            <button
                              className="text-white bg-green-500 p-2 rounded-lg hover:bg-green-600 transition"
                              title="Approve"
                              onClick={()=>{handleApprove(paper.id)}}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              className="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 transition"
                              title="Reject"
                            onClick={()=>{handleReject(paper.id)}}
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
      </div>
    </Layout>
  );
};

export default QuestionPapers;
