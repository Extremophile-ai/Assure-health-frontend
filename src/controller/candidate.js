import Service from '../service/Service';

const { getCandidate } = Service;
export default class candidateController {
  static async getCandidates(req, res) {
    try {
      const candidate = await getCandidate();
      const data = {
        name: candidate[0].name,
        github: candidate[0].github,
        email: candidate[0].email,
        mobile: candidate[0].mobile,
        twitter: candidate[0].twitter
      };
      return res.status(200).json({
        message: 'My Rule-Validation API',
        status: 'success',
        data
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error.' });
    }
  }
}
