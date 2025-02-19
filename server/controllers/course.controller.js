export const createCourse = async (req, res) => {
    try {
        const {
            courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "Please provide course title and category"
            });

        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "fail to create course"
        })
    }
}