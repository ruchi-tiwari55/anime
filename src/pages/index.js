import { Card, Input } from "antd";
import { useEffect, useState } from "react";

function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime")
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        setItems(responseData.data);
        setFilteredItems(responseData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSearch = (value) => {
    value = value.trim();
    let filteredItems = items.filter((item) => {
      return item.title.includes(value);
    });
    setFilteredItems(filteredItems);
  };

  return (
    <div style={{ backgroundColor: "lightgreen", minHeight: "100vh" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Input.Search
          allowClear={true}
          placeholder="search title"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {filteredItems.map((item, index) => {
          return (
            <Card
              key={index}
              hoverable
              style={{
                width: 240,
                height: 350,
                margin: 10,
              }}
              cover={
                <img
                  alt="example"
                  src={item.images.jpg.image_url}
                  style={{ height: 260 }}
                />
              }
            >
              <Card.Meta title={item.title} description={item.rating} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
