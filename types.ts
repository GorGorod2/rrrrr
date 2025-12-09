
export enum UserLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1'
}

export interface Question {
  id: number;
  question: string;
  options?: string[]; // If multiple choice
  correctAnswer: string;
  type: 'multiple-choice' | 'text-input';
  topic: string;
}

export interface Block {
  id: string; // e.g., "unit-1"
  title: string;
  description: string;
  questions: Question[];
}

export interface LevelData {
  id: UserLevel;
  title: string;
  description: string;
  blocks: Block[];
}

export interface BlockProgress {
  currentQuestionIndex: number;
  isCompleted: boolean;
  mistakes: number;
}

export interface User {
  username: string;
  email?: string;
  isLoggedIn: boolean;
  // Key format: "levelId_blockId" e.g. "A1_unit-1"
  progress: Record<string, BlockProgress>;
  diagnosticResult?: {
    completed: boolean;
    recommendedLevel: UserLevel;
    score: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isError?: boolean;
}
