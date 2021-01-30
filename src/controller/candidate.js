import userData from '../config/db';

export default class candidateController {
  static async getCandidates(req, res) {
    try {
      const candidate = await userData;
      return res.status(200).json({
        message: 'My Rule-Validation API',
        status: 'success',
        data: candidate
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error.' });
    }
  }
}
