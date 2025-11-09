// pages/course/[id].js
import { Navbar } from '../../components/Shared';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

// --- MOCK COURSE DATA (In production, fetch user progress and course structure from Firestore) ---
const courseModules = {
  python: [
    { id: 'intro', title: '1. Course Introduction', completed: true },
    { id: 'syntax', title: '2. Python Syntax Basics', completed: true },
    { id: 'functions', title: '3. Functions and Scope', completed: false }, 
    { id: 'oop', title: '4. Object-Oriented Python', completed: false },
  ],
  'generative-ai': [
    { id: 'intro', title: '1. What is Gen AI?', completed: true },
    { id: 'llms', title: '2. Large Language Models', completed: false },
  ]
};

const CourseSidebar = ({ courseId, modules, currentModuleId }) => (
  <aside className="w-80 border-r bg-gray-50 p-4 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
    <h2 className="text-xl font-bold mb-4 text-indigo-700 capitalize">{courseId.replace(/-/g, ' ')} Curriculum</h2>
    <ul>
      {modules.map((module, index) => {
        const isLocked = index > 0 && !modules[index - 1].completed;
        const isActive = module.id === currentModuleId;
        
        return (
          <li key={module.id} className={`mb-2 p-2 rounded transition ${isActive ? 'bg-indigo-200 text-indigo-800 font-semibold' : ''} ${isLocked ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
            {isLocked ? (
              <span title="Complete previous module first">🔒 {module.title}</span>
            ) : (
              <Link href={`/course/${courseId}?module=${module.id}`} className="block">
                {module.completed ? '✅ ' : '➡️ '}
                {module.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </aside>
);


export default function CoursePage() {
  const router = useRouter();
  // Get courseId from dynamic route and moduleId from query parameter
  const { id: courseId, module: moduleIdQuery } = router.query; 

  if (!courseId) return <div className="p-8 text-center">Loading Course...</div>;
  
  const modules = courseModules[courseId];
  if (!modules) return <div className="p-8 text-center">Course Not Found</div>;

  // Use 'intro' as default module
  const currentModuleId = moduleIdQuery || 'intro';
  const currentModuleIndex = modules.findIndex(m => m.id === currentModuleId);
  const currentModule = modules[currentModuleIndex];
  
  // Locking Logic
  const isModuleLocked = currentModuleIndex > 0 && !modules[currentModuleIndex - 1].completed;
  
  // Simple state for UI demonstration (replace with Firebase update logic)
  const [completedStatus, setCompletedStatus] = useState(currentModule?.completed);

  const handleComplete = () => {
    // In a real application, call a Firebase function to update user progress
    console.log(`Updating Firebase progress for ${courseId}/${currentModuleId}...`);
    setCompletedStatus(true);
    alert(`Congratulations! You completed ${currentModule.title}.`);
    // Optional: Redirect to the next module
    // const nextModule = modules[currentModuleIndex + 1];
    // if (nextModule) router.push(`/course/${courseId}?module=${nextModule.id}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <CourseSidebar courseId={courseId} modules={modules} currentModuleId={currentModuleId} />
        
        <main className="flex-1 p-10 bg-white">
          <h1 className="text-3xl font-extrabold mb-6 border-b pb-2">{currentModule?.title || 'Lesson Not Found'}</h1>
          
          {isModuleLocked ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
              <p className="font-bold">Access Denied</p>
              <p className="text-sm">You must complete the previous lesson before accessing this content.</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 text-gray-700">
                <p>Welcome to the content area for **{currentModuleId}**. This section would typically host your video player, rich text lesson, and interactive exercises.</p>
                <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-600 rounded-lg">
                    [Placeholder for Lesson Video / Content Player]
                </div>
                <p>This layout mimics Coursera's design: fixed navigation at the top, scrollable course content sidebar on the left, and the main lesson view on the right.</p>
              </div>
              
              <div className="mt-12 flex justify-end">
                <button 
                  onClick={handleComplete}
                  disabled={completedStatus}
                  className={`px-8 py-3 rounded-lg text-white font-semibold shadow-lg transition duration-300 ${completedStatus ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {completedStatus ? '✅ Lesson Completed' : 'Mark Lesson as Complete'}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
