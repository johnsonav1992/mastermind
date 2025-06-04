export type PegColors = 'white' | 'black' | 'red' | 'green' | 'blue' | 'yellow';
export type FeedbackColors = 'black' | 'white';

export type Peg = {
  color: PegColors;
  isFilled?: boolean;
};

export type FeedbackPeg = {
  color: FeedbackColors;
};
