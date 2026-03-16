import React from 'react';

export type Page = 'FILE' | 'EDIT' | 'SEARCH' | 'RUN' | 'COMPILE' | 'DEBUG' | 'PROJECT' | 'OPTIONS' | 'WINDOW' | 'HELP';

export type FileType = string | null;

export interface TerminalState {
  isRunning: boolean;
  file: FileType;
  step: 'NAME' | 'EMAIL' | 'MESSAGE' | 'SUBMITTING' | 'DONE' | null;
  input: string;
  formData: {
    name: string;
    email: string;
    message: string;
  };
  output: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}
