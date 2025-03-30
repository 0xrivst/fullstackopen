import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../lib/queries";
import Loading from "./Loading";

const Authors = (props) => {
  const [authorName, setAuthorName] = useState("");
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [changeBirthYear] = useMutation(EDIT_AUTHOR);

  if (result.loading) {
    return <Loading />;
  }

  const authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    changeBirthYear({
      variables: { name: authorName, setBornTo: Number(born) },
    });

    setAuthorName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
