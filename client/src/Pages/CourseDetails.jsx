import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import { useSelector } from 'react-redux';
import { Clock, CheckCircle, DollarSign, BookOpen, User, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseDetails = () => {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()


    const storeUser = useSelector((state) => state.auth.userData);
    const [isEnrolled, setIsEnrolled] = useState(false)




    const enrollCourse = async (courseId) => {

        navigate(`/payment/${courseDetails._id}`)

        // try {
        //     console.log(courseId);
        //     const response = await axiosInstance.post('/enroll/purchase', {
        //         courses: [courseId],
        //         userId: storeUser._id,
        //     });
        //     if (response.data.success) {
        //         alert('Enrolled Successfully');
        //     }
        // } catch (err) {
        //     alert(err.message);
        // }
    };

    const handleNavigationIfAlreadyEnrolled = () =>{
        navigate(`/course-content/${courseDetails._id}`)
    }

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/course/details/${id}`)
                if (response.data.success) {
                    console.log(response)
                    setCourseDetails(response.data.data);
                    setIsLoading(false);
                }


            } catch (err) {
                console.error(err);
            }
        }



        fetchCourseDetails();
    }, [id]);


    useEffect(() => {
        if (courseDetails._id) {
            const checkEnrollment = async () => {
                try {
                    const enrollment = await axiosInstance.post(`/enroll/check-enrollment/${courseDetails._id}`);
                    setIsEnrolled(enrollment.data.enrolled);
                } catch (err) {
                    console.error('Error checking enrollment:', err);
                }
            };

            checkEnrollment();
        }
    }, [courseDetails]);

    return (
        <div className="w-full h-full bg-gray-100 dark:bg-[#0f182d]  py-10 px-4 gap-6">
            {isLoading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center grid place-items-center text-xl font-bold text-gray-600 dark:text-gray-200 "
                >
                    Loading...
                </motion.div>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-3 place-items-center'>
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-full col-span-2 lg:order-1 order-2 bg-white dark:bg-[#0f182d] p-6 rounded-lg shadow-lg grid gap-6  "
                    >
                        {/* Title and Description */}
                        <div className="px-6">
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                                {courseDetails.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300">{courseDetails.description}</p>
                        </div>

                        {/* Curriculum Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className=" p-6 rounded-lg shadow-inner"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                <BookOpen className="inline-block mr-2" /> Course Curriculum
                            </h2>
                            {courseDetails.curriculum?.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 bg-gray-200 dark:bg-gray-700 p-4 rounded-md mb-4"
                                >

                                    <CheckCircle className="text-green-500 dark:text-green-300" size={24} />
                                    <h3 className="text-xl text-gray-700 dark:text-gray-100">{point}</h3>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Prerequisites Section */}
                        <div className="bg-gray-100 dark:bg-gray-900  p-6 rounded-lg shadow-inner shadow-gray-800 dark:shadow-gray-500">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                <Info className='inline-block mb-0.5' /> Prerequisites
                            </h2>
                            {courseDetails.preRequisites?.map((req, index) => (
                                <div key={index} className="flex items-center gap-4 mb-4">
                                    <CheckCircle className="text-blue-500 dark:text-blue-300" size={24} />
                                    <p className="text-lg text-gray-700 dark:text-gray-100">{req}</p>
                                </div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className=" p-6 rounded-lg shadow-inner"
                        >

                            <h2 className='text-2xl font-bold  text-gray-800 dark:text-white'>ABOUT THIS COURSE</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum! Sint explicabo sed inventore cumque, consectetur facilis at, libero magnam est veritatis, blanditiis esse vel non similique impedit aperiam qui?
                                Nobis velit qui soluta nam tempore modi aliquam, labore, suscipit sint maiores iusto perferendis voluptatibus quas fuga. Expedita officiis, velit, facere laborum omnis tempore, iste autem necessitatibus beatae blanditiis tempora!
                                Excepturi velit quos id pariatur doloremque doloribus illum! Molestias cumque explicabo quia incidunt iusto illum iste aperiam laudantium tenetur? Incidunt sit voluptates velit quam nostrum eveniet possimus odit consequatur suscipit.
                                Aut nihil atque accusamus, hic numquam saepe ipsum eos! Accusantium quis eum eos fugit ipsum iure, quod quidem illum velit eaque rem in suscipit maxime mollitia, porro doloribus voluptatum autem.
                                Vero debitis officiis aut temporibus perspiciatis excepturi dolorem quasi error repudiandae explicabo voluptatibus, qui ut quas, exercitationem reprehenderit cupiditate, dolores architecto illo quisquam blanditiis. Placeat, alias? Error minus praesentium quidem!
                                Cum, necessitatibus cupiditate consequuntur provident, facilis eaque perspiciatis nobis vero nam voluptatem dolores. Placeat nam repellendus quam quidem deleniti molestiae ut autem molestias exercitationem doloremque, ex unde magnam fuga aliquam?
                                Repellat quo temporibus blanditiis libero quia est suscipit velit, culpa facere expedita adipisci nulla quas fuga ipsam asperiores mollitia sapiente rem dicta perferendis excepturi aperiam repudiandae qui atque. Ab, enim.
                                Quis magnam deleniti est quo doloremque minus, beatae, odio aspernatur atque veniam itaque commodi vitae enim vel, veritatis fugit voluptatem nisi architecto inventore explicabo hic ex a? Iusto, accusamus deleniti!
                                Dignissimos error tempora rerum nisi blanditiis voluptas neque quisquam praesentium quas nulla commodi iste vel, reprehenderit illo. Ipsum eveniet rem accusamus repellendus libero quisquam error quos molestiae odio a? Amet!
                                Aspernatur eveniet temporibus, cumque sint ipsam natus deleniti illo quidem fugiat, a distinctio itaque, eos officiis! Blanditiis earum perspiciatis ea, impedit soluta laborum enim veniam ducimus, beatae facilis aperiam labore.</p>

                        </motion.div>
                    </motion.div>



                    {/* Sidebar */}
                    <div className='order-1 lg:order-2 h-full w-full  flex justify-center items-start '>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="w-3/4 dark:bg-[#22304a] p-6 rounded-lg shadow-lg flex flex-col gap-6 "
                        >
                            {/* Thumbnail */}
                            <motion.img
                                src={courseDetails.thumbnail}
                                alt="Course Thumbnail"
                                className="w-full rounded-md shadow-md max-h-60"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            />

                            {/* Validity and Price */}
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold text-gray-800 dark:text-gray-300">
                                        <Clock className="inline-block mr-2 text-blue-500 dark:text-yellow-300" />
                                        {courseDetails.validity}
                                    </p>
                                    {courseDetails.paid ? (
                                        <p className="text-lg font-bold text-green-500 dark:text-green-300">
                                            {/* <DollarSign className="inline-block mr-2" />   */}
                                            ${courseDetails.price}
                                        </p>
                                    ) : (
                                        <p className="text-lg font-bold text-blue-500 dark:text-blue-300">FREE</p>
                                    )}
                                </div>
                            </div>

                            {/* Instructor Section */}
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                    <User className="inline-block mr-2" /> Instructor
                                </h2>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    <strong>Name:</strong> {courseDetails.instructor?.name}
                                </p>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    <strong>Email:</strong> {courseDetails.instructor?.email}
                                </p>
                            </div>

                            {/* Enroll Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-500 dark:bg-yellow-400 text-white dark:text-gray-900 p-4 rounded-md font-bold shadow-md transition"
                                onClick={isEnrolled ? handleNavigationIfAlreadyEnrolled : () => enrollCourse(courseDetails._id)}
                            >
                                {isEnrolled ? "Continue" :  courseDetails.paid ? `ENROLL FOR $${courseDetails.price}` : 'ENROLL FOR FREE' }

                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
