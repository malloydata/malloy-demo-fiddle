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

import * as monaco from "monaco-editor";

export const getMonacoGrammar = (): monaco.languages.IMonarchLanguage => {
  return {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: "invalid",

    keywords: [
      "accept",
      "aggregate",
      "declare",
      "dimension",
      "except",
      "explore",
      "group_by",
      "having",
      "index",
      "join_cross",
      "join_one",
      "join_many",
      "limit",
      "measure",
      "nest",
      "order_by",
      "primary_key",
      "project",
      "query",
      "rename",
      "sample",
      "source",
      "sql",
      "top",
      "where",

      "all",
      "and",
      "as",
      "asc",
      "avg",
      "by",
      "case",
      "cast",
      "condition",
      "count",
      "date",
      "day",
      "desc",
      "distinct",
      "else",
      "end",
      "exclude",
      "false",
      "for",
      "from",
      "from_sql",
      "has",
      "hour",
      "hours",
      "import",
      "is",
      "json",
      "last",
      "max",
      "min",
      "minute",
      "minutes",
      "month",
      "months",
      "not",
      "now",
      "null",
      "on",
      "or",
      "pick",
      "quarter",
      "quarters",
      "second",
      "seconds",
      "sum",
      "table",
      "then",
      "this",
      "to",
      "true",
      "turtle",
      "week",
      "weeks",
      "with",
      "year",
      "years",
      "ungrouped",
    ],

    typeKeywords: ["string", "number", "boolean", "date", "timestamp"],

    operators: [
      "&",
      "->",
      "=>",
      "::",
      ":",
      ",",
      ".",
      "<",
      ">",
      "=",
      "!=",
      "<=",
      ">=",
      "+",
      "-",
      "*",
      "**",
      "/",
      "|",
      ";",
      "!~",
      "~",
      "?",
    ],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*/^%]+/,

    // C# style strings
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [
          /[A-Za-z_$][\w$]*/,
          {
            cases: {
              "@typeKeywords": "keyword",
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],

        // whitespace
        { include: "@whitespace" },

        // delimiters and operators
        [/[{}()[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],

        // numbers
        [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
        [/\d+/, "number"],

        // strings
        [/"([^"\\]|\\.)*$/, "string.invalid"], // non-terminated string
        [/'([^'\\]|\\.)*$/, "string.invalid"], // non-terminated string
        // [/`([^`\\]|\\.)*$/, "string.invalid"], // non-terminated string
        [/"/, "string", "@string_double"],
        [/'/, "string", "@string_single"],
        // [/`/, "identifier", "@identifier_quoted"],
      ],

      comment: [
        [/[^/*]+/, "comment"],
        [/\/\*/, "comment", "@push"], // nested comment
        ["\\*/", "comment", "@pop"],
        [/[/*]/, "comment"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      string_single: [
        [/[^\\']+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],

      // identifier_quoted: [
      //   [/[^\\`]+/, "identifier"],
      //   [/`/, "identifier", "@pop"],
      // ],

      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],
    },
  };
};
