import React from 'react'
import { Layout } from './Layout';


function Interview() {
    const token = localStorage.getItem("token");
    const [activeTab, setActiveTab] = useState('interview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

  const mockData = {
    backlogs: "no",
    branches: ["CS"],
    cgpa: "4",
    companyName: "Company A",
    experience: "89ykycgioh;lhkjxchvjl",
    interviewDate: "2025-03-06",
    role: "employee",
    rounds: [
      {
        name: "round 1",
        duration: "1",
        description: "2egwezrjxtrkymthjn",
        questions: [
          {
            question: "what is what?",
            answer: "hii",
            type: "Technical"
          }
        ]
      }
    ],
    salary: "11",
    tips: "6d7t5fuygi[ouplkhj",
    yearOfPassing: "2026"
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
 

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-800 text-white p-4 flex items-center justify-between">
        <h2 className="font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-indigo-700 rounded">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        fixed md:relative
        h-full
        z-30
        bg-indigo-800 
        text-white 
        transition-transform duration-300
        md:w-64
        w-64
      `}>
        <div className="p-4 flex items-center justify-between md:justify-end">
          <h2 className="font-bold md:hidden">Admin Panel</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-1 hover:bg-indigo-700 rounded hidden md:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col h-[calc(100%-5rem)]">
          <button
            className={`w-full p-4 flex items-center ${activeTab === 'dashboard' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => {
              setActiveTab('dashboard');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <Layout className="h-5 w-5" />
            <span className="ml-4">Dashboard</span>
          </button>
          <button
            className={`w-full p-4 flex items-center ${activeTab === 'questions' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => {
              setActiveTab('questions');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <FileQuestion className="h-5 w-5" />
            <span className="ml-4">Question Papers</span>
          </button>
          <button
            className={`w-full p-4 flex items-center ${activeTab === 'interview' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => {
              setActiveTab('interview');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <Users className="h-5 w-5" />
            <span className="ml-4">Interview Experience</span>
          </button>
          <button
            className="w-full p-4 flex items-center hover:bg-indigo-700 mt-auto"
            onClick={() => console.log('logout')}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-4">Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {activeTab === 'interview' && (
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Interview Experience Review</h1>
                <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                  <button
                    onClick={handleApprove}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
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
                      <p><span className="font-medium">Branch:</span> {mockData.branches.join(', ')}</p>
                      <p><span className="font-medium">CGPA:</span> {mockData.cgpa}</p>
                      <p><span className="font-medium">Year of Passing:</span> {mockData.yearOfPassing}</p>
                      <p><span className="font-medium">Backlogs:</span> {mockData.backlogs}</p>
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
                      <h4 className="font-medium text-gray-800 mb-3">{round.name}</h4>
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
                                <p><span className="font-medium">Q:</span> {q.question}</p>
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
          )}

          {activeTab === 'dashboard' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome to the admin dashboard</p>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-800">Question Papers</h1>
              <p className="text-gray-600">Question papers module content goes here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Interview
