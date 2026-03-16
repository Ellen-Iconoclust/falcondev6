/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Page, Project, Experience, FileType, TerminalState } from './types';
import { 
  FileCode, 
  Terminal, 
  Search, 
  Play, 
  Settings, 
  HelpCircle, 
  Cpu, 
  FolderOpen,
  X,
  Maximize2,
  Minimize2,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('FILE');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasStarted, setHasStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isRunMenuOpen, setIsRunMenuOpen] = useState(false);
  const [isOpenFileDialogOpen, setIsOpenFileDialogOpen] = useState(false);
  const [selectedFileInDialog, setSelectedFileInDialog] = useState<string | null>(null);
  const [openedFile, setOpenedFile] = useState<FileType>(null);
  const [terminalState, setTerminalState] = useState<TerminalState>({
    isRunning: false,
    file: null,
    step: null,
    input: '',
    formData: { name: '', email: '', message: '' },
    output: []
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'Enter') {
        toggleFullScreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const startApp = () => {
    setHasStarted(true);
    toggleFullScreen();
  };

  const menuOptions: { label: string; id: Page; shortcut: string }[] = [
    { label: 'File', id: 'FILE', shortcut: 'F' },
    { label: 'Edit', id: 'EDIT', shortcut: 'E' },
    { label: 'Search', id: 'SEARCH', shortcut: 'S' },
    { label: 'Run', id: 'RUN', shortcut: 'R' },
    { label: 'Compile', id: 'COMPILE', shortcut: 'C' },
    { label: 'Debug', id: 'DEBUG', shortcut: 'D' },
    { label: 'Project', id: 'PROJECT', shortcut: 'P' },
    { label: 'Options', id: 'OPTIONS', shortcut: 'O' },
    { label: 'Window', id: 'WINDOW', shortcut: 'W' },
    { label: 'Help', id: 'HELP', shortcut: 'H' },
  ];

  const contactCode = `#include <stdio.h>

int main() {
    char name[50], email[50], message[200];
    
    printf("--- CONTACT FORM ---\\n");
    printf("Enter Name: ");
    scanf("%s", name);
    
    printf("Enter E-mail: ");
    scanf("%s", email);
    
    printf("Enter Message: ");
    scanf("%s", message);
    
    printf("\\nSubmitting...\\n");
    printf("Success! Thank you, %s.\\n", name);
    
    return 0;
}`;

  const rickrollCode = `#include <stdio.h>

int main() {
    printf("Never gonna give you up\\n");
    printf("Never gonna let you down\\n");
    printf("Never gonna run around and desert you\\n");
    return 0;
}`;

  const mainCode = `#include <stdio.h>

int main() {
    printf("Welcome to Turbo C Portfolio!\\n");
    printf("Use the menus to explore my projects.\\n");
    return 0;
}`;

  const utilsCode = `#include <stdio.h>

void clear_screen() {
    printf("\\033[2J\\033[H");
}

int main() {
    clear_screen();
    printf("Screen cleared using ANSI escape codes.\\n");
    return 0;
}`;

  const dataCode = `#include <stdio.h>

struct Project {
    char name[20];
    int year;
};

int main() {
    struct Project p = {"Turbo Portfolio", 2026};
    printf("Project: %s, Year: %d\\n", p.name, p.year);
    return 0;
}`;

  const getCodeForFile = (filename: string | null) => {
    if (!filename) return mainCode;
    if (filename === 'CONTACT.C') return contactCode;
    if (filename === 'RICKROLL.C') return rickrollCode;
    if (filename === 'MAIN.C') return mainCode;
    if (filename === 'UTILS.C') return utilsCode;
    if (filename === 'DATA.C') return dataCode;
    return '// No source code available for this file.';
  };

  const SyntaxHighlighter = ({ code }: { code: string }) => {
    const lines = code.split('\n');
    
    const highlightLine = (line: string) => {
      // Turbo C Syntax Highlighting based on Image
      // Keywords: white
      // Functions & Variables: light green (#55FF55)
      // Strings: pure red (#FF0000)
      // Preprocessor: cyan background with dark blue text (screen color)
      
      const parts = line.split(/(\s+|\".*?\"|#include\s+<.*?>|#include\s+\".*?\"|#define\s+\w+\s+\d+|\/\/.*|\bint\b|\bchar\b|\breturn\b|\bvoid\b|\bwhile\b|\bswitch\b|\bcase\b|\bmain\b|\bprintf\b|\bscanf\b|[{}()\[\];=,+-/*%&|^!<>?:.])/g);
      
      return parts.map((part, i) => {
        if (!part) return null;
        
        if (part.startsWith('"') && part.endsWith('"')) {
          return <span key={i} style={{ color: '#FF0000' }}>{part}</span>;
        }
        if (part.startsWith('#')) {
          return <span key={i} className="bg-turbo-cyan text-turbo-blue px-0.5">{part}</span>;
        }
        if (part.startsWith('//')) {
          return <span key={i} className="text-turbo-gray italic">{part}</span>;
        }
        if (['int', 'char', 'return', 'void', 'while', 'switch', 'case'].includes(part)) {
          return <span key={i} className="text-turbo-white">{part}</span>;
        }
        if (['main', 'printf', 'scanf'].includes(part) || /^[a-zA-Z_]\w*$/.test(part)) {
          return <span key={i} style={{ color: '#55FF55' }}>{part}</span>;
        }
        if (['{', '}', '(', ')', '[', ']', ';', '=', ',', '+', '-', '/', '*', '%', '&', '|', '^', '!', '<', '>', '?', ':', '.'].includes(part)) {
          return <span key={i} className="text-turbo-white">{part}</span>;
        }
        // Numbers
        if (/^\d+$/.test(part)) {
          return <span key={i} className="text-turbo-white">{part}</span>;
        }
        
        return <span key={i} className="text-turbo-white">{part}</span>;
      });
    };

    return (
      <div className="font-mono text-[14px] leading-relaxed bg-turbo-blue overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className="min-h-[1.5em] whitespace-pre">
            {highlightLine(line)}
          </div>
        ))}
      </div>
    );
  };

  const handleMenuDoubleClick = (id: Page) => {
    if (id === 'FILE') {
      setIsFileMenuOpen(!isFileMenuOpen);
    } else if (id === 'RUN') {
      if (openedFile) {
        runProgram(openedFile);
      }
    }
  };

  const runProgram = (filename: string) => {
    setActivePage('RUN');
    if (filename === 'CONTACT.C') {
      setTerminalState({
        isRunning: true,
        file: 'CONTACT.C',
        step: 'NAME',
        input: '',
        formData: { name: '', email: '', message: '' },
        output: [
          '--- CONTACT FORM ---',
          'Enter Name: '
        ]
      });
    } else {
      setTerminalState({
        isRunning: true,
        file: filename,
        step: 'DONE',
        input: '',
        formData: { name: '', email: '', message: '' },
        output: [
          `Running ${filename}...`,
          ...getCodeForFile(filename).split('\n').filter(l => l.includes('printf')).map(l => l.match(/\"(.*)\"/)?.[1] || ''),
          '',
          'Program ended. Press any key to exit.'
        ]
      });
    }
  };

  const handleTerminalInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = terminalState.input;
      const nextState = { ...terminalState, input: '' };

      if (terminalState.file === 'CONTACT.C') {
        if (terminalState.step === 'NAME') {
          nextState.formData.name = input;
          nextState.step = 'EMAIL';
          nextState.output = [...terminalState.output, input, 'Enter E-mail: '];
        } else if (terminalState.step === 'EMAIL') {
          nextState.formData.email = input;
          nextState.step = 'MESSAGE';
          nextState.output = [...terminalState.output, input, 'Enter Message: '];
        } else if (terminalState.step === 'MESSAGE') {
          nextState.formData.message = input;
          nextState.step = 'SUBMITTING';
          nextState.output = [...terminalState.output, input, '', 'Submitting...'];
          
          setTimeout(() => {
            setTerminalState(prev => ({
              ...prev,
              step: 'DONE',
              output: [...prev.output, `Success! Thank you, ${prev.formData.name}.`, '', 'Program ended. Press any key to exit.']
            }));
          }, 1500);
        } else if (terminalState.step === 'DONE') {
          nextState.isRunning = false;
          nextState.step = null;
        }
      } else if (terminalState.file === 'RICKROLL.C') {
        nextState.isRunning = false;
        nextState.step = null;
      }

      setTerminalState(nextState);
    }
  };

  const projects: Project[] = [
    {
      id: '1',
      title: 'VINTAGE_OS.EXE',
      description: 'A browser-based operating system simulation with classic UI components.',
      tags: ['React', 'TypeScript', 'Tailwind'],
      link: '#'
    },
    {
      id: '2',
      title: 'ALGO_VIZ.CPP',
      description: 'Visualizing complex sorting and pathfinding algorithms in real-time.',
      tags: ['D3.js', 'JavaScript', 'Algorithms'],
      link: '#'
    },
    {
      id: '3',
      title: 'NEURAL_NET.PY',
      description: 'Simple neural network implementation from scratch for digit recognition.',
      tags: ['Python', 'NumPy', 'ML'],
      link: '#'
    }
  ];

  const experiences: Experience[] = [
    {
      company: 'RETRO TECH CORP',
      role: 'Senior Software Engineer',
      period: '2022 - PRESENT',
      description: 'Leading the development of legacy system modernization tools.'
    },
    {
      company: 'PIXEL PERFECT STUDIOS',
      role: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Built high-performance web applications with a focus on UX.'
    }
  ];

  const renderContent = () => {
    if (terminalState.isRunning && activePage === 'RUN') {
      return (
        <div className="bg-turbo-black h-full p-4 font-mono text-turbo-white relative overflow-hidden">
          <div className="space-y-1">
            {terminalState.output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {terminalState.step !== 'DONE' && terminalState.step !== 'SUBMITTING' && (
              <div className="flex items-center mt-2 relative">
                <span className="mr-2">{terminalState.input}</span>
                <span className="w-2 h-4 bg-turbo-white animate-pulse"></span>
                <input
                  autoFocus
                  className="absolute inset-0 bg-transparent border-none outline-none text-transparent w-full caret-transparent"
                  value={terminalState.input}
                  onChange={(e) => setTerminalState({ ...terminalState, input: e.target.value })}
                  onKeyDown={handleTerminalInput}
                  inputMode="text"
                />
              </div>
            )}
          </div>
          {terminalState.step === 'DONE' && (
            <button 
              onClick={() => setTerminalState({ ...terminalState, isRunning: false })}
              className="mt-8 px-4 py-1 border border-turbo-white hover:bg-turbo-white hover:text-turbo-black transition-colors"
            >
              CLOSE TERMINAL
            </button>
          )}
        </div>
      );
    }

    switch (activePage) {
      case 'FILE':
        if (openedFile) {
          return (
            <div className="h-full flex flex-col">
              <div className="bg-turbo-cyan text-turbo-black px-2 py-1 flex justify-between items-center">
                <span className="font-bold">{openedFile}</span>
                <button onClick={() => setOpenedFile(null)}><X size={14} /></button>
              </div>
              <div className="flex-1 bg-turbo-blue p-4 overflow-auto">
                <SyntaxHighlighter code={getCodeForFile(openedFile)} />
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-10">
            <div className="border-b border-turbo-cyan pb-6">
              <h1 className="text-base text-turbo-yellow font-bold leading-relaxed">WELCOME TO TURBO PORTFOLIO v3.0</h1>
              <p className="text-[10px] text-turbo-white mt-3">Copyright (c) 1990-2026 Ellen Iconoclust</p>
            </div>
            <div className="space-y-8">
              <p className="text-[12px] md:text-sm text-turbo-white leading-[2.2]">
                I am a passionate software engineer dedicated to building robust and efficient solutions. 
                My journey started with C++ and assembly, and today I specialize in modern full-stack 
                development while keeping the efficiency of the old school alive.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="border border-turbo-white p-6">
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm mb-6">SYSTEM INFO</h3>
                  <ul className="text-[10px] md:text-[12px] space-y-6 text-turbo-red">
                    <li>OS: PORTFOLIO_OS v1.0</li>
                    <li>CPU: CREATIVE_MIND @ 4.2GHz</li>
                    <li>RAM: 64GB IMAGINATION</li>
                    <li>DISK: 2TB EXPERIENCE</li>
                  </ul>
                </div>
                <div className="border border-turbo-white p-6">
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm mb-6">CORE SKILLS</h3>
                  <ul className="text-[10px] md:text-[12px] space-y-6 text-turbo-red">
                    <li>- TYPESCRIPT / JS</li>
                    <li>- REACT / NEXT.JS</li>
                    <li>- NODE.JS / EXPRESS</li>
                    <li>- C++ / SYSTEMS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'EDIT':
        return (
          <div className="space-y-10">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow underline">EXPERIENCE_LOG.TXT</h2>
            <div className="space-y-16">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-10 border-l-2 border-turbo-cyan">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-turbo-cyan rounded-full" />
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm font-bold leading-relaxed">{exp.role} @ {exp.company}</h3>
                  <p className="text-[10px] text-turbo-gray mt-3 mb-6">{exp.period}</p>
                  <p className="text-turbo-white text-[12px] md:text-sm leading-[2.2]">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'SEARCH':
        return (
          <div className="space-y-10">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">PROJECT_DATABASE.DB</h2>
            <div className="grid grid-cols-1 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="border-2 border-turbo-white p-8 hover:bg-turbo-cyan/20 cursor-pointer transition-colors">
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm font-bold mb-6 flex items-center gap-3">
                    <FolderOpen size={16} /> {project.title}
                  </h3>
                  <p className="text-[12px] md:text-sm text-turbo-white mb-8 leading-[2.2]">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-turbo-blue border border-turbo-cyan px-3 py-2 text-turbo-cyan">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'RUN':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-16 py-12">
            <div className="text-center space-y-8">
              <Terminal size={48} className="mx-auto text-turbo-yellow animate-pulse" />
              <h2 className="text-[12px] md:text-sm text-turbo-yellow font-bold leading-relaxed">ESTABLISHING CONNECTION...</h2>
            </div>
            <div className="w-full max-w-md border-2 border-turbo-white p-8 space-y-8">
              <p className="text-turbo-cyan text-[12px] md:text-sm text-center">CONTACT_INITIATED</p>
              <div className="space-y-8">
                <p className="text-turbo-white text-[12px] md:text-sm leading-relaxed">EMAIL: elleniconoclust@gmail.com</p>
                <p className="text-turbo-white text-[12px] md:text-sm leading-relaxed">GITHUB: github.com/elleniconoclust</p>
                <p className="text-turbo-white text-[12px] md:text-sm leading-relaxed">LINKEDIN: linkedin.com/in/ellen</p>
              </div>
              <button className="w-full bg-turbo-cyan text-turbo-black text-[12px] md:text-sm font-bold py-5 hover:bg-turbo-white transition-colors">
                SEND MESSAGE [ENTER]
              </button>
            </div>
          </div>
        );
      case 'COMPILE':
        return (
          <div className="space-y-8">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">COMPILING PORTFOLIO.CPP...</h2>
            <div className="bg-turbo-black p-8 border border-turbo-white text-[12px] md:text-sm space-y-6 leading-[2.2]">
              <p className="text-turbo-white">Turbo C++  Version 3.00 Copyright (c) 1990, 1992 Borland Intl.</p>
              <p className="text-turbo-white">portfolio.cpp:</p>
              <p className="text-turbo-cyan">Warning portfolio.cpp 42: 'Ellen' is initialized but never used</p>
              <p className="text-turbo-white">Linking portfolio.exe:</p>
              <p className="text-turbo-white">Success: 0 errors, 1 warning</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="border border-turbo-white p-6">
                <p className="text-turbo-cyan text-[12px] md:text-sm mb-6">MEMORY USAGE</p>
                <div className="h-8 bg-turbo-gray mt-2">
                  <div className="h-full bg-turbo-cyan w-[65%]" />
                </div>
              </div>
            </div>
            <button 
              onClick={() => setActivePage('RUN')}
              className="bg-turbo-white text-turbo-black px-8 py-4 text-[12px] md:text-sm font-bold hover:bg-turbo-cyan"
            >
              PRESS ANY KEY TO RUN
            </button>
          </div>
        );
      case 'DEBUG':
        return (
          <div className="space-y-8">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">DEBUGGER_WATCH.LOG</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] md:text-sm border-collapse">
                <thead>
                  <tr className="bg-turbo-cyan text-turbo-black">
                    <th className="border border-turbo-white p-4 text-left">VARIABLE</th>
                    <th className="border border-turbo-white p-4 text-left">VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="leading-loose">
                    <td className="border border-turbo-white p-4">coffee_level</td>
                    <td className="border border-turbo-white p-4 text-turbo-yellow">0x7FFFFFFF</td>
                  </tr>
                  <tr className="leading-loose">
                    <td className="border border-turbo-white p-4">is_coding</td>
                    <td className="border border-turbo-white p-4 text-turbo-yellow">TRUE</td>
                  </tr>
                  <tr className="leading-loose">
                    <td className="border border-turbo-white p-4">bugs_found</td>
                    <td className="border border-turbo-white p-4 text-turbo-yellow">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 border border-turbo-red bg-turbo-red/10">
              <p className="text-turbo-red text-[12px] md:text-sm font-bold leading-relaxed">BREAKPOINT REACHED AT LINE 1024</p>
            </div>
          </div>
        );
      case 'HELP':
        return (
          <div className="space-y-10">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">HELP_INDEX.HLP</h2>
            <div className="bg-turbo-cyan/10 p-8 border border-turbo-cyan">
              <p className="text-turbo-white text-[12px] md:text-sm italic mb-8 leading-[2.2]">"The best way to predict the future is to invent it."</p>
              <div className="space-y-8 text-[12px] md:text-sm">
                <p><span className="text-turbo-yellow">F1:</span> Show this help screen</p>
                <p><span className="text-turbo-yellow">ALT+X:</span> Exit application</p>
                <p><span className="text-turbo-yellow">F9:</span> Compile current thoughts</p>
                <p><span className="text-turbo-yellow">F10:</span> Access top menu</p>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-turbo-cyan text-[12px] md:text-sm">ABOUT THIS INTERFACE</h3>
              <p className="text-turbo-white text-[12px] md:text-sm leading-[2.2]">
                This portfolio is a tribute to the Borland Turbo C++ IDE, which was instrumental 
                in the education of millions of programmers.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Cpu size={48} className="mx-auto text-turbo-red" />
              <h2 className="text-xl text-turbo-red font-bold">MODULE NOT IMPLEMENTED</h2>
              <p className="text-turbo-white">The requested page '{activePage}' is under construction.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col select-none overflow-hidden">
      {/* Custom Retro Block Cursor */}
      <div 
        className="fixed pointer-events-none z-[9999] mix-blend-normal hidden lg:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: '18px',
          height: '40px',
          transform: 'translate(-50%, -50%)',
          backdropFilter: 'invert(1)',
          backgroundColor: 'rgba(255, 165, 0, 0.3)',
        }}
      />
      {/* Open File Dialog */}
      <AnimatePresence>
        {isOpenFileDialogOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-turbo-black/50 backdrop-blur-sm">
            <div className="relative">
              {/* Shadow */}
              <div className="absolute top-3 left-3 w-full h-full bg-turbo-black" />
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-turbo-gray border-2 border-turbo-white w-[95vw] md:w-[650px] h-[80vh] md:h-[500px] flex flex-col p-1"
              >
                {/* Dialog Title Bar */}
                <div className="bg-turbo-gray text-turbo-white px-4 py-0.5 flex justify-center items-center font-bold border-b-2 border-turbo-white relative">
                  <div className="absolute left-2 flex gap-1">
                    <span className="text-turbo-cyan">[</span>
                    <span className="text-turbo-white">■</span>
                    <span className="text-turbo-cyan">]</span>
                  </div>
                  <span>Open a File</span>
                </div>
                
                <div className="flex-1 p-8 flex flex-col gap-8">
                  <div className="space-y-2">
                    <div className="text-turbo-yellow font-bold text-sm">Name</div>
                    <div className="bg-turbo-blue p-1 border-2 border-turbo-white flex items-center justify-between">
                      <div className="text-turbo-white font-bold tracking-widest px-2">
                        {selectedFileInDialog ? `C:\\TURBOC3\\BIN\\${selectedFileInDialog}` : 'C:\\TURBOC3\\BIN\\*.C_'}
                      </div>
                      <div className="bg-turbo-gray text-turbo-black px-2 border-l-2 border-turbo-white">↓</div>
                    </div>
                  </div>
                                 <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 overflow-hidden">
                    <div className="col-span-1 md:col-span-8 flex flex-col gap-2 overflow-hidden">
                      <div className="text-turbo-yellow font-bold text-sm">Files</div>
                      <div className="flex-1 border-2 border-turbo-white bg-turbo-cyan overflow-y-auto custom-scrollbar relative">
                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-turbo-cyan border-l-2 border-turbo-white flex flex-col justify-between items-center py-1">
                          <span className="text-turbo-white">▲</span>
                          <div className="w-3 h-3 bg-turbo-white" />
                          <span className="text-turbo-white">▼</span>
                        </div>
                        <div className="p-2 space-y-1">
                          <button 
                            className="w-full text-left px-2 py-1 text-turbo-black font-bold hover:bg-turbo-white hover:text-turbo-cyan"
                          >
                            PROJECT\
                          </button>
                          <button 
                            className="w-full text-left px-2 py-1 text-turbo-black font-bold hover:bg-turbo-white hover:text-turbo-cyan"
                          >
                            ..\
                          </button>
                          {['CONTACT.C', 'RICKROLL.C', 'MAIN.C', 'UTILS.C', 'DATA.C'].map((f, i) => (
                            <button 
                              key={i} 
                              onClick={() => setSelectedFileInDialog(f)}
                              className={`w-full text-left px-2 py-1 font-bold ${
                                selectedFileInDialog === f 
                                  ? 'bg-turbo-white text-turbo-cyan' 
                                  : 'text-turbo-black hover:bg-turbo-white hover:text-turbo-cyan'
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-4 flex flex-row md:flex-col gap-2 md:gap-6 pt-2 md:pt-6">
                      <button 
                        onClick={() => {
                          if (selectedFileInDialog) {
                            setOpenedFile(selectedFileInDialog);
                            setIsOpenFileDialogOpen(false);
                            setActivePage('FILE');
                          }
                        }}
                        className="flex-1 relative group"
                      >
                        <div className="absolute top-1 left-1 w-full h-full bg-turbo-black" />
                        <div className={`relative border-2 border-turbo-white py-2 font-bold flex justify-center items-center group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none transition-transform ${
                          selectedFileInDialog ? 'bg-[#00AA00] text-turbo-black' : 'bg-turbo-gray text-turbo-black/40'
                        }`}>
                          <span className="text-turbo-yellow">O</span>pen
                        </div>
                      </button>

                      <button className="hidden md:block relative group">
                        <div className="absolute top-1 left-1 w-full h-full bg-turbo-black" />
                        <div className="relative bg-[#00AA00] border-2 border-turbo-white py-2 text-turbo-black font-bold flex justify-center items-center group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none transition-transform">
                          <span className="text-turbo-yellow">R</span>eplace
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => setIsOpenFileDialogOpen(false)}
                        className="flex-1 relative group"
                      >
                        <div className="absolute top-1 left-1 w-full h-full bg-turbo-black" />
                        <div className="relative bg-[#00AA00] border-2 border-turbo-white py-2 text-turbo-black font-bold flex justify-center items-center group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none transition-transform">
                          <span className="text-turbo-yellow">C</span>ancel
                        </div>
                      </button>

                      <button className="hidden md:block relative group">
                        <div className="absolute top-1 left-1 w-full h-full bg-turbo-black" />
                        <div className="relative bg-[#00AA00] border-2 border-turbo-white py-2 text-turbo-black font-bold flex justify-center items-center group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none transition-transform">
                          <span className="text-turbo-yellow">H</span>elp
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-turbo-blue p-3 border-2 border-turbo-white">
                    <div className="text-turbo-cyan text-xs">C:\TURBOC3\BIN\*.C</div>
                    <div className="flex justify-between text-turbo-cyan text-xs mt-1">
                      <span>PROJECT</span>
                      <span>Directory</span>
                      <span>Oct 5,2025</span>
                      <span>3:13pm</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {!hasStarted && (
        <div 
          onClick={startApp}
          className="fixed inset-0 z-[100] bg-turbo-black flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="border-4 border-turbo-cyan p-12 text-center space-y-8">
            <h1 className="text-turbo-yellow text-2xl font-bold tracking-widest">TURBO PORTFOLIO v3.0</h1>
            <p className="text-turbo-white text-base animate-pulse">CLICK ANYWHERE TO BOOT SYSTEM</p>
            <div className="text-turbo-gray text-xs mt-8">
              (C) 1990-2026 BORLAND INTERNATIONAL / ELLEN ICONOCLUST
            </div>
          </div>
        </div>
      )}
      {/* Top Menu Bar */}
      <nav className="bg-turbo-gray h-10 flex items-center px-4 z-50 relative">
        {/* Desktop View (lg and above) */}
        <div className="hidden lg:flex gap-1 h-full items-center w-full">
          <div className="flex gap-2 h-full relative">
            {menuOptions.map((opt) => (
              <div key={opt.id} className="relative h-full flex items-center">
                <button
                  onClick={() => {
                    setActivePage(opt.id);
                    if (opt.id === 'FILE') {
                      setIsFileMenuOpen(!isFileMenuOpen);
                      setIsRunMenuOpen(false);
                    } else if (opt.id === 'RUN') {
                      setIsRunMenuOpen(!isRunMenuOpen);
                      setIsFileMenuOpen(false);
                    } else {
                      setIsFileMenuOpen(false);
                      setIsRunMenuOpen(false);
                    }
                  }}
                  className={`px-3 text-[18px] flex items-center h-full transition-colors ${
                    activePage === opt.id || (opt.id === 'FILE' && isFileMenuOpen) || (opt.id === 'RUN' && isRunMenuOpen)
                      ? 'bg-turbo-cyan text-turbo-black' 
                      : 'text-turbo-black hover:bg-turbo-white'
                  }`}
                >
                  <span className="!text-turbo-red font-bold">{opt.shortcut}</span>
                  {opt.label.substring(1)}
                </button>

                {/* Run Dropdown */}
                {opt.id === 'RUN' && isRunMenuOpen && (
                  <div className="absolute top-full left-0 z-[100]">
                    <div className="absolute top-2 left-2 w-full h-full bg-turbo-black" />
                    <div className="relative w-64 bg-turbo-gray border-2 border-turbo-white p-0.5">
                      {[
                        { label: 'Run', hotkey: 'R', shortcut: 'Ctrl+F9' },
                        { label: 'Program reset', hotkey: 'P', shortcut: 'Ctrl+F2' },
                        { label: 'Go to cursor', hotkey: 'G', shortcut: 'F4' },
                        { label: 'Trace into', hotkey: 'T', shortcut: 'F7' },
                        { label: 'Step over', hotkey: 'S', shortcut: 'F8' },
                        { label: 'Arguments...', hotkey: 'A' },
                      ].map((item, i) => {
                        const isSelected = item.label === 'Run';
                        return (
                          <button 
                            key={i}
                            onClick={() => {
                              if (item.label === 'Run') {
                                if (openedFile) {
                                  runProgram(openedFile);
                                } else {
                                  alert('No file opened to run!');
                                }
                              }
                              setIsRunMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-1 flex justify-between items-center group text-[16px] ${
                              isSelected ? 'bg-[#00AA00]' : 'hover:bg-[#00AA00]'
                            }`}
                          >
                            <span className="flex text-turbo-black">
                              {item.label.split('').map((char, idx) => {
                                if (char === item.hotkey && item.label.indexOf(char) === idx) {
                                  return <span key={idx} className="text-turbo-red">{char}</span>;
                                }
                                return <span key={idx}>{char}</span>;
                              })}
                            </span>
                            {item.shortcut && <span className="text-[12px] ml-4 text-turbo-black">{item.shortcut}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {opt.id === 'FILE' && isFileMenuOpen && (
                  <div className="absolute top-full left-0 z-[100]">
                    {/* The Shadow */}
                    <div className="absolute top-2 left-2 w-full h-full bg-turbo-black" />
                    {/* The Menu */}
                    <div className="relative w-64 bg-turbo-gray border-2 border-turbo-white p-0.5">
                      {[
                        { label: 'New', hotkey: 'N' },
                        { label: 'Open...', hotkey: 'O', shortcut: 'F3' },
                        { label: 'Save', hotkey: 'S', shortcut: 'F2' },
                        { label: 'Save as...', hotkey: 'a' },
                        { label: 'Save all', hotkey: 'l' },
                        { separator: true },
                        { label: 'Change dir...', hotkey: 'C' },
                        { label: 'Print', hotkey: 'P' },
                        { label: 'DOS shell', hotkey: 'D' },
                        { separator: true },
                        { label: 'Quit', hotkey: 'Q', shortcut: 'Alt+X' },
                      ].map((item, i) => {
                        if (item.separator) return <div key={i} className="h-[2px] bg-turbo-black/40 my-1 mx-1" />;
                        
                        const isSelected = item.label === 'New'; // Mock selection for "New" as in image
                        
                        return (
                          <button 
                            key={i}
                            onClick={() => {
                              if (item.label === 'Open...') {
                                setSelectedFileInDialog(null);
                                setIsOpenFileDialogOpen(true);
                              } else if (item.label === 'Quit') {
                                setOpenedFile(null);
                                setActivePage('FILE');
                              }
                              setIsFileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-1 flex justify-between items-center group text-[16px] ${
                              isSelected ? 'bg-[#00AA00]' : 'hover:bg-[#00AA00]'
                            }`}
                          >
                            <span className="flex text-turbo-black">
                              {item.label.split('').map((char, idx) => {
                                if (char === item.hotkey && item.label.indexOf(char) === idx) {
                                  return <span key={idx} className="text-turbo-red">{char}</span>;
                                }
                                return <span key={idx}>{char}</span>;
                              })}
                            </span>
                            {item.shortcut && <span className="text-[12px] ml-4 text-turbo-black">{item.shortcut}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="ml-auto text-turbo-black text-[18px] font-bold">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>

        {/* Mobile/Tablet View (below lg) */}
        <div className="flex lg:hidden items-center justify-between w-full h-full">
          {/* Active Page Name on the Left */}
          <div className="px-3 text-[18px] flex items-center h-full bg-turbo-cyan text-turbo-black font-bold">
            {(() => {
              const opt = menuOptions.find(o => o.id === activePage);
              return opt ? (
                <>
                  <span className="!text-turbo-red">{opt.shortcut}</span>
                  {opt.label.substring(1)}
                </>
              ) : null;
            })()}
          </div>

          {/* Hamburger Menu on the Right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-3 text-turbo-black hover:bg-turbo-white h-full flex items-center"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-10 left-0 w-full bg-turbo-gray border-b-2 border-turbo-black lg:hidden shadow-2xl z-50"
            >
              <div className="flex flex-col">
                {menuOptions.map((opt) => (
                  <div key={opt.id} className="flex flex-col">
                    <button
                      onClick={() => {
                        if (opt.id === 'FILE' || opt.id === 'RUN') {
                          // Toggle sub-menu if already active, or just set active
                          if (activePage === opt.id) {
                            // If it's RUN and we click it again, maybe we want to run?
                            // But let's just show the sub-options
                          }
                        }
                        setActivePage(opt.id);
                        if (opt.id !== 'FILE' && opt.id !== 'RUN') {
                          setIsMenuOpen(false);
                        }
                      }}
                      className={`px-6 py-3 text-[18px] text-left transition-colors border-b border-turbo-black/10 flex justify-between items-center ${
                        activePage === opt.id 
                          ? 'bg-turbo-cyan text-turbo-black' 
                          : 'text-turbo-black hover:bg-turbo-white'
                      }`}
                    >
                      <div>
                        <span className="!text-turbo-red font-bold">{opt.shortcut}</span>
                        {opt.label.substring(1)}
                      </div>
                      {(opt.id === 'FILE' || opt.id === 'RUN') && <span className="text-xs">▼</span>}
                    </button>
                    
                    {/* Mobile Sub-menu for FILE */}
                    {activePage === 'FILE' && opt.id === 'FILE' && (
                      <div className="bg-turbo-white/50 flex flex-col">
                        <button 
                          onClick={() => { setIsOpenFileDialogOpen(true); setIsMenuOpen(false); }}
                          className="px-10 py-3 text-left border-b border-turbo-black/5 text-turbo-black"
                        >
                          Open...
                        </button>
                        <button 
                          onClick={() => { setOpenedFile(null); setActivePage('FILE'); setIsMenuOpen(false); }}
                          className="px-10 py-3 text-left border-b border-turbo-black/5 text-turbo-black"
                        >
                          Quit (Close File)
                        </button>
                      </div>
                    )}

                    {/* Mobile Sub-menu for RUN */}
                    {activePage === 'RUN' && opt.id === 'RUN' && (
                      <div className="bg-turbo-white/50 flex flex-col">
                        <button 
                          onClick={() => { 
                            if (openedFile) {
                              runProgram(openedFile);
                            } else {
                              alert('No file opened to run!');
                            }
                            setIsMenuOpen(false); 
                          }}
                          className="px-10 py-3 text-left border-b border-turbo-black/5 text-turbo-black"
                        >
                          Run Program
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 bg-turbo-blue p-2 relative overflow-hidden">
        {/* The Classic Double Line Window */}
        <div className="w-full h-full border-[3px] border-turbo-cyan relative flex flex-col">
          {/* Window Title Bar */}
          <div className="h-8 border-b-[3px] border-turbo-white flex items-center px-4 justify-between bg-turbo-blue">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="text-turbo-cyan">[</span>
                <span className="text-turbo-white">■</span>
                <span className="text-turbo-cyan">]</span>
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-turbo-white text-sm font-bold tracking-widest">
                  {openedFile || 'WELCOME.C'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-1">
                <span className="text-turbo-white">7=[</span>
                <span className="text-turbo-cyan">↑</span>
                <span className="text-turbo-white">]</span>
              </div>
            </div>
          </div>

          {/* Window Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {renderContent()}
          </div>

          {/* Scroll Indicators (Retro style) */}
          <div className="absolute right-0 top-6 bottom-0 w-4 border-l-[3px] border-turbo-cyan bg-turbo-blue flex flex-col justify-between items-center py-1">
            <div className="text-turbo-cyan text-[10px]">▲</div>
            <div className="w-3 h-8 bg-turbo-cyan" />
            <div className="text-turbo-cyan text-[10px]">▼</div>
          </div>
          <div className="absolute bottom-0 left-0 right-4 h-4 border-t-[3px] border-turbo-cyan bg-turbo-blue flex justify-between items-center px-1">
            <div className="text-turbo-cyan text-[10px]">◄</div>
            <div className="w-8 h-3 bg-turbo-cyan" />
            <div className="text-turbo-cyan text-[10px]">►</div>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="bg-turbo-gray h-10 flex items-center px-4 z-50 border-t-2 border-turbo-white overflow-x-auto custom-scrollbar">
        <div className="flex gap-4 md:gap-6 text-[14px] md:text-[18px] whitespace-nowrap">
          {[
            { key: 'F1', label: 'Help' },
            { key: 'F2', label: 'Save' },
            { key: 'F3', label: 'Open' },
            { key: 'Alt-F9', label: 'Compile' },
            { key: 'F9', label: 'Make' },
            { key: 'F10', label: 'Menu' },
            { key: 'Alt-Enter', label: 'FullScr' },
          ].map((item, i) => (
            <div key={i} className="flex gap-1 md:gap-2">
              <span className="text-turbo-red font-bold">{item.key}</span>
              <span className="text-turbo-black font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
