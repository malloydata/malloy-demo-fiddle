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

import React, { useCallback, useState } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    dataLayer: unknown[] | undefined;
  }
}
export const Analytics: React.FC = () => {
  let cookieClicked = false;
  try {
    cookieClicked = localStorage.getItem("cookie-clicked") === "yes";
  } catch {
    // Ignore
  }

  const [showBanner, setShowBanner] = useState(!cookieClicked);
  const onClick = useCallback(() => {
    try {
      localStorage.setItem("cookie-clicked", "yes");
    } catch {
      // Ignore
    }
    setShowBanner(false);
  }, []);

  if (!window.dataLayer) {
    return null;
  }

  return (
    <>
      {showBanner ? (
        <Banner>
          <div>
            This site uses cookies from Google to deliver its services and to
            analyze traffic.{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
            >
              Learn more
            </a>
          </div>
          <button onClick={onClick}>I Understand</button>
        </Banner>
      ) : null}
    </>
  );
};

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  font-size: 16px;
  bottom: 0;
  height: 60px;
  width: 80%;
  max-width: 1000px;
  background: #2655c9;
  color: white;
  padding: 0 20px;

  button {
    border: 0;
    background: white;
    color: #2655c9;
    height: 30px;
    width: 120px;
    border-radius: 3px;
  }

  a {
    color: white;
  }
`;
