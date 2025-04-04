import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../lib/queries";
import Loading from "./Loading";

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (result.loading) {
    return <Loading />;
  }

  let books = result.data.allBooks;
  const genres = [...new Set(books.flatMap((book) => book.genres))];

  if (selectedGenre)
    books = books.filter((book) => book.genres.includes(selectedGenre));

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
