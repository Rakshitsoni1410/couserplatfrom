import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useGetCourseProgressQuery } from '@/features/api/courseProgressApi';
import { CheckCircle2, CirclePlay } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>failed to load course dataiks</p>;
  console.log(data);
  const { courseDetails, process: progress, completed } = data.data;
 const { courseTitle } = courseDetails;
  // initialize the first lecture as the current lecture
  const initialLecture = currentLecture || courseDetails.lectures && courseDetails.lectures[0];

  const isLectureCompleted = (lectureId) => {
    return Array.isArray(progress) && progress.some(
      (prog) => prog.lectureId === lectureId && prog.viewed
    );
  };
  //handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };
  return (
    <div className='max-w-7xl mx-auto p-4 mt-20'>
      {/* Course Title and Completed Button */}
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>{courseTitle}</h1>
        <Button>Completed</Button>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Video Section */}
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className='w-full h-auto md:rounded-lg'
            />
          </div>
          {/* Current Lecture Title */}
          <div className='mt-2'>
            <h3 className='font-medium text-lg'>
              {`Lecture ${courseDetails.lectures.findIndex(
                (lec) =>
                  lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
                } : ${currentLecture?.lectureTitle || initialLecture.lectureTitle
                }`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 md:pt-4 max-h-[500px] overflow-y-auto'>
          <h2 className='font-semibold text-xl mb-4'>Course Lectures</h2>

          {courseDetails?.lectures.map((lecture) => (
            <Card key={lecture._id} className={`mb-3 hover:cursor-pointer transition-transform ${lecture._id===currentLecture?._id ? 'bg-gray-200':'dark:bg-gray-800'}`}onClick={()=>handleSelectLecture(lecture)}> 
              <CardContent className='flex items-center justify-between p-4'>
                <div className='flex items-center'>
                  {isLectureCompleted(lecture._id) ? (
                    <CheckCircle2 size={24} className='text-green-500 mr-2' />
                  ) : (
                    <CirclePlay size={24} className='text-gray-500 mr-2' />
                  )
                  }
                  <div>
                    <CardTitle className="text-lg font-medium"> {lecture.lectureTitle}</CardTitle>
                  </div>
                </div>{
                  isLectureCompleted(lecture._id) && (
                    <Badge variant={'outline'} className="bg-green-200 text-green-600">
                      Completed
                    </Badge>
                  )
                }
              </CardContent>
            </Card>
          ))
          }
        </div>
      </div>
    </div>
  );
};
export default CourseProgress;
