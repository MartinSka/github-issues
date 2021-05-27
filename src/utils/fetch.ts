export const apiUrl = "https://api.github.com/repos";
export const config = process.env?.REACT_APP_GITHUB_TOKEN
  ? {
      headers: new Headers({
        Authorization: `Bearer ${process.env?.REACT_APP_GITHUB_TOKEN}`,
      }),
    }
  : {};
