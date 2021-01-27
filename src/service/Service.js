import Candidate from '../model/candidate';

export default class Service {
  static async getCandidate() {
    try {
      return await Candidate.find();
    } catch (error) {
      return error;
    }
  }
}
