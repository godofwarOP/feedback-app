export type FeedbackType = {
  id: number;
  text: string;
  rating: number;
};

export interface FeedbackInterface {
  addFeedback: (text: string, rating: number) => Promise<FeedbackType>;
}
