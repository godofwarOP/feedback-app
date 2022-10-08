export type FeedbackType = {
  id: string;
  text: string;
  rating: number;
};

export interface FeedbackInterface {
  addFeedback: (text: string, rating: number) => Promise<FeedbackType>;
}
