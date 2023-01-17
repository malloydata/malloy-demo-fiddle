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

import React, { useCallback } from "react";
import styled from "styled-components";
import { SampleQuery } from "./utils/query";

interface QuerySelectProps {
  onSelectQuery: (sampleQuery: SampleQuery) => void;
  queries: SampleQuery[];
  selectedQuery: SampleQuery | undefined;
}

export const QuerySelect: React.FC<QuerySelectProps> = ({
  queries,
  onSelectQuery,
  selectedQuery,
}) => {
  const onQueryChange = useCallback(
    ({ target }) => {
      const query = queries.find((query) => query.name == target.value);
      onSelectQuery(query || queries[0]);
    },
    [onSelectQuery, queries]
  );

  return (
    <QuerySection>
      <Label htmlFor="query-select">Queries: </Label>
      <Select
        id="query-select"
        onChange={onQueryChange}
        value={selectedQuery?.name}
      >
        {queries.map((query) => (
          <option key={query.name} value={query.name}>
            {query.name}
          </option>
        ))}
      </Select>
    </QuerySection>
  );
};

const Select = styled.select`
  appearance: none;
  padding-left: 5px;
  background: none;
  border: 0;
  color: #188ff9;
  flex: auto;
`;

const Label = styled.label`
  font-size: 14px;
`;

const QuerySection = styled.div`
  display: flex;
  align-items: center;
  ${Label} {
    padding-left: 20px;
  }
`;
