import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../lib/queries";
import Loading from "./Loading";

const Recommend = () => {
  const user = useQuery(ME, { fetchPolicy: "no-cache" });
  const [getBooks, books] = useLazyQuery(ALL_BOOKS);
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    if (user.data) {
      getBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [getBooks, user]);

  useEffect(() => {
    if (books.data) {
      setSelectedBooks(books.data.allBooks);
    }
  }, [setSelectedBooks, books]);

  if (user.loading) {
    return <Loading />;
  }

  //   console.log(user);
  //   console.log(books);

  if (!user?.data?.me?.favoriteGenre) return <p>You need to be logged in</p>;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{" "}
        <strong>{user.data.me.favoriteGenre}</strong>
      </p>
      {selectedBooks.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books in your favorite genre</p>
      )}
    </div>
  );
};

export default Recommend;
