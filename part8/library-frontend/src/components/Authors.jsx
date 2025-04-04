import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../lib/queries";
import Loading from "./Loading";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  const [changeBirthYear] = useMutation(EDIT_AUTHOR);

  if (result.loading) {
    return <Loading />;
  }

  console.log(result);
  const authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    changeBirthYear({
      variables: {
        name: formJson.authorName,
        setBornTo: Number(formJson.authorBorn),
      },
    });

    event.target.reset();
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
          <select name="authorName">
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input name="authorBorn" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
