// pages/index.js
import { Navbar } from '../components/Shared';
import { useAuth } from '../lib/firebase';
import Link from 'next/link';

const MOCK_COURSES = [
  { id: 'python', title: 'Python Programming Masterclass', description: 'From beginner to expert in Python.' },
  { id: 'generative-ai', title: 'Introduction to Generative AI', description: 'Explore LLMs and content generation.' },
  { id: 'nextjs-firebase', title: 'Next.js & Firebase Full Stack', description: 'Build modern web applications.' },
];

const CourseCard = ({ course }) => (
  <Link href={`/course/${course.id}`} className="block border p-4 rounded-lg shadow hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
    <h2 className="text-xl font-bold text-indigo-700">{course.title}</h2>
    <p className="text-gray-600 mt-2">{course.description}</p>
    <button className="mt-4 text-sm text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">View Course</button>
  </Link>
);

export default function HomePage() {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-8 text-center text-lg font-medium">Loading authentication state...</div>;
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-extrabold mb-8">
          Available Courses, {user ? user.email.split('@')[0] : 'Guest'}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}
