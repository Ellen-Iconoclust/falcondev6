import React from 'react';

export type Page = 'FILE' | 'EDIT' | 'SEARCH' | 'RUN' | 'COMPILE' | 'DEBUG' | 'PROJECT' | 'OPTIONS' | 'WINDOW' | 'HELP';

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
