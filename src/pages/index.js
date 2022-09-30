import { Card, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";

function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [genresTypes, setGenresTypes] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime")
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        setItems(responseData.data);
        let genresObj = responseData.data.reduce((obj, item) => {
          item.genres.map((gen) => {
            obj[gen.name] = 1;
          });
          return obj;
        }, {});
        setGenresTypes(Object.keys(genresObj));
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

  const handleChange = (selectedValues) => {
    if (selectedValues.length == 0) {
      setFilteredItems(items);
      return;
    }
    let filteredItems = items.filter((item) => {
      let includeThisItem = false;
      item.genres.map((gen) => {
        if (selectedValues.includes(gen.name)) {
          includeThisItem = true;
        }
      });
      return includeThisItem;
    });
    setFilteredItems(filteredItems);
  };

  return (
    <div style={{ backgroundColor: "lightgreen", minHeight: "100vh" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
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
        <div style={{ width: "100%", marginTop: 15 }}>
          <Space>
            <div>Filter by Genres:</div>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: 200,
              }}
              placeholder="select genres"
              onChange={handleChange}
            >
              {genresTypes.map((item, index) => {
                return (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Space>
        </div>
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
