import express from 'express';
import { createReport, deleteReport, getAllReports,
         getReportDetails, updateReport } from '../controllers/report.controller.js';

const router = express.Router();

router.route('/').get(getAllReports);
router.route('/:id').get(getReportDetails);
router.route('/').post(createReport);
router.route('/:id').patch(updateReport);
router.route('/:id').delete(deleteReport);

export default router;



