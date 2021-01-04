import { useState, useEffect } from "react";
import axios from "axios";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getMyResources = async () => {
      try {
        const res = await axios.get(`/api/data/resource/${id}`);
        setResources(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyResources();
  }, []);

  const deleteResource = async (id) => {
    try {
      await axios.delete(`/api/data/resource/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const editResource = async () => {
    try {
      const res = await axios.put(`/api/data/resource/${resourceId}`, {
        title,
        source,
        description,
        category
      });
      setTitle(res.data.title);
      setSource(res.data.source);
      setDescription(res.data.description);
      setCategory(res.data.category);
    } catch (err) {
      console.log(err);
    }
  };
  const handleButton = (e) => {
    e.preventDefault();
    editResource();
    setEdit(false);
  };

  const mappedResources = resources.map((resource) => {
    return (
      <>
        {edit ? (
          <>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Source:
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <button type = 'submit' name = 'submitbutton' onClick={handleButton}></button>
          </form>
          
          </>
        ) : (
          <div key={resource.id}>
            <ul>
              <li>{resource.title}</li>
              <li>{resource.source}</li>
              <li>{resource.description}</li>
              <li>{resource.category}</li>
            </ul>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => deleteResource()}>Delete</button>
          </div>
        )}
        )
      </>
    );
  });

  return <div>{mappedResources}</div>;
};

export default Resources;