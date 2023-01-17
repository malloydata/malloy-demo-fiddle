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

export interface SampleQuery {
  name: string;
  query: string;
}

export interface SampleQueries {
  importFile: string;
  queries: SampleQuery[];
}

const IMPORT_RE = /^import "([^"]+)"$/gm;
const SPLIT_RE = /^\/\/\s*--.*$/gm;
const QUERY_NAME_RE = /^\/\/\s*Name:\s*(.*)$/im;

export const loadSampleQueries = async (url: URL): Promise<SampleQueries> => {
  const sampleRequest = await fetch(url);
  const sampleData = await sampleRequest.text();
  const importFile = IMPORT_RE.exec(sampleData)?.[1];
  if (!importFile) {
    throw new Error("Unable to find import statement");
  }

  const queryStrings = sampleData.replace(IMPORT_RE, "").trim().split(SPLIT_RE);

  const queries: SampleQuery[] = [];
  let i = 1;
  for (const queryString of queryStrings) {
    let name = queryString.match(QUERY_NAME_RE)?.[1];
    if (name) {
      name = `${i++} - ${name}`;
      // remove the first line
      let query = queryString.trim();
      const q = query.split("\n");
      q.splice(0, 1);
      query = q.join("\n");
      queries.push({ name, query });
    }
  }

  return {
    importFile,
    queries,
  };
};
