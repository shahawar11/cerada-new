import Submission from "../model/submissionModel.js"

export const create = async (req,res)=>{
    try{
        const newSubmission = new Submission(req.body);
        const {correspondingAuthorEmail} = newSubmission

        const submissionExist = await Submission.findOne({correspondingAuthorEmail});
        if(submissionExist) {
            return res.status(400).json({message:"Submission already exists."})
        }
        const savedData = await newSubmission.save();
        res.status(200).json(savedData);

    } catch(error) {
        res.status(500).json({errorMessage: error.message})
    }
};

export const getAllSubmissions = async(req,res)=>{
    try {
        const submissionData = await Submission.find();
        if (!submissionData || submissionData.length === 0) {
            return res.status(404).json({message: "Submission data not found."})
        }
        res.status(200).json(submissionData)
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};

export const getSubmissionById = async(req,res) =>{
    try {
        const id = req.params.id;
        const submissionExist = await Submission.findById(id);
        if(!submissionExist) {
            return res
              .status(404)
              .json({ message: "Submission not found." });
        }
        res.status(200).json(submissionExist)
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};

export const deleteSubmission = async(req,res) =>{
    try {
        const id = req.params.id;
        const submissionExist = await Submission.findById(id);
        if (!submissionExist) {
          return res.status(404).json({ message: "Submission not found." });
        }
        await Submission.findByIdAndDelete(id)
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
}

