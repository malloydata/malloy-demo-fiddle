/*
 * Copyright 2023 Google LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import styled from "styled-components";
import { getMonacoGrammar } from "./utils/monaco";

declare global {
  interface Window {
    malloyHost: string | undefined;
  }
}

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string) {
    const base = window.malloyHost || "./dist";
    let path = `${base}/editor.worker.bundle.js`;
    if (label === "json") {
      path = `${base}/json.worker.bundle.js`;
    }
    const url = new URL(path, window.location.href);
    return URL.createObjectURL(
      new Blob([`importScripts("${url}");`], {
        type: "text/javascript",
      })
    );
  },
};

monaco.languages.register({
  id: "malloy",
});

monaco.languages.setMonarchTokensProvider("malloy", getMonacoGrammar());

export interface EditorProps {
  value: string;
  language?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  value,
  language = "malloy",
  readOnly = false,
  onChange,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divRef.current) {
      editor = monaco.editor.create(divRef.current, {
        automaticLayout: true,
        fontSize: 13,
        fontFamily: "Roboto Mono",
        value,
        language,
        readOnly,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        padding: {
          top: 13,
          bottom: 13,
        },
        overviewRulerLanes: 0,
      });
      if (onChange) {
        editor.getModel()?.onDidChangeContent(() => {
          onChange(editor.getValue());
        });
      }
    }

    return () => {
      editor.dispose();
    };
  }, [value, onChange]);

  return <Wrapper className="Editor" ref={divRef} />;
};

const Wrapper = styled.div`
  flex: auto;
  position: relative;
  overflow: hidden;

  .monaco-scrollable-element > .scrollbar > .slider {
    background: rgba(100, 100, 100, 0.2);
  }

  .monaco-scrollable-element > .scrollbar > .slider:hover {
    background: rgba(100, 100, 100, 0.4);
  }
`;
