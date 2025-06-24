import express from "express"
import { create, deleteSubmission, getAllSubmissions, getSubmissionById } from "../controller/submissionController.js"

const route = express.Router()

route.post("/submission",create)
route.get("/submissions",getAllSubmissions)
route.get("/submission/:id",getSubmissionById)
route.delete("/delete/submission/:id",deleteSubmission)

export default route;
