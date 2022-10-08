import { FeedbackInterface, FeedbackType } from "../types/feedback";

export class FeedbackModel implements FeedbackInterface {
  public async addFeedback(t: string, r: number): Promise<FeedbackType> {
    try {
      const feedbackToAdd = {
        text: t,
        rating: r,
      };

      const response = await fetch("/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackToAdd),
      });
      const data = (await response.json()) as Promise<FeedbackType>;

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllFeedbacks(): Promise<FeedbackType[]> {
    try {
      const response = await fetch("/feedback?_sort=id&_order=desc");
      const data = (await response.json()) as Promise<FeedbackType[]>;
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updateFeedbackById(
    id: string,
    feedback: FeedbackType
  ): Promise<FeedbackType> {
    try {
      const response = await fetch(`feedback/${id}`, {
        body: JSON.stringify(feedback),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });
      const data = (await response.json()) as Promise<FeedbackType>;
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteFeedbackById(id: string): Promise<FeedbackType> {
    try {
      const response = await fetch(`/feedback/${id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as Promise<FeedbackType>;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new FeedbackModel();
